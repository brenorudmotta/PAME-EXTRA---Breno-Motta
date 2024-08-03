const readline = require("readline");

class Pedido
{
    constructor (IDunico, IDcliente, status, data)
    {
        this.IDcliente = IDcliente;
        this.IDunico = IDunico;
        this.status = status;
        this.data = data;
    }
}

class Funcionario
{
    constructor (IDunico, nomeUsuario, cpf, email, senha)
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
    constructor (IDunico, nome, dataNascimento, cpf, email, senha)
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
    constructor (validade, preco, estoque, nome, descricao)
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
    constructor ()
    {
        this.funcionarios = [];
        this.clientes = [];
        this.pedidos = [];
        this.produtos = [];
        this.usuarioLogado = null;
    }

    fazerCadastro (usuario, tipo)
    {
        if (tipo == "funcionario")
        {
            this.funcionarios.push(usuario);
        }
        else if (tipo == "cliente")
        {
            this.clientes.push(usuario);
        }
        console.log("Cadastrado com sucesso!");
    }

    fazerLogin(IDunico, senha, tipo)
    {
        var usuario;
        if (tipo == "funcionario")
        {
            usuario = this.funcionarios.find(f => f.IDunico == IDunico && f.senha == senha);
        }
        else if (tipo == "cliente")
        {
            usuario = this.clientes.find(c => c.IDunico == IDunico && c.senha == senha);
        }
        if (usuario)
        {
            this.usuarioLogado = usuario;
            console.log("Login feito com sucesso!");
        }
        else
        {
            console.log("ID ou senha incorretos");
        }
    }

    sair()
    {
        this.usuarioLogado = null;
        console.log("Logout feito com sucesso!");
    }

    verMeusDados()
    {
        if (this.usuarioLogado)
        {
            console.log(this.usuarioLogado);
        }
        else
        {
            console.log("Nenhum usuario logado");
        }
    }

    modificarMeusDados(novosDados)
    {
        if (this.usuarioLogado)
        {
            for (var chave in novosDados)
            {
                if (this.usuarioLogado.hasOwnProperty(chave))
                {
                    this.usuarioLogado[chave] = novosDados[chave];
                }
            }
            console.log("Dados modificados com sucesso!");
        }
        else
        {
            console.log("Nenhum usuario logado");
        }
    }

    verListaPedidos()
    {
        return this.pedidos.sort((a, b) => new Date(a.data) - new Date(b.data));
    }

    verListaProdutos()
    {
        return this.produtos.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    verListaClientes()
    {
        return this.clientes.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    mudarStatusPedido(IDunico, novoStatus)
    {
        var pedido = this.pedidos.find(p => p.IDunico == IDunico);
        if (pedido)
        {
            pedido.status = novoStatus;
            console.log("Status modificado com sucesso!");
        }
    }

    adicionarProduto(produto)
    {
        this.produtos.push(produto);
        console.log("Produto adicionado com sucesso!");
    }

    editarProduto(IDunico, novosDados)
    {
        var produto = this.produtos.find(p => p.IDunico == IDunico);
        if (produto)
        {
            Object.assign(produto, novosDados);
            console.log("Produto editado com sucesso!");
        }
    }

    excluirProduto(IDunico)
    {
        this.produtos = this.produtos.filter(p => p.IDunico != IDunico);
        console.log("Produto excluido com sucesso!");
    }

    fazerPedido(pedido)
    {
        this.pedidos.push(pedido);
        console.log("Pedido feito com sucesso!");
    }

    cancelarPedido(IDunico)
    {
        var pedido = this.pedidos.find(p => p.IDunico == IDunico);
        if (pedido)
        {
            pedido.status = "cancelado";
            console.log("Pedido cancelado com sucesso!");
        }
    }

    verMeusPedidos(IDunico)
    {
        return this.pedidos.filter(p => p.IDunico == IDunico).sort((a, b) => new Date(a.data) - new Date(b.data));
    }

    avaliarPedido(IDunico, avaliacao)
    {
        var pedido = this.pedidos.find(p => p.IDunico == IDunico);
        if (pedido)
        {
            pedido.avaliacao = avaliacao;
            console.log("Pedido avaliado com sucesso!");
        }
    }

    visualizarAvaliacoes(IDcliente)
    {
        return this.pedidos.filter(p => p.IDcliente == IDcliente && p.avaliacao);
    }
}

