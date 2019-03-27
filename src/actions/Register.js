import axios from 'axios';
import { api } from '../functions/api';
import { setArticles, setCode, setUrl } from './index';
import { store } from '../reducers';

export default function register (body) {  
  const success = (response) => {
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
        store.dispatch(setCode(100));
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        let result = await axios.post(api('auth/register'), body)
        return success(result)
      } catch (err) {
        return fail(err)
      }
  }
}

