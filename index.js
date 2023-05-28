const express=require('express');
const app=express();
const cors=require("cors");
const bcrypt=require('bcryptjs')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const jwt=require("jsonwebtoken");
const JWT_SECRET="gugcdeygrgvfhvk2334t4k3z000{}%&)56iyytitilu"


app.listen(5000,()=>{
    console.log("server is started")
});


const mongoose=require('mongoose');
const bodyParser = require('body-parser');

const mongourl='mongodb+srv://arunar123az:Arunar123az@cluster0.l6626bf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongourl,{
    useNewUrlParser:true,
}).then(()=>{
    console.log("connected")
})
.catch((e)=>{
    console.log(e)
})

const user=require('./databaseModel/patientData');

const hospital=require('./databaseModel/hospitalData');

const consultant=require('./databaseModel/consultantData')

app.post("/registration",async(req,res)=>{
    const data=req.body;
    console.log(data)
    
    const type=data.type;
    console.log(type)

    if(type=='patient')
    {
    const pphone=data.pphone;
    const pass=data.ppassword;
    const encryptedpassword=await bcrypt.hash(pass,10);
    const phsearch={"phoneno":pphone}

    try {
        const oldUser=await user.findOne(phsearch)
        console.log(oldUser)
        if(oldUser){
        return res.json({error:"user avaialable"});
        }
    
            await user.create({
                usertype:type,
                userId:data.pphone,
                name:data.pname,
                phoneno:data.pphone,
                age:data.page,
                gender:data.pgender,
                email:data.pemail,
                password:encryptedpassword,
                housename:data.phousename,
                streetname:data.pstreetname,
                pincode:data.ppincode,
                district:data.pdistrict
            })
            res.send({staus:'ok'})
        
    } catch (error) {
        console.log(error)

        res.send({staus:"error"})
    }
}

if(type=='hospital')
    {
    const hphone=data.hphone;
    const pass=data.hpassword;
    const encryptedpassword=await bcrypt.hash(pass,10);
    const phsearch={"phoneno":hphone}
    try {
        const oldUser=await hospital.findOne(phsearch)
        console.log(oldUser)
        if(oldUser){
        return res.json({error:"user avaialable"});
        }
    
            await hospital.create({
                usertype:type,
                userId:data.hphone,
                hospitalname:data.hname,
                phoneno:data.hphone,
                email:data.hemail,
                password:encryptedpassword,
                hospitaltype:data.htype,
                streetname:data.hstreetname,
                licenceId:data.hlicence,
                pincode:data.hpincode,
                district:data.hdistrict,
            })
            res.send({staus:'ok'})
        
    } catch (error) {
        console.log(error)

        res.send({staus:"error"})
    }
}

if(type=='privateconsultant')
    {
    const cphone=data.cphone;
    const pass=data.cpassword;
    const encryptedpassword=await bcrypt.hash(pass,10);
    const phsearch={"phoneno":cphone}
    try {
        const oldUser=await consultant.findOne(phsearch)
        console.log(oldUser)
        if(oldUser){
        return res.json({error:"user avaialable"});
        }
        
    
            await consultant.create({
                usertype:type,
                userId:data.cphone,
                name:data.cname,
                phoneno:data.cphone,
                experience:data.cexperience,
                licenceId:data.clicence,
                gender:data.cgender,
                email:data.cemail,
                password:encryptedpassword,
                streetname:data.cstreetname,
                pincode:data.cpincode,
                district:data.cdistrict
            })
            res.send({staus:'ok'})
        
    } catch (error) {
        console.log(error)

        res.send({staus:"error"})
    }
}


})


app.post('/',async(req,res)=>{
    console.log(req.body);
    const login=req.body;
    logintype=login.usertype
    loginid=login.userid
    loginpass=login.password
    const idsearch={"phoneno":loginid}

    console.log(logintype)

    if(logintype=='patient')
    {
        console.log('hello')
        const userid=await user.findOne(idsearch);
        console.log(userid)
    
    try {
        if(!userid){
            return res.json({error:"user not available"});
        }
        if(await bcrypt.compare(loginpass,userid.password)){
            const token=jwt.sign({phoneno:userid.phoneno},JWT_SECRET)
            if(res.status(201)){
                return res.json({
                    status:'ok',data:token,details:userid
                })
            }
            else{
                 return res.json({error:"error"});
            }
    
    
        }
        res.send({staus:'error',error:"invalid password"});
        
    } catch (error) {
        console.log(error)
        
    }
}
else if(logintype=='hospital')
    {
    const userid=await hospital.findOne(idsearch);
    console.log(userid)
    
    try {
        if(!userid){
            return res.json({error:"user not available"});
        }
        if(await bcrypt.compare(loginpass,userid.password)){
            const token=jwt.sign({phoneno:userid.phoneno},JWT_SECRET)
            if(res.status(201)){
                return res.json({
                    status:'ok',data:token,details:userid
                })
            }
            else{
                 return res.json({error:"error"});
            }
    
    
        }
        res.send({staus:'error',error:"invalid password"});
        
    } catch (error) {
        console.log(error)
        
    }
}
else if(logintype=='privateconsultant')
    {
    const userid=await consultant.findOne(idsearch);
    console.log(userid)
    
    try {
        if(!userid){
            return res.json({error:"user not available"});
        }
        if(await bcrypt.compare(loginpass,userid.password)){
            const token=jwt.sign({phoneno:userid.phoneno},JWT_SECRET)
            if(res.status(201)){
                return res.json({
                    status:'ok',data:token,details:userid
                })
            }
            else{
                 return res.json({error:"error"});
            }
    
    
        }
        res.send({staus:'error',error:"invalid password"});
        
    } catch (error) {
        console.log(error)
        
    }
}
   


})

app.post("/home",(req,res)=>{
    const token=req.body.token;
    console.log(token)
    try{
        const User=jwt.verify(token,JWT_SECRET,(err,payload)=>{
            if(err){
                console.log('error')

            }
            else{
                return payload
            }
        })
        console.log(User)
        const phone=User.phoneno;
        console.log(phone)
        const search={"phoneno":phone}
        user.findOne(search)
        .then((data)=>{
           res.send({status:'ok',data:data})
        })
        .catch((error)=>{
           res.send({staus:'error',data:error})
        })
    }catch(error){
        console.log("error",error)
    }
    
})






// app.post("/",async(req,res)=>{
//     const{email,password}=req.body;
//     try{
//         const check=await collection.findOne({email:email});
        
//         if(check){
//             res.json("Exist")
//         }
//         else{
//             res.json("not exist")
//         }

//     }catch{
//         res.json("Not exist")

//     }
// })

// app.post("/registration",async(req,res)=>{
//     const{email,password}=req.body;

//     const data={
//         email:email,
//         password:password
//     }

  

//     try{
//         const check=await collection.findOne({email:email});
        
//         if(check){
//             res.json("Exist")
//         }
//         else{
//             res.json("not exist")
//             await collection.insertMany([data])
//         }

//     }catch{
//         res.json("Not exist")

//     }
// })

