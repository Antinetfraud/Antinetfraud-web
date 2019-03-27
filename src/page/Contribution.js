import React from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { api } from '../functions/api.js';

class Contribution extends React.Component {

  constructor() {
    super();
    autoBind(this);
  }

  contribution (body) {  
    const success = (response) => {
      if (response.status === 200) {
        if (response.data.code === 200) {
          alert("提交成功");
          //正确完成后路由跳转
          window.location.href = "/";
        } else {
          alert(response.data.error);
        }
      } else if (response.status === 422) {
        alert(response);
      }
    }
  
    const fail = (error) => {
      let errorMsg = '';
      errorMsg += error.response.data.message + '\n';
      Object.keys(error.response.data.errors).forEach((key) => {
        errorMsg += error.response.data.errors[key] + '\n';
      });
      alert(errorMsg);
      console.log(error);
    }
  
    return async dispatch => {
        try {
          let result = await axios.post(api('contribution'), body)
          return success(result)
        } catch (err) {
          return fail(err)
        }
    }
  }

  postAction(e) {
    //阻止表单提交事件
    e.preventDefault()
    let body = {
      title: this.refs.title.value,
      type: this.refs.type.value,
      content: this.refs.content.value
    }
    this.contribution(body)
    return false;
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h4>分享经历</h4>

          <div className="panel panel-default">
            <div className="panel-body form-margin">
              <form onSubmit={this.postAction}>
                <div className="form-group">
                  <label htmlFor="title" className="control-label">标题</label>
                  <input name="title" type="text" className="form-control" ref="title" required="required" />
                </div>

                <div className="form-group">
                  <label htmlFor="type" className="control-label">诈骗类型</label>
                  <select className="form-control" name="type" ref="type">
                    <option value="1">电信诈骗</option>
                    <option value="2">网络诈骗</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="content" className="control-label">内容</label>
                  <textarea className="form-control"
                    name="content"
                    ref="content"
                    style={{ height: '350px' }}
                    required="required">
                  </textarea>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-success">
                    分享经历
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export { Contribution }
