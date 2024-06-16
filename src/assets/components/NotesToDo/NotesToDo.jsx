import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../components/firebase";
import "./NotesToDo.scss";

function NotesToDo() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    fetchNotes();
    fetchTodos();
  }, []);

  const fetchNotes = async () => {
    const notesSnapshot = await getDocs(collection(db, "notes"));
    const notesData = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNotes(notesData);
  };

  const fetchTodos = async () => {
    const todosSnapshot = await getDocs(collection(db, "todo"));
    const todosData = todosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(todosData);
  };

  const handleAddNote = async () => {
    if (noteText.trim() === "") return;
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        text: noteText,
      });
      setNotes([...notes, { id: docRef.id, text: noteText }]);
      setNoteText("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (index) => {
    const note = notes[index];
    try {
      const noteRef = doc(db, "notes", note.id);
      await deleteDoc(noteRef);
      const newNotes = notes.filter((_, i) => i !== index);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleAddTodo = async () => {
    if (todoText.trim() === "") return;
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        text: todoText,
        completed: false,
      });
      setTodos([...todos, { id: docRef.id, text: todoText, completed: false }]);
      setTodoText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleTodo = async (index) => {
    const todo = todos[index];
    try {
      const todoRef = doc(db, "todo", todo.id);
      await updateDoc(todoRef, {
        completed: !todo.completed,
      });
      const newTodos = todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (index) => {
    const todo = todos[index];
    try {
      const todoRef = doc(db, "todo", todo.id);
      await deleteDoc(todoRef);
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="notes-todo">
      <div className="todo-list">
        <h2>To-Do List</h2>
        <div className="add-todo">
          <input
            type="text"
            placeholder="Add To-Do"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button className="todo-button" onClick={handleAddTodo}>
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(index)}
              />
              <span>{todo.text}</span>
              <button
                className="todo-button"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="notes">
        <h2>Notes</h2>
        <div className="add-note">
          <input
            type="text"
            placeholder="Add Note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button className="note-button" onClick={handleAddNote}>
            Add
          </button>
        </div>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <span>{note.text}</span>
              <button
                className="note-button"
                onClick={() => handleDeleteNote(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NotesToDo;
