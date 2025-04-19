import { useState } from "react";

const ProjectItem = ({ item, projectData, updateProject, type }) => {
  const itemKey = Object.keys(item)[0];
  const [isEditing, setIsEditing] = useState(false);
  const [itemValue, setItemValue] = useState(item[itemKey]);

  function editProject(projectId, updatedProject) {
    updateProject(projectId, updatedProject);
    setIsEditing(false);
  }

  const info =
    itemKey === "title" ? (
      <h2 onClick={() => setIsEditing(true)}>
        {type === "date" ? new Date(itemValue).toDateString() : itemValue}
      </h2>
    ) : (
      <p onClick={() => setIsEditing(true)}>
        {type === "date" ? new Date(itemValue).toDateString() : itemValue}
      </p>
    );

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            value={itemValue}
            onChange={(event) => setItemValue(event.target.value)}
            type={type}
          />{" "}
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          <button
            onClick={() =>
              editProject(projectData._id, {
                ...projectData,
                [itemKey]: itemValue,
              })
            }
          >
            Save
          </button>
        </div>
      ) : (
        info
      )}
    </div>
  );
};

export default ProjectItem;
