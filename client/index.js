import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import CompanyList from './components/CompanyList';
import CompanyNew from './components/CompanyNew';
// import SongList from './components/SongList';
// import SongCreate from './components/SongCreate';
// import SongDetail from './components/SongDetail';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
})
const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  cache,
  link
});


const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <div className="container">
          <Switch>
            <Route exact path='/' component={CompanyList} />
            <Route path='/company/new' component={CompanyNew} />
          </Switch>
        </div>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
