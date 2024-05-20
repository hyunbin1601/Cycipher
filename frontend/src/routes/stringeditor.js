//문자열 세기, 대소문자 변환
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const StringEditor = () => {
    const [text1, setText1] = useState("");
    const [textLength, setTextLength] = useState("");
    const [text2, setText2] = useState("");
    const [changeCase, setChangeCase] = useState("");

    useEffect(() => {
        setText1("");  
        setText2(""); 
    }, [])

    const stringLength = async() => {
        await axios.post('http://localhost:5000/string/length', text1)
        .then((res) => {
            setTextLength(res.data);
        });
    }


    const smallToBig = async() => {
        await axios.post('http://localhost:5000/string/changebig', text2)   //그냥 백엔드 단에서 모든 문자열을 대문자로 바꾸고 반환, toUpperCase()
        .then((res) => {
            setChangeCase(res.data);
        });
    }

    const bigToSmall = async() => {
        await axios.post('http://localhost:5000/string/changesmall', text2)  //toLowerCase()
        .then((res) => {
            setChangeCase(res.data);
        });
    }

    return (
        <>
        <div>
            <h1>
                문자열 세기
            </h1>
            <div>
                <input type="text" value={text1} onChange={(e) => setText1(e.target.value)} />
                <button onClick={stringLength}>변환</button>
            </div>
            <div>
                <p>결과: </p>
                <p>{textLength}</p>
            </div>
        </div>
        <div id ="white-space"></div>
        <div>
            <h1>
                대소문자 변환
            </h1>
            <div>
                <input type="text" value={text2} onChange={(e) => setText2(e.target.value)} />
                <button onClick={smallToBig}>대문자 변환</button>
                <button onClick={bigToSmall}>소문자 변환</button>   
            </div>
            <div>
                <p>결과: </p>
                <p>{changeCase}</p>
            </div>
        </div>
        </>
    );
};

export default StringEditor;