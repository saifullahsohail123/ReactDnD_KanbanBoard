import { Button, Container } from "react-bootstrap"
import Plus from '../Assets/icons/plus'
import { useMemo, useState } from "react"
// import   Columns  from "./Common/types";
import { Row } from 'react-bootstrap';
import ColumnContainer from "./Common/ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";


const Tasks = [
  { id: '', columnId: '', content: '' },
  // You can keep the structure empty or with default values if needed
];

const Columns = [
  {id: null, title:null }

]



export const KanbanBoard = () => {



  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint:{
        distance: 3, // 3px distance the drag event works
      }

    })

  )

  

  // Delete Function
  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)

  }

  // Delete Task
  function deleteTask(taskId)
  {
    const Newtasks = tasks.filter((task) => task.id !== taskId)

    setTasks(Newtasks)
  }


  // Update function left
  function  updateColumn(id, title) {
    const newColumns = columns.map((col) =>
    {
      if(col.id !==id) return col;
      return {...col, title}
    })




    setColumns(newColumns)
    
    console.log("Update occured")
    columns.forEach(col =>
      {
        console.log(`Updated Col: ${col.id} ${col.title}`)
      }
    )
    


  }


  function updateTask(id, desc) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) 
        return task;
      
      return { ...task, desc };
    });
  
    setTasks(newTasks);
  }
  
 
  // Setting Tasks
  const[tasks, setTasks] = useState([])
  

  // Setting Columns
  const [columns, setColumns] = useState([]);
  console.log(columns)
  const [activeColumn, setactiveColumn] = useState(columns | null)


  const columnsID = useMemo(() => columns.map((col) => col.id), [columns])

  // Create Columns
  function CreateColumn() {
    const newColumn = {
      id: generatedId().toString(),
      title: `Column ${columns.length + 1}`,

    };


    setColumns([...columns, newColumn]);

  }

  //  Create Task
function CreateTask(colId)
{
  const newTask = {

    id: generatedId().toString(),
    columnId: colId,
    content: `Task ${tasks.length + 1}`,

  }

  setTasks([...tasks,newTask])

  tasks.forEach(task=>   console.log(`New task created id: ${task.id} colId: ${task.columnId} content: ${task.content}`)
)


}





  
  // Genearete random ID
  function generatedId() {
    return Math.floor(Math.random() * 1000)
  }

// Drag Started
function DragStart(event) {
  console.log('Drag Event Started');
  const { active } = event;
  if (active && active.data && active.data.current && active.data.current.type === "Column") {
    setactiveColumn(active.data.current.column);
  }
}

// function DragEnd (event)
// {
//   const {active, over} = event;

//   if(!over) return;

//   const activeColumnId = active.id;
//   const overColumnID = over.id;


//   if(activeColumnId === overColumnID)
//     return;

// setColumns(columns => {
//   const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
//   const overColumnIndex = columns.findIndex(col => col.id === overColumnID);

//   return arrayMove(columns, activeColumnIndex, overColumnIndex);


// });}



function DragEnd(event) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const activeColumnId = active.id;
  const overColumnId = over.id;

  setColumns(columns => {
    const updatedColumns = [...columns];
    const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
    const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

    // Swap the positions of the active and d columns
    [updatedColumns[activeColumnIndex], updatedColumns[overColumnIndex]] = [updatedColumns[overColumnIndex], updatedColumns[activeColumnIndex]];

    return updatedColumns;
  });
}


  // Component Start
  return (
    <div className="kanban">


      <DndContext sensors={sensors} onDragStart={DragStart} onDragEnd={DragEnd}>
        <div className="boards d-flex">
          <Container>

            <Row>

              <SortableContext items={columnsID}>
                {columns.map((column, index) =>

                (<div className="d-flex w-auto" key={index}>
                  <ColumnContainer key={column.id} column={column} deleteColumn={deleteColumn}  
                  updateColumn= {updateColumn} CreateTask={CreateTask} 
                  tasks={tasks.filter((task => task.columnId === column.id))}
                  deleteTask={deleteTask} updateTask ={updateTask}
                  
                  />

                </div>)

                )}

              </SortableContext>

            </Row>
          </Container>



          <div className="AddColumn">
            <Button className="rounded-sm" onClick={CreateColumn}><Plus />Add Column</Button>
          </div>





    </div>

    
    { createPortal (< DragOverlay >
            { activeColumn && (
              <ColumnContainer column={activeColumn} deleteColumn={deleteColumn}
              updateColumn={updateColumn} CreateTask={CreateTask} 
              tasks={tasks.filter((task => task.columnId === activeColumn.id))}
              deleteTask={deleteTask} updateTask={updateTask}/>

            )


          }

        </DragOverlay>, document.body
        )
        
        }
       </DndContext >
  

    </div >
  )
}
