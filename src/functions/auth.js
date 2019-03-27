import md5 from 'md5';
import axios from 'axios';
import { api } from './api.js';

function auth(_this) {
  let auth = getAuth('auth/state');
  if (auth == null) {
    return 0;
  } else {
    axios.get(api('auth/state'), {
      params: {
        id: auth.id,
        sign: auth.sign,
        timestamp: auth.timestamp,
      }
    }).then((response) => {
      if (response.data.code === 200) {
        _this.setState({ islogin: true });
      } else if (response.data.code === 401) {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        alert("身份凭证已过期");
        window.location.href = "/login";
      } else {
        console.log(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

}

function getAuth(api) {
  let auth = {};
  let id = localStorage.getItem('id');
  if (id === null) {
    auth = null;
    return auth
  } else {
    let token = localStorage.getItem('token');
    let timestamp = Date.parse(new Date());
    let sign = md5(token + timestamp + api);
    auth.id = id;
    auth.sign = sign;
    auth.timestamp = timestamp;
    return auth;
  }
}

function checkLogin(_this) {
  if (_this.state.islogin) {
    window.location.href = "/";
  }
}

export { auth, getAuth, checkLogin }