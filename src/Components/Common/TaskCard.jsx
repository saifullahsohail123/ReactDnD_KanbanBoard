/* eslint-disable react/prop-types */

import { useState } from "react"
import DeleteIcon from "../../Assets/icons/delete"
import { Button } from "react-bootstrap"



// export const TaskCard = ({task}) => { //another way

export const TaskCard = ({task, deleteTask}) => {

  const [MouseOver,setMouseOver] =useState(false)
  const [editMode, seteditMode] = useState(false)

  
  

    // const {task} =  Props
        
  return (
    // display icon only if the edit mode is false
    <div className="task"  onMouseEnter={!editMode ? ()=> setMouseOver(true) : undefined} onMouseLeave={!editMode ? ()=> setMouseOver(false) : undefined}>
      
      {/* <textarea name="" id="" value={task.content} autoFocus placeholder="Task content here" onBlur={() => seteditMode(true)}>
      </textarea> */}
        

        {task.content}

    
     {MouseOver &&  (<Button onClick={()=> deleteTask(task.id)}> <DeleteIcon/></Button>) } 
      </div>
  )
}


