import express from "express";
import {fork} from "child_process";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(5000,()=>console.log(`CHILD PROCESS: Server up on port ${server.address().port}`));
server.on("error", err => console.error(err));

let visits = 0;
app.get("/",(req,res)=>{
    res.send(`Visitas: ${visits++}  |  ${Date()}`);
})

app.get('/randoms/:qty',async(req,res)=>{
    res.json(await getRandom(req.params.qty))
})

app.get('/randoms',async(req,res)=>{
    res.json(await getRandom(10e7))
})

const getRandom = (qty) =>{

    return new Promise((resolve,reject)=>{
        //inicio el proceso child
        const subProcess = fork("subProcess.js")
        //envio el parametro
        subProcess.send(qty);
        //recibo un mensaje, el primero será el ready
        subProcess.on("message", msg =>{
            //recibo el objeto con los random
            resolve(msg);
        })
    })

}