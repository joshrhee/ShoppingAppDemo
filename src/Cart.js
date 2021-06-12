import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div>
            <Table responsive>
                {/* thead, tbody ㅈㅣ워오됌 쓸데없음
                <tr> 은 가로행 만드는 것
                <td> 는 세로행 만드는 것 */}
            <thead>
                <tr>
                <th>#</th>    
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
                
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                {/* 아래 state를props화 에서 만든 state를 여기서 씀 */}
                <td>{ props.state[0].name }</td>
                <td>Table cell</td>
                <td>Table cell</td>
                </tr>
                
            </tbody>
            </Table>
        </div>
    )
}

//이 함수는 reduxㄹㅗ 만든 storeㅇㅣ라는 stateㅇㅔ서 데이터를 가져와서 propsㄹㅗ 변환해주는 함수
function state를props화(state) {
    return {
        //store안에 있던 모든 데이터를 state라는 이름의 props로 바꿔주세요 한거임.
        state: state
    }
}
export default connect(state를props화)(Cart)


//export default Cart;