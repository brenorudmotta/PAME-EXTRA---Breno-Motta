const readline = require("readline");

class Pedido
{
    constructor (IDunico, IDcliente, status, data)
    {
        this.IDunico = IDunico;
        this.IDcliente = IDcliente;
        this.status = status;
        this.data = data;
    }
}

class Funcionario
{
    constructor (IDunico, nome, cpf, email, senha)
    {
        this.IDunico = IDunico;
        this.nome = nome;
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

class Produto
{
    constructor (IDunico, validade, preco, estoque, nome, descricao)
    {
        this.IDunico = IDunico;
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sistema = new Sistema();

function mostrarMenu()
{
    console.log("\nMenu:");
    console.log("1. Fazer Login");
    console.log("2. Fazer Cadastro");
    console.log("3. Sair do Programa");
    if (sistema.usuarioLogado)
    {
        console.log("4. Ver Meus Dados");
        console.log("5. Modificar Meus Dados");
        if (sistema.usuarioLogado instanceof Funcionario)
        {
            console.log("6. Ver Lista de Pedidos");
            console.log("7. Ver Lista de Produtos");
            console.log("8. Ver Lista de Clientes");
            console.log("9. Mudar status do pedido");
            console.log("10. Adicionar Produto");
            console.log("11. Editar Produto");
            console.log("12. Excluir Produto");
        }
        else if (sistema.usuarioLogado instanceof Cliente)
        {
            console.log("6. Ver Lista de Produtos");
            console.log("7. Fazer pedido");
            console.log("8. Cancelar pedido");
            console.log("9. Ver meus pedidos");
            console.log("10. Avaliar pedido");
            console.log("11. Visualizar avaliacoes");
        }
        console.log("0. Logout");
    }
}

function executarOpcao(opcao)
{
    switch (opcao)
    {
        case "1":
            rl.question("Tipo (funcionario/cliente): ", tipo => {
                rl.question("ID: ", IDunico => {
                    rl.question("Senha: ", senha => {
                        sistema.fazerLogin(IDunico, senha, tipo);
                        mostrarMenu();
                        rl.prompt();
                    });
                });
            });
            break;
        case "2":
            rl.question("Tipo (funcionario/cliente): ", tipo => {
                rl.question("ID: ", IDunico => {
                    rl.question("Nome: ", nome => {
                        rl.question("CPF: ", cpf => {
                            rl.question("Email: ", email => {
                                rl.question("Senha: ", senha => {
                                    if (tipo == "cliente")
                                    {
                                        rl.question("Data de Nascimentp: ", dataNascimento => {
                                            const cliente = new Cliente(IDunico, nome, dataNascimento, cpf, email, senha);
                                            sistema.fazerCadastro(cliente, tipo);
                                        });
                                    }
                                    else if (tipo == "funcionario")
                                    {
                                        const funcionario = new Funcionario(IDunico, nome, cpf, email, senha);
                                        sistema.fazerCadastro(funcionario, tipo);
                                    }
                                    mostrarMenu();
                                    rl.prompt();
                                });
                            });
                        });
                    });
                });
            });
            break;
        case "3":
            console.log("Programa encerrado");
            rl.close();
            break;
        case "4":
            sistema.verMeusDados();
            mostrarMenu();
            rl.prompt();
            break;
        case "5":
            rl.question("Novos Dados (chave:valor, separados por virgula): ", novosDadosString => {
                const novosDadosArray = novosDadosString.split(",").map(item => item.split(":"));
                const novosDados = Object.fromEntries(novosDadosArray);
                sistema.modificarMeusDados(novosDados);
                mostrarMenu();
                rl.prompt();
            });
            break;
        case "6":
            if (sistema.usuarioLogado instanceof Funcionario)
            {
                console.log(sistema.verListaPedidos());
            }
            else if (sistema.usuarioLogado instanceof Cliente)
            {
                console.log(sistema.verListaProdutos());
            }
            mostrarMenu();
            rl.prompt();
            break;
        case "7":
            if (sistema.usuarioLogado instanceof Funcionario)
            {
                console.log(sistema.verListaProdutos());
                mostrarMenu();
                rl.prompt();
            }
            else if (sistema.usuarioLogado instanceof Cliente)
            {
                rl.question("ID do Pedido: ", IDunico => {
                    rl.question("ID do Cliente: ", IDcliente => {
                        const pedido = new Pedido(IDunico, IDcliente, 'pendente', new Date());
                        sistema.fazerPedido(pedido);
                        mostrarMenu();
                        rl.prompt();
                    });
                });
            }
            break;
        case "8":
            if (sistema.usuarioLogado instanceof Funcionario)
            {
                console.log(sistema.verListaClientes());
                mostrarMenu();
                rl.prompt();
            }
            else if (sistema.usuarioLogado instanceof Cliente)
            {
                rl.question("ID do Pedido: ", IDunico => {
                    sistema.cancelarPedido(IDunico);
                    mostrarMenu();
                    rl.prompt();
                });
            }
            break;
        case "9":
            if (sistema.usuarioLogado instanceof Funcionario)
            {
                rl.question("ID do Pedido: ", IDunico => {
                    rl.question("Novo Status: ", novoStatus => {
                        sistema.mudarStatusPedido(IDunico, novoStatus);
                        mostrarMenu();
                        rl.prompt();
                    });
                });
            }
            else if (sistema.usuarioLogado instanceof Cliente)
            {
                console.log(sistema.verMeusPedidos(sistema.usuarioLogado.IDunico));
                mostrarMenu();
                rl.prompt();
            }
            break;
        case "10":
            if (sistema.usuarioLogado instanceof Funcionario)
            {
                rl.question("ID: ", IDunico => {
                    rl.question("Nome: ", nome => {
                        rl.question("Descricao: ", descricao => {
                            rl.question("Data de Validade: ", dataValidade => {
                                rl.question("Preco: ", preco => {
                                    rl.question("Quantidade em Estoque: ", estoque => {
                                        const produto = new Produto(IDunico, dataValidade, preco, estoque, nome, descricao);
                                        sistema.adicionarProduto(produto);
                                        mostrarMenu();
                                        rl.prompt();
                                    });
                                });
                            });
                        });
                    });
                });
            }
            else if (sistema.usuarioLogado instanceof Cliente)
            {
                rl.question("ID do Pedido: ", IDunico => {
                    rl.question("Avaliacao: ", avaliacao => {
                        sistema.avaliarPedido(IDunico, avaliacao);
                        mostrarMenu();
                        rl.prompt();
                    });
                });
            }
            break;
        case "11":
            if (sistema.usuarioLogado instanceof Funcionario)
            {
                rl.question("ID do Produto: ", IDunico => {
                    rl.question("Novos Dados (chave:valor, separados por virgula): ", novosDadosString => {
                        const novosDadosArray = novosDadosString.split(",").map(item => item.split(":"));
                        const novosDados = Object.fromEntries(novosDadosArray);
                        sistema.editarProduto(IDunico, novosDados);
                        mostrarMenu();
                        rl.prompt();
                    });
                });
            }
            else if (sistema.usuarioLogado instanceof Cliente)
            {
                console.log(sistema.visualizarAvaliacoes(sistema.usuarioLogado.IDunico));
                mostrarMenu();
                rl.prompt();
            }
            break;
        case "12":
            if (sistema.usuarioLogado instanceof Funcionario)
            {
                rl.question("ID do Produto: ", IDunico => {
                    sistema.excluirProduto(IDunico);
                    mostrarMenu();
                    rl.prompt();
                });
            }
            break;
        case "0":
            sistema.sair();
            mostrarMenu();
            rl.prompt();
            break;
        default:
            console.log("Opcao invalida");
            mostrarMenu();
            rl.prompt();
            break;
    }
}

mostrarMenu();
rl.prompt();

rl.on("line", linha => {
    executarOpcao(linha.trim());
});