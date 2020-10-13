import * as fs from 'fs'
import * as path from 'path'
import remark from 'remark'
import vfile from 'to-vfile'
import toc from 'remark-toc'
import { Node, Parent } from 'unist'
import { Post } from '.'

// Link, Emphasis, Strong, Delete, InlineCode, LinkReference,
function getTextFromNode(node: Node): string {
  switch (node.type) {
    // Literals
    case 'text':
    case 'html':
    case 'inlineCode':
      return node.value as string

    // Parents
    case 'emphasis':
    case 'strong':
    case 'delete':
    case 'footnote':
    case 'link':
    case 'linkReference':
    case 'paragraph':
      let result = ''

      for (const child of node.children as Node[]) {
        result += getTextFromNode(child)
      }

      return result
  }
}

function substringByWord(text: string, start: number, end: number) {
  for (let i = end; i < text.length; i++) {
    if (text[i] == ' ') {
      return text.substring(start, i)
    }
  }

  return text.substring(start, end)
}

export default function indexPosts(directory: string): Map<string, Post> {
  return new Map(fs.readdirSync(directory).map((fileName) => {
    if (!fileName.endsWith('.md')) {
      return
    }

    const filePath = path.resolve(directory, fileName)
    const file = vfile.readSync(filePath)

    // Extract the title (first heading node at depth 1 in the document)
    const children = remark().parse(file).children as Node[]
    const titleNode = children.find((node) => node.type === 'heading' && node.depth === 1) as Parent
    const title = titleNode.children[0].value as string

    // Generate shortened content (up to 200 characters of the first paragraph in the document)
    // TODO: Instead of converting to raw text leave as Markdown
    const firstParagrah = getTextFromNode(children.find((node) => node.type === 'paragraph'))
    const shortContent = substringByWord(firstParagrah, 0, 200) + '...'

    // Add Table of Contents (ToC)
    const postprocessedContent = remark().use(toc).processSync(file)

    const date = fs.statSync(filePath).mtime

    return [fileName, {
      title: title,
      content: postprocessedContent.contents as string,
      shortContent,
      // TODO: Store ToC here for search
      toc: [],
      // TODO: Store keywords here for search
      keywords: [],
      date
    }]
  }))
}