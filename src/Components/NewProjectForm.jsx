import React from "react";
import styles from "./NewProjectForm.module.css";

const NewProjectForm = ({
  projectName,
  projectDescription,
  projectDueDate,
  createNewProject,
  clickHandler,
}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={styles["new-project-container"]}>
      <form className={styles["new-project-form"]} onSubmit={createNewProject}>
        <label>Title</label>
        <input
          className={styles["text-input"]}
          ref={projectName}
          placeholder="What do you want to call your project?"
          required
          autoFocus
        />
        <label>Description</label>
        <input
          className={styles["text-input"]}
          type="text"
          ref={projectDescription}
          placeholder="What are the details of your project?"
          required
        />
        <label>Due Date</label>
        <input type="date" ref={projectDueDate} defaultValue={today} required />

        <div className={styles["button-container"]}>
          <button type="submit">Save</button>
          <button onClick={() => clickHandler(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;
