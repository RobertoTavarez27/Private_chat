import React from 'react';
import Sidebar from './Sidebar.jsx';
import Chat from './Chat.jsx';
import './Stylechat.css';

const Home = () => {
    return (
        <div className='home'>
<div className="container">
    <Sidebar/>
    <Chat/>
</div>
        </div>
    )
}

export default Home;