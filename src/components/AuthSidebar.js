import React from 'react';
import { Link } from 'react-router-dom';
import '../css/auth.css';

const AuthSidebar = () => (
	<aside className="panel panel-default">
		<div className="panel-heading">个人中心</div>
		<div style={{ width: '100%' }}>
			<img className="auth-avatar" alt="avatar"
				src="https://avatars0.githubusercontent.com/u/30871120?s=460&v=4"
			/>
			<div className="auth-menu">
				<Link to="/auth/info">
					<div className="auth-menu-item">个人信息</div>
				</Link>
				<Link to="/auth/collection">
					<div className="auth-menu-item">个人收藏</div>
				</Link>
				<Link to="/auth/history">
					<div className="auth-menu-item">浏览历史</div>
				</Link>
			</div>
		</div>
	</aside>
)
export { AuthSidebar }
