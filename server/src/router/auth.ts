import express from "express";
import { User } from "../models/users";
import cookieParser from "cookie-parser";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.use(cookieParser());
router.get('/', (req,res) => {
    res.send(`Hello from server auth.js`);
});

router.post('/register', async (req,res) =>{

    const {name, email, phone, designation, password, cpassword} = req.body;
  
    if(!name || !email || !phone || !designation || !password || !cpassword)
    {
        return res.status(422).json({ error: "Plz fill all the fields"});
    }

    // check for repeated email

   try
   {
   const userExist = await User.findOne({email: email});

    
        if (userExist)
        {
            return res.status(422).json({ error: "Email already Registered"});
        }
        if(password != cpassword)
        {
            return res.status(422).json({ error: "Password and Confirm Password should be same"});
        }

        const user = new User({name, email, phone, designation, password, cpassword});

        const userRegister = await user.save();

        if(userRegister)
        {
            res.status(201).json({ message: "User Registered Successfully"});
        }
        else
        {
            res.status(500).json({ error: "Failed To Register"});
        }


    
    

   }

   catch(err)

    {
         console.log(err); 
    }

        

});

router.post('/login', async (req,res) => {

    let token;
    const { email, password} = req.body;

    if(!email || !password)
    {
        return res.status(400).json({ message: "Please fill complete data"});
    }

    try{

        const userLogin = await User.findOne({email: email});
        //console.log(userLogin);


        if(userLogin)
        {
            const isMatch = await bcrypt.compare(password, userLogin.password);
             token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })
            if(!isMatch)
            {
                return res.status(400).json({ message: "Invalid Credentials"});
            }
            else
            {
                res.json({message: "User Logged In Successfully"});
                //console.log(userLogin);
            }

        }

        else
        {
            return res.status(400).json({ message: "Invalid Credentials"});

        }
        


    }

    catch(err)
    {
        console.log(err);
    }
});



router.get("/about", authenticate, async (req, res) => {
    res.send(req.rootUser)
})
// get data 

router.get("/getData", authenticate, async (req, res) => {
    res.send(req.rootUser)
})


router.get("/logout", async (req, res) => {
    console.log("logged out successfully !");
    res.clearCookie('jwtoken');
    //res.status(200).send('user Logged out');
    return res.status(200).redirect('/login');

})
module.exports= router;