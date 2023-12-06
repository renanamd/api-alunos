const mongoose = require('mongoose') 

const alunoSchema = mongoose.Schema (
    {
        nome: {
            type:String,
            required: [true,"Insira o nome do aluno"]
        },
        idade: {
            type: Number,
            required: [true,"Insira da idade do aluno"] 
        },
        peso:{
            type: Number,
            required: [true,"Insira o peso do aluno"] 
        },
        altura:{
            type: Number,
            required: [true,"Insira a altura do aluno"] 
        }, 
    },

    {
        timestamps: true,
    }
)

const Aluno = mongoose.model('Aluno', alunoSchema); 
module.exports = Aluno;