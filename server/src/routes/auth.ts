import Router from 'express';
import { User } from '../models/User';
import { genSaltSync, hashSync, compareSync} from "bcrypt-ts";


export const authRoute = Router();

var message;

authRoute.post('/login', (req, res) => {

})

//Save an user to mongodb
//To save I need the user and the password
//user and password are in the req variable
//If user and password are set we search for the username in mongo
//Add user in mongo
authRoute.post('/register', async (req, res) => {
     try{
          var username = req.body["user"];
          var password = req.body["password"];
          console.log(username, password);
          
          if(username == ''){
               message ="Error: username needed" 
               console.log(message);
               res.send(message);
          }
          if(password == ''){
               message ="Error: username needed" 
               console.log(message);
               res.send(message);
          }

          //Check user existence
          const userFound = await User.findOne({username : username}).exec();
          if(userFound != null){
               res.status(400).json({msg: "User already exists"});
               return;
          }

          //Generating password
          const salt = genSaltSync(10);
          const passwordHash = hashSync(password, salt);

          //User add
          const user = new User({
               username: username,
               password: passwordHash
          });
          await user.save();
          
     }
     catch(e){
          console.log(e);
     }

     res.send('Registration completed');
     
})

authRoute.post('/login', async (req, res) => {
     try{
          var username = req.body["user"];
          var password = req.body["password"];

          const user = await User.findOne(username);
          if(user) {
               const hash = user.password;
               if(compareSync(password, hash)){
                    res.send('scopa');
               }
               else{
                   res.send("Bro hai sbagliato");
               }
          }
          else{
               res.send("Non trovato");
          }

     }
     catch(e){
          console.log(e);
     }

     res.send("Login finished");
})