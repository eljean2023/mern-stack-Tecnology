//Requirements
const express = require('express');
const path =require('path');
const dotenv = require('dotenv');
const cors = require('cors');
require('./database')
const { v4 : uuidV4 } = require('uuid');
const { Socket } = require('socket.io');
//const { send } = require('process');

//const { emit } = require('process');

//Configurations

dotenv.config()
const app = express();

const server =require('http').Server(app);
const io = require('socket.io')(server, {
    cors : {
        origin : "*",
        methods : ["GET","POST"]
     }
})

//Setting

app.set('PORT', process.env.PORT || 4500);


//midleware

app.use(express.json())
app.use(cors({
    origin : "*",
    methods : ["GET","POST"]
 }))
app.use(express.urlencoded({extended: false}))
//midleware
//Routes
//Static files


app.use('/api', require('./routes/userRoute'))
app.use('/api', require('./routes/productRoutes'))
app.use('/api', require('./routes/courseRoutes'))
app.use('/api', require('./routes/uploadRoutes'))
app.use('/api', require('./routes/orderRoutes'))
app.use('/api', require('./routes/agendaRoutes'))

app.get('/api/config/paypal', (req, res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const rooms = {}
const chats = []
//const participants = [] 
const onlineUsers =[]

io.on('connection',(socket)=>{
    console.log("User connected")
    socket.emit("hiThere", "helllllllllllllllooooo")
    socket.on('create-room', ()=>{
        const roomId = uuidV4()
        rooms[roomId] = {}
        socket.join(roomId)
        socket.emit("room-create", {roomId})
        console.log("User created the Romm", roomId)
    })
    
    socket.on('join-room', ({roomId, userId, userNamex})=>{
        if(!rooms[roomId]) rooms[roomId] = {}
        if(!chats[roomId]) chats[roomId] = []
            console.log("user joined the romm :" + roomId + " User Id :" +userId + "user Name is :" + userNamex)
            socket.emit("get-messages", chats[roomId])
           // socket.to(roomId).broadcast.emit('user-connectedx', userId)
            {/* socket.to(userId).emit("get-messages", chats[roomId]) */}
            rooms[roomId][userId] = {userId, userNamex } 
            console.log(rooms)
            socket.join(roomId, userId)
            console.log(" Room id eso es " +roomId)
            socket.to(roomId).emit("user-joined", {userId, userNamex})
            socket.emit("get-users", {
                roomId,
                participants : rooms[roomId],
            
            },
            
            //console.log("aqui viene " , onlineUsers),
            //console.log([roomId][userNamex]),

           // socket.broadcast.to(roomId).emit("getNotifications", {senderNane, userId}),
    ) 
    
    socket.on('startSharing', (userId, roomId)=>{
        socket.to(roomId).emit("user-started-sharing", userId)
        window.location.reload();
    }) 
    
    socket.on('stopSharing', (roomId)=>{
        socket.to(roomId).emit("user-stopped-sharing" /*userId*/)
    }) 


    socket.on('send-message', ({roomId}, message)=>{
            if(chats[roomId]){
                chats[roomId].push(message)
            }
            else{
                chats[roomId]=[message]
            }
        // if(!rooms[roomId]) {
             socket.to(roomId).emit("add-message", message)
             //socket.emit("add-message", message)
             //console.log("Eso quiero" + roomId)
             //socket.emit("add-message", message) 
           
 }) 

    const addMessage = (roomId, message)=>{
        socket.to(roomId).emit("add-message", message)
        socket.broadcast.to(roomId).emit('add-message', message)
        console.log({message})
    }

    socket.on("send-message", addMessage)  
    
    socket.on('send-message', (roomId, message)=>{
        console.log({message})
        if(chats[roomId]){
            chats[roomId].push(message)
        }
        else{
            chats[roomId] = [message]
        }
        socket.to(roomId).emit("add-message", message)
        socket.to(roomId).emit('add-message', message)
    })

    socket.on('disconnect', (userId)=>{
        console.log("User desconnected", userId)
         socket.broadcast.to(roomId).emit('user-connected', userId)
        const leaveRoom = ({userId, roomId})
        //rooms[roomId] = rooms[roomId].filter((id) => id !== userId )
        socket.to(roomId).emit("user-disconnected", userId)
        })
    
      /*
        const addNewUser = (username, socketId)=>{
        !onlineUsers.some((user)=>user.username === username )
        onlineUsers.push({username, socketId})
    }    

    const removeUser = (socketId)=>{
        onlineUsers = onlineUsers.filter(user=>user.socketId !== socketId)
    }    
    
     */

    const getUser =(userName)=> {
        return onlineUsers.find((user)=>user.userName === username)
    }
     

/*
    var userNames = {};
    socket.on('setSocketId', function(data) {
    var userName = data.name;
    var userId = data.userId;
    userNames[userName] = userId;
});
  
*/


const MONGODB_URI =  process.env.MONGODB_URI

console.log("Here we go" + MONGODB_URI)


var userNames = {};
socket.on('sendNotification', function(data){
    var userName = data.name;
    var userId = data.userId;
    var receiver = data.receiverName;
    userNames[userName] = userId;
    socket.to(roomId).emit("getNotifications", userName, userId)
    console.log("aver que id", receiver)
})

    //socket.on('sendNotification', ({senderName, receiverName,userNamex,status, socketId, userId})=>{
            //const receiver = onlineUsers.find((user)=>user === receiverName)
           // const receiver = getUser(receiverName)
            //socket.broadcast.to(roomId).emit("getNotifications", senderName)
            //console.log("aqui viene al final ahora" , receiverName)
            //socket.to(roomId).broadcast.emit('user-connected', userId)
           // socket.broadcast.to(roomId).emit('user-connected', userId)
           //console.log(receiver)
         /*
            //socket.to(receiverName).emit("getNotifications", userId, senderNane)
            //socket.to(roomId).emit("getNotifications", {senderNane, receiverName, userId})
            //socket.broadcast.to(roomId).emit('getNotifications', {senderNane, receiverName, userId})
            
        */
       // }) 
        })
    })
       
     /*   
        console.log(roomId, userId)
        
    socket.join(roomId, userId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('send message', function(data){
        io.sockets.emit('new message', data);   
        */
   
    /*
    var nicknames = [];
    socket.on('new user', function(data, cb){
        console.log(data)
        if(nicknames.indexOf(data) !=-1)
        cb(false)
        else{
            cb(true)
            socket.nickname = data;
            nicknames.push(socket.nickname)
            console.log(data)
        }})
*/
    
//})


app.get('/', (req, res)=>{
    res.send('The server is running thank you ')
})


//Static files

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static(path.join(__dirname, '/uploads')))
app.use(express.static(path.join(__dirname, "build"))) 

//Server Starting

server.listen(app.get('PORT'), ()=>{
    console.log(`The server is running on port ${app.get('PORT')}`)
})