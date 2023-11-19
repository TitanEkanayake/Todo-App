import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_TODO_LIST,
  GET_TODO_OBJ,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "./Actiontypes";

interface TodoItem {
  id: number;
  title: string;
  isDone: boolean;
}

interface TodoState {
  loading: boolean;
  error: any;
  todoList: TodoItem[];
  todoObj: TodoItem | null;
}

const initialState: TodoState = {
  loading: false,
  error: null,
  todoList: [],
  todoObj: null,
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_TODO_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        todoList: action.payload,
      };

    case GET_TODO_OBJ:
      return {
        ...state,
        loading: false,
        error: null,
        todoObj: action.payload,
      };

    case ADD_TODO:
      return {
        ...state,
        loading: false,
      };

    case DELETE_TODO:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_TODO:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default todoReducer;
