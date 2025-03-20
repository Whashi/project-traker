import React, { useState } from "react";
import styles from "./Project.module.css";

const Project = ({ projectData, addToDo }) => {
  const [isAddingToDo, setIsAddingToDo] = useState(false);
  const [newToDo, setNewToDo] = useState("");

  function handleChange(e) {
    setNewToDo(e.target.value);
  }

  function isAdding() {
    setIsAddingToDo(true);
  }

  function isNotAdding() {
    setIsAddingToDo(false);
  }

  function saveToDo() {
    const updatedToDoList = [...projectData.toDoList, newToDo];
    addToDo(projectData.name, updatedToDoList);
    setNewToDo("");
    isNotAdding();
  }

  function deleteToDo(index) {
    // This function should remove a to-do item from the projectData object
    const updatedToDoList = projectData.toDoList.filter(
      (item, i) => i !== index
    );
    addToDo(projectData.name, updatedToDoList);
  }

  return (
    <div className={styles.project}>
      {projectData ? (
        <div>
          <h2>{projectData.name}</h2>
          <h3>Project Description:</h3>
          <p>{projectData.description}</p>
          <h3>Due Date:</h3>
          <p>{projectData.dueDate.toDateString()}</p>
          <h3>To-Do List:</h3>
          <ol>
            {projectData.toDoList.map((item, index) => {
              return (
                <li key={index}>
                  {item}
                  <button onClick={() => deleteToDo(index)}>X</button>
                </li>
              );
            })}
            {isAddingToDo ? (
              <form>
                <input
                  type="text"
                  onChange={handleChange}
                  value={newToDo}
                  autoFocus
                />
                <button type="submit" onClick={saveToDo}>Save</button>
                <button onClick={isNotAdding}>Cancel</button>
              </form>
            ) : (
              <button onClick={isAdding}>Add To-Do Item</button>
            )}
          </ol>
        </div>
      ) : (
        <p>Select a project</p>
      )}
    </div>
  );
};

export default Project;
