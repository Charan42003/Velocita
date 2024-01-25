import { io } from 'socket.io-client';

// const socket = io("http://localhost:3001");
const socket = io("http://192.168.1.6:3001");
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

export const clickk = async () => {
    socket.emit('message', "message");
    socket.on('cords', async (res) => {
        console.log(res)
    })
    // Alert.alert("Title", "Socket connected")
}


// Emit events from the client as needed
// socket.emit('message', 'Hello from client!');