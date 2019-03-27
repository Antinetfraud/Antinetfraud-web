import React from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom'
import { img } from '../../functions/img'
import { Spinner } from '../Spinner';
import { DataNotFound } from '../DataNotFound';
import { store } from '../../reducers';
import VisiblePagination from '../../containers/VisiblePagination.js';

class List extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  show() {
    if (this.props.code === 100) {
      return (<Spinner />);
    } else if (this.props.code === 200) {
      return (
        <div>
          <h4>{this.props.title}</h4>
          {this.props.articles.data.map(article => (
            <Item key={article.id} article={article} />))}
        </div>
      );

    } else {
      return (<DataNotFound />);
    }
  }

  render() {
    return (
      <div>
        {this.show()}
        <VisiblePagination store={store} />
      </div>
    );
  }
}

const Item = ({ article }) => (
  <Link to={"/article/show/" + article.id}>
    <div className="panel panel-default panel-no-radius">
      <div className="panel-body article-list">
        <div className="col-md-4 col-sm-4 col-xs-6">
          <img src={img(article.image)} alt={article.title} />
        </div>
        <div className="col-md-8 col-sm-8 col-xs-6">
          <p className="title">{article.title}</p>
          <p>{article.tag_name}</p>
          <p className="hidden-xs introduction" dangerouslySetInnerHTML={{ __html: article.content }} />

        </div>
      </div>
    </div>
  </Link>
)

export { List }
