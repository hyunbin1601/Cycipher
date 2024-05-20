import { useEffect } from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./routes/home";
import Aes from "./routes/aes";
import Ascii from "./routes/asciieditor";
import B64 from "./routes/encodingeditor";
import Hash from "./routes/hasheditor";
import Xor from "./routes/xoreditor";
import Url from "./routes/encoding_url"
import Str from "./routes/stringeditor";
import axios from "axios";


function App() {
  useEffect(() => {
    axios.get("http://localhost:5000/")
    .then((res) => {
      console.log(res);
    })
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aes" element={<Aes />} />
      <Route path="/ascii" element={<Ascii />} />
      <Route path="/b64" element={<B64 />} />
      <Route path="/hash" element={<Hash />} />
      <Route path="/xor" element={<Xor />} />
      <Route path="/url" element={<Url />} />
      <Route path="/string" element={<Str />} />
    </Routes>
  );
}

export default App;