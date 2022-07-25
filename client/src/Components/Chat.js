import io from 'socket.io-client';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

function Chat({ username, showChat })
{
    const [socket, setSocket] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [userList, setUserList] = useState([])
    useEffect(() =>
    {
        setSocket(io("http://localhost:4001"))
        const socket = io("http://localhost:4001");

        socket.emit("newUser", (username))

        socket.on("showUsername", (users) =>
            setUserList(users)
        )

        socket.on("showMessage", (data) =>
            handleMessage(data)
        )

    }, [])

    const users = userList.map((item) =>
    {
        return (
            <li id="userLi">
                <h5>{ item.username }</h5>
            </li>
        )
    })

    function handleMessage(data)
    {
        setMessageList((messageList) => messageList = [...messageList, data])
        document.querySelector('#chatDispCont').scroll(
        {
            top: document.body.offsetHeight,
            behavior: 'smooth',
        });
    }

    const [message, setMessage] = useState("")

    function sendMessage(e)
    {
        e.preventDefault();
        socket.emit("handleMessage", {msg: message, user: username})
        setMessage("")
    }

    const sideList = messageList.map((item) =>
    {
        if (item.user == username)
        {
            return (
                <li id="selfLi">
                    <h4 id="messageSelf">{ item.msg }</h4>
                </li>
            )
        }
        else{
            return (
                <li id="otherLi">
                    <p id="userOther">{item.user}</p> 
                    <h4 id="messageOther">{ item.msg }</h4>
                </li>
            )
        }
    })

    function handleGoBack()
    {
        showChat()
        socket.emit("remove", (username))
        socket.disconnect()
    }

    return (
        <div>
            <p onClick= { handleGoBack } id="summaryBack">Go back</p>
            <h2 id="chatTitle">Chat</h2>
            <div id="userCont">
                <h3 id="chatHeader" >Online</h3>
                <ul id="usersUl">
                    { users }
                </ul>
            </div>
            <div id="chatDispCont">
                <ul id="chatUl">
                    { sideList }
                </ul>
                <div id="test" />
            </div>
            <form id="chatInputCont" onSubmit={ sendMessage }>
                <input id="chatInput" onChange={ (e) => setMessage(e.target.value) } value={ message } placeholder="Enter message..." />
                <Button id="chatSend" >Send</Button>
            </form>
        </div>
    )
}
export default Chat