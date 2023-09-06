import React, {useState} from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 공백 체크
    if(value === "") {
      return alert("해야 할 일을 입력해주세요.");
    }

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    // 원래 있던 할 일에 새로운 할 일 더해주기 및 input 초기화
    setTodoData(prev => 
      [...prev, newTodo]
    );
    setValue("");
    // 위에서 ...은 "전개 연산자" 
  }

  return(
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할일 목록</h1>
        </div>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
        <List todoData={todoData} setTodoData={setTodoData}/>
      </div>
    </div>
  )
}