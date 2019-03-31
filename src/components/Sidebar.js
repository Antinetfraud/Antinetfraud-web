import React from 'react';
import { Link } from 'react-router-dom'
import autoBind from 'react-autobind';
import axios from 'axios';
import { Spinner } from './Spinner.js';
import { img } from '../functions/img.js';
import { api } from '../functions/api.js';
import '../css/sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      articles: {}, code: '404', notices: {}, nCode: '404',
    };
  };

  componentWillMount() {
    this.getDate();
  };

  getDate() {
    axios.get(api('article/hot'))
      .then((response) => {
        this.setState({ articles: response.data.articles });
        this.setState({ code: response.data.code });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get(api('notice/all'))
      .then((response) => {
        this.setState({ notices: response.data.notices });
        this.setState({ nCode: response.data.code });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showNoticeList() {
    if (this.state.nCode === '404') {
      return (<Spinner />);
    } else {
      let result = [];
      let notices = this.state.notices.data
      notices.map(notice => result.push((
        <Link to={"/notice/show/" + notice.id} key={notice.id}>
          <li>{notice.title}</li>
        </Link>
      )))
      return (<ul style={{ paddingLeft: '10px' }}>{result}</ul>);
    }
  }

  showHotList() {
    if (this.state.code === '404') {
      return (<Spinner />);
    } else {
      let result = [];
      let articles = this.state.articles.data
      articles.map(
        article => result.push(this.renderHotList(article))
      )
      return (<div>{result}</div>);
    }
  };

  renderHotList(article) {
    return (
      <Link to={"/article/show/" + article.id} key={article.id}>
        <div className="hot-item" >
          <div className="col-md-4">
            <img src={img(article.image)}alt={article.title}/>
          </div>
          <div className="col-md-8">
            <p className="title">{article.title}</p>
            <p className="subhead">{article.tag_name}</p>
            <p className="subhead">{article.created_at}</p>
          </div>
        </div>
      </Link>
    );
  };

  render() {
    return (
      <aside className="col-md-4 hidden-sm hidden-xs" id="sidebar">
        <div className="panel panel-default">
          <div className="panel-heading">网站公告</div>
          <div className="panel-body">
            {this.showNoticeList()}
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">热点案例</div>
          <div className="panel-body hot-list">
            {this.showHotList()}
          </div>
        </div>
      </aside>
    );
  };
}

export { Sidebar }
