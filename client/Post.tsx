import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

interface PostParams {
  post: string
}

enum Status {
  Loading,
  Loaded,
  Error
}

function handleErrors(res: Response) {
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res
}

export default function Post({ match }: RouteComponentProps<PostParams>) {
  const [state, setState] = useState({
    status: Status.Loading,
    content: 'Loading...'
  })

  useEffect(() => {
    fetch(`posts/${match.params.post}.md`)
      .then(handleErrors)
      .then((res) => res.text())
      .then((text) => setState({
        status: Status.Loaded,
        content: text
      }))
      .catch((err: Error) => setState({
        status: Status.Error,
        content: `Error: ${err.message}`
      }))
  }, [])

  return (
    <>
      <p>OPA:</p>
      {
        state.status === Status.Loaded ? <ReactMarkdown source={state.content} escapeHtml={false} /> : state.content
      }
    </>
  )
};
