const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/calcularimc', async function (req, res) {
  // Calculo do IMC
  function calcularIMC(peso, altura) {
    return peso / (altura ** 2);
  }

  // URL API de alunos
  const apiUrl = 'https://treino-certo-production.up.railway.app/alunos';

  try {
    // GET para obter dados dos alunos
    const response = await axios.get(apiUrl);

    // Extraindo dados
    const alunos = response.data;

    const resultadosIMC = alunos.map(aluno => {
      const pesoAluno = Number(aluno.peso);
      const alturaAluno = Number(aluno.altura);

      const imcAluno = calcularIMC(pesoAluno, alturaAluno);

      return `${aluno.nome}: IMC = ${imcAluno.toFixed(2) + '<br>' } `;
    });

    res.send(resultadosIMC.join('\n'));
  } catch (error) {
    res.status(500).send(`Erro ao obter dados dos alunos: ${error.message}`);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${port}`);
});
