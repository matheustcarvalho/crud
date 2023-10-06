
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createUser, updateUser, deleteUser, getUsers } from './controllers/userController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rota para criar um usuário
app.post('/users', createUser);

// Rota para atualizar um usuário
app.put('/users/:id', updateUser);

// Rota para listar um usuários
app.get('/usersList', getUsers);

// Rota para deletar um usuário
app.delete('/users/:id', deleteUser);

// Rota de exemplo
app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
