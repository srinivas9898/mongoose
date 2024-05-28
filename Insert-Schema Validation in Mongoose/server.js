let mongoose = require("mongoose")

  let playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z\s]{2,30}$/.test(v);
          },
          message: props => `${props.value} is not a valid name `,
        },
        required: [true, 'User name required'],
      },
      
    age:{
        type:Number,
        min:[1, "Invalid value"],
        max:[60,"Invalid value" ],
        required:ture,
    },
    teamName:{
        type:String,
        enum:["CSK","RCB","KKR","RR","GT","MI","SRH","DELHI","LSG","KXIP"],
        uppercase:ture,
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`,
        },
        required: [true, 'User email required'],
      },

    nationality:String,
  });

   let player = new mongoose.model("player",playerSchema);

   let saveDataIntoDB = async ()=>{

    try{
        let dhoni = new player({
            playerName:"Dhoni",
            age:40,
            teamName:"CSK",
            email:"dhoni@gmail.com",
            nationality:"Indian",
           });

           let kholi = new player({
            playerName:"Kholi",
            age:35,
            teamName:"RCB",
            email:"kholi@12gamil.com",
            nationality:"Indian",
           });
           let rohit = new player({
            playerName:"Rohit",
            age:40,
            teamName:"MI",
            email:"rohit123@gmail.com",
            nationality:"Indian",
           });
        
           Player.insertMany([dhoni,kholi,rohit]);
           console.log("Successfully saved data into DB")
        

    }catch(err){
        console.log(err);
            console.log("Unable to store data inti DB");
    }}

   
let connectToMongoDB = async()=>{

    try{
        await mongoose.connect("mongodb+srv://srinivas:srinivas@2402batch.nnuu6pa.mongodb.net/?retryWrites=true&w=majority&appName=2402Batch");
  
        console.log("Successfully connected to MD");
        saveDataIntoDB();
   
    }catch(err){
        console.log("Unablemto connect MDB");
    }
};

connectToMongoDB();
