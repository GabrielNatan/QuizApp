const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')

class Middleware{

    async authenticate(req,res,next){
         const body = req.body
         
         if(!body.senha || !body.email ){
             return res.status(500).json({message: 'Preencha todos os campos'})
         }
        
        const user = await User.findOne({email:body.email}) 
        if(user){
            bcrypt.compare(body.senha,user.senha,(erro,result)=>{
                
                if(erro){
                    return res.status(500).json({message: 'Preencha todos os campos'})
                 }
                if(result){
                    console.log(user)
                    const token = jwt.sign({
                        email: user.email,
                        nome: user.nome
                    },'maneira_e_meia',{
                        expiresIn:'1h'
                    })
                    return res.status(200).json({message:'Login realizado com sucesso',token})
                }

                return res.status(500).json({message: 'Senha incorreta'})
                
                
            })
        }else{
            return res.status(501).json({message: 'Falha na falha na autenticação'})
        }
        

        next()
    }
}

module.exports = new Middleware()