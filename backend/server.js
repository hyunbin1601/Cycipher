const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
const crypto = require('crypto');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log("Hello World");
})

app.post("/aes/encryption", (req, res) => {
    const {aesString, aecKey} = req.body;
    let encryptedText = (crypto.createCipheriv('aes-256-cbc', aecKey, Buffer.alloc(16, 0))).update(aesString, 'utf8', 'base64');
    encryptedText += (crypto.createCipheriv('aes-256-cbc', aecKey, Buffer.alloc(16, 0))).final('base64');
    res.send({'result': encryptedText});
});
app.post("/aes/decryption", (req, res) => {
    const {decString, decKey} = req.body;
    let decryptedText = (crypto.createDecipheriv('aes-256-cbc', decKey, Buffer.alloc(16, 0))).update(decString, 'base64', 'utf8');
    decryptedText += (crypto.createDecipheriv('aes-256-cbc', decKey, Buffer.alloc(16, 0))).final('utf8');
    res.send({'result': decryptedText});
});
app.post("/ascii/toAscii", (req, res) => {    //decimal to ascii, 범위는 아스키 코드 0~127 이내
    const decString = req.body.toString();
    let transformedAscii = String.fromCharCode(decString);  //10진수를 변환해서 아스키 코드로 저장
    res.send({'result': transformedAscii});
});
app.post("/ascii/toDec", (req, res) => {  //ascii to decimal
    const asciiString = req.body; //ascii를 받음
    let transformedDec = "";
    for(let i = 0; i < asciiString.length; i++){
        transformedDec += asciiString.charCodeAt(i);  //아스키 코드를 10진수로 변경
    };
    res.send({'result': transformedDec});
});
app.post("/b64/encode", (req, res) => {
    const b64EncodeString = req.body;
    const b64EncodedText = Buffer.from(b64EncodeString, "utf8").toString('base64');
    res.send({'result': b64EncodedText});
});
app.post("/b64/decode", (req, res) => {
    const b64DecodeString = req.body;
    const b64DecodedText = Buffer.from(b64DecodeString, 'base64').toString('utf8');
    res.send({'result': b64DecodedText});
});
app.post("/url/encode", (req, res) => {   //url encoding, 특정 문자를 인코딩함
    const urlEncodeString = req.body;
    const urlEncodedString = encodeURIComponent(urlEncodeString);
    res.send({'result': urlEncodedString});
});
app.post("/url/decode", (req, res) => {   //url decoding, 특정 문자를 디코딩함
    const urlDecodeString = req.body;
    const urlDecodedString = decodeURIComponent(urlDecodeString);
    res.send({'result': urlDecodedString});
});

app.post("/string/length", (req, res) => {   //url encoding, 특정 문자를 인코딩함
    console.log("string length");
    const {text} = req.body;
    const stringLength = text.length;
    res.send({'result': stringLength});
});
app.post("/string/changebig", (req, res) => {   //url decoding, 특정 문자를 디코딩함
    const {text} = req.body;
    const stringToBig = text.toUpperCase();
    res.send({'result': stringToBig});
});
app.post("/string/changesmall", (req, res) => {   //url decoding, 특정 문자를 디코딩함
    const {text} = req.body;
    const stringToSmall = text.toLowerCase();
    res.send({'result': stringToSmall});
});
app.post("/hash/sha256", (req, res) => {   //sha256 해시
    const hash1 = req.body;
    const sha256Hash = crypto.createHash('sha256').update(hash1).digest('hex');
    res.send({"result": sha256Hash});
});
app.post("/hash/md5", (req, res) => {   //md5 해시
    const hash2 = req.body;
    const md5Hash = crypto.createHash('md5').update(hash2).digest('hex');
    res.send({"result": md5Hash});
});
app.post("/xor/binary", (req, res) => {   //2진수 xor 연산 -> 기본적으로 2진수로 변환 후에 연산하고, 그 결과도 2진수로 바꿨음
    const {binString1, binString2} = req.body;
    let xorBinResult = (parseInt(binString1, 2) ^ parseInt(binString2, 2)).toString(2);
    res.send({"result" : xorBinResult})
});

app.post("/xor/hex", (req, res) => {  //16진수 xor 연산 -> 기본적을 16진수로 변환 후에 연산하고, 그 결과도 16진수로 바꿨음
    const {hexString1, hexString2} = req.body;
    try {
        res.send({"result": (parseInt(hexString1, 16) ^ parseInt(hexString2, 16)).toString(16)})
    }
    catch(err) {
        res.status(500).send({ message: 'Error creating xor Result' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})