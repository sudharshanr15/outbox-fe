'use client';

import { socket } from '@/utils/socket';
import React from 'react'

function SocketInit({ room }: { room: string }) {

    socket.on("connect", () => {
        socket.emit("join-room", room)
    })

    return (
    <>
    </>
  )
}

export default SocketInit