
const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { dbconnect } = require('./controller/mongodbconnect');
const { messageModel } = require('./models/userschema');
const login = require('./routes/login/login')
const adminaccess = require('./routes/admin/adminaccess')


const PORT = process.env.PORT || 5000
dbconnect()


app.use(cors());


const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', async(socket) => {
    console.log(`User connected ${socket.id}`);
    try {
        console.log('working only connect'); 
        const allData = await messageModel.find({});
        io.emit('receive_message', allData); 
    } catch (error) {
        console.log(error);
    }
    //  socket event listeners 
    socket.on('send_message', async (data) => {
              
        io.emit('receive_message', [data]); 
        try {
            console.log('SAVING DATA TO DATA',data);
            const makeMessage = new messageModel(data)
            await makeMessage.save();
            const allData = await messageModel.find({});
            io.emit('receive_message', allData);
        } catch (error) {
            console.log(error);

        }


    });
})
app.use(express.json())
app.use('/auth', login)


app.use('/auth', login)
app.use('/document', adminaccess) //admin route




app.get('/', (req, res) => {
    res.send('Hello world');
});






server.listen(PORT, err => {
    if (err) console.log(err)
    console.log('Server running on Port ', PORT)
})