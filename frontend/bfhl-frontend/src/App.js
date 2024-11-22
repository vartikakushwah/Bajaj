// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [jsonInput, setJsonInput] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [filter, setFilter] = useState([]);

//   const handleSubmit = async () => {
//     try {
//       const parsedInput = JSON.parse(jsonInput);
//       const res = await fetch("http://localhost:3000/bfhl", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(parsedInput),
//       });
//       const data = await res.json();
//       setResponseData(data);
//     } catch (err) {
//       alert("Invalid JSON input");
//     }
//   };

//   const filteredResponse = () => {
//     if (!responseData) return null;
//     const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
//     const result = {};
//     if (filter.includes("Numbers")) result.numbers = numbers;
//     if (filter.includes("Alphabets")) result.alphabets = alphabets;
//     if (filter.includes("Highest Lowercase Alphabet"))
//       result.highest_lowercase_alphabet = highest_lowercase_alphabet;
//     return result;
//   };

//   return (
//     <div className="App">
//       <h1>BFHL Challenge</h1>
//       <textarea
//         rows="5"
//         cols="50"
//         placeholder='Enter JSON: {"data": ["A", "1", "b"]}'
//         value={jsonInput}
//         onChange={(e) => setJsonInput(e.target.value)}
//       />
//       <br />
//       <button onClick={handleSubmit}>Submit</button>
//       <br />
//       {responseData && (
//         <div>
//           <h2>Filters</h2>
//           <select
//             multiple
//             onChange={(e) =>
//               setFilter(
//                 Array.from(e.target.selectedOptions, (option) => option.value)
//               )
//             }
//           >
//             <option>Numbers</option>
//             <option>Alphabets</option>
//             <option>Highest Lowercase Alphabet</option>
//           </select>
//           <h2>Response</h2>
//           <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import "./App.css";

// app.use(cors({ origin: "http://your-frontend-domain.com" }));

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON input or server error.");
    }
  };

  const renderFilteredData = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const filteredData = {};
    if (filter.includes("Numbers")) filteredData.numbers = numbers;
    if (filter.includes("Alphabets")) filteredData.alphabets = alphabets;
    if (filter.includes("Highest Lowercase Alphabet"))
      filteredData.highest_lowercase_alphabet = highest_lowercase_alphabet;
    return filteredData;
  };

  return (
    <div className="App">
      <h1>Backend Integration</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON: {"data": ["A", "1", "b"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {response && (
        <>
          <h2>Filters</h2>
          <select
            multiple
            onChange={(e) =>
              setFilter(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option>Numbers</option>
            <option>Alphabets</option>
            <option>Highest Lowercase Alphabet</option>
          </select>
          <h2>Filtered Response</h2>
          <pre>{JSON.stringify(renderFilteredData(), null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default App;
