import 'dotenv/config'
import express from 'express'
import USER_API from './routes/usersRoute.mjs';


import SuperLogger from './modules/SuperLogger.mjs';

const server = express();

const port = (process.env.PORT || 8080);
server.set('port', port);



const logger = new SuperLogger();
server.use(logger.createAutoHTTPRequestLogger());



server.use(express.static('public'));


server.use("/user", USER_API);


server.get("/", (req, res, next) => {
    res.status(200).send(JSON.stringify({ msg: "These are not the droids...." })).end();
});


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});

