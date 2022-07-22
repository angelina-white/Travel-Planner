import io from 'socket.io-client';
import { useState, useEffect } from "react";

function Chat({ username })
{
    const [socket, setSocket] = useState(null)
    const [messageList, setMessageList] = useState([])
    useEffect(() =>
    {
        setSocket(io("http://localhost:4001"))
        const socket = io("http://localhost:4001");

        // socket.on("showMessage", (msg) =>
        //     setMessageList((messageList) => messageList = [...messageList, msg])
        // )

        socket.on("showMessage", (data) =>
            setMessageList((messageList) => messageList = [...messageList, data])
        )

    }, [])

    const [message, setMessage] = useState("")

    function sendMessage(e)
    {
        e.preventDefault();
        socket.emit("handleMessage", {msg: message, user: username})
        setMessage("")
    }

    const dispList = messageList.map((item) => {
        return (
            <li>
                {item.user}: { item.msg }
            </li>
        )
    })

    return (
        <div>
            <h1>Chat</h1>
            <div>
                <h2>read from here</h2>
                <ul>
                    { dispList }
                </ul>
            </div>
            <form onSubmit={ sendMessage }>
                <input onChange={ (e) => setMessage(e.target.value) } value={ message } placeholder="Enter message..." />
                <button>Send</button>
            </form>
        </div>
    )
}
export default Chat