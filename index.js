const express=require('express');
const app=express();
const cors=require("cors");
const bcrypt=require('bcryptjs')
const dotenv=require('dotenv')
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.jwt_code


app.listen(5000,()=>{
    console.log("server is started")
});


const mongoose=require('mongoose');
const bodyParser = require('body-parser');

const mongourl=process.env.mong_url;

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
    const licence=data.clicence;
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
        return res.json({error:" registered already"});
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

else if(type=='hospital' && license=='hosxml')
    {
    const hphone=data.hphone;
    const pass=data.hpassword;
    const encryptedpassword=await bcrypt.hash(pass,10);
    const phsearch={"phoneno":hphone}
    try {
        const oldUser=await hospital.findOne(phsearch)
        console.log(oldUser)
        if(oldUser){
        return res.json({error:"registered already"});
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

else if(type=='privateconsultant' && licence=="pridtaxml")
    {
    const cphone=data.cphone;
    const pass=data.cpassword;
    const encryptedpassword=await bcrypt.hash(pass,10);
    const phsearch={"phoneno":cphone}
    try {
        const oldUser=await consultant.findOne(phsearch)
        console.log(oldUser)
        if(oldUser){
        return res.json({error:"registered already"});
        }
        
    
            await consultant.create({
                usertype:type,
                userId:data.cphone,
                name:data.cname,
                phoneno:data.cphone,
                category:data.ccategory,
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
else{
    return res.json({message:"licence id error"})
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
    if(logintype==null){
        return res.json({message:"choose account type"})
    }

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

else{
    res.send("select account type")
}
   


})

app.post("/home",(req,res)=>{
    const token=req.body.token;

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



app.post("/hospitalhome",(req,res)=>{
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
        hospital.findOne(search)
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




app.post("/consultanthome",(req,res)=>{
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
        consultant.findOne(search)
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


app.get("/districtinfo",async(req,res)=>{
try {
    
    const allusers=await hospital.find({});
   const dis= allusers.map((item)=>{
        return item;
    })

    res.send(dis);
    
} catch (error) {
    console.log(error)
    
}
})

app.get("/privateinfo",async(req,res)=>{
    try {
        
        const allusers=await consultant.find({});
       const dis= allusers.map((item)=>{
            return item;
        })
    
        res.send(dis);
        
    } catch (error) {
        console.log(error)
        
    }
    })

