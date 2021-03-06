import frontMatter from 'front-matter'
import moment from 'moment'

import slugify from 'helpers/slugify'

const webpackMarkdownLoader = require.context('!raw-loader!./posts/', true, /\.md$/)
const readFilename = filename => {
  const text = webpackMarkdownLoader(filename)
  const { attributes, body } = frontMatter(text)
  const blogType = filename.startsWith('./official_news') ? 'official-news' : 'community-articles'

  return {
    attributes: {
      ...attributes,
      date: moment(attributes.date),
      slugifiedTitle: slugify(attributes.title),
      type: blogType,
    },
    body,
  }
}

export default webpackMarkdownLoader
  .keys()
  .map(filename => readFilename(filename))
  .sort((a, b) => b.attributes.date - a.attributes.date)
