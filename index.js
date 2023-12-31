const express = require('express')
const app = express()
const mongoose = require('mongoose') 
const Aluno = require('./models/alunoModelo')
const PORT = process.env.PORT || 3000
app.use(express.json())

app.get('/alunos', async function(req, res) {
    try {
      const alunos = await Aluno.find({});
  
      const alunosString = alunos.map(aluno => {
        return `Nome: ${aluno.nome} | Idade: ${aluno.idade} | Peso: ${aluno.peso} | Altura: ${aluno.altura}\n`;
      }).join('<br>');
      
      res.status(200).send(alunosString);
    } catch (error) {
      res.status(500).json({ message: `Erro ao obter dados dos alunos: ${error.message}` });
    }
  });
  
app.post('/alunos', async(req,res) => {

    try {
        const aluno = await Aluno.create(req.body) 
        res.status(200).json(aluno)
        }
    catch (error) {
       console.log(error)
    }   
})



app.put ('/alunos/:id', async function (req,res){
    try {
        const {id} = req.params
        const aluno = await Aluno.findByIdAndUpdate(id,req.body);

    if(!product){
        return res.status(404).json({message: 
            `Não é possível achar o id ${id}`
        })
    }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.delete ('/alunos/:id', async function (req,res){
    try {
        const {id} = req.params;
        const aluno = await Aluno.findByIdAndDelete(id,req.body);
        res.status(200).json({message: `Excluido com sucesso`})

    if(!product){
        return res.status(404).json({message: 
            `Não é possível achar o id ${id}`
        })
    }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

mongoose.connect('mongodb+srv://renanamd:2604@cluster0.zg3orrg.mongodb.net/flag_api')
.then (() => {
    console.log('Banco de dados conectado')
}).catch ( (error) => {
    console.log (error)
}) 

app.listen (PORT, "0.0.0.0", () => {
    console.log('Servidor conectado na porta 3000')
})