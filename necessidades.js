function criarCard(necessidade) {
  // Cria um card Bootstrap com os dados da necessidade
  const divCol = document.createElement('div');
  divCol.className = 'col-md-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card shadow-sm h-100';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column';

  const titulo = document.createElement('h5');
  titulo.className = 'card-title';
  titulo.textContent = necessidade.titulo;

  const instituicao = document.createElement('h6');
  instituicao.className = 'card-subtitle mb-2 text-muted';
  instituicao.textContent = `Instituição: ${necessidade.instituicao}`;

  const tipoAjuda = document.createElement('p');
  tipoAjuda.className = 'card-text';
  tipoAjuda.innerHTML = `<strong>Tipo de Ajuda:</strong> ${necessidade.tipoAjuda}`;

  const descricao = document.createElement('p');
  descricao.className = 'card-text flex-grow-1';
  descricao.textContent = necessidade.descricao;

  const endereco = document.createElement('p');
  endereco.className = 'card-text small text-muted';
  endereco.textContent = `Endereço: ${necessidade.rua}, ${necessidade.bairro}, ${necessidade.cidade} - ${necessidade.estado}, CEP: ${necessidade.cep}`;

  const contato = document.createElement('p');
  contato.className = 'card-text small';
  contato.innerHTML = `<strong>Contato:</strong> Email: ${necessidade.email} | Telefone: ${necessidade.telefone}`;

  cardBody.appendChild(titulo);
  cardBody.appendChild(instituicao);
  cardBody.appendChild(tipoAjuda);
  cardBody.appendChild(descricao);
  cardBody.appendChild(endereco);
  cardBody.appendChild(contato);

  card.appendChild(cardBody);
  divCol.appendChild(card);

  return divCol;
}

function carregarNecessidades() {
  const container = document.getElementById('lista-necessidades');
  container.innerHTML = '';

  // Pega dados do localStorage
  const lista = JSON.parse(localStorage.getItem('necessidades')) || [];

  if (lista.length === 0) {
    container.innerHTML = '<p class="text-center">Nenhuma necessidade cadastrada.</p>';
    return;
  }

  // Cria e adiciona cards para cada necessidade
  lista.forEach((necessidade) => {
    const card = criarCard(necessidade);
    container.appendChild(card);
  });
}

// Carrega ao abrir a página
window.onload = carregarNecessidades;