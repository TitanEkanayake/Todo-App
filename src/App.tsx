import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";
import EditPopupWin from "./components/EditPopupWin";
import Store from "./Redux/Store";
import { Provider } from "react-redux";
const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/todolist" element={<TodoList />}></Route>
          <Route path="/edirform" element={<EditPopupWin />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
