import React,{useState} from 'react';
function TodoList(){
    const [task,setTask]=useState([]);
    const [newtask,setNewtask]=useState("");
    const addTask=()=>{
        if(newtask){
            setTask([...task,{id:Date.now(),text:newtask,status:false}]);
        }
        setNewtask("");
    };
    const toggleTask = (taskId) => {
        setTask(task.map(t =>
          t.id === taskId ? { ...t, status: !t.status } : t
        ));
      };
    const removeTask=(taskId)=>{
        setTask(task.filter(task=>task.id!==taskId))
    };
    return(
        <>
        <h1>to do list</h1>
        <input type="text" value={newtask} onChange={(e)=>setNewtask(e.target.value)} placeholder="Add a new task"
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}/>
        <button onClick={addTask}>add</button>
        <ul style={{ padding: "0", listStyle: "none" }}>
        {task.map(task => (
          <li key={task.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px"}}>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
        </>

    )
};
export default TodoList;