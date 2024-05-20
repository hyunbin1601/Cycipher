import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div>
                홈 화면 입니다.
            </div>
            <div>
                <a href="/aes">aes 암/복호화</a>
            </div>
        </>
    );
};

export default Home;