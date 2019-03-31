import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import {
  Modal,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { auth, getAuth } from '../functions/auth.js';
import { api } from '../functions/api.js';
import { img } from '../functions/img.js';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { isOpen: false, islogin: false, username: localStorage.getItem("name") };
    auth(this);
  };

  /**
   * 在平板尺寸一下，每次路由变化的时候，把navbar的状态由打开设置为收起。
   * @param {*} nextProps 
   */
  componentWillReceiveProps(nextProps) {
    let width = document.documentElement.clientWidth;
    if (width < 768) {
      //react是数据驱动的框架，不推荐直接操作dom。
      //直接操作dom虽然可以实现功能，不过不利于维护。
      //不过先修复这个页面跳转navbar不收回的bug先，剩下的优化以后有空再说
      document.getElementById("bs-example-navbar-collapse-1").className = "collapse navbar-collapse";

    }
  }

  // 打开搜索栏
  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  // 关闭搜索栏
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  search = () => {
    let keyword = document.getElementById('keyword').value;
    let reg = RegExp(/[/#\\]+/);
    if (keyword === '') {
      alert('内容不能为空');
    } else if (reg.test(keyword)) {
      alert('非法字符串');
    } else {
      this.hideModal()
      window.location.href = '/article/search/' + keyword;
    }

  };

  logout() {
    let auth = getAuth('auth/logout');
    axios.post(api('auth/logout'), {
      id: auth.id,
      sign: auth.sign,
      timestamp: auth.timestamp,
    }).then((response) => {
      if (response.data.code === 200) {
        localStorage.clear();
        this.setState({ islogin: false })
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      } else {
        alert(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  renderLogin() {
    if (this.state.islogin) {
      return (
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" role="button">
            {this.state.username}<span className="caret"></span>
          </a>
          <ul className="dropdown-menu" role="menu">
            <li><Link to="/auth/home">个人中心</Link></li>
            <li><a onClick={this.logout}>退出登录</a></li>
          </ul>
        </li>
      );
    } else {
      return (
        <li><Link to="/login">登录</Link></li>
      );
    }
  }

  renderRegister() {
    if (this.state.islogin) {

    } else {
      return (
        <li><Link to="/register">注册</Link></li>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-no-radius">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle Navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand theme-color" href="/">
                <img src={img('/images/static/logo.png')}
                  className="logo" alt="logo" />
                网络诈骗防范科普网
              </a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              <ul className="nav navbar-nav">

              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">首页</Link></li>
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" role="button">
                    案例库<span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li><Link to="/article/tag/1">网络诈骗</Link></li>
                    <li><Link to="/article/tag/2">电信诈骗</Link></li>
                    <li><Link to="/article/tag/3">防范贴士</Link></li>
                  </ul>
                </li>

                <li><Link to="/">科普答题</Link></li>
                <li><Link to="/video">科普视频</Link></li>
                <li><Link to="/contribution">分享经历</Link></li>
                <li><Link to="/notice/show/1">关于我们</Link></li>
                <li><Link to="#" onClick={this.openModal}>搜索</Link></li>
                {this.renderLogin()}
                {this.renderRegister()}
              </ul>
            </div>
          </div>
        </nav>

        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />搜索文章
          </ModalHeader>
          <ModalBody>
            <input name="keyword" id="keyword" className="form-control" />
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>关闭</button>
            <button className='btn btn-primary' onClick={this.search}>搜索</button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export { Navbar }
