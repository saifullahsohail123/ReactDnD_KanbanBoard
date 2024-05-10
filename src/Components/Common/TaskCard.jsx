/* eslint-disable react/prop-types */

import { useState } from "react"
import DeleteIcon from "../../Assets/icons/delete"
import { Button } from "react-bootstrap"



// export const TaskCard = ({task}) => { //another way

export const TaskCard = ({task, deleteTask, updateTask}) => {







  

  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(task.content);
  const [mouseOver, setMouseOver] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseOver(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleBlur = () => {
    // Update task content when blurring out of the textarea
    updateTask(task.id, content);
    toggleEditMode();
  };
  
  

  return (
    <div className="task" onClick={toggleEditMode} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      {editMode ? (
        <textarea
          name=""
          id=""
          placeholder="Task content here"
          value={content}
          autoFocus
          onBlur={handleBlur}
          onChange={handleContentChange}
        />
      ) : (
        <span>{content}</span>
      )}

      {mouseOver && <Button onClick={() => deleteTask(task.id)}> <DeleteIcon/></Button>}
    </div>
  );
};

