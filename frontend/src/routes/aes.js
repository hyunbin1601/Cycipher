import React, {useState, useEffect} from 'react';
import axios from 'axios';
//aes256 암호화는 키 값과 초기호 벡터를 필요로 한다...! 따로 key, 초기화 벡터 입력받기

const Aes = () => {
    const [aesString, setAesString] = useState({
        aes : "",
        aesKey : ""
    });
    const [decString, setDecString] = useState({
        dec : "",
        decKey : ""
    });
    const [aesEncode, setAesEncode] = useState("");
    const [aesDecode, setAesDecode] = useState("");

    useEffect(() => {
        setAesString({'aes' : "", 'aesKey' : ""});  
        setDecString({'dec' : "", 'decKey' : ""}); 
    }, [])

    const aesEncodings = async() => {
        await axios.post('http://localhost:5000/aes/encryption', aesString)
        .then((res) => {
            setAesEncode(res.data);
        });
    }


    const aesDecodings = async() => {
        await axios.post('http://localhost:5000/aes/decryption', decString)
        .then((res) => {
            setAesDecode(res.data);
        });
    }

    return (
        <>
        <div>
            <h1>
                aes 암호화
            </h1>
            <div>
                <input type="text" value={aesString.aesKey} onChange={(e) => setAesString(...aesString, {'aesKey' : e.target.value})} />
                <input type="text" value={aesString.aes} onChange={(e) => setAesString(...aesString, {'aes' : e.target.value})} />
                <button onClick={aesEncodings}>암호화</button>
            </div>
            <div>
                <p>결과: </p>
                <text>{aesEncode}</text>
            </div>
        </div>
        <div id ="white-space"></div>
        <div>
            <h1>
                aes 복호화
            </h1>
            <div>
                <input type="text" value={decString.decKey} onChange={(e) => setDecString(...decString, {'decKey' : e.target.value})} />
                <input type="text" value={decString.dec} onChange={(e) => setDecString(...decString, {'dec' : e.target.value})} />
                <button onClick={aesDecodings}>복호화</button> 
            </div>
            <div>
                <p>결과: </p>
                <p>{aesDecode}</p>
            </div>
        </div>
        </>
    );
};

export default Aes;