import * as path from 'path'
import express from 'express'
import indexPosts from './indexPosts'
import { IndexedPost, Post as PostResponse, PostParams } from 'shared/types'

export interface Post {
  title: string
  content: string
  shortContent: string
  toc: string[]
  keywords: string[]
  date: Date
}

const posts = express()

const postMap = indexPosts(path.resolve('posts'))

posts.get<{}, IndexedPost[]>('/index', (_, res) => {
  const indexedPosts: IndexedPost[] = []

  postMap.forEach((post, url) => {
    indexedPosts.push({
      url: url.substring(0, url.lastIndexOf('.')),
      title: post.title,
      shortContent: post.shortContent,
      date: post.date
    })
  })

  return res.status(200).json(indexedPosts)
})

// TODO: Add ETags
posts.get<PostParams, PostResponse>('/:post', (req, res) => {
  const post = postMap.get(req.params.post)

  if (!post) {
    return res.sendStatus(404)
  } else {
    return res.status(200).json({
      title: post.title,
      content: post.content,
      date: post.date
    })
  }
})

export default posts