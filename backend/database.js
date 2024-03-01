const mongoose =require('mongoose');

mongoose.set('strictQuery', true);

/*const URI_CON ='mongodb://127.0.0.1:27017/jwtData1'; */

/*const URI_CON ='mongodb://127.0.0.1:27017/justStars';*/

const URI_CON ='mongodb+srv://eljean2024:mern-technology.user2024!@cluster0.ttxex.mongodb.net/mern-technology.user?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(URI_CON)

.then(db =>console.log('mongo database is running', db.connection.host))
.catch(err => console.error(err))
