
import random from "random";

const randomObj = {};

console.log(`subProcess Child Start Id:${process.pid}`);

process.on("message", qty =>{

    console.log(`subProcess Child New Message Id:${process.pid}`);
    
    const randomObj = {};

    for (let count = 0; count < qty; count++) {

        const randomNumber = random.int(0,1000);
    
        if ( randomObj[randomNumber] == undefined ){
    
            randomObj[randomNumber] = 1;
    
        }else{
    
            randomObj[randomNumber]++;
    
        }
    }

    process.send(randomObj)
    process.exit();

})

process.on("exit", ()=>{
    console.log(`subProcess Child Finished Id:${process.pid}
    `);
})




