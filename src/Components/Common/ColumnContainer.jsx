import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import DeleteIcon from '../../Assets/icons/delete';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import { useState } from 'react';
import Plus from '../../Assets/icons/plus';
import { propTypes } from 'react-bootstrap/esm/Image';
import { TaskCard } from './TaskCard';


const ColumnContainer = (props) => {
  
  const { column, deleteColumn, updateColumn, CreateTask, tasks, deleteTask } = props; // Use props directly, not this.props

  const [editMode, seteditMode] = useState(false)



  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable(
    {
      id: column.id,
      title:column.title,
      data: 
      {
        type: "Column",
        column
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
   return              <div className='columns' ref={setNodeRef} style={{...style,opacity:'0.5'}}>

   {/* Column title */}
   <div className='d-flex title gap-2 justify-content-between' {...attributes} {...listeners}>
     
     <div className='d-flex '> 
       <div className='d-flex px-2'>0 </div>
          <p style={{padding:'0'}}>{column.title} </p>  
             </div> <div className='d-flex '> 
             
             <Button  className='btn-sm' onClick={ () => deleteColumn(column.id)}><DeleteIcon/></Button></div>    
             
     </div>  </div>

 }



  


  return (
    <div className='columns' ref={setNodeRef} style={style}>

        {/* Column title */}
        <div className='d-flex title gap-2 justify-content-between' {...attributes} {...listeners} onClick={()=> seteditMode(true)}>
          
          <div className='d-flex '> 
            <div className='d-flex px-2'>0 </div>
               <p style={{padding:'0'}}>    
               
               {!editMode &&  column.title}    
               
               
               {editMode &&  <input value={column.title} autoFocus 
               onChange={e => updateColumn(column.id, e.target.value)} onBlur={(e)=> { seteditMode(false); column.title = e.target.value}} onKeyDown={(e)=> { if(e.key !== "Enter") return; seteditMode(false); column.title=e.target.value }}  >
                
                
                </input>}</p>  
                  </div> <div className='d-flex '> 
                  
                  <Button  className='btn-sm' onClick={ () => deleteColumn(column.id)}><DeleteIcon/></Button></div>    
                  
          </div>
        
        {/* Column Task container */}
        <div className='tasks'>
  {tasks.map(task => (
      <TaskCard key={task.id} task={task} deleteTask={deleteTask} />

  ))}
</div>

        {/* Column Footer */}
        <div className='d-flex justify-content-end' >

          <Button onClick={() => CreateTask(column.id)}> <Plus /> Add Task</Button>
          </div>

    </div>
  );
};

ColumnContainer.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired, // Make id required
    title: PropTypes.string.isRequired,
  }).isRequired,
  tasks: PropTypes.array.isRequired, // Update prop type to array

  deleteColumn: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  CreateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,


};


export default ColumnContainer;
