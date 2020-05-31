import React from 'react';
import logo from './logo.svg';
import './App.css';

const fetchTestDatas = function () {
  fetch('/api/v1/routes')
    .then(res => res.json())
    .then((response) => { console.log("Test datas response", response); })
    .catch((error) => { console.log("Error while fetching test datas", error); })
}

function App() {
  return (
    <div className="App">
      <h1>Bus arrival dashboard</h1>
      <button onClick={fetchTestDatas}>
        Fetch Test Datas
      </button>
    </div>
  );
}

export default App;
