//url 인코딩, 디코딩
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const EncodingUrlEditor = () => {
    const [plainText, setPlainText] = useState("");  //인코딩하고자 하는 문자열 입력
    const [encodedText, setEncodedText] = useState(""); //디코딩하고자 하는 문자열 입력
    const [encodeText, setEncodeText] = useState("");
    const [decodeText, setDecodeText] = useState("");

    useEffect(() => {
        setPlainText("");  
        setEncodedText(""); 
    }, [])

    const encodingText = async() => {
        await axios.post('http://localhost:5000/url/encode', plainText)
        .then((res) => {
            setEncodeText(res.data);
        });
    }

    const decodingText = async() => {
        await axios.post('http://localhost:5000/url/decode', encodedText)
        .then((res) => {
            setDecodeText(res.data);
        });
    }

    return (
        <>
        <div>
            <h1>
                url 인코딩
            </h1>
            <div>
                <input type="text" value={plainText} onChange={(e) => setPlainText(e.target.value)} />
                <button onClick={encodingText}>변환</button>
            </div>
            <div>
                <p>결과: </p>
                <p>{encodeText}</p>
            </div>
        </div>
        <div id ="white-space"></div>
        <div>
            <h1>
                url 디코딩
            </h1>
            <div>
                <input type="text" value={encodedText} onChange={(e) => setEncodedText(e.target.value)} />
                <button onClick={decodingText}>변환</button>   
            </div>
            <div>
                <p>결과: </p>
                <p>{decodeText}</p>
            </div>
        </div>
        </>
    );
};

export default EncodingUrlEditor;