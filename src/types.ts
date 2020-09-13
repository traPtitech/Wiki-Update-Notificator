export interface ArticlesResponse {
  pages: Article[]
  ok: boolean
}

interface Article {
  status: string
  grant: number
  grantedUsers: string[]
  liker: string[]
  seenUsers: string[]
  commentCount: number
  extended: unknown
  createdAt: string
  path: string
  creator: string
  lastUpdateUser: string
  updatedAt: string
  redirectTo: unknown
  revision: Revision
  id: string
}

interface Revision {
  format: string
  createdAt: string
  path: string
  body: string
  author: Author
}

interface Author {
  lang: string
  status: number
  admin: boolean
  username: string
  name: string
  createdAt: string
}
