const Users = require('../models/Users')
const bcrypt = require('bcrypt')
class UsersController{

    async showAll(req,res){
        const all = await Users.find() 
        res.status(200).json(all)
    }

    async newUser(req,res){
        const body = req.body

        bcrypt.hash(body.senha,10,async (err, hash)=>{
            if(err)return res.status(500).json({message:'error'})
            body.senha = hash
            const newBody = await Users(body)
            newBody.save()
        })
        
        
        res.status(200).json(req.body)
    }

    async login(req,res){
        return res.status(200)
    }

    async editUser(req,res){
        const { id } = req.params
        const item = await Users.findById(id)
        item.nome = req.body.nome
        item.save()

        res.status(200).json(item)
    }

    async deleteUser(req,res){
        const {id} = req.params

        await Users.findByIdAndDelete({_id:id})

        res.status(200).json({message: 'item deletado com sucesso'})
    }
}


module.exports = new UsersController()
