import React from 'react';
import autoBind from 'react-autobind';
import { Carousel } from '../../components/Carousel.js';
import { store } from '../../reducers';
import getArticles from '../../actions/GetArticles';
import { getParams } from '../../functions/getParams';
import { Sidebar } from '../../components/Sidebar'
import VisibleArticleList from '../../containers/VisibleArticleList.js';

//首页，文章按发布时间排序
class Home extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    // Set up initial state
    this.state = {
      url: '/article/all'
    };

  }

  componentWillMount() {
    let url = window.location.href;
    let page = getParams(url, 'page');
    if (page === null) {
      getArticles('/article/all/')();
    } else {
      getArticles('/article/all/', page)();
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    //监听路由变化，如果路由和原来的url不一样，手动获取数据，并更新url
    let url = nextProps.location.pathname + nextProps.location.search;
    if (url === '/') {

    } else if (this.state.url !== url) {
      let page = getParams(url, 'page');
      let path = nextProps.location.pathname;

      if (url.indexOf('?') !== -1) {
        path = url.substr(0, url.indexOf('?'));
      }

      if (path === "/article/all/") {
        if (page === null) {
          getArticles("/article/all/")();
        } else {
          getArticles("/article/all/", page)();
        }
        this.setState({ url: url });
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <Carousel />
          <VisibleArticleList store={store} />
        </div>
        <Sidebar />
      </div>
    );
  }
}

export { Home }
