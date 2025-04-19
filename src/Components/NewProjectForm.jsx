import { useState } from "react";
import styles from "./NewProjectForm.module.css";

const NewProjectForm = ({ createNewProject, cancel }) => {
  const today = new Date().toISOString().split("T")[0];

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    dueDate: today,
    toDoItems: [],
  });

  return (
    <div className={styles["new-project-container"]}>
      <form
        className={styles["new-project-form"]}
        onSubmit={() => {
          createNewProject(newProject);
        }}
      >
        <label>Title</label>
        <input
          className={styles["text-input"]}
          value={newProject.title}
          onChange={(e) => {
            setNewProject({ ...newProject, title: e.target.value });
          }}
          placeholder="What do you want to call your project?"
          required
          autoFocus
        />
        <label>Description</label>
        <input
          className={styles["text-input"]}
          type="text"
          value={newProject.description}
          onChange={(e) => {
            setNewProject({ ...newProject, description: e.target.value });
          }}
          placeholder="What are the details of your project?"
          required
        />
        <label>Due Date</label>
        <input
          type="date"
          value={newProject.dueDate}
          onChange={(e) => {
            setNewProject({ ...newProject, dueDate: e.target.value });
          }}
          required
        />

        <div className={styles["button-container"]}>
          <button type="submit">Save</button>
          <button onClick={() => cancel(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;
