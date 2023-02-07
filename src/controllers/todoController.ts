import { Request, Response } from 'express';
import { Todo } from '../models/todo';

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json({list});
}

export const add = async (req: Request, res: Response) => {
    let title = req.body.title;
    if(title){
        let newTodo = await Todo.create({
            title: title,
            done: req.body.done ? true : false
        });
        res.status(201).json({success: 'Tarefa adicionada com sucesso!', item: newTodo});
    }else{
        res.json({ error: 'Dados não enviados!'});
    }
}

export const update = async (req: Request, res: Response) => {
    let { id } = req.params;
    let {title, done} = req.body;
    let findTodo = await Todo.findByPk(id);
    
    if(findTodo){
        if(req.body.title){ 
            findTodo.title = title;
        }
        if(done){
            switch(done.toLowerCase()) {
                case 'true':
                case '1':
                    findTodo.done = true;
                    break;
                case 'false':
                case '0':
                    findTodo.done = false;
                    break;
            }
        }
        await findTodo.save();
        res.status(201).json({findTodo});
    }else{
        res.json({ error: "Tarefa não encontrada!" });
    }
}

export const remove = async (req: Request, res: Response) => {
    let { id } = req.params;
    await Todo.destroy({where: {id}});
    res.json({});
}

export const uploadFile = async (req: Request, res: Response) => {
    
    console.log("File ", req.file);
    console.log("Files ", req.files);

    res.json({});
}
