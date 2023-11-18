import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import {v4 as uuid} from "uuid";
const Input = () => {
  const [text,setText] = useState("");
  const [img, setImg] = useState (null);
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const handleSend = async () =>{
await updateDoc(doc(db,"chats", data.chatId),{
  messages:arrayUnion({
id: uuid(),
text,
senderId:currentUser.uid,
date:Timestamp.now(),
  }),
});
await updateDoc(doc(db,"usersChats",currentUser.uid),{
  [data.chatId + ".lastMessage"]:{
    text
  },
  [data.chatId + ".date"]: serverTimestamp (),
  });
  await updateDoc(doc(db,"usersChats",data.user.uid),{
    [data.chatId + ".lastMessage"]:{
      text
    },
    [data.chatId + ".date"]: serverTimestamp (),
  });
  setText("");
};
  
  return (
    <div className='inputn'>
      <input type='text' placeholder='Type Something...' onChange={(e)=>setText(e.target.value)} value={text}/>
      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
