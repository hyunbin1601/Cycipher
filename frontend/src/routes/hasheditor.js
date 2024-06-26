//해시화, 해시는 단방향 암호화, 크랙은 일부 사례에서만 가능
//sha256, md5만 구현 예정
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const HashEditor = () => {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [shaString, setShaString] = useState("");
    const [mdString, setMdString] = useState("");

    useEffect(() => {
        setText1("");  
        setText2(""); 
    }, [])

    const sha256Hash = async() => {
        try {
            const res = await axios.post('http://localhost:5000/hash/sha256', {'hash1': text1}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShaString(res.data.result);
        } catch (error) {
            console.error(error);
        }
    }

    const md5Hash = async() => {
        try {
            const res = await axios.post('http://localhost:5000/hash/md5', {'hash2': text2}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMdString(res.data.result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <div>
            <h1>
                sha256 해시
            </h1>
            <div>
                <input type="text" value={text1} onChange={(e) => setText1(e.target.value)} />
                <button onClick={sha256Hash}>변환</button>
            </div>
            <div>
                <p>결과: </p>
                <p>{shaString}</p>
            </div>
        </div>
        <div id ="white-space"></div>
        <div>
            <h1>
                md5 해시
            </h1>
            <div>
                <input type="text" value={text2} onChange={(e) => setText2(e.target.value)} />
                <button onClick={md5Hash}>변환</button>   
            </div>
            <div>
                <p>결과: </p>
                <p>{mdString}</p>
            </div>
        </div>
        </>
    );
};

export default HashEditor;