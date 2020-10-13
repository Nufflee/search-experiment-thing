import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { IndexedPost } from 'shared/types'

export default function IndexPage() {
  const [state, setState] = useState({
    posts: [] as IndexedPost[]
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
  post: IndexedPost
}

function IndexPost(props: IndexPostProps) {
  const { post } = props
  const date = moment(post.date).format('Do MMM YYYY')

  return (
    <>
      <div style={{ display: 'flex', marginTop: '2em' }}>
        <h2 style={{ flex: 1, margin: 0 }}><a href={post.url}>{post.title}</a></h2>
        <p style={{ display: 'inline-block', margin: 'auto' }}>{date}</p>
      </div>
      <p style={{ wordWrap: 'break-word' }}>{post.shortContent}</p>
      <hr />
    </>
  )
}