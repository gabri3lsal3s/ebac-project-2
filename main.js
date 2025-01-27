const form = document.getElementById('form-contatos');
const tabela = document.getElementById('tabela');
const corpoTabela = document.querySelector('tbody');
const seletor = document.querySelector('#seletor')
const fixo = seletor.querySelector('#fixo');
const movel = seletor.querySelector('#movel');
let nome_contato = document.getElementById('nome');
let numero_contato = document.getElementById('numero');
let selecionado = 'movel';
let digitos = 11;
let linhas = '';
let numero = '';
let contatos_salvos = [];
let numeros_salvos = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinhas();
    contaLinhas();
})

const adicionaLinhas = () => {
    numero = numero_contato.value
    if (String(numero).length != digitos) {
        alert(`Insira um número válido com ${digitos} dígitos para telefone ${selecionado}.`)
    } else if (contatos_salvos.includes(nome_contato.value)) {
        alert('Este contato já foi salvo anteriormente.')
    } else if (numeros_salvos.includes(numero_contato.value)) {
        alert('Este número já foi salvo anteriormente.')
    } else {
        let linha_nova = '<tr>'
        let numeroFormatado = formataNumero();
        linha_nova += `<td>${nome_contato.value}</td>`;
        linha_nova += `<td>${numeroFormatado}</td>`;
        linhas += linha_nova
        contatos_salvos.push(nome_contato.value);
        numeros_salvos.push(numero_contato.value);
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
    const formataMovel = () => {
        let formataDDD = () => {
            for (i = 0; i < 2; i++) {
                ddd = ddd + numeroArray[i];
            }
        }
        let formataDigito = () => {
            for (i = 2; i < 3; i++) {
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
    const formataFixo = () => {
        let formataPrimeiraP = () => {
            for (i = 0; i < 4; i++) {
                ddd = ddd + numeroArray[i];
            }
        }
        let formataSegundaP = () => {
            for (i = 4; i < 8; i++) {
                digito = digito + numeroArray[i];
            }
        }
        formataPrimeiraP()
        formataSegundaP()
        numeroFormatado = `${ddd} - ${digito}`;
        return numeroFormatado;
    }
    if (selecionado == 'movel') {
        formataMovel()
        return numeroFormatado;
    }
    if (selecionado == 'fixo') {
        formataFixo()
        return numeroFormatado;
    }
}

const contaLinhas = () => {
    let rows = corpoTabela.getElementsByTagName('tr').length
    document.getElementById('qtd').innerHTML = rows
}

fixo.addEventListener('click', function () {
    fixo.classList.add('selecionado');
    movel.classList.remove('selecionado');
    selecionado = 'fixo';
    digitos = 8;
})
movel.addEventListener('click', function () {
    movel.classList.add('selecionado');
    fixo.classList.remove('selecionado');
    selecionado = 'movel';
    digitos = 11;
})