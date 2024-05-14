/* eslint-disable react/prop-types */

import { useState } from "react"
import DeleteIcon from "../../Assets/icons/delete"
import { Button } from "react-bootstrap"
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"



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
  
  
  // tasks setting reference, attributesm listeners, transitions and is Dragging to check if a task is getting dragged
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable(
    {
      id: task.id,
      // title:task.title,
      data: 
      {
        type: "Task",
        task
      },
      disabled:editMode,
    }

  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if(isDragging)
{
  return(
    <div className="task" onClick={toggleEditMode} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}           ref={setNodeRef} style={{background:'rose',opacity:'0.5'}}> 


    
    
     </div>
  )
}

  return (
    <div className="task" onClick={toggleEditMode} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}           ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}>
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

