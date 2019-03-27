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
      let length = this.state.notices.data.length;
      for (let i = 0; i < length; i++) {
        result.push(this.renderNoticeList(i))
      }
      return (<ul style={{ paddingLeft: '10px' }}>{result}</ul>);
    }
  }

  renderNoticeList(i) {
    return (
      <Link to={"/notice/show/" + this.state.notices.data[i].id} key={this.state.notices.data[i].id}>
        <li>{this.state.notices.data[i].title}</li>
      </Link>
    );
  };

  showHotList() {
    if (this.state.code === '404') {
      return (<Spinner />);
    } else {
      let result = [];
      for (let i = 0; i < 4; i++) {
        result.push(this.renderHotList(i))
      }
      return (<div>{result}</div>);
    }
  };

  renderHotList(i) {
    return (
      <Link to={"/article/show/" + this.state.articles.data[i].id} key={this.state.articles.data[i].id}>
        <div className="hot-item" >
          <div className="col-md-4">
            <img src={img(this.state.articles.data[i].image)}
              alt={this.state.articles.data[i].title}
            />
          </div>
          <div className="col-md-8">
            <p className="title">{this.state.articles.data[i].title}</p>
            <p className="subhead">{this.state.articles.data[i].tag_name}</p>
            <p className="subhead">{this.state.articles.data[i].created_at}</p>
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
