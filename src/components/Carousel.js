import React from 'react';
import { img } from '../functions/img'

const Carousel = () => (
  <div>
    <div id="myCarousel" className="carousel slide slide-height">
      {/* 轮播（Carousel）指标 */}
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      {/* 轮播（Carousel）项目 */}
      <div className="carousel-inner slide-height">
        <div className="item active">
          <img src={img('/images/static/carousel1.png')} alt="First slide" />
        </div>
        <div className="item">
          <img src={img('/images/static/carousel2.jpg')} alt="Second slide" />
        </div>
        <div className="item">
          <img src={img('/images/static/carousel1.png')} alt="Third slide" />
        </div>
      </div>
      {/* 轮播（Carousel）导航 */}
      <a className="carousel-control left" href="#myCarousel"
        data-slide="prev"><span className="rsaquo">&lsaquo;</span></a>
      <a className="carousel-control right" href="#myCarousel"
        data-slide="next"><span className="rsaquo">&rsaquo;</span></a>
    </div>

    <article className="panel panel-default panel-no-radius">
      <div className="panel-body">
        <h4 style={{ color: '#666' }}>
          <b style={{ color: '#50bff3' }}>【社会热点】</b>
          提防日益增多的诈骗!
        </h4>

        <p className="">
          随着时代发展,诈骗形式日益趋多,
          受骗人数不断上升,尽管在政府的遏制下有所成效，
          但每天仍有多数群众遭受蒙骗,不仅财产蒙受损失。
          更是身心俱疲。希望本站能为大众提供帮助。
        </p>
      </div>
    </article>
  </div>
)
export { Carousel }
