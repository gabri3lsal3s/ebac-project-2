const form = document.getElementById('form-contatos');
const tabela = document.getElementById('tabela');
const corpoTabela = document.querySelector('tbody');
let nome_contato = document.getElementById('nome');
let numero_contato = document.getElementById('numero');
let linhas = '';
let numero = '';
let contatos = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinhas();
    contaLinhas();
})

const adicionaLinhas = () => {
    numero = numero_contato.value
    if (String(numero).length < 11) {
        alert('Insira um número válido com 11 dígitos.')
    } else if (contatos.includes(nome_contato.value)) {
        alert('Este contato já foi salvo anteriormente.')
    }   
    else
    {
        let linha_nova = '<tr>'
        let numeroFormatado = formataNumero();
        linha_nova += `<td>${nome_contato.value}</td>`;
        linha_nova += `<td>${numeroFormatado}</td>`;
        linhas += linha_nova
        contatos.push(nome_contato.value);

        limpaValores();
        atualizaTabela();
    }
}

const limpaValores = () => {
    nome_contato.value = '';
    numero_contato.value = '';
}

const atualizaTabela = () => {
    corpoTabela.innerHTML = linhas;
    tabela.classList.remove('hidden')
}

const formataNumero = () => {
    let ddd = '';
    let digito = '';
    let contato = '';
    let numeroFormatado = '';
    let numeroArray = String(numero).split("");
    let formataDDD = () => {
        for (i = 0; i < 2; i++) {
            ddd = ddd + numeroArray[i];
        }
    }
    let formataDigito = () => {
        for (i = 1; i < 2; i++) {
            digito = digito + numeroArray[i];
        }
    }
    let formataContato = () => {
        for (i = 3; i < 11; i++) {
            contato = contato + numeroArray[i];
        }
    }
    formataDDD()
    formataDigito()
    formataContato()
    numeroFormatado = `(${ddd}) ${digito} ${contato}`;
    return numeroFormatado;
}

const contaLinhas = () => {
    let rows = corpoTabela.getElementsByTagName('tr').length
    document.getElementById('qtd').innerHTML = rows
}