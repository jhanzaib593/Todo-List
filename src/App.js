import { useState } from "react";
import "./App.css";

function App() {
  const TODO = localStorage.getItem("todos");

  const initialValue = TODO ? JSON.parse(TODO) : [];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState(initialValue);
  const [todoId, setTodoId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (todoId) {
      const updated = todos.map((todo) => {
        return todo.id === todoId
          ? { ...todo, name: name, description: description }
          : todo;
      });

      setTodos(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
      setTodoId("");
    } else {
      const updated = [
        ...todos,
        { name: name, description: description, id: Math.random() },
      ];
      setTodos(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
    }
    setName("");
    setDescription("");
  };

  const handleOnClick = (todo) => {
    const update = todos.filter((t) => t.id !== todo.id);
    setTodos(update);
    localStorage.setItem("todos", JSON.stringify(update));
  };

  const handleOnEdit = (t) => {
    setTodoId(t.id);
    setName(t.name);
    setDescription(t.description);
  };
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1>Todo App</h1>
        <form onSubmit={onSubmit}>
          <label>Topic Name</label>
          <input
            value={name}
            name="name"
            placeholder="Enter Name here"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label>Topic Description</label>
          <textarea
            value={description}
            name="description"
            placeholder="Enter description here"
            rows={5}
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <button className="btn btn-outline-black" type="submit">
            {todoId ? "Update" : "Create"}
          </button>
        </form>

        <div className="todo-container">
          {todos.map((t, ind) => {
            return (
              <div key={t.id} className="todo-card">
                <div className="">
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                </div>
                <div className="todo-card-btn">
                  <button
                    className="btn btn-outline-black"
                    onClick={() => {
                      handleOnEdit(t);
                    }}
                  >
                    <img src={require("./assets/img/edit.png")} width={15} height={15} alt=""/>
                  </button>
                  <button
                    onClick={() => handleOnClick(t)}
                    className="btn btn-outline-black"
                  >
                    <img src={require("./assets/img/delete.png")} width={15} height={15} alt=""/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
