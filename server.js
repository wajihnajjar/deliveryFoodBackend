const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const cors= require("cors")
const db = require("./database/index")
app.use(cors())
app.use(express.json()) 

const validateToken=(req,res,next)=>{
const token = req.body.token 
try {
   const decode =  jwt.verify(token,process.env.JWT_KEY)
    next()
} catch(err){
    res.status(401).send("Unathorazed")
}
}

app.post("/signUp",  async (req,res)=>{
    const {firstName, lastName , email , password , phoneNumber} = req.body ; 
    const hashedPassword = await bcrypt.hash(password , 10) ; 
    db.query(`INSERT INTO USER (firstName, lastName , email , password , phoneNumber)
    VALUES ('${firstName}' , '${lastName}' , '${email}' , '${hashedPassword}' , '${phoneNumber}')
    `,(err, result)=>{
        if(err?.code=="ER_DUP_ENTRY")
              res.status(400).send("Email been used")
        else
        if(err)
            res.status(500).send(err)
        else 
            res.status(201).send("OK")
    })
})
app.post("/login",(req,res)=>{
    const {email , password } =req.body ; 
    db.query(`SELECT * FROM USER WHERE email = '${email}'`,(err,result)=>{
        if(err)
            res.status(500).send(err)
        else    
            if(result.length==0)
                res.status(400).send("Wrong email")
            else 
                {
                    bcrypt.compare(password , result[0].password,(err,data)=>{
                        if(err)
                            res.status(500).send(err)
                        else 
                            if(data){
                                const token = jwt.sign({
                                    email , password
                                },process.env.JWT_KEY,{
                                    expiresIn:"30d"
                                })
                                res.status(200).send({
                                    data:"Ok",
                                    token:token
                                })
                            }
                                else 
                                res.status(400).send("Wrong password")
                    })
                }
    })
})

app.post("/getUserInfo",validateToken,(req,res)=>{
const token  = req.body.token
const decode = jwt.verify(token,process.env.JWT_KEY)
const {email}= decode
db.query(`SELECT firstName , lastName , email , phoneNumber FROM USER WHERE email = '${email}'`
,(err,result)=>{
    if(err)
        res.status(500).send(err)
    else 
        res.send(result)
})
})
app.post("/addReview", validateToken , (req,res)=>{
    const {token,feedback ,Rate} = req.body ; 
    const decode = jwt.verify(token,process.env.JWT_KEY)
    const {email}= decode
    db.query(`INSERT INTO reviews (email,feedback,Rate) VALUES ('${email}','${feedback}' , '${Rate}')`,(err,result)=>{
        if(err)
            res.status(500).send(err)
        else 
            res.status(201).send("OK") ; 
    })
})

app.post("/getAllFood", validateToken,(req,res)=>{
    db.query("SELECT * FROM menu",(err,result)=>{
        if(err)
            res.status(500).send(err)
        else 
            res.status(200).send(result)
    })
})

app.post("/addClick",validateToken , (req,res)=>{
    const {food_name} = req.body
    db.query(`UPDATE menu set click = click+1 where food_name ="${food_name}"`,(err,result)=>{
        if(err)
            res.status(400).send(err)
        else   
            res.status(200).send("OK") ; 
    })

})
app.post("/addOrder",validateToken ,   (req,res)=>{
    const {order , comment , token} = req.body ; 
    const decode =  jwt.verify(token,process.env.JWT_KEY) 
    const userEmail = (decode.email)
    db.query(`SELECT id FROM user WHERE email = '${userEmail}'` ,(err, result)=>{
        if(err)
            res.status(500).send(err)
        else {
            const userId = result[0]["id"]
            db.query(`INSERT INTO orders (id_user ,orderstring ,comment)  values ('${userId}','${order}','${comment}')`,(err1,result1)=>{
                if(err)
                    res.status(500).send(err)
                else 
                    res.status(200).send("OK") 
            })

        }
    })

})
app.listen(4001, ()=>{
    console.log("Server Connected")
})
/*
INSERT INTO menu (food_name, price , image_food,Descr,food_type) VALUES 
("Burger",5,"https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107641/g-1_diylwd.jpg","Tasty Burger it contains sheep meet ","first"),
("Chiken Fried" , 6 , "https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107643/g-6_qbpryn.jpg" , "Chicken" , "first"),
("Chocolate Cake" , 7 ,"https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107643/g-8_ttn33c.jpg","Sweet chocolate" ,"second"),
("Cup Cake",2 , "https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107642/g-4_qorovh.jpg","Cup Cake" , "second"),
("Juice",2 , "https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107685/p-5_vb90yl.jpg","Juice","third") , 
("Ice-Cream",4,"https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107685/p-6_aa35k2.jpg","Ice cream" , "third") ; 


id name description image ; 

*/