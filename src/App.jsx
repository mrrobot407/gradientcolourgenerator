import React, { useState, useEffect } from 'react';
import './app.css'; // Ensure this CSS file exists and contains the necessary styles

function App() {
 const [color1, setColor1] = useState('#fd1d1d');
 const [color2, setColor2] = useState('#fcb045');
 const [currentGradient, setCurrentGradient] = useState('');
 const [isCopied, setIsCopied] = useState(false);
 const [gradientDirection, setGradientDirection] = useState('to right');
 const [toastMessage, setToastMessage] = useState('');

 useEffect(() => {
    document.body.style.transition = 'background 0.5s ease-in-out';
 }, []);

 useEffect(() => {
    const gradient = `linear-gradient(${gradientDirection}, ${color1}, ${color2})`;
    setCurrentGradient(gradient);
    document.body.style.background = gradient;
 }, [color1, color2, gradientDirection]);

 const handleColorChange = (e, setColor) => {
    setColor(e.target.value);
 };

 const saveGradient = () => {
    const gradient = `linear-gradient(${gradientDirection}, ${color1}, ${color2})`;
    navigator.clipboard.writeText(gradient);
    setIsCopied(true);
    setToastMessage('Copied!'); // Set the toast message
    setTimeout(() => {
      setIsCopied(false);
      setToastMessage(''); // Clear the toast message after 3 seconds
    }, 3000);
 };

 const handleDirectionChange = (direction) => {
    setGradientDirection(direction);
 };

 const generateRandomGradient = () => {
    const newColor1 = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random hex color
    const newColor2 = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random hex color
    const gradient = `linear-gradient(45deg, ${newColor1}, ${newColor2})`;
    setCurrentGradient(gradient);
    document.body.style.background = gradient;
 };

 const ToastMessage = ({ message }) => {
    const toastStyle = {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      opacity: message ? 1 : 0,
      visibility: message ? 'visible' : 'hidden',
      transition: 'opacity 0.5s, visibility 0.5s',
    };

    return (
      <div style={toastStyle}>
        {message}
      </div>
    );
 };

 return (
  <>
    <div className="App main-div" style={{ textAlign: 'center', height: '100vh' }}>
      <div className="container">
        <input type="color" value={color1} onChange={(e) => handleColorChange(e, setColor1)} style={{ marginRight: '10px' }} />
        <input type="color" value={color2} onChange={(e) => handleColorChange(e, setColor2)} />
        <br />
        <button className='glass-button' onClick={generateRandomGradient} style={{ marginTop: '20px', marginRight: '10px' }}>Generate Random Gradient</button>
      
        <button className='glass-button' onClick={generateRandomGradient} style={{ marginTop: '20px', marginRight: '10px' }}>Generate Spiral Gradient</button>
        <button className='glass-button save-btn' onClick={saveGradient} style={{ marginTop: '20px' , marginRight: '10px' }}>Save Gradient</button>
        <div style={{ marginTop: '20px' }}>
          <button className='gradstyle-button glass-button' onClick={() => handleDirectionChange('to right')}>Left to Right</button>
          <button className='gradstyle-button glass-button' onClick={() => handleDirectionChange('to left')}>Right to Left</button>
          <button className='gradstyle-button glass-button' onClick={() => handleDirectionChange('to bottom')}>Top to Bottom</button>
          <button className='gradstyle-button glass-button' onClick={() => handleDirectionChange('to top')}>Bottom to Top</button>
        </div>
        <div className='savegrad' style={{ marginTop: '20px' }}>
          Background: {currentGradient}
        </div>
       
    
   
       
      </div>
      {toastMessage && <ToastMessage message={toastMessage} />}
      <p className='p-h'>Created by  <a href="https://aryanchalotra.10n20.in/">Aryan chalotra</a></p>
    </div>
  
    </>
 );
}

export default App;
