import { useEffect, useState } from "react";
import { logoutUser, selectUserId, selectUserObj } from "../Redux/AdminSlice";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  FetchLoggedinUserObj,
  FetchTodoList,
  FunctionAddTodo,
  FunctionUpdateTodo,
  RemoveTodo,
} from "../Redux/Action";
import { useNavigate } from "react-router-dom";
interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}
const TodoList = (props: any) => {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");
  const dispatch: any = useDispatch();
  const userId: string = useSelector(selectUserId) || "";

  const userObj: User = useSelector(selectUserObj);

  useEffect(() => {
    // Load todo list
    dispatch(FetchTodoList());

    // Fetch user data based on userId
    if (userId) {
      dispatch(FetchLoggedinUserObj(userId));
    }
  }, [userId, dispatch]);
  // Function to add a new todo
  const addTodo = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      const newTodoItem: any = {
        text: newTodo,
        isDone: false,
      };
      await dispatch(FunctionAddTodo(newTodoItem));
      setNewTodo("");
      await dispatch(FetchTodoList());
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id: number) => {
    await dispatch(RemoveTodo(id));
    await dispatch(FetchTodoList());
  };

  // Function to toggle the 'done' status of a todo
  const toggleDone = async (todo: Todo) => {
    // Dispatch the update to Redux
    const toggleUpdate: object = { ...todo, isDone: !todo.isDone };
    await dispatch(FunctionUpdateTodo(toggleUpdate));
    await dispatch(FetchTodoList());
  };

  const startEditingTodo = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const cancelEditingTodo = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const submitEditedTodo = async (id: number) => {
    const data: object = { id: id, text: editedTodoText };
    await dispatch(FunctionUpdateTodo(data));

    setEditingTodoId(null);
    setEditedTodoText("");
    await dispatch(FetchTodoList());
  };

  const logout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());
    navigate("/");
  };

  // Filter todos based on the search term
  const filteredTodos = (props.todo.todoList || []).filter((todo: Todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return userObj === null ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : (
    <div className="max-w-md mx-auto p-1">
      <div className="flex items-center mb-1">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            TODO
          </span>{" "}
          APPLICATION
        </h1>
      </div>
      <div className="flex items-center  mb-4">
        {userObj && (
          <h1 className="text-lg font-medium text-gray-900 dark:text-white uppercase ">
            Welcome, {userObj.name}!
          </h1>
        )}
      </div>
      <div className="flex items-center  mb-4">
        <button
          className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="mb-6 relative mt-4 ">
        <form>
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Add Your Todos
          </p>
          <div className="mb-6 relative mt-4 flex items-center space-x-2">
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="Search by Title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="space-y-3">
        {filteredTodos.map((todo: any) => (
          <li
            key={todo.id}
            className="flex items-center bg-white dark:bg-gray-800 rounded p-4 shadow-md"
          >
            <input
              checked={todo.isDone}
              type="checkbox"
              id={`checkbox-${todo.id}`}
              value=""
              className={`w-5 h-5 text-blue-600 ${
                todo.isDone
                  ? "bg-green-500 border-transparent"
                  : "bg-gray-100 border-gray-300"
              } rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600 mr-4`}
              onChange={() => toggleDone(todo)}
            />
            {editingTodoId === todo.id ? (
              // Input box for editing
              <div className="flex-1">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  className="w-full border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-600"
                />
              </div>
            ) : (
              // Display todo text
              <div className="flex-1">
                <span
                  className={`${
                    todo.isDone
                      ? "line-through text-gray-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {todo.text}
                </span>
              </div>
            )}

            {/* Buttons */}
            {editingTodoId === todo.id ? (
              // Editing state: Display "Submit" and "Cancel" buttons
              <>
                <button
                  className="ml-4 py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500"
                  onClick={() => submitEditedTodo(todo.id)}
                >
                  Submit
                </button>
                <button
                  className="ml-4 py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
                  onClick={cancelEditingTodo}
                >
                  Cancel
                </button>
              </>
            ) : (
              // Non-editing state: Display "Delete" and "Edit" buttons
              <>
                <button
                  className="ml-4 py-2 px-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-500"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="ml-4 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                  onClick={() => startEditingTodo(todo.id, todo.text)}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todo: state.todo,
  };
};
export default connect(mapStateToProps)(TodoList);
