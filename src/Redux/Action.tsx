import {
  FAIL_REQUEST,
  MAKE_REQUEST,
  GET_TODO_OBJ,
  GET_TODO_LIST,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "./Actiontypes";
import { Dispatch } from "redux";
import axios from "axios";

import { setUserObj } from "./AdminSlice";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const failRequest = (err: any) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

export const geTodoList = (data: any) => {
  return {
    type: GET_TODO_LIST,
    payload: data,
  };
};
export const getTodoObj = (data: any) => {
  return {
    type: GET_TODO_OBJ,
    payload: data,
  };
};
export const addTodo = () => {
  return {
    type: ADD_TODO,
  };
};
export const deleteTodo = () => {
  return {
    type: DELETE_TODO,
  };
};
export const updateTodo = () => {
  return {
    type: UPDATE_TODO,
  };
};
export const FetchLoggedinUserObj = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(makeRequest());

    try {
      const res = await axios.get(`https://localhost:7185/api/Admins/${id}`);
      const userobj = res.data;
      dispatch(setUserObj(userobj));
    } catch (error: any) {
      dispatch(failRequest(error.message));
    }
  };
};

export const FetchTodoList = () => {
  return async (dispatch: Dispatch) => {
    dispatch(makeRequest());

    try {
      const response = await axios.get("https://localhost:7185/api/TodoList");
      const todolist = response.data;
      dispatch(geTodoList(todolist));
    } catch (error: any) {
      dispatch(failRequest(error.message));
    }
  };
};

export const FunctionAddTodo = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.post("https://localhost:7185/api/TodoList", data);
      dispatch(addTodo());
    } catch (error: any) {
      dispatch(failRequest(error.message));
    }
  };
};

export const RemoveTodo = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.delete(`https://localhost:7185/api/TodoList?id=${id}`);
      dispatch(deleteTodo());
    } catch (error: any) {
      dispatch(failRequest(error.message));
    }
  };
};

export const FunctionUpdateTodo = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.put(`https://localhost:7185/api/TodoList`, data);
      dispatch(updateTodo());
    } catch (error: any) {
      dispatch(failRequest(error.message));
    }
  };
};
