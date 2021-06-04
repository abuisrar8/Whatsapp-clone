import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import IconButton from '@material-ui/core/IconButton';
import {SearchOutlined , AttachFile  } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {
    const [seed, setseed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setmessages] = useState([]);
    const [{  user  }, dispatch] = useStateValue();

    useEffect(() => {

        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setroomName(snapshot.data().name),
                setseed(snapshot.data().dp)
            ));
            db.collection("rooms").doc(roomId).collection("messages")
            .orderBy("timestamp", 'asc').onSnapshot((snapshot) =>
                setmessages(snapshot.docs.map((doc) => doc.data())));
            
        }
      
    }, [roomId])

   

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed >>>",input);


   
        db.collection('rooms').doc(roomId).collection("messages").add(
            {
              message:input,
              name:user.displayName,
              timestamp:firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        setInput("");
    }

    

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen at {" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}</p>
                </div>
                
                <div className="chat__headerRight">
                    <IconButton><SearchOutlined /></IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>

            </div> 
            <div className="chat__body">
                {messages.map((message) => (
                    <div className={`chat__messageBody ${message.name === user.displayName && 'chat__receiverBody'} `}>
                        <span className="chat__name">{message.name}
                        </span>
                    <p className="chat__message">
                        
                    
                        {message.message}
                        
                    </p>
                    <span className="chat__timestamp">
                            {new Date(message.timestamp?.    toDate()).toLocaleString()}
                        </span>
                    </div>
                   
                ))}
            </div>
            <div className="chat__footer">

                <InsertEmoticonIcon />
                <form>
                    <input 
                    value={input}
                    onChange = {(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Type a message"></input>
                    <button
                    type="submit"
                    onClick ={sendMessage}>
                        Send a message</button>
                </form>
                <MicIcon/>

            </div>
        </div>
    )
}

export default Chat
