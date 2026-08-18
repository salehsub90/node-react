import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddlware } from 'redux';

import App from './components/App';

const store = createStore(() => [], {}, applyMiddlware());

ReactDom.render(
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root'));