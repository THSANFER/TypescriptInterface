interface IUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;

}

interface IProduct{
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    categories: string[]
}

type UserRole = 'Admin'|'Usuário';

interface IAdminUser extends IUser{

    role:UserRole;
}
//Funções para imprimir os detalhes

function formatarBooleano(valor: boolean): string {
  if (valor) { 
    return "Sim";
  } else {
    return "Não";
  }
}

function imprimirDetalhesDoUsuario(usuario: IUser): void {
  console.log("\n--- Detalhes Gerais do Usuário ---");
  console.log(`ID: ${usuario.id}`);
  console.log(`Nome: ${usuario.name}`);
  console.log(`Email: ${usuario.email}`);
  console.log(`EstáAtivo?: ${formatarBooleano(usuario.isActive)}`);
}

function imprimirDetalhesProduto(produto: IProduct): void {
  console.log("\n--- Detalhes do Produto ---");
  console.log(`ID: ${produto.id}`);
  console.log(`Nome: ${produto.name}`);
  console.log(`Preço: ${produto.price}`);
  console.log(`Em Estoque?: ${formatarBooleano(produto.inStock)}`);
  console.log(`Categorias: ${produto.categories}`);
}

function imprimirAdminUser(credencia: IAdminUser): void {
  console.log("\n--- Detalhes Avançados do Usuário ---");
  console.log(`ID: ${credencia.id}`);
  console.log(`Nome: ${credencia.name}`);
  console.log(`Email: ${credencia.email}`);
  console.log(`EstáAtivo?: ${formatarBooleano(credencia.isActive)}`);
  console.log(`Credencial: ${credencia.role}`);
}





//Instâncias para usuário
const usuario1: IUser = {

    id: 1,
    name: "Gerson Andrade",
    email: "gersonandrade2000@gmail.com",
    isActive: true
};

const usuario2: IUser = {

    id: 2,
    name: "Amanda Gomes",
    email: "nandagomes@gmail.com",
    isActive: false
};

//Instâncias para produto
const produto1: IProduct = {
    id: 432,
    name: "Bola de Futebol",
    price: 49.99,
    inStock: true,
    categories:["Esporte", "Atividade Física", "Todas as idades","Brinquedo"]

}

const produto2: IProduct = {
    id: 259,
    name: "Cerveja Brahma 350ml",
    price: 6.29,
    inStock: false,
    categories:["Bebida", "Alcoólico", "Proibido para menore de 18 anos"]

}
//Instâncias para admin
const credencial1: IAdminUser = {
    id: 1,
    name: "Gerson Andrade",
    email: "gersonandrade2000@gmail.com",
    isActive: true,
    role: "Usuário"
}

const credencial2: IAdminUser = {
    id: 2,
    name: "Amanda Gomes",
    email: "nandagomes@gmail.com",
    isActive: false,
    role: "Admin"
}

imprimirDetalhesDoUsuario(usuario1);
imprimirDetalhesProduto(produto2);
imprimirAdminUser(credencial1);



//Exercício 4: Genéricos
//Crie uma função genérica chamada `getData<T>(items: T[]): T[]` 
// que recebe um array de qualquer tipo e retorna o mesmo array. 
// Demonstre seu uso com arrays de strings, numbers e objetos `IUser`.


/** 
 * @param <T> - O tipo genérico. Ele será definido no momento em que a função for chamada.
 * @param items - Um array de itens do tipo 'T' (T[]).
 * @returns O mesmo array de itens do tipo 'T' (T[]).
 */
function getData<T>(items: T[]): T[] {
  return items;
}

const numeros: number[] = [10, 25, 50, 100];
const numeroRetornado = getData(numeros);

const texto: string[] = ["testando", "o", "algoritmo"]
const textoRetornado = getData(texto);

const user: IUser[] = [usuario1]
const userRetornado = getData(user);

console.log("\nArray de números:", numeroRetornado);
console.log("\nArray de strings:", textoRetornado);
console.log("\nArray de usuários:", userRetornado);

//Crie uma função genérica chamada `getById<T extends { id: number }>(items: T[], id: number): T | undefined` 
// que recebe um array de objetos que possuem uma propriedade `id` (number) e um `id` para procurar. 
// A função deve retornar o objeto correspondente ou `undefined`. Teste com arrays de `IUser` e `IProduct`.

/**
 * Procura um item em um array de objetos pelo seu 'id'.
 * A função é genérica, mas exige que cada objeto tenha uma propriedade 'id' do tipo number.
 * @template T - O tipo genérico, restrito a objetos que possuem { id: number }.
 * @param {T[]} items - O array de objetos para pesquisar.
 * @param {number} id - O ID do item a ser encontrado.
 * @returns {T | undefined} O objeto encontrado ou 'undefined' se não for encontrado.
 */
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  // O método .find() é ideal aqui. Ele itera sobre o array e retorna
  // o primeiro 'item' para o qual a condição 'item.id === id' é verdadeira.
  // Se nenhum item for encontrado, .find() retorna 'undefined' automaticamente.
  return items.find(item => item.id === id);
}

const usuarios: IUser[] = [usuario1, usuario2];
const produtos: IProduct[] = [produto1, produto2];

console.log("\nBuscando no array de usuários...");

const usuarioEncontrado = getById(usuarios, 25);
if (usuarioEncontrado) {
    console.log(`Usuário com ID ${usuario1.id} encontrado: ${usuarioEncontrado.name}`);
} else {
    console.log("Usuário não encontrado com a ID informada.");
}

console.log("\nBuscando no array de produtos...");
const produtoEncontrado = getById(produtos, 148);
if (produtoEncontrado) {
    console.log(`Produto com ID ${produto1.id} encontrado: ${produtoEncontrado.name} (Preço: R$${produtoEncontrado.price})`);
} else {
    console.log("Produto não encontrado com a ID informada.");
}


