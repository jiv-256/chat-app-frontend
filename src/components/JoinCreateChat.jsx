import React, { useState } from 'react'
import chaticon from '../assets/chat.png'
import { toast } from "react-hot-toast";
import {createRoomApi, joinChatApi}  from '../services/RoomService';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
function JoinCreateChat() {

    const[detail,setDetail] = useState({
        roomId:"",
        userName:"",
    });

    const { roomId, setRoomId,connected, setConnected ,currentUser, setCurrentUser } = useChatContext()
    const navigate = useNavigate()


    function handleFormInputChange(e){
        setDetail({
            ...detail,
            [e.target.name]:e.target.value,
        })
    }
    function validateForm(){
        if(detail.roomId ==="" || detail.userName ===""){
            toast.error("Invalid Input !!!")
            return false;
        }
        return true;
    }

    async function joinChat(){
        if(validateForm()){
            try {
                const room = await joinChatApi(detail.roomId)
                toast.success("joined..")
                setCurrentUser(detail.userName);
                   setRoomId(room.roomId);
                   setConnected(true)
                   navigate("/chat")
                
            } catch (error) {
                if (error.status === 400) {
                    toast.error(error.response.data);
                }else{
                    toast("Error in joining room");  
                }
                console.log(error);
                
            }


        }
    }
    async function createRoom(){
        if(validateForm()){
            try{
               const response = await createRoomApi(detail.roomId)
               console.log(response);
               toast.success('Room Created Successfully !!');
               setCurrentUser(detail.userName);
               setRoomId(response.roomId);
               setConnected(true)
               navigate("/chat")
            //    joinChat();
            }catch(error){
                console.log(error);
                if (error.status === 400) {
                    toast.error("Room Id already exist !!");
                }else{
                    toast("Error in creating room");            
                }
            }
            
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='p-10 dark:border-grey-700 w-full flex flex-col gap-5 max-w-md rounded dark:bg-amber-400 shadow'>
            <div>
                <img src={chaticon} className='w-24 mx-auto' />
            </div>

            <h1 className='text-2xl font-semibold text-center'>
                Join Room / Create Room ..
            </h1>

            {/* name div */}
            <div className=''>
                <label htmlFor='name' className='block font-medium mb-2'>
                    Your Name
                </label>
                <input type='text' 
                    id='name' 
                    value={detail.userName} 
                    placeholder='Enter the Name' 
                    name='userName'  
                    onChange={handleFormInputChange} 
                    className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 '/>
                
            </div>

            {/* room id div */}
            <div className=''>
                <label htmlFor='name' className='block font-medium mb-2'>
                    Room ID/ New Room ID
                </label>
                <input type='text' 
                name='roomId'
                value={detail.roomId}
                id='name' 
                onChange={handleFormInputChange}
                placeholder='Enter RoomId'
                className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 '/>
                
            </div>
            
            {/* Buttons */}
            <div className='flex justify-center gap-2 mt-4'>
                <button onClick={joinChat} className='px-6 py-3 mx-4 dark:bg-green-500 hover:bg-green-600 rounded-full'> Join Room </button>
                <button onClick={createRoom} className='px-5 py-1 mx-3 dark:bg-blue-500 hover:bg-blue-600 rounded-full'> Create Room </button>
            </div>
            
        </div>
    </div>
  )
}

export default JoinCreateChat
