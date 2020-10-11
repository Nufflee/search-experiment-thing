import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// @ts-ignore TODO figure this out
import webpackConfig from '../webpack.config.dev'
import * as path from 'path'
import indexPosts from './indexPosts'
import { PostParams } from 'shared/types'

const PORT = 6969

const compiler = webpack(webpackConfig)
const app = express()

app.use(webpackMiddleware(compiler))
app.use(
  webpackHotMiddleware(compiler, {
    // @ts-ignore TODO
    hot: true,
    reload: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
)

const postMap = indexPosts(path.resolve('posts'))

// TODO: Add ETags
app.get('/posts/:post', (req: express.Request<PostParams>, res) => {
  const post = postMap.get(req.params.post)

  if (!post) {
    return res.sendStatus(404)
  } else {
    return res.status(200).json(post)
  }
})

app.get('*', (_, res) => res.sendFile(path.resolve('public', 'index.html')))

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`)
})
