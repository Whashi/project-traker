import { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";

import NewProjectForm from "./Components/NewProjectForm";
import Project from "./Components/Project";
import Sidebar from "./Components/Sidebar";

function App() {
  const [projects, setProjects] = useState([
    // {
    //   name: "Learn React",
    //   description:
    //     "Follow Youtube tutorials and Udemy courses to learn the fundamentals of React",
    //   dueDate: new Date("2025-03-06"),
    //   toDoList: ["Make this app", "Make a flashcard app for Tana"],
    // },
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
      .then(response => {
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
  }, [])
  

  const [currentProject, setCurrentProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const projectName = useRef();
  const projectDescription = useRef();
  const projectDueDate = useRef();

  function createNewProject(e) {
    e.preventDefault();
    const newProject = {
      title: projectName.current.value,
      description: projectDescription.current.value,
      dueDate: new Date(projectDueDate.current.value),
      toDoItems: [],
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setCurrentProject(newProject);
    setIsCreatingProject(false);
  }

  function selectProject(selectedProjectName) {
    const selected = projects.find(
      (project) => project.title === selectedProjectName
    );
    console.log(selected);
    
    setCurrentProject(selected);
    setIsCreatingProject(false);
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

  async function saveNewProject(project) {
    console.log(project);
    
    
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
      setProjects((prevProjects) => [...prevProjects, data]);
      setIsCreatingProject(false);
    } catch (error) {
      console.error("Error saving project:", error);
    }
    
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
          save={saveNewProject}
          cancel={setIsCreatingProject}
        />
      )}
    </div>
  );
}

export default App;
