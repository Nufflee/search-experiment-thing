import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// @ts-ignore TODO figure this out
import webpackConfig from '../webpack.config.dev'
import * as path from 'path'

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

app.use('/posts', express.static(path.resolve('posts'), { fallthrough: false }))

app.get('*', (_, res) => res.sendFile(path.resolve('public', 'index.html')))

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`)
})
