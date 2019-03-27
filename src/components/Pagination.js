import React from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import getArticles from '../actions/GetArticles';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

  }

  componentWillMount() {

  }

  handleClick(i) {
    getArticles(this.props.url, i);
  }

  show() {
    if (this.props.code === 200) {
      let url = this.props.url;
      let currentPage = this.props.articles.current_page;
      let lastPage = this.props.articles.last_page;
      let result = [];

      if (lastPage === 1) {
        return (<p>没有更多数据咯</p>);
      }
      if (currentPage < 10 || lastPage < 10) {
        if (lastPage < 10) {
          for (let i = 1; i <= lastPage; i++) {
            result.push(<Item key={i} currentPage={currentPage} value={i} url={url} />);
          }
        } else {
          for (let i = 1; i <= 10; i++) {
            result.push(<Item key={i} currentPage={currentPage} value={i} url={url} />);
          }
        }

        if (currentPage !== 1) {
          return (
            <ul className="pagination">
              <li><Link to={{ pathname: url + "?page=" + 1 }} >第一页</Link></li>
              <li>
                <Link to={{ pathname: url + "?page=" + (currentPage - 1) }} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {result}
              <li>
                <Link to={{ pathname: url + "?page=" + (currentPage + 1) }} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
              <li><Link to={{ pathname: url + "?page=" + lastPage }} >尾页</Link></li>
            </ul>
          );
        } else {
          return (
            <ul className="pagination">
              {result}
              <li>
                <Link to={{ pathname: url + "?page=" + (currentPage + 1) }} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
              <li><Link to={{ pathname: url + "?page=" + lastPage }} >尾页</Link></li>
            </ul>
          );
        }
      } else {
        if (lastPage - currentPage > 4) {
          let last = currentPage + 4;
          for (let i = currentPage - 5; i <= last; i++) {
            result.push(<Item key={i} currentPage={currentPage} value={i} url={url} />);
          }
        } else if (lastPage - currentPage === 0) {
          for (let i = lastPage - 10; i <= lastPage; i++) {
            result.push(<Item key={i} currentPage={currentPage} value={i} url={url} />);
          }
          return (
            <ul className="pagination">
              <li><Link to={{ pathname: url + "?page=" + 1 }} >第一页</Link></li>
              <li>
                <Link to={{ pathname: url + "?page=" + (currentPage - 1) }} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {result}
            </ul>
          );
        } else if (lastPage - currentPage <= 4) {
          let start = 10 - lastPage + currentPage;
          for (let i = currentPage - start; i <= lastPage; i++) {
            result.push(<Item key={i} currentPage={currentPage} value={i} url={url} />);
          }
        }
        return (
          <ul className="pagination">
            <li><Link to={{ pathname: url + "?page=" + 1 }} >第一页</Link></li>
            <li>
              <Link to={{ pathname: url + "?page=" + (currentPage - 1) }} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            {result}
            <li>
              <Link to={{ pathname: url + "?page=" + (currentPage + 1) }} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
            <li><Link to={{ pathname: url + "?page=" + lastPage }} >尾页</Link></li>
          </ul>
        );
      }
    } else {

    }
  }

  render() {
    return (
      <nav aria-label="Page navigation">{this.show()}</nav>
    );
  }
}

const Item = ({ url, currentPage, value }) => (
  <li className={currentPage === value ? "active" : ""}>
    <Link to={{ pathname: url + "?page=" + value }} >{value}</Link>
  </li>
)

Item.propTypes = {
  // onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export { Pagination }
