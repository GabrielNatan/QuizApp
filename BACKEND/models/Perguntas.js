const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PerguntasSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true,
        unique:true
    },
    cover:{
        type: String,
        require: true
    },
    nivel:{
        type:String,
        required:true
    },
    pergutas:{
        type: [String],
        require:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
},{
    toJSON:{
        virtuals:true
    }
})

PerguntasSchema.virtual('cover_url').get(function(){
    return `http://localhost:3000/files/${this.cover}`;
})

module.exports = mongoose.model('Perguntas', PerguntasSchema)