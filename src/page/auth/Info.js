import React from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { api } from '../../functions/api.js';
import { getAuth, auth } from '../../functions/auth.js';
import { AuthSidebar } from '../../components/AuthSidebar.js';


class Info extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		// Set up initial state
		this.state = {
			islogin: false, user: {}
		};
		auth(this);
	}

	componentWillMount() {
		this.getUserInfo();
	}

	componentDidMount() {

	}

	getUserInfo() {
		let auth = getAuth('auth/info');
		axios.get(api('auth/info'), {
			params: {
				id: auth.id,
				sign: auth.sign,
				timestamp: auth.timestamp,
			}
		}).then((response) => {
			if (response.data.code === 200) {
				this.setState({ user: response.data.user })
			} else if (response.data.code === 401) {
				window.location.href = "/login";
			} else {
				console.log(response.data);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-3 col-sm-12 hidden-sm hidden-xs">
					<AuthSidebar />
				</div>
				<div className="col-md-8">
					<div className="panel panel-default">
						<div className="panel-heading">个人信息</div>
						<div className="panel-body">
							<div className="">
								<p>id：{this.state.user.id}</p>
								<p>用户名：{this.state.user.name}</p>
								<p>email：{this.state.user.email}</p>
								<p></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { Info }
