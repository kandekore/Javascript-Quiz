import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || 'https://javascripttest.com/graphql',
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = createRoot(container); 

root.render( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://
