export interface Post {
  title: string
  content: string
  date: Date
}

export interface IndexedPost {
  url: string
  title: string
  shortContent: string
  date: Date
}

export interface PostParams {
  post: string
}
