import React, {useState, useCallback} from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {
  console.log("App Component");

  const [todoData, setTodoData] = useState(initialTodoData);
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
    // 아래에서 ...은 "전개 연산자" 
    setTodoData(prev => 
      [...prev, newTodo]
    );
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));

    // ipnut 초기화
    setValue("");
  }

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }, [todoData])

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }

  return(
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  )
}