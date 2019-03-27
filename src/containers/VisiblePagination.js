import { connect } from 'react-redux'
import { Pagination } from '../components/Pagination'

const mapStateToProps = state => {
  return {
    articles: state.articles,
    code: state.code,
    url: state.url
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

const VisiblePagination = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination)

export default VisiblePagination
