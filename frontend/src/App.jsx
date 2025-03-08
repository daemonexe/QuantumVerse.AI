import { useState } from 'react';
import './App.css';
import Icon from "./assets/logo.png"

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async() => {
    if (inputValue.trim() !== '') {
      console.log("User input:", inputValue);

      try{
        const response = await fetch("http://localhost:5000/search", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ movieName: inputValue }),
        })
        const data = await response.json();
        console.log("Response from server:", data);
      } catch{
        console.log("error")
      }

    }

    setInputValue(''); 

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
    <div className='lp'>
      <div className='content'>
      <img className="logo" src={Icon}></img>

      <h1 className='name'> Quantom <span style={{ textDecoration: 'underline' }}>Flicks</span>.AI </h1>
    <p> AI-powered platform that automatically generates fan pages for movies and TV shows. </p>

      {/* Input Field with Enter Key Support */}
      <input className='input'
        type="text" 
        placeholder="Enter a movie or TV show name..." 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        onKeyPress={handleKeyPress} 
      />

      <button onClick={handleSubmit}>Generate</button>


      </div>



    </div>

    </>
  );
}

export default App;
