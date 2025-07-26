'use client';

export function join_mail_room(socket, user: string){
    socket.emit("join-room", user)
}