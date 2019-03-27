import React from 'react';
import '../css/footer.css';
import { img } from '../functions/img.js';

const Footer = () => (
  <footer className="hidden-sm hidden-xs">
    <div>
      <div className="footer-app">
        <h2>希望每天能够阅读到我们的文章吗?</h2>
        <button className="footer-button" data-toggle="modal" data-target=".bs-example-modal-sm">
          点击这里!
        </button>
      </div>
    </div>

    <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content text-center">
          <h4 className="modal-title">关注微信公众号，获取最新资讯</h4>
          <img src={img("/images/static/weixin.png")} alt="weixin" />
        </div>
      </div>
    </div>

    <div className="container">
      <div className="container footer-link">
        <div className="row">
          <div className="col-md-4">
            <p>友情链接</p>
            <a href="http://news.sina.com.cn/">新浪新闻</a>
            <a href="http://news.qq.com/">腾讯新闻</a>
            <a href="http://news.163.com/">网易新闻</a>
          </div>
          <div className="col-md-4">
            <p>版权所有</p>
            <a>&copy;2016 网络诈骗防范科普网</a>
          </div>
          <div className="col-md-4">
            <p>联系我们</p>
            <a>antinetfraud@163.com</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)
export { Footer }
