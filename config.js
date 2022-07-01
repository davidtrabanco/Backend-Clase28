import path from 'path';
import {fileURLToPath} from 'url';

//VARIABLES DE ENTORNO
import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
export const _dirname = path.dirname(__filename);

export default {
    login :{
        user : null,
    },
    MongoDB:{
        URL: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.zbawm.mongodb.net`,
    },  
    dirname : _dirname,
    sessionSecret : process.env.SESSION_SECRET
}