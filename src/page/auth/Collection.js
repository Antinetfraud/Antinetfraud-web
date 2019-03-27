import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import axios from 'axios';
import { Spinner } from '../../components/Spinner.js';
import { AuthSidebar } from '../../components/AuthSidebar.js';
import { api } from '../../functions/api.js';
import { img } from '../../functions/img.js';
import { getAuth, auth } from '../../functions/auth.js';

class Collection extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		// Set up initial state
		this.state = {
			islogin: false, collections: {}, code: 100
		};
		auth(this);
	}

	componentWillMount() {
		this.getUserCollection()
	}

	componentDidMount() {

	}

	getUserCollection() {
		let auth = getAuth('auth/collection');
		axios.get(api('auth/collection'), {
			params: {
				id: auth.id,
				sign: auth.sign,
				timestamp: auth.timestamp,
			}
		}).then((response) => {
			if (response.data.code === 200) {
				this.setState({ collections: response.data.collections })
				this.setState({ code: 200 })
			} else if (response.data.code === 401) {
				window.location.href = "/login";
			} else if (response.data.code === 404) {
				this.setState({ code: 404 })
			} else {
				console.log(response.data);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	showCollection() {
		if (this.state.code === 100) {
			return (<Spinner />);
		} else if (this.state.code === 404) {
			return (<h3>没有数据</h3>);
		} else {
			let result = this.state.collections.data.map((collection) => {
				return (
					<Link to={"/article/show/" + collection.article_id} key={collection.id}>
						<div className="panel-body auth-article-list" >
							<div className="col-md-4 col-sm-4 col-xs-4">
								<img src={img(collection.image)}
									alt={collection.title}
								/>
							</div>
							<div className="col-md-8 col-sm-8 col-xs-8">
								<p className="title">{collection.title}</p>
								<p className="subhead">{collection.tag}</p>
								<p className="subhead">{collection.created_at}</p>
							</div>
						</div>
					</Link>
				);
			})
			return (<div>{result}</div>);
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-3 col-sm-12 hidden-sm hidden-xs">
					<AuthSidebar />
				</div>
				<div className="col-md-8">
					<div className="panel panel-default">
						<div className="panel-heading">个人收藏</div>
						<div className="panel-body">
							{this.showCollection()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { Collection }
