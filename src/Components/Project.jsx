import React, { useState } from "react";
import ProjectItem from "./ProjectItem";
import styles from "./Project.module.css";

const Project = ({ projectData, addToDo, updateProject }) => {
  const [isAddingToDo, setIsAddingToDo] = useState(false);
  const [newToDo, setNewToDo] = useState("");

  function deleteToDo(index) {
    const updatedToDoList = projectData.toDoList.filter(
      (item, i) => i !== index
    );
    addToDo(projectData.title, updatedToDoList);
  }

  function editProject(projectId, updatedProject) {
    updateProject(projectId, updatedProject);
  }

  return (
    <div className={styles.project}>
      <div>
        <ProjectItem
          item={{ title: projectData.title }}
          projectData={projectData}
          updateProject={updateProject}
          type={"text"}
        />
        <h3>Project Description:</h3>
        <ProjectItem
          item={{ description: projectData.description }}
          projectData={projectData}
          updateProject={updateProject}
          type={"text"}
        />
        <h3>Due Date:</h3>
        <ProjectItem
          item={{ dueDate: projectData.dueDate }}
          projectData={projectData}
          updateProject={updateProject}
          type={"date"}
        />
        <h3>To-Do List:</h3>
        <ol>
          {projectData.toDoItems.map((item, index) => {
            return (
              <li key={index}>
                {item}
                <button onClick={() => deleteToDo(index)}>X</button>
              </li>
            );
          })}
          {isAddingToDo ? (
            <div>
              <input
                type="text"
                onChange={(event) => setNewToDo(event.target.value)}
                value={newToDo}
                autoFocus
              />
              <button
                onClick={() =>
                  editProject(projectData._id, {
                    ...projectData,
                    toDoItems: [...projectData.toDoItems, newToDo],
                  })
                }
              >
                Save
              </button>
              <button onClick={() => setIsAddingToDo(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setIsAddingToDo(true)}>
              Add To-Do Item
            </button>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Project;
