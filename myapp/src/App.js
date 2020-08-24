import React, { Component, useState, useEffect } from 'react';
import './App.css';
// import ReactTable from "react-table";  
// import "react-table/react-table.css";  

function App() {

  const [data,setdata] = useState([])
  const [originaldata,setoriginaldata] = useState([])
  const [nameFilter,setNameFilter] = useState("")
  const [ageFilter,setAgeFilter] = useState("")

  const inputChanged = (e,inputType) =>{
    if(inputType=='name'){
      setNameFilter(e.target.value);
      setdata(originaldata.filter(item=>{
        return item.name.includes(e.target.value);
      }))
    }
    else if(inputType=='age'){
      setAgeFilter(e.target.value);
      setdata(originaldata.filter(item=>{
        return item.age.includes(e.target.value);
      }))
    }
  }


  useEffect(() =>{
    fetch('/data',{method:"post"}).then(res=>res.json()).then(result=>{
          setdata(result.result)
          setoriginaldata(result.result)
      })
  },[])

  return (
    <div className="App">
     <table>
     <tr>
	    <th><input type="text" value={nameFilter} onChange={e=>inputChanged(e,"name")}/></th>
	    <th><input type="text" value={ageFilter} onChange={e=>inputChanged(e,"age")}/></th>
    </tr>
    {data.map(item =>{
      return (
	<tr>
    <td>{item.name}</td>
		<td>{item.age}</td>
	</tr>)
})
}
     </table>
    </div>
  );
}

export default App;
