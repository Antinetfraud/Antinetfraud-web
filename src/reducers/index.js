import { createStore } from 'redux'

let init = { articles: {}, title: '', url: '', code: 100 }

function counter(state = init, action) {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.url }
    case 'SET_CODE':
      return { ...state, code: action.code }
    case 'SET_ARTICLES':
      return { ...state, code: action.code, articles: action.articles, title: action.title }
    default:
      return state
  }
}

let store = createStore(counter);

store.subscribe(() =>
  console.log(store.getState())
)

const getArticles = () => {
  return store.getState().articles;
}

// const getTitle = () =>{
//     return store.getState().title;
// }

const getCode = () => {
  return store.getState().code;
}

const getUrl = () => {
  return store.getState().url;
}

export { store, getArticles, getCode, getUrl };
