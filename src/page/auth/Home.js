import React from 'react';
import autoBind from 'react-autobind';
import { auth } from '../../functions/auth.js';
import { AuthSidebar } from '../../components/AuthSidebar.js';

class Home extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		// Set up initial state
		this.state = {
			islogin: false,
		};
		auth(this);
	}

	componentWillMount() {
		let width = document.documentElement.clientWidth;
		if (width > 768) {
			window.location.href = "/auth/info";
		}
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="row">
				<div className="col-md-12 col-sm-12 hidden-md hidden-l">
					<AuthSidebar />
				</div>
			</div>
		);
	}
}

export { Home }
