// 1. Importações Essenciais
import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());
const port = 3000;

interface IUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;

}

const usuarios: IUser []= [

    {id: 1150, name: "Gerson Andrade", email: "gersonandrade2000@gmail.com", isActive: true},
    {id: 2250, name: "Amanda Gomes", email: "nandagomes@gmail.com", isActive: false},
];


// app.get() define uma rota que responde a requisições HTTP GET.
// O primeiro argumento é o caminho (path), neste caso a raiz do site ('/').
// O segundo argumento é uma função (handler) que será executada quando a rota for acessada.
app.get('/', (req: Request, res: Response) => {
  const mensagem = `
URL para acessar os usuários: http://localhost:3000/users\n
URL para acessar diretamente os IDs: http://localhost:3000/users/id\n`
  res.type('text/plain');
  res.send(mensagem);
});

app.get('/users', (req: Request, res: Response) => {
  res.json(usuarios);
});
app.get('/users/id', (req: Request, res: Response) => {
  const id = usuarios.map(usuario => usuario.id);
  res.json(id);
});

app.post('/users', (req: Request, res: Response) => {
  const novoUsuario: IUser = req.body;

  if (!novoUsuario || !novoUsuario.name || !novoUsuario.email) {
    return res.status(400).json({ message: 'Corpo da requisição inválido ou faltando nome/email.' });
  }

  usuarios.push(novoUsuario);
  
  res.status(201).json(novoUsuario);
});

app.put('/users/:id', (req: Request, res: Response) => {
  const idParaAtualizar = parseInt(req.params.id, 10);
  const dadosAtualizados = req.body;

  const indexDoUsuario = usuarios.findIndex(user => user.id === idParaAtualizar);

  if (indexDoUsuario === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  usuarios[indexDoUsuario] = { ...usuarios[indexDoUsuario], ...dadosAtualizados };

  res.json(usuarios[indexDoUsuario]);
});

// DELETE /users/:id - Deleta um usuário
app.delete('/users/:id', (req: Request, res: Response) => {
  // 1. Pega o ID da URL
  const idParaDeletar = parseInt(req.params.id, 10);

  // 2. Encontra o índice do usuário
  const indexDoUsuario = usuarios.findIndex(user => user.id === idParaDeletar);

  // 3. Verifica se o usuário existe
  if (indexDoUsuario === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  usuarios.splice(indexDoUsuario, 1);
  res.status(204).send();
});

app.delete('/usersa/:email', (req:Request, res: Response) => {
    const emailParaDeletar = req.params.email;
    const indexDoUsuario = usuarios.findIndex(user => user.email === emailParaDeletar);
    
    if (indexDoUsuario === -1){
        return res.status(404).json({message: 'Usuário não encontrado.'});
    }

    usuarios.splice(indexDoUsuario,1);
    res.status(204).send();
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
