import * as fs from 'fs'
import * as path from 'path'
import remark from 'remark'
import vfile from 'to-vfile'
import toc from 'remark-toc'
import { Node, Parent } from 'unist'
import { Post } from 'shared/types'

export default function indexPosts(directory: string): Map<string, Post> {
  return new Map(fs.readdirSync(directory).map((fileName) => {
    if (!fileName.endsWith('.md')) {
      return
    }

    const file = vfile.readSync(path.resolve(directory, fileName))

    const children = remark().parse(file).children as Node[]
    const titleNode = children.find((node) => node.type === 'heading' && node.depth === 1) as Parent
    const title = titleNode.children[0].value as string

    // Add Table of Contents (ToC)
    const postprocessedContent = remark().use(toc).processSync(file)

    return [fileName, {
      title: title,
      content: postprocessedContent.contents as string,
      toc: [],
      keywords: []
    }]
  }))
}