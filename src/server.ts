import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mainRoutes from './routes/index';

dotenv.config();

const server = express();


server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(mainRoutes);

server.use((req: Request, res: Response)=>{
    res.status(404);
    res.send('Página não encontrada!');
});

server.listen(process.env.PORT);