import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  // Fixed size
  const fixedSize = 300;

  // Generate QR Code URL when word or color changes
  useEffect(() => {
    if (word.trim() !== "") {
      setQrCode(
        `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(word)}&size=${fixedSize}x${fixedSize}&bgcolor=${bgColor}`
      );
    }
  }, [word, bgColor]);

  // On Generate button click
  function handleClick() {
    setWord(temp.trim());
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <div className="input-box">
        <div className="gen">
          <input
            type="text"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="Enter text to encode"
          />
          <button className="button" onClick={handleClick}>
            Generate
          </button>
        </div>

        <div className="extra">
          <h5>Background Color:</h5>
          <input
            type="color"
            onChange={(e) => setBgColor(e.target.value.substring(1))}
          />
        </div>
      </div>

      {qrCode && (
        <div className="output-box">
          <img src={qrCode} alt="QR Code" />
          <a href={qrCode} download="QRCode">
            <button type="button">Download</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
