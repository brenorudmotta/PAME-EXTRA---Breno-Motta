class Pedido
{
    constructor(IDunico, IDcliente, status, data)
    {
        this.IDcliente = IDcliente;
        this.IDunico = IDunico;
        this.status = status;
        this.data = data;
    }
}

class Funcionario
{
    constructor(IDunico, nomeUsuario, cpf, email, senha)
    {
        this.IDunico = IDunico;
        this.nomeUsuario = nomeUsuario;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente
{
    constructor(IDunico, nome, dataNascimento, cpf, email, senha)
    {
        this.IDunico = IDunico;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Produtos
{
    constructor(validade, preco, estoque, nome, descricao)
    {
        this.validade = validade;
        this.preco = preco;
        this.estoque = estoque;
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Sistema
{
    
}