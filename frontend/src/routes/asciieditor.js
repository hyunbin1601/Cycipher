//10진수 -> 아스키 / 아스키 -> 10진수
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const AsciiEditor = () => {
    const [decString, setDecString] = useState("");
    const [asciiString, setAsciiString] = useState("");
    const [decToAscii, setDecToAscii] = useState("");
    const [asciiToDec, setAsciiToDec] = useState("");

    useEffect(() => {
        setAsciiToDec("");  
        setDecToAscii(""); 
    }, [])

    const asciiToDecEditor = async() => {
        await axios.post('http://localhost:5000/ascii/toDec', asciiString)
        .then((res) => {
            setAsciiToDec(res.data);
        });
    }


    const DecToAsciiEditor = async() => {
        await axios.post('http://localhost:5000/ascii/toAscii', decString)
        .then((res) => {
            setDecToAscii(res.data);
        });
    }

    return (
        <>
        <div>
            <h1>
                아스키 10진수 변환
            </h1>
            <div>
                <input type="text" value={asciiString} onChange={(e) => setAsciiString(e.target.value)} />
                <button onClick={asciiToDecEditor}>변환</button>
            </div>
            <div>
                <p>결과: </p>
                <p>{asciiToDec}</p>
            </div>
        </div>
        <div id ="white-space"></div>
        <div>
            <h1>
                10진수 아스키 변환
            </h1>
            <div>
                <input type="text" value={decString} onChange={(e) => setDecString(e.target.value)} />
                <button onClick={DecToAsciiEditor}>변환</button>   
            </div>
            <div>
                <p>결과: </p>
                <p>{decToAscii}</p>
            </div>
        </div>
        </>
    );
};

export default AsciiEditor;