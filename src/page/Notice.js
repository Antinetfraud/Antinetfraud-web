import React from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { Spinner } from '../components/Spinner.js';
import { api } from '../functions/api.js';
import '../css/article.css';

class Notice extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      notice: {}, code: 404,
    };

  }

  componentWillMount() {
    this.getDate();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getDate() {
    axios.get(api("notice/show/" + this.props.match.params.id))
      .then((response) => {
        if (response.data.code === 200) {
          this.setState({ notice: response.data.notice });
          this.setState({ code: 200 });
        }
      }).catch((error) => {
        alert(error);
      });
  }

  showData() {
    if (this.state.code === 404) {
      return (<Spinner />);
    } else {
      return this.showNotice();
    }
  }

  showNotice() {
    return (
      <div className="panel article" style={{ minHeight: '600px' }}>
        <h2 className="text-center">{this.state.notice.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.state.notice.content }}></div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          {this.showData()}
        </div>
      </div>
    );
  }
}


export { Notice }
