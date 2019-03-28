import React from 'react';
import autoBind from 'react-autobind';
import { Sidebar } from '../../components/Sidebar'
import { store } from '../../reducers';
import getArticles from '../../actions/GetArticles';
import VisibleArticleList from '../../containers/VisibleArticleList.js';

class ShowByTag extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      url: window.location.pathname
    };
  }

  getParams(url, name) {
    if (url.indexOf('?') !== -1) {
      let str = url.substr(url.indexOf('?') + 1);
      let strs = str.split("&");
      let result = null
      for (var i = 0; i < strs.length; i++) {
        if (strs[i].split("=")[0] === name) {
          result = strs[i].split("=")[1];
          break;
        }
      }
      return result;
    } else {
      return null
    }
  }

  componentWillMount() {
    let url = window.location.href;
    let page = this.getParams(url, 'page');
    if (page === null) {
      getArticles('/article/tag/' + this.props.match.params.id)();
    } else {
      getArticles('/article/tag/' + this.props.match.params.id, page)();
    }
  }

  componentWillReceiveProps(nextProps) {
    //监听路由变化，如果路由和原来的url不一样，手动获取数据，并更新url
    let url = nextProps.location.pathname + nextProps.location.search;
    if (this.state.url !== url) {
      let page = this.getParams(url, 'page');
      let path = nextProps.location.pathname;
      if (url.indexOf('?') !== -1) {
        path = url.substr(0, url.indexOf('?'));
      }
      if (page === null) {
        getArticles(path)();
      } else {
        getArticles(path, page)();
      }
      this.setState({ url: url });
    }

  }

  componentDidMount() { }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <VisibleArticleList store={store} />
        </div>
        <Sidebar />
      </div >
    );
  }
}

export { ShowByTag }
