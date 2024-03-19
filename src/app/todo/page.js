"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const ToDoList = () => {
  const [toDo, setToDo] = useState([]);
  const [total, setTotal] = useState(5);
  const [temp, setTemp] = useState("");

  useEffect(() => {
    setToDo(JSON.parse(sessionStorage.getItem("toDoList")) || [])
  }, [])

  const addTodo = () => {
    if (!temp) return;
    const newItem = { text: temp, time: dayjs().format("DD/MM/YYYY HH:mm:ss") };
    setToDo([newItem, ...toDo]);
    sessionStorage.setItem("toDoList", JSON.stringify([newItem, ...toDo]));
    setTemp("");
  };

  const removeTodo = (index) => {
    const arr = [...toDo];
    arr.splice(index, 1);
    setToDo(arr);
    sessionStorage.setItem("toDoList", JSON.stringify(arr));
  };

  const handleChange = (e) => {
    setTemp(e.target.value);
  };

  return (
    <Wrapper>
      <Input
        placeholder="Type a new to do ..."
        value={temp}
        onChange={handleChange}
      />
      <Button onClick={addTodo}>Add</Button>
      <ToDoWrapper>
        {toDo
          .filter((_, key) => key < total)
          .map((item, index) => (
            <Item key={`item-${item.text}`}>
              <span>{item.text}</span>
              <span>{item.time}</span>
              <RemoveIcon onClick={() => removeTodo(index)}>
                <span>x</span>
              </RemoveIcon>
            </Item>
          ))}
      </ToDoWrapper>
      {toDo.length > 5 && toDo.length > total && (
        <LoadMore onClick={() => setTotal(total + 5)}>Load more</LoadMore>
      )}
    </Wrapper>
  );
};

export default ToDoList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const Input = styled.input`
  width: 100%;
  height: 70px;
  padding: 0 16px;
`;

const Button = styled.button`
  border: 1px solid green;
  width: 100px;
  height: 50px;
  align-self: flex-end;
  margin-top: 16px;
  border-radius: 8px;
`;

const ToDoWrapper = styled.div`
  width: 100%;
  display: grid;
  flex: 1;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin: 24px 0;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 50px;
  position: relative;
  padding: 16px;
  border: 1px solid black;
  margin-bottom: 16px;
  word-break: break-word;

  > span:nth-child(2) {
    align-self: flex-end;
  }
`;

const RemoveIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: red;
  position: absolute;
  top: -8px;
  right: -8px;
  cursor: pointer;

  > span {
    font-size: 10px;
  }
`;

const LoadMore = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
