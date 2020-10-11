import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import { Post } from 'shared/types'

export default function IndexPage() {
  const [state, setState] = useState({
    posts: [] as Post[]
  })

  useEffect(() => {
    fetch('posts/index')
      .then((res) => res.json())
      .then((posts) => setState((prev) => ({
        ...prev,
        posts
      })))
  }, [])

  const postElements = []

  if (state.posts.length > 0) {
    for (const [index, post] of state.posts.entries()) {
      postElements.push(
        <IndexPost key={index} post={post} />
      )
    }
  }

  return (
    <>
      <h1>Index</h1>
      <hr />
      {
        state.posts.length === 0
          ? <p>Loading...</p>
          : postElements
      }
    </>
  )
}

interface IndexPostProps {
  post: Post
}

function IndexPost(props: IndexPostProps) {
  const { post } = props
  const content = post.content.substring(0, 100)
  const date = moment(post.date).format('Do MMM YYYY')

  return (
    <>
      <div style={{ display: 'flex', marginTop: '2em' }}>
        <h1 style={{ flex: 1, margin: 0 }}>{post.title}</h1>
        <p style={{ display: 'inline-block', margin: 'auto' }}>{date}</p>
      </div>
      {/*<ReactMarkdown source={content} />*/}
      <p style={{ wordWrap: 'break-word' }}>{content}</p>
      <hr />
    </>
  )
}