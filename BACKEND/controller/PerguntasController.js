const Perguntas = require('../models/Perguntas')
const path =require('path')
const fs = require('fs')
class PerguntasController{

    async showAll(req,res){
        const all = await Perguntas.find() 
        res.status(200).json(all)
    }

    async newQuestion(req,res){
        const body = req.body
        const cover =  req.file.filename
        const {user} = req.headers

        const newBody = await Perguntas({...body,user,cover})
        newBody.save()
        res.status(201).json(newBody)
    }

    async editQuestion(req,res){
        const { id } = req.params
        const cover = req.file.filename
        const { titulo,perguntas,nivel} = req.body
        if(!req.body || cover){
            return res.status(500).json({message: 'Preencha todos os itens'})
        }
        const item = await Perguntas.updateOne({_id:id},{
            titulo,
            cover,
            perguntas,
            nivel
        })

      

        res.status(200).json({message: 'Item atualizado com sucesso'})
    }

    async deleteQuestion(req,res){
        const {id} = req.params

        const item = await Perguntas.findByIdAndDelete({_id:id})
        if(!item){
            return res.status(404).json({message: 'item não encontrado'})
        }
        
        
        return res.status(200).json({message: 'item deletado com sucesso'})
    }
}


module.exports = new PerguntasController()
