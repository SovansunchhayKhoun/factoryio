import {useAuthContext} from "../../context/AuthContext.jsx";
import React, {useContext, useEffect, useState} from "react";
import ChatContext from "../../context/ChatContext.jsx";
import {Sender} from "../../components/ChatComponent/Sender.jsx";
import {Replier} from "../../components/ChatComponent/Replier.jsx";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from "flowbite-react";
import {ImagePreview} from "../../components/ImagePreview.jsx";
import * as trace_events from "trace_events";

export const CustomerService = () => {
  const {
    messageReFetch,
    message,
    sendMessage,
    handleMessage,
    findChat,
    setSeen,
    setMessageImage,
    messageImage,
  } = useContext(ChatContext);

  const {user, token} = useAuthContext();
  const [messageInput, setMessageInput] = useState('');
  const [open, setOpen] = useState(false);

  if (token) {
    useEffect(() => {
      // messageReFetch();
      setSeen(message?.filter((msg) => msg.chat_id === findChat(user.username, 'admin')?.id), user.username);
    }, []);
    return (
      <>
        <main className="flex flex-col items-center w-full min-h-screen text-gray-800">
          <div
            className="flex flex-col flex-grow w-full max-w-xl bg-white border-blackFactory border shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {message?.filter(msg => {
                  return msg.chat_id === findChat(user.username, 'admin')?.id
                }).length === 0 &&
                <>
                  <div>
                    Welcome to customer service
                  </div>
                  <div>
                    We will try our best to get back to you as soon as possible
                  </div>
                </>
              }
              {message?.filter(msg => {
                return msg.chat_id === findChat(user.username, 'admin')?.id
              }).map(msg => {
                if (msg.sender_id === user.username) {
                  return (
                    <Sender key={msg.id} time={msg.time_sent} messageContent={msg.msg_content} image={msg.image}/>
                  );
                } else {
                  return <Replier key={msg.id} time={msg.time_sent} messageContent={msg.msg_content} image={msg.image}/>
                }
              })
              }
            </div>
            <div className="flex items-center gap-x-2 bg-gray-300 p-4">
              <label htmlFor="file_upload" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
                </svg>
              </label>
              <input
                className="hidden"
                id="file_upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={e => {
                  setMessageImage(e.target.files[0])
                  e.target.files[0] && setOpen(true);
                }}
              />
              <input
                onKeyDown={event => {
                  event.key === 'Enter' && sendMessage(user.username, 'admin', setMessageInput)
                }}
                value={messageInput}
                onChange={event => {
                  setMessageInput(event.target.value);
                  handleMessage(event, setMessageInput)
                }}
                className="w-full flex items-center h-10 rounded px-3 text-sm" type="text"
                placeholder="Type your message…"/>
              <button onClick={() => {
                sendMessage(user.username, 'admin', setMessageInput);
              }}
                className="bg-[#1C64F2] text-whiteFactory font-semibold rounded-md px-3 py-1 flex items-center hover:bg-blue-700 cursor-pointer">
                send
              </button>
              <ImagePreview
                messageInput={messageInput}
                setMessageImage={setMessageImage}
                handleMessage={handleMessage}
                setOpen={setOpen} open={open}
                messageImage={messageImage} setMessageInput={setMessageInput}
                sendMessage={sendMessage} sender={user?.username} receiver={'admin'}/>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <main className="flex flex-col items-center w-full min-h-screen text-gray-800">
        <div
          className="flex flex-col flex-grow w-full max-w-xl bg-white border-blackFactory border shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            <div>
              You need an account to contact us
            </div>
            <Link className={"font-semibold text-blueBase"} to={'/signup'}>
              Sign Up here
            </Link>
          </div>
        </div>
      </main>
    );
  }
};

