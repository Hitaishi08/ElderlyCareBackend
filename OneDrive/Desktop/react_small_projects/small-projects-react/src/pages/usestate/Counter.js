import React,{useState} from 'react';
function Counter(){
    const[count,setCount]=useState(0);
    const increment=()=>{setCount(count+1)};
    const decrement=()=>{ setCount(count-1)};
    const reset=()=>setCount(0);
    const getColor=()=>{
        if(count>10) return "red";
        else return "green";
    }
return (
    <div>
        <h1 style={{color:getColor()}}>{count}</h1>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    <button onClick={reset}>reset</button>
    </div>
)
};
export default Counter;