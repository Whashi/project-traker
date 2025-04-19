import { useState, useEffect } from "react";
import styles from "./App.module.css";

import NewProjectForm from "./Components/NewProjectForm";
import Project from "./Components/Project";
import Sidebar from "./Components/Sidebar";

function App() {
  const [projects, setProjects] = useState([
    // {
    //   title: "Learn React",
    //   description:
    //     "Follow Youtube tutorials and Udemy courses to learn the fundamentals of React",
    //   dueDate: new Date("2025-03-06"),
    //   toDoList: ["Make this app", "Make a flashcard app for Tana"],
    // },
  ]);

  useEffect(() => {
    getProjects();
  }, []);

  function getProjects() {
    fetch("http://localhost:3000/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }

  const [currentProject, setCurrentProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function createNewProject(newProject) {
    saveNewProject(newProject);
    setCurrentProject(newProject);
    setIsCreatingProject(false);
  }

  function selectProject(projectId) {
    const selected = projects.find((project) => project._id === projectId);
    console.log(selected);
    

    setCurrentProject(selected);
    setIsCreatingProject(false);
  }

  async function saveNewProject(project) {
    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      getProjects();
      selectProject(data._id);
      setIsCreatingProject(false);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  }

  function updateProjectToDos(projectName, newToDoItems) {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((prevProject) =>
        prevProject.title === projectName
          ? { ...prevProject, toDoItems: newToDoItems }
          : prevProject
      );

      const updatedProject = updatedProjects.find(
        (project) => project.title === projectName
      );

      setCurrentProject(updatedProject);

      return updatedProjects;
    });
  }

  async function updateProject(projectId, updatedProject) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      getProjects();
      selectProject(data._id);
    } catch (error) {
      console.error("Error saving project:", error);
    }

    // setCurrentProject(updatedProject);
  }

  return (
    <div className={styles.container}>
      <Sidebar
        projects={projects}
        selectProject={selectProject}
        clickHandler={setIsCreatingProject}
      />
      
      {!isCreatingProject ? (
        currentProject ? (
          <Project
            projectData={currentProject}
            addToDo={updateProjectToDos}
            updateProject={updateProject}
          />
        ) : (
          <p className={styles.select}>Select a project</p>
        )
      ) : (
        <NewProjectForm
          createNewProject={createNewProject}
          cancel={setIsCreatingProject}
        />
      )}
    </div>
  );
}

export default App;
