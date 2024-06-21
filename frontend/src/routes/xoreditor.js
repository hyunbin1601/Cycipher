//자동 xor 연산 계산기, 16진수랑 2진수 이 2개만 지원됨
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const XorEditor = () => {
    const [hexString, setHexString] = useState({'hexString1': "", 'hexString2': ""});  //16진수 입력
    const [binString, setBinString] = useState({'binString1': "", 'binString2': ""});  //2진수 입력
    const [xorHex, setXorHex] = useState("");
    const [xorBin, setXorBin] = useState("");

    useEffect(() => {
        setHexString({'hexString1': "", 'hexString2': ""});
        setBinString({'binString1': "", 'binString2': ""});
    }, [])

    const xorHexCalculate = async() => {
        try {
            const res = await axios.post('http://localhost:5000/xor/hex', hexString, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setXorHex(res.data.result);
        }
        catch (error) {
            console.error(error);
        }
    }

    const xorBinCalculate = async() => {
        try {
            const res = await axios.post('http://localhost:5000/xor/binary', binString, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setXorBin(res.data.result);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <div>
            <h1>
                16진수 xor 연산
            </h1>
            <div>
                <input type="text" value={hexString.hexString1} onChange={(e) => setHexString(...hexString, {'hexString1':e.target.value})} />
            </div>
            <p>xor</p>
            <div>
                <input type="text" value={hexString.hexString2} onChange={(e) => setHexString(...hexString, {'hexString2': e.target.value})} />
            </div>
            <div><button onClick={xorHexCalculate}>xor 연산</button></div>
            <div>
                <p>결과: </p>
                <p>{xorHex}</p>
            </div>
        </div>
        <div id ="white-space"></div>
        <div>
            <h1>
                이진수 xor 연산
            </h1>
            <div>
                <input type="text" value={binString.binString1} onChange={(e) => setBinString(...binString, {'binString1':e.target.value})} />
            </div>
            <p>xor</p>
            <div>
                <input type="text" value={binString.binString2} onChange={(e) => setBinString(...binString, {'binString2':e.target.value})} />
            </div>
            <div><button onClick={xorBinCalculate}>변환</button></div>
            <div>
                <p>결과: </p>
                <p>{xorBin}</p>
            </div>
        </div>
        </>
    );
};

export default XorEditor;