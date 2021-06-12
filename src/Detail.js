import React, {useContext, useEffect, useState} from 'react';
import {재고context} from './App.js';
//React Hook을 통해 component lifecycle 중간중간에 뭔가 명령을 줄 수 있음
//어떤거 하기전에 hook을 걸어 이것 좀 미리 해줘, 나중에 뭐 좀 해줘 같은 것이다
import { useHistory, useParams } from 'react-router';

import { Nav } from 'react-bootstrap'

//Used Sass styling
//yarn add node-sass
import './Detail.scss';

//Used Styled Componenets
//Styled-Components는 JSX와 혼연일체 된 CSS임. CSS파일 너무 많아지는걸 방지하기위해 씀
import styled from 'styled-components';
import axios from 'axios';

//컴포넌트에 직접 스타일 넣어서 스타일링하기
//CSS를 미리 입혀놓은 박스 컴포넌트를 만드는거임.
let 박스 = styled.div`
    padding : 20px;
`;
//백틱안에서 변수를 쓸경우 ${} 이렇게 씀
let 제목 = styled.h4`
    font-size : 25px;
    color : ${props => props.색상}
`;



//옛날 스타일 방식, 하지만 현재에도 써서 알아둬야함. 더 쉬운건 아래 useEffect hook 봐보기
//이 두개가 가장 자주쓰이는 LifeCycle hook임.
class Detail2 extends React.Component {
    //Detail2 component가 mount(등장) 되었을때 실행할 코드~
    componentDidMount() {
        //Ajax 같은것도 이런곳에 자주 사용
        
    }

    //Detail2 component가 unMount(내시야에서 사라질때, 안보일때) 되었을때 실행할 코드~
    componentWillUnmount() {

    }
}




function Detail(props) {

    let [alert, alertStete] = useState(true);
    let [inputData, inputDataState] = useState('');

    //let 재고 = useContext(재고context);

    //몇번째 Tab 버튼을 눌렀는지 저장할 state만듦
    let [누른탭, 누른탭변경] = useState(0);

    //useEffect hook 은 위의 LifeCycle hook과 비슷함
    //Component가 mount되엇을때 실행됌
    //Component가 update 될때도 실행됌
    //useEffect를 여러개 만들어서 사용해도 됌. 위에서부터 순서대로 실행됌
    //Optional parameter: 마지막 파라미터에 [alert] 라는 특정 state가 변경될때만 코드를 실행해 달라는 말임
    //[alert, inputData] 같이 [] 안에 여러개 들어가도 됌
    //만약 마지막 파라미터에 [] 가 들어있다면, 아무것도 없는 공허한 state가 변경될때만 코드를 실행하라는 말이므로 영영 실행안됌
    //즉 마지막 파리미터에 []를 넣으면, Detail컴포넌트가 등장시 한번만 실행하고 더이상 영영 실행안됌
    useEffect(()=>{

        //2초 후에 "재고가 얼마 남지 않았습니다" alert창을 안보이게 하기
        let timer = setTimeout( ()=>{alertStete(false)}, 2000 )
        console.log("useEffect is runned");

        //이 코드는 Detail Component 가 Unmount될때 실행을 해줌
        //Detail Component가 사라질때 timer을 제거해줌
        //setTimeout에서 버그가 생길 수도 있어서 이거 해주면 좋음!
        return ()=>{ clearTimeout(timer) }
    }, [alert]);
    //alert는 현재 "재고가 얼마 남지 않았습니다" UI가 보여지는지 안보여지는지를 저장하는 변수임
    

    //useParams라는 hook을 이용해서 url의 parameter를 가져옴
    //useParams는 {사용자가 입력한 URL 파라미터들} 을 리턴해줌
    //우리는 <Route path="/detail/:id"> 에서 :id 자리의 값을 id라는 변수에 담을거임
    let {id} = useParams(); 

    let findingShoe = props.shoes.find((product)=>{
        return product.id === id
    })

    //뒤로가기 하기 위해 useHistory라는 hook을 이용함
    //방문기록 등을 저장해놓은 object를 history 변수 안에 넣음
    let history = useHistory();

    return (
        <div className="container">
            <박스>
                <제목 색상={'blue'}>Detail Page</제목>
                <제목 className="red">Detail Page</제목>
            </박스>

            {/* 이렇게 inputData가 바뀔때마다 Detail Component가 update(재렌더링) 됌 */}
            {inputData}
            <input onChange={(e)=>{ inputDataState( e.target.value ) }}/>

            { //항상 켜놓는 UI가 아니라면 boolean state를 만들어서 이런식으로 UI를 만든다고함
                alert === true 
                ? (<div className="my-alert2">
                        <p>
                            재고가 얼마 남지 않았습니다
                        </p>
                    </div>)
                : null
            }



            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findingShoe.title}</h4>
                    <p>{findingShoe.content}</p>
                    <p>{findingShoe.price}</p>


                    {/* 재고를 보여줌 */}
                    <Info 재고={props.재고}></Info> 



                    <button className="btn btn-danger" onClick={()=>{props.재고변경([9,11,12])}}>주문하기</button> 
                    <button className="btn btn-danger" onClick={()=>{
                        //React Router의 useHistory() 의 goBack()을 이용함. 말그대로 이전 페이지로 감
                        history.goBack();
                        //push("/ㅁㄴㅁㄴ") 는 localhost:3000/ㅁㄴㅁㄴ 경로로 이동시켜줌
                        //history.push("/ㅁㄴㅁㄴ")
                    }}>뒤로가기</button> 
                </div>
            </div>


            {/* Tab UI 만들기 
            몇번째 버튼 눌렀는지를 state로 저장해둠
            state에 따라 UI 보이게 안보이게 하기
            className="mt-5"는 부트스트랩이 제공하는 margin-top 5만큼 주기 그런거임*/}
            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    {/* 버튼들마다 unique한 eventKey 부여함 */}
                    <Nav.Link eventKey="link-0">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Option 2</Nav.Link>
                </Nav.Item>
            </Nav>

        </div> 
    )
    
}

function Info(props) {
    return (
        <p>Inventory: {props.재고[0]}</p>
    )
}



export default Detail;