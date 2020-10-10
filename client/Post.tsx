import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface PostParams {
  post: string
}

function handleErrors(res: Response) {
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res
}

export default function Post({ match }: RouteComponentProps<PostParams>) {
  const [content, setContent] = useState('Loading...')

  useEffect(() => {
    fetch(`posts/${match.params.post}.md`)
      .then(handleErrors)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err: Error) => {
        setContent(`Error: ${err.message}`)
      })
  }, [])

  return (
    <>
      <p>OPA:</p>
      <p>{content}</p>
    </>
  )
};
