# react-redux

Use react hooks api instead of official react-redux.

## Usage

```js
import React from 'react';
import Redux from '@yhlben/react-redux';

// reducer
function countReducer(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    default:
      return state;
  }
}

function infoReducer(state = { name: 'name', title: 'title' }, action) {
  switch (action.type) {
    case 'changetitle':
      return {
        ...state,
        title: 'title2'
      };
    default:
      return state;
  }
}

// middlewares
const loggerMiddle = store => next => async action => {
  console.log('old state:', store.getState());
  let result = await next(action);
  console.log('next state:', store.getState());
  return result;
};

const timmerMiddle = store => next => async action => {
  console.log('before exec:', new Date());
  let result = await next(action);
  console.log('end exec:', new Date());
  return result;
};

const { Provider, store } = Redux.createStore(
  Redux.combineReducers({ count: countReducer, info: infoReducer }),
  { count: 0 },
  [loggerMiddle, timmerMiddle]
);

function Home() {
  const clickAction = () => {
    return { type: 'add' };
  };
  const clickActionBind = Redux.bindActionCreators(clickAction, store.dispatch);
  const click = () => {
    clickActionBind();
  };

  const state = store.useContext();

  return (
    <div>
      <p>home</p>
      <button onClick={click}>add one</button>
      <p>{state.count}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Provider>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
```
