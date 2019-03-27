import React from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Spinner } from '../../components/Spinner.js';
import { DataNotFound } from '../../components/DataNotFound';
import { api } from '../../functions/api.js';
import { auth, getAuth } from '../../functions/auth.js';
import {
  Modal,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import '../../css/article.css';
import '../../css/comment.css';

class Show extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      article: {}, code: '100', comments: null,
      islogin: false, isOpen: false, isThumbUp: false,
      isCollection: false
    };

    auth(this);
  }

  componentWillMount() {
    this.getDate();
    this.checkthumbUp();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  componentDidUpdate() {
    this.createUserHistory();
    this.checkCollection();
  }

  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  // 获取文章内容
  getDate() {
    axios.get(api("/article/show/" + this.props.match.params.id)).then((response) => {
      if (response.data.code === 200) {
        this.setState({ article: response.data.article });
        this.setState({ tag: response.data.tag });
        this.setState({ code: '200' });
        //调用readingAction，阅读量+1
        this.readingAction();
      } else if (response.data.code === 404) {
        this.setState({ code: '404' });
      }

    }).catch((error) => {
      alert(error);
    });

    //获取文章的评论
    axios.get(api("/comment/show/" + this.props.match.params.id)).then((response) => {
      if (response.data.code === 200) {
        this.setState({ comments: response.data.comments });
      } else {
        this.setState({ comments: null });
      }
    }).catch((error) => {
      alert(error);
    });
  }

  // 阅读记录
  readingAction() {
    let id = this.props.match.params.id;
    if (sessionStorage.getItem(id) !== "read") {
      axios.post(api('/article/read/' + id)).then((response) => {
        if (response.data.code === 200) {
          sessionStorage.setItem(id, "read");
        } else {
          console.log(response.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  //记录用户的阅读历史
  createUserHistory() {
    if (this.state.islogin) {
      let article_id = this.props.match.params.id;
      let url = 'auth/article/read';
      let auth = getAuth(url);
      axios.post(api(url), {
        id: auth.id,
        sign: auth.sign,
        timestamp: auth.timestamp,
        article_id: article_id,
      }).then((response) => {
        if (response.data.code === 200) {
          // console.log("readed");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  // 检查sessionStorage有没有点赞过
  checkthumbUp() {
    let thumbUp = "thumbUp" + this.props.match.params.id;
    if (sessionStorage.getItem(thumbUp) === "true") {
      this.setState({ isThumbUp: true });
    } else {
      this.setState({ isThumbUp: false });
    }
  }

  // 点赞
  thumbUpAction() {
    let id = this.props.match.params.id;
    let thumbUp = "thumbUp" + id;
    if (sessionStorage.getItem(thumbUp) !== "true") {
      axios.post(api('/article/praise/' + id)).then((response) => {
        if (response.data.code === 200) {
          sessionStorage.setItem(thumbUp, "true");
          this.setState({ isThumbUp: true });
        } else {
          console.log(response.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  // 评论
  commentAction() {
    let content = document.getElementById('content').value;
    let auth = getAuth('auth/article/comment');
    axios.post(api('auth/article/comment'), {
      id: auth.id,
      sign: auth.sign,
      timestamp: auth.timestamp,
      content: content,
      article_id: this.props.match.params.id,
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 200) {
          this.hideModal();
          alert("评论成功，等待管理员审核");
        } else {
          console.log(response.data);
        }
      } else if (response.status === 422) {
        alert(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  // 检查有没有收藏过
  checkCollection() {
    if (this.state.islogin) {
      let url = 'auth/collection/article/' + this.props.match.params.id;
      let auth = getAuth(url);
      axios.get(api(url), {
        params: {
          id: auth.id,
          sign: auth.sign,
          timestamp: auth.timestamp,
        }
      }).then((response) => {
        if (response.data.code === 200) {
          if (this.state.isCollection !== true) {
            this.setState({ isCollection: true });
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  // 收藏
  collectionAction() {
    let auth = getAuth('auth/article/collection');
    axios.post(api('auth/article/collection'), {
      id: auth.id,
      sign: auth.sign,
      timestamp: auth.timestamp,
      article_id: this.props.match.params.id,
    }).then((response) => {
      if (response.data.code === 200) {
        alert("收藏成功");
        this.setState({ isCollection: true });
      } else {
        console.log(response.data.message);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  // 取消收藏
  cancelCollectionAction() {
    if (this.state.isCollection) {
      let auth = getAuth('auth/article/collection/cancel');
      axios.delete(api('auth/article/collection/cancel'), {
        params: {
          id: auth.id,
          sign: auth.sign,
          timestamp: auth.timestamp,
          article_id: this.props.match.params.id,
        }
      }).then((response) => {
        if (response.data.code === 200) {
          this.setState({ isCollection: false });
        } else {
          console.log(response.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    }

  }

  // 显示文章
  showArticle() {
    if (this.state.code === '100') {
      return (<Spinner />);
    } else if (this.state.code === '200') {
      return this.renderArticle();
    } else if (this.state.code === '404') {
      return (<DataNotFound />);;
    }
  }

  // 渲染文章列表
  renderArticle() {
    return (
      <div className="panel article_play" style={{ minHeight: '600px' }}>
        <div>
          <p style={{ float: 'left', marginRight: '15px' }}>分类：
            <Link to={"/article/tag/" + this.state.article.tag_id}>
              {this.state.tag}
            </Link>
          </p>
          <p>阅读量:{this.state.article.reading}</p>
        </div>
        <h2 className="text-center">{this.state.article.title}</h2>
        <article dangerouslySetInnerHTML={{ __html: this.state.article.content }}></article>
      </div>
    );
  }

  // 显示点赞button
  showThumbUp() {
    if (this.state.code === '200') {
      if (this.state.isThumbUp === true) {
        return (
          <button className="thumbUp roundBtn done">已赞</button>
        );
      } else {
        return (
          <button onClick={this.thumbUpAction} className="roundBtn thumbUp btn-theme">点赞</button>
        );
      }
    }
  }

  // 显示收藏button
  showCollection() {
    if (this.state.code === "200") {
      if (this.state.islogin) {
        if (this.state.isCollection) {
          return (
            <button onClick={this.cancelCollectionAction} className="roundBtn collectionBtn done">已收藏</button>
          );
        } else {
          return (
            <button onClick={this.collectionAction} className="roundBtn collectionBtn btn-theme">收藏</button>
          );
        }

      } else {
        return (
          <div />
        );
      }
    }
  }

  // 显示评论
  showComment() {
    if (this.state.comments === null) {
      return (
        <div style={{ marginBottom: "55px" }}>
          {this.renderCommentButton()}
        </div>
      );
    } else {
      let result = [];

      let length = this.state.comments.data.length;
      for (let i = 0; i < length; i++) {
        result.push(this.renderComment(i))
      }

      return (
        <div>
          {this.renderCommentButton()}
          <h4>最新评论</h4>
          <div className="panel panel-default" style={{ marginTop: '25px' }}>
            {result}
          </div>
        </div>
      );
    }
  }

  // 渲染评论按钮
  renderCommentButton() {
    if (this.state.code === "200") {
      if (this.state.islogin) {
        return (
          <button onClick={this.openModal} className="float-right btn btn-default">评论</button>
        );
      } else {
        return (
          <p className="float-right">你还没登录，不能评论，<Link to="/login">点击登录</Link></p>
        );
      }
    }
  }

  // 渲染评论
  renderComment(i) {
    return (
      <div className="comment" key={this.state.comments.data[i].id}>
        <p>
          <img className="avatar" alt="avatar" src="https://avatars0.githubusercontent.com/u/30871120?s=460&v=4" />
          {this.state.comments.data[i].user_name}:
                </p>
        <p className="content">{this.state.comments.data[i].content}</p>
        {this.renderAuthorReply(this.state.comments.data[i].author_reply)}
        <hr />
      </div>
    );
  }

  // 渲染作者回复
  renderAuthorReply(author_reply) {
    if (author_reply !== null) {
      return (<p>作者回复：{author_reply}</p>);
    }
  }

  // 页面渲染
  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          {this.showArticle()}
          {this.showComment()}
          {this.showThumbUp()}
          {this.showCollection()}
        </div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />评论
          </ModalHeader>
          <ModalBody>
            <textarea name="content" id="content" className="form-control" />
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>关闭</button>
            <button className='btn btn-primary' onClick={this.commentAction}>评论</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export { Show }
