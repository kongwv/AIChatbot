import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';

function Chat() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping');
  const [messages, setMessages] = useState([
    {
      message: "Hello, how can I help you",
      sender: "Chatbot"
    }
  ]);

  return (
<<<<<<< Updated upstream
    <div style={{position:"relative", height:"550px", width:"350px"}}>
=======
    <div style={{position:"relative", height:"500px", width:"550px"}}>
>>>>>>> Stashed changes
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message, i) => {
              return <Message key={i} model={message}/>
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" attachButton={false}/>
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default Chat

