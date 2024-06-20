import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, Avatar } from '@chatscope/chat-ui-kit-react';

function Chat() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping');
  
  const [typing, setTyping] = useState(false)
  
  const [messages, setMessages] = useState([
    {
      message: "Hello, how can I help you",
      sender: "chatbot",
      direction: "ingoing"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }
    
    const newMessages = [...messages, newMessage]; // all the old messages, + the new message

    // update our messages state
    setMessages(newMessages);
    // set a typing indicator
    setTyping(true);

  }

  return (
    <div style={{position:"relative", height:"550px", width:"400px"}}>
      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator = {typing ? <TypingIndicator content={"Typing"}/> : null}>
            {messages.map((message, i) => {
              if (message.sender == "chatbot") {
                return (
                  <Message key={i} model={message}>
                    <Avatar name="chatbot" src="/src/images/chatbotpic.png"/>
                  </Message>
                )
              } else return <Message key={i} model={message}/>
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" attachButton={false} onSend={handleSend}/>
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default Chat

