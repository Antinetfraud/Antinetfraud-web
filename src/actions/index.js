
export const setArticles = (articles, title) => {
  return {
    type: 'SET_ARTICLES',
    code: 200,
    articles,
    title
  }
}

export const setCode = code => {
  return {
    type: 'SET_CODE',
    code
  }
}

export const setUrl = url => {
  return {
    type: 'SET_URL',
    url
  }
}
