import express from "express";
import User from "../modules/user.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";


const USER_API = express.Router();
USER_API.use(express.json()); 

const users = [];

USER_API.get('/', (req, res, next) => {
    SuperLogger.log("Demo of logging tool");
    SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
})


USER_API.get('/:id', (req, res, next) => {

})

USER_API.post('/', async (req, res, next) => {

    const { name, email, password } = req.body;

    if (name != "" && email != "" && password != "") {
        let user = new User();
        user.name = name;
        user.email = email;
        user.pswHash = password;

        let exists = false;

        if (!exists) {
            user = await user.save();
            res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
        } else {
            res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).end();
        }

    } else {
        res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

USER_API.post('/login', async (req, res, next) => {
    const { email, pswHash } = req.body;
    const user = await DBManager.findUserByEmail(email);
    if (user && user.pswHash === pswHash) {
        res.status(HTTPCodes.SuccesfullRespons.Ok).json({ success: true, message: 'Login successful' });
    } else {
        res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).json({ success: false, message: 'Invalid credentials' });
    }
});


USER_API.put('/:id', (req, res) => {
    const user = new User();  
    user.save();
});

USER_API.delete('/:id', (req, res) => {
    const user = new User();
    user.delete();
});

export default USER_API
