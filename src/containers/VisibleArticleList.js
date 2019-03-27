import { connect } from 'react-redux'
import { List as ArticleList } from '../components/article/List'

const mapStateToProps = state => {
  return {
    articles: state.articles,
    code: state.code,
    url: state.url,
    title: state.title,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onTodoClick: (url,page) => {
//       dispatch(toggleTodo(page))
//     }
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
  }
}

const VisibleArticleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList)

export default VisibleArticleList
