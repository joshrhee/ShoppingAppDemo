//Used React Bootstrap
import React, {useContext, useState} from 'react';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import './App.css';

import Data from './data.js';
import DetailPage from './Detail.js';
import Cart from './Cart.js';

import { Link, Route, Switch } from 'react-router-dom';
//Used axios Ajax
import axios from 'axios';

//yarn add redux react-redux



//props지옥에 안빠지기위해 Context 사용하기
//createContext()는 같은 변수값을 공유할 범위를 생성함
//쉽게말하면 재고context라는 컴포넌트를 이렇게 만든 뒤
//이 재고context컴포넌트로 내가 공유하고 싶은 HTML하고 컴포넌트들을 감싸면 됌
//그리고 감싸진 컴포넌트 안에서 "let 재고 = useContext(재고context);" 같이 변수를 만들어서 저 변수를 쓰면 됌
//props를 너무 많이 해야하면 이게 더 좋음
//export는 다른 파일에서도 재고context를 쓰기위해 해줌
//다른 파일에서 재고context import해야함
export let 재고context = React.createContext();

function App() {

  let [shoes, shoesState] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* mr-auto를 ml-auto로 바꾸면 바의 옵션들이 오른쪽으로 갈거임 */}
          <Nav className="mr-auto"> 
            {/* React Router 문법 (페이지 이동하는 버튼 만들기)
            <Link to="경로">버튼</Link> 
            
            BootStrap에서 가져온거랑 다르게 좀 수정함. Warning 떠서 Link 컴포넌트는 아래같이 없앰*/}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

      
      {/* Swtich Router안에 담으면 Route들이 하나씩만 보임
      중복 페이지 보여주는걸 막아줌. 만약 Route들이 중복이 되면, 제일 위에 Route만 보여줌 */}
      <Switch>

        {/* Routing은 페이지를 나눌때 쓰임. Routing하면 뒤로가기 앞으로가기 버튼도 쓸 수 있음*/}
        {/* 주소창에 localhost:3000 치면 가는 페이지 만듦 */}
        {/* exact path="/" 에서 exact를 안넣어주면 / 가 붙은 모든 경로에 메인페이지가 중복되어서 나옴 */}
        {/* exact는 정확히 localhost:3000 일때만 "메인페이지에요" 가 보여짐 */}
        <Route exact path="/">

          <Jumbotron className="background">
            <h1>20% Season OFF!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          {/* Bootstrap문법으로 사이트를 3등분 하기 */}
          {/* className에 container를 쓰면 좌우 여백을 예쁘게 잡아줌 */}
          <div className="container">


            {/* Context를 통해 같은 값을 공유할 HTML을 재고context 범위로 싸맴 
            나는 재고라는 state의 값을 공유하려함
            Card 컴포넌트는 재고를 공유하게됌. props 안써도 재고를 공유하게 됌*/}
            <재고context.Provider value={재고}>
              {/* row를 쓰면 사이트를 12개의 column으로 쪼갠다는 의미임 */}
              <div className="row">
                {
                  shoes.map((shoe, index)=>{
                    return <Card shoe={shoes[index]} index={index} key={index}/>
                  })
                }
              </div>
            </재고context.Provider>


            


              {/* //서버요청 종류:
              //Get Request: 특정페이지/ 자료읽기. 주소창에 url 입력하고 페이지 받는 것 같은것
              //Post Request: 서버로 중요 정보를 전달할때 씀. 로그인할때 특정 칸에 아이디, 비번 입력하고 특정 로그인 버튼 누르는 것

              //Ajax란 서버에 새로고침 없이 Request를 할 수 있게 도와줌 
              Ajax 방법:
              1. jQuery 설치해서 $.ajax()쓰기
              2. axios 설치해서 axios.get()쓰기
              3. 쌩 자바스크립트 fetch쓰기 
              
              여기서는 axios 쓸거임*/}
            <button className="btn btn-primary" onClick={()=>{

              axios.post('https://codingapple1.github.io/shop/data2.json', { id: 'joshua999995', pw: 1234})
              .then((reuslt)=>{  })
              .catch(()=>{  });



              //axios.get(데이터 요청할 URL)
              //.then()은 ajax 요청이 성공했을 시 실행시킴
              //.catch()는 ajax 요청이 실패했을 시 실행시킴 
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{ 
                console.log('Axios Request 성공함');
                console.log(result);
                //result.data가 우리가 원하는 json 포맷의 데이터를 Object로 가져올 수 있음
                //fetch로하면 json포맷이여서 key에 다 "" 가 붙어있지만 axios는 "" 없이 Object형으로 됌
                console.log(result.data);


                //...shoes는 shoes state의 엘리먼트들의 대괄호를 벗기라는 소리임
                //고로 [...shoes]는 shoes state의 대괄호를 벗기고 고거를 다시 []안에 넣어서 독립적인 shoes 복사본을 만듬
                //shoes랑 result.data의 자료를 다 합친 한개의 어레이를 만듦
                shoesState([...shoes, ...result.data])
               })
              .catch(()=>{ 
                console.log('Axios Request 실패함');
               });


              //fetch로하면 json포맷이여서 key에 다 "" 가 붙어있지만 axios는 "" 없이 Object형으로 됌
               fetch('https://codingapple1.github.io/shop/data2.json')
               
            }}>더보기</button>
          
          
          
          
          
          
          </div>

        </Route>


        {/* 주소창에 localhost:3000/detail/(아무문자) 치면 가는 페이지 만듦 */}
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
              
              <DetailPage shoes={shoes} 재고={재고} 재고변경={재고변경}/>
            
          </재고context.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>
        

        {/* path="/:id" 는 / 뒤에 어떤 문자가 오던간에 이 페이지로 이동해주세요 라는 의미임.
        :id 는 url의 parameter라고 불림.
        / 뒤에 어떤걸 쳐도 이 path로 가게됌 */}
        <Route path="/:id">
          <div>아무거나 적었을때 이거 보여주셈</div>
        </Route>

      </Switch>
      
    </div>
  );
}






function Card(props) {

  //useContext 통해 props없이 App컴포넌트에 있는 재고라는 state의 값을 공유하고 쓸 수 있게됌
  //재고context라고 만든 범위를 이제 재고라는 변수 안에 넣음
  let 재고 = useContext(재고context);

  return (
    /* className="col-4" 는 4개 column을 차지한는 div박스를 쓰겠다는 의미임
          위에서 12개로 쪼갰기 때문에 한개당 4개씩 가지면 3등분 됌 
          className="col-md-4" 는 모바일 사이즈에서 세로로 정렬도 해줌.
          모바일 사이즈에서 커지면 다시 가로로 정렬해줌*/
    <div className="col-md-4">
      {/* src같은 html태그 안에서 바인딩 할때는 ()를 쓰는 듯 */}
      <img src={ "https://codingapple1.github.io/shop/shoes" + (props.index + 1) + ".jpg" }
      width="100%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content} & {props.shoe.price}</p>
      <Test></Test>
    </div>
  )
}

function Test() {
  let 재고 = useContext(재고context);
  return <p>재고는: {재고}</p>
}

export default App;
