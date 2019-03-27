import React from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { api } from '../../functions/api.js';
import { auth, checkLogin } from '../../functions/auth.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    // Set up initial state
    this.state = {
      isLogin: false,
    };
    auth(this)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  postAction(e) {
    //阻止表单提交事件
    e.preventDefault()
    axios.post(api('auth/register'), {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.password_confirmation.value,
    }).then((response) => {
      if (response.data.code === 200) {
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("token", response.data.user.token);
        // alert("注册成功,用户激活邮件已发到注册邮箱");
        //正确完成后路由跳转
        window.location.href = "/login";
      } else {
        alert(response.data.error);
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

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>用户注册</h4>
          {checkLogin(this)}
          <div className="panel panel-default">
            <div className="panel-body form-margin">
              <form onSubmit={this.postAction}>
                <div className="form-group">
                  <label htmlFor="name" className="control-label">用户名</label>
                  <input name="name" type="text" className="form-control" ref="name" required="required" maxLength="10" />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="control-label">邮箱</label>
                  <input name="email" type="email" className="form-control" ref="email" required="required" />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="control-label">密码</label>
                  <input name="password" type="password" className="form-control" ref="password" required="required" minLength="6" maxLength="16" />
                </div>

                <div className="form-group">
                  <label htmlFor="password_confirmation" className="control-label">确认密码</label>
                  <input name="password_confirmation" type="password" className="form-control" ref="password_confirmation" required="required" minLength="6" maxLength="16" />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">注册</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Register }
