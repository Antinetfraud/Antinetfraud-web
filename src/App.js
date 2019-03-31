import React from 'react';
import './css/style.css';
import './css/bootstrap.css';
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'

import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';

import { Home } from './page/article/Home.js';
import { ShowByTag } from './page/article/ShowByTag.js';
import { Search } from './page/article/Search.js';
import { Contribution } from './page/Contribution.js';
import { Show as ArticleShow } from './page/article/Show.js';
import { Notice } from './page/Notice.js';

import { Login } from './page/auth/Login.js';
import { Register } from './page/auth/Register.js';
import { Home as Auth } from './page/auth/Home.js';
import { Info } from './page/auth/Info.js';
import { Collection } from './page/auth/Collection.js';
import { History } from './page/auth/History.js';
import { Video } from './page/Video.js';
import { Question } from './page/Question.js';



const Main = () => (
  <Router>
    <div>
      <Navbar />
      <div className="container" style={{ minHeight: '500px' }}>
        <Route path="/article/all/" component={Home} />
		    <Route path="/article/tag/:id" component={ShowByTag} />
		    <Route path="/index.html" component={Home} />
		    <Route exact path="/" component={Home} />
        <Route path="/article/show/:id" component={ArticleShow} />
        <Route path="/article/search/:keywords" component={Search} />

        <Route path="/video" component={Video} />
        <Route path="/question" component={Question} />
        <Route path="/notice/show/:id" component={Notice} />
        <Route path="/contribution" component={Contribution} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/auth/info" component={Info} />
        <Route path="/auth/collection" component={Collection} />
        <Route path="/auth/history" component={History} />
        <Route path="/auth/home" component={Auth} />
      </div>
      <Footer />
    </div>
  </Router >
)
export default Main
