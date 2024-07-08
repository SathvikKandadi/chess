import React from 'react'

export default function LandingPage() {
    const socket = new WebSocket("ws://localhost:8080")

    // Connection opened
    socket.addEventListener("open", event => {
        console.log("Connection established");
        socket.send("Connection established")
    });

    // Listen for messages
    socket.addEventListener("message", event => {
        console.log("Message from server ", event.data)
    })

    function beginGame() {
        socket.send("init_game");
    }

    return (
        <div className='w-full  h-screen fixed bg-neutral-800'>
            <div className='my-16 mx-16 grid grid-cols-2 gap-4'>
                <div className='grid col-span-1'>
                    Image
                </div>
                <div className='grid col-span-1 flex justify-center'>
                    <h1 className='text-5xl text-white font-bold my-2'>Play Chess</h1>
                    <h1 className='text-5xl text-white font-bold my-2 mx-8'>Online</h1>
                    <button onClick={() => beginGame()} className="bg-green-500 rounded my-8 text-white p-2 text-md font-bold hover:bg-green-600">Begin</button>
                </div>
            </div>
        </div>
    )
}
