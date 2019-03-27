import axios from 'axios';
import { api } from '../functions/api';
import { setArticles, setCode, setUrl } from './index';
import { store } from '../reducers';

export default function getArticles (url, page = 1) {  
  const success = (response) => {
    if (response.data.code === 200) {
        store.dispatch(setArticles(response.data.articles, response.data.title));
        store.dispatch(setUrl(url));
    } else {
        store.dispatch(setCode(404));
    }
  }

  const fail = (err) => {
    console.log(err);
  }

  return async dispatch => {
    console.log('get_article')
    try {
      store.dispatch(setCode(100));
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      let result = await axios.get(api(url), { params: { page: page } })
      return success(result)
    } catch (err) {
      return fail(err)
    }
  }
}
