//base64 인코딩, 디코딩
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const EncodingEditor = () => {
    const [plainText, setPlainText] = useState("");  //인코딩하고자 하는 문자열 입력
    const [encodedText, setEncodedText] = useState(""); //디코딩하고자 하는 문자열 입력
    const [encodeText, setEncodeText] = useState("");
    const [decodeText, setDecodeText] = useState("");

    useEffect(() => {
        setPlainText("");  
        setEncodedText(""); 
    }, [])

    const encodingText = async() => {
        try {
            const res = await axios.post('http://localhost:5000/b64/encode', {'b64EncodeString': plainText}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setEncodeText(res.data.result);
        } catch (error) {
            console.error(error);
        }
    }

    const decodingText = async() => {
        try {
            const res = await axios.post('http://localhost:5000/b64/decode', {'b64EncodeString': encodedText}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDecodeText(res.data.result);
            } catch (error) {
                console.error(error);
            }
        }

    return (
        <>
        <div>
            <h1>
                base 64 인코딩
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
                base 64 디코딩
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

export default EncodingEditor;