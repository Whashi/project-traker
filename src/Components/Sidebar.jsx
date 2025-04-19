import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ projects, selectProject, clickHandler }) => {
  return (
    <div className={styles.sidebar}>
      <h2>Your Projects</h2>
      <ol className={styles["project-list"]}>
        {projects.map((project) => {
          return (
            <li
              onClick={() => selectProject(project._id)}
              className={styles["project-list-item"]}
              key={project._id}
            >
              <h3 className={styles["project-title"]}>{project.title}</h3>
            </li>
          );
        })}
      </ol>
      <button onClick={() => clickHandler(true)}>+ Add Project</button>
    </div>
  );
};

export default Sidebar;
