import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { handleErrors } from './fetch'
import { Post, PostParams } from 'shared/types'

enum Status {
  Loading,
  Loaded,
  Error
}

export default function Post({ match }: RouteComponentProps<PostParams>) {
  const [state, setState] = useState({
    status: Status.Loading,
    post: {} as Post,
    error: ''
  })

  useEffect(() => {
    fetch(`posts/${match.params.post}.md`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((post) => setState((prev) => ({
        ...prev,
        status: Status.Loaded,
        post
      })))
      .catch((err: Error) => setState((prev) => ({
        ...prev,
        status: Status.Error,
        error: `Error: ${err.message}`
      })))
  }, [])

  let content = <p>Loading...</p>

  if (state.status === Status.Loaded) {
    // TODO: Generate heading anchors (https://github.com/remarkjs/react-markdown/issues/69)
    content = <ReactMarkdown source={state.post.content} escapeHtml={false} />
  } else if (state.status === Status.Error) {
    content = <p>{state.error}</p>
  }

  // TODO: Page title
  return (
    <>
      <p>OPA:</p>
      {content}
    </>
  )
}
