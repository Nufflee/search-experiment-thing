import * as path from 'path'
import express from 'express'
import indexPosts from './indexPosts'
import { Post, PostParams } from 'shared/types'

const posts = express()

const postMap = indexPosts(path.resolve('posts'))

posts.get<{}, Post[]>('/index', (_, res) => {
  return res.status(200).json(Array.from(postMap.values()))
})

// TODO: Add ETags
posts.get<PostParams, Post>('/:post', (req, res) => {
  const post = postMap.get(req.params.post)

  if (!post) {
    return res.sendStatus(404)
  } else {
    return res.status(200).json(post)
  }
})

export default posts