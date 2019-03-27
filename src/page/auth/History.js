import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import axios from 'axios';
import { Spinner } from '../../components/Spinner.js';
import { AuthSidebar } from '../../components/AuthSidebar.js';
import { api } from '../../functions/api.js';
import { img } from '../../functions/img.js';
import { getAuth, auth } from '../../functions/auth.js';

class History extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		// Set up initial state
		this.state = {
			islogin: false, histories: {}, code: 100
		};
		auth(this);
	}

	componentWillMount() {
		this.getUserHistory();
	}

	componentDidMount() {

	}

	getUserHistory() {
		let auth = getAuth('auth/history');
		axios.get(api('auth/history'), {
			params: {
				id: auth.id,
				sign: auth.sign,
				timestamp: auth.timestamp,
			}
		}).then((response) => {
			if (response.data.code === 200) {
				this.setState({ histories: response.data.histories })
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

	showhistories() {
		if (this.state.code === 100) {
			return (<Spinner />);
		} else if (this.state.code === 404) {
			return (<h3>没有数据</h3>);
		} else if (this.state.code === 200) {
			let result = this.state.histories.data.map((history) => {
				return (
					<Link to={"/article/show/" + history.article_id} key={history.id}>
						<div className="panel-body auth-article-list" >
							<div className="col-md-4 col-sm-4 col-xs-4">
								<img src={img(history.image)}
									alt={history.title}
								/>
							</div>
							<div className="col-md-8 col-sm-8 col-xs-8">
								<p className="title">{history.title}</p>
								<p className="subhead">{history.tag}</p>
								<p className="subhead">{history.updated_at}</p>
							</div>
						</div>
					</Link>
				);
			})
			return (<div>{result}</div>);
		}
	};

	render() {
		return (
			<div className="row">
				<div className="col-md-3 col-sm-12 hidden-sm hidden-xs">
					<AuthSidebar />
				</div>
				<div className="col-md-8">
					<div className="panel panel-default">
						<div className="panel-heading">浏览历史</div>
						<div className="panel-body">
							{this.showhistories()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { History }
