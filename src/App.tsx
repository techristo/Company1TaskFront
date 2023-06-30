import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Data {
  id:number;
  model:string;
  tank:string;
  price:string;
}





function App() {
  const [data, setData] = useState<Data[]>([]);
  const [model, setModel] = useState("");
  const [tank, setTank] = useState("");
  const [refresh, setRefresh] = useState(0);
  

  const handleSubmit = (event:any) => {
    event.preventDefault();
    
    axios.post('http://localhost:8080/cars/add', {
        params: {
          model: model,
          tank: tank,
         },
      });
      setRefresh(1);
  }

  useEffect(() => {
    
    axios.get('http://localhost:8080/cars/all')
    .then(response => {
      setData(response.data); // Update state with the received data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    

    setRefresh(2);
  }, [refresh]);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <label>Model:
        <input 
          type="text" 
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </label>
      <label>Tank Quantity in Litters:
        <input 
          type="text" 
          value={tank}
          onChange={(e) => setTank(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form><br/>
    <h1>Received Data:</h1>
      <ul>
        {data.map(item => ( <div>
          <li key={item.id}>{item.model}</li>
          <li key={item.id}>{item.tank}</li>
          <li key={item.id}>{item.price}</li>
          </div>
          ))}
      </ul>

    </div>
  );
}

export default App;
