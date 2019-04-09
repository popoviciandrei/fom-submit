import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import CompanyList from './components/CompanyList';
import CompanyNew from './components/CompanyNew';
// import SongList from './components/SongList';
// import SongCreate from './components/SongCreate';
// import SongDetail from './components/SongDetail';

// const client = new ApolloClient({
//   dataIdFromObject: o => o.id
// });


const Root = () => {
  return (

    <HashRouter>
      <div className="container">
        <Switch>
          <Route exact path='/' component={CompanyList} />
          <Route path='/company/new' component={CompanyNew} />
        </Switch>
      </div>
    </HashRouter>

  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
