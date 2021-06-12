import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Used React Router
//HashRouter을 쓸경우 안전하게 라우팅 가능
//HashRouter을 쓰면 localhost:3000/#/ 같이 #이 붙는데 # 뒤에 적는 것은 서버로 전달이 안됌
//그래서 라우팅은 리액트가 알아서 잘 해줌
//BrowserRouter을 쓸경우, 라우팅을 리액트가 아니라 서버에게 요청할 수도 있어서 위험함.
//서버에서 서버 라우팅 방지하는 API를 작성해둬야함
import { BrowserRouter } from 'react-router-dom';

//Redux 세팅
//yarn add redux react-redux
import {Provider} from 'react-redux';
import { createStore } from 'redux';

//Using redux
//createStore안에 state를 만들어서 store변수에 저장함
let store = createStore(()=>{ return [{ id : 0, name : '멋진신발', quan : 2 }] })


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* Provider 로 감싸진 모든 컴포넌트들은 props없이도 같은 state공유 가능 
    위에서 만든 store state를 Provider를 통해 감싸진 모든 컴포넌트들한테 공유함*/}
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
