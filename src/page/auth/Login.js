import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import axios from 'axios';
import { api } from '../../functions/api.js';
import { auth, checkLogin } from '../../functions/auth.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      islogin: false,
      needEmailCode: false,
    };
    auth(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  sendVerifyEmailAction() {
    if (this.refs.email.value === '') {
      alert('邮箱不能为空');
      return false;
    }
    if (this.refs.name.value === '') {
      alert('用户名不能为空');
      return false;
    }
    axios.post(api('auth/email/verify'), {
      email: this.refs.email.value,
      name: this.refs.name.value,
    }).then((response) => {
      if (response.data.code === 200) {
        alert('邮件发送成功');
      } else {
        alert(response.data.message);
      }
    }).catch((error) => {
      let errorMsg = '';
      errorMsg += error.response.data.message + '\n';
      Object.keys(error.response.data.errors).forEach((key) => {
        errorMsg += error.response.data.errors[key] + '\n';
      });
      alert(errorMsg);
      console.log(error);
    });
  }

  loginAction(e) {
    //阻止表单提交事件
    e.preventDefault()
    let body = {};
    if (this.state.needEmailCode) {
      body = {
        name: this.refs.name.value,
        password: this.refs.password.value,
        mail_code: this.refs.mail_code.value,
      };
    } else {
      body = {
        name: this.refs.name.value,
        password: this.refs.password.value,
        mail_code: '',
      };
    }
    axios.post(api('auth/login'), body).then((response) => {
      if (response.data.code === 200) {
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("token", response.data.user.token);
        alert("登录成功");
        //正确完成后路由跳转
        window.location.href = "/";
      } else if (response.data.code === 402) {
        alert("该用户邮箱没激活");
        window.location.href = "/auth/email/activate";
      } else if (response.data.code === 403) {
        alert(response.data.message);
        this.setState({ needEmailCode: true });
      } else {
        alert(response.data.message);
      }
    }).catch((error) => {
      let errorMsg = '';
      errorMsg += error.response.data.message + '\n';
      Object.keys(error.response.data.errors).forEach((key) => {
        errorMsg += error.response.data.errors[key] + '\n';
      });
      alert(errorMsg);
      console.log(error);
    });
    return false;
  }

  renderEmailCodeInput() {
    if (this.state.needEmailCode) {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="email" className="control-label">邮箱</label>
            <input name="email" type="email" className="form-control" ref="email" />
          </div>

          <div className="form-group">
            <label htmlFor="mail_code" className="control-label">邮箱验证码</label>
            <input name="mail_code" type="text" className="form-control" ref="mail_code" />
          </div>

          <div className="form-group">
            <button type="button" className="btn btn-primary btn-col-s-12" onClick={this.sendVerifyEmailAction}>
              发送邮件验证码
            </button>
          </div>
        </div>
      );
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div className="row">
        {checkLogin(this)}
        <div className="col-md-6 col-md-offset-3">
          <h4>用户登录</h4>

          <div className="panel panel-default">
            <div className="panel-body form-margin">
              <form onSubmit={this.loginAction}>
                <div className="form-group">
                  <label htmlFor="name" className="control-label">用户名</label>
                  <input name="name" type="text" className="form-control" ref="name" required="required" />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="control-label">密码</label>
                  <input name="password" type="password" className="form-control" ref="password" required="required" />
                </div>

                {this.renderEmailCodeInput()}

                <div className="form-group">
                  <div>
                    <button type="submit" className="btn btn-success btn-col-s-12">登录账号</button>
                  </div>
                </div>

                <div className="form-group">
                  <p><Link to="/register">没有账号？注册一个</Link></p>
                  <p><Link to="/password/email">忘记密码？</Link></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Login }
