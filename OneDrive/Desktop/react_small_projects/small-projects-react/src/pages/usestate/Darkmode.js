import React,{useState} from 'react'

function Darkmode() {
    const [dark,setDark]=useState(false);
    const setdarkmode=()=>{
        setDark(prevMode=>!prevMode);
    };
    const appStyle={
        backgroundColor:dark?'#121212' : '#f0f0f0',
        color:dark?'#ffffff' : '#000000',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
    }

  return (
    <div style={appStyle}>
    <h1>{dark? '🌙 Dark Mode' : '☀️ Light Mode'}</h1>
    <button onClick={setdarkmode}>
      Toggle Mode
    </button>
  </div>
  )
}

export default Darkmode;