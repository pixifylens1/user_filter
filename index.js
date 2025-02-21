import express from "express"
import cors from "cors"
import User from "./models/user.js";
import  connectDB  from "./config/db.js";
const app = express();

connectDB(); // Connect to MongoDB
app.use(express.json()); // Middleware to parse JSON
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }));
app.post("/register", async(req,res)=>{
    try {
        const {name, email, password, phone} = req.body; // Extracting user details from request body
        if (!name || !email || !password || !phone) {
            return res.status(400).json({error: "All fields are required"});
        }
        const user = new User({name, email, password, phone}); // Creating a new user instance
        const savedUser = await user.save(); // Saving user to database
        res.json({message: "User registered successfully", user: savedUser});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error while registering user"});
    }

})

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.get("/user/:id",async(req,res)=>{

    try {
        const user = await User.findById(req.params.id).select("-password"); // Fetch user by ID
        if(!user){
            res.status(404).json({error: "User not found"});
        }

        res.json(user); // Send user as JSON response
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error while fetching user"});
        
    }


})

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body; 

        
        if (!Array.isArray(data)) {
            return res.status(400).json({ 
                status: false,
                user_id: "ShivpratapSingh_10092002",
                error: "Invalid data format. Expected an array." 
            });
        }

        let numbers = [];
        let alphabets = [];

        data.forEach(item => {
            if (typeof item === "string" && item.length === 1) { 
                if (/[A-Za-z]/.test(item)) {
                    alphabets.push(item); 
                } else if (/[0-9]/.test(item)) {
                    numbers.push(item); 
                }
            } else if (typeof item === "string" && /^[0-9]+$/.test(item)) { 
                numbers.push(item); 
            }
        });

        
        const highestAlphabet = alphabets.length > 0 ? alphabets.sort().reverse()[0] : [];

        const response = {
            status: true,
            user_id: "ShivpratapSingh_10092002", 
            email: "22BCS50155@cuchd.in",
            roll_number: "22BCS50155",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet,
            
        };

        res.json(response); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            status: false,
            user_id: "ShivpratapSingh_10092002",
            error: "Internal Server Error" 
        });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
