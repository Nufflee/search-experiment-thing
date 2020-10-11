export interface Post {
  title: string
  content: string
  toc: string[]
  keywords: string[]
  date: Date
}

export interface PostParams {
  post: string
}
