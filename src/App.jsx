import { useState, useRef } from "react";
import styles from "./App.module.css";

import NewProjectForm from "./Components/NewProjectForm";
import Project from "./Components/Project";
import Sidebar from "./Components/Sidebar";

function App() {
  const [projects, setProjects] = useState([
    {
      name: "Learn React",
      description:
        "Follow Youtube tutorials and Udemy courses to learn the fundamentals of React",
      dueDate: new Date("2025-03-06"),
      toDoList: ["Make this app", "Make a flashcard app for Tana"],
    },
  ]);

  const [currentProject, setCurrentProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const projectName = useRef();
  const projectDescription = useRef();
  const projectDueDate = useRef();

  function createNewProject(e) {
    e.preventDefault();
    const newProject = {
      name: projectName.current.value,
      description: projectDescription.current.value,
      dueDate: new Date(projectDueDate.current.value),
      toDoList: [],
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setCurrentProject(newProject);
    setIsCreatingProject(false);
  }

  function selectProject(selectedProjectName) {
    const selected = projects.find(
      (project) => project.name === selectedProjectName
    );
    setCurrentProject(selected);
    setIsCreatingProject(false);
  }

  function updateProjectToDos(projectName, newToDoList) {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((prevProject) =>
        prevProject.name === projectName
          ? { ...prevProject, toDoList: newToDoList }
          : prevProject
      );

      const updatedProject = updatedProjects.find(
        (project) => project.name === projectName
      );

      setCurrentProject(updatedProject);

      return updatedProjects;
    });
  }

  return (
    <div className={styles.container}>
      <Sidebar
        projects={projects}
        selectProject={selectProject}
        clickHandler={setIsCreatingProject}
      />

      {!isCreatingProject ? (
        <Project projectData={currentProject} addToDo={updateProjectToDos} />
      ) : (
        <NewProjectForm
          projectName={projectName}
          projectDescription={projectDescription}
          projectDueDate={projectDueDate}
          createNewProject={createNewProject}
          clickHandler={setIsCreatingProject}
        />
      )}
    </div>
  );
}

export default App;
