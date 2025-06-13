// cadastro.js

// Função para limpar campos de endereço
function limpa_formulario_cep() {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

// Callback da API ViaCEP
function meu_callback(conteudo) {
  if (!('erro' in conteudo)) {
    document.getElementById('rua').value = conteudo.logradouro;
    document.getElementById('bairro').value = conteudo.bairro;
    document.getElementById('cidade').value = conteudo.localidade;
    document.getElementById('estado').value = conteudo.uf;
  } else {
    limpa_formulario_cep();
    alert('CEP não encontrado.');
  }
}

// Consulta CEP na API ViaCEP
function pesquisacep(valor) {
  const cep = valor.replace(/\D/g, '');

  if (cep !== '') {
    const validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
      document.getElementById('rua').value = '...';
      document.getElementById('bairro').value = '...';
      document.getElementById('cidade').value = '...';
      document.getElementById('estado').value = '...';

      const script = document.createElement('script');
      script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
      document.body.appendChild(script);
    } else {
      limpa_formulario_cep();
      alert('Formato de CEP inválido.');
    }
  } else {
    limpa_formulario_cep();
  }
}

// Função principal para salvar os dados do formulário
(function () {
  const form = document.getElementById('formCadastro');

  // Escuta o evento submit do formulário
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Validação padrão do Bootstrap
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Pega os valores do formulário
    const necessidade = {
      instituicao: document.getElementById('instituicao').value.trim(),
      tipoAjuda: document.getElementById('tipoAjuda').value,
      titulo: document.getElementById('titulo').value.trim(),
      descricao: document.getElementById('descricao').value.trim(),
      cep: document.getElementById('cep').value.trim(),
      rua: document.getElementById('rua').value.trim(),
      bairro: document.getElementById('bairro').value.trim(),
      cidade: document.getElementById('cidade').value.trim(),
      estado: document.getElementById('estado').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
    };

    // Recupera lista atual do localStorage (ou array vazio)
    const lista = JSON.parse(localStorage.getItem('necessidades')) || [];

    // Adiciona o novo cadastro
    lista.push(necessidade);

    // Salva novamente no localStorage
    localStorage.setItem('necessidades', JSON.stringify(lista));

    alert('Necessidade cadastrada com sucesso!');

    // Reseta o formulário e a validação
    form.reset();
    form.classList.remove('was-validated');

    // Limpa os campos de endereço para o próximo cadastro
    limpa_formulario_cep();
  });

  // Integração ViaCEP: ao sair do campo CEP, faz a consulta
  document.getElementById('cep').addEventListener('blur', function () {
    pesquisacep(this.value);
  });
})();