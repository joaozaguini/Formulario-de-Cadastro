// Selecionando elementos
const generatePasswordButton = document.querySelector('#generate-password');
const generatedPasswordElement = document.querySelector('#generated-password');

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector('#open-generate-password')
const generatePasswordContainer = document.querySelector('#generate-options')
const lengthInput = document.querySelector('#length')
const lettersInput = document.querySelector('#letters')
const numbersInput = document.querySelector('#numbers')
const symbolsInput = document.querySelector('#symbols')
const copyPasswordButton = document.querySelector('#copy-password')

// Funções
// Função para retornar letra em minusculo
// Com base em função matematica em ASCII
const getLetterLowerCase = () => {
  // Retornando para a função o CharCode
  // Como utilizando somente Math.random vai dar
  // Um nome aleatório e quebrado
  // Setamos a função de math.random dentro de um
  // Floot ou floor + 97
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
// Função para retornar letra em maiusculo
// Com base em função matematica em ASCII
const getLetterUpperCase = () => {
  // Retornando para a função o CharCode
  // Como utilizando somente Math.random vai dar
  // Um nome aleatório e quebrado
  // Setamos a função de math.random dentro de um
  // Floot ou floor + 97
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Função para retornar número aleatório
const getNumber = () => {
  // Função simples que retorna um número de 0 a 10
  // Aleatório
  return Math.floor(Math.random() * 10).toString();
}

// Função para retornar simbolos aleatorios
// Função simples que retorna um simbolo aleatorio
const getSymbol = () => {
  const symbols = '(){}[]=<>/,.!@#$%&+-;|';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Função que retorna todos os valores acima
const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
  // Criando uma variavel com uma string vazia
  let password = '';

  // Segunda versão
  // O total de senhas que vai ser gerado
  const passwordLength = +lengthInput.value;

  // Arrays das senhas que vai ser gerado
  const generators = [];

  // Criando condições
  if(lettersInput.checked){
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }
  if(numbersInput.checked){
    generators.push(getNumber);
  }
  if(symbolsInput.checked){
    generators.push(getSymbol);
  }

  // Caso o usuário não selecionar nada
  // Ele não gera
  if(generators.length === 0){
    return;
  }

  // Criando um loop de repetição utilizando o
  // forEach para gerar values aleatórios
  // Criando o laço de repetição e aumentando o i
  // Com base no generators.length
  for(i = 0; i < passwordLength; i = i + generators.length){
    generators.forEach(() => {
      const randomValue = generators[Math.floor(Math.random() * generators.length)]();
    password += randomValue;
    })
  }

  // Cortando os 2 últimos digitos do password
  // Para não ultrapassar o tamanho limite
  password = password.slice(0, passwordLength);

  // Após o usuário criar no botão 
  // O display do elemento vai ser mudado para
  // Block, que condiz em aparecer no site
  generatedPasswordElement.style.display = 'block';

  // E o h4 dentro do elemento vai ser alterado
  // Para o que foi gerado no password
  generatedPasswordElement.querySelector('h4').innerText = password;
}

// Eventos
// Evento de click
generatePasswordButton.addEventListener('click', () => {
  // Chamando a função
  generatePassword(getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  )
})

// Criando o evento de click para o botão de
// Abrir e fechar a janela de criação de senha
openCloseGeneratorButton.addEventListener('click', () => {
  // Quando o usuário criar
  // Ele irá dar um toggle na classe
  // Basicamente adiconando/removendo a classe
  // 'hide'
  generatePasswordContainer.classList.toggle("hide");
})

// Função para copiar o texto
copyPasswordButton.addEventListener('click', (e) => {
  // Prevenindo que relogue a página
  e.preventDefault();

  // Criando uma variavel que vai receber o que
  // Esta dentro do h4
  const password = generatedPasswordElement.querySelector('h4').innerText;

  // Utilizando a função de writeText do clipboard
  // Nativo do navegador e dando o que esta dentro
  // Do h4 para esse clipboard
  navigator.clipboard.writeText(password).then(() => {
    // Após apertar no botão
    // Alterando a mensagem para senha copiada
    copyPasswordButton.innerText = 'senha copiada!';

    // E depois alterando novamente para o original
    setTimeout(() => {
      copyPasswordButton.innerText = 'copiar';
    }, 1000)
  })
})