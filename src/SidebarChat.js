import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./SidebarChat.css";
import {Link} from 'react-router-dom'

function SidebarChat({ id, name, addNewChat }) {
  
  const [Dp, setDp] = useState("");
  const [messages, setMessages] = useState('');

  useEffect(() => {

    if(id) {
        db.collection('rooms').doc(id).onSnapshot(snapshot => (
            
            setDp(snapshot.data().dp)
        ));
        db
        .collection("rooms")
        .doc(id)
        .collection('messages')
        .orderBy("timestamp", 'desc')
        .onSnapshot((snapshot) => (
            setMessages(snapshot.docs.map((doc) => doc.data()))
        ));
    }
  
}, [id])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    var no= Math.floor(Math.random() * 5000);
    
    if (roomName) {
      // do some clever database stuff
      
      db.collection("rooms").add({
        name: roomName,
        dp:no,
      });
    }
  };
  
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${Dp}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
