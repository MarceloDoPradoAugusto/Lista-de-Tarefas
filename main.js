window.addEventListener('load', () => {
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  const inputNome = document.querySelector('#nome');
  const formNovaTarefa = document.querySelector('#form-nova-tarefa');

  const nomeUsuario = localStorage.getItem('nomeUsuario') || '';

  inputNome.value = nomeUsuario;

  inputNome.addEventListener('input', (e) => {
    localStorage.setItem('nomeUsuario', e.target.value);
  });

  formNovaTarefa.addEventListener('submit', (e) => {
    e.preventDefault();

    const tarefa = {
      conteudo: e.target.elements.conteudo.value,
      categoria: e.target.elements.categoria.value,
      concluida: false,
      criadaEm: new Date().getTime()
    };

    tarefas.push(tarefa);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    e.target.reset();

    exibirTarefas();
  });

  exibirTarefas();
});

function exibirTarefas() {
  const listaTarefas = document.querySelector('#lista-tarefas');
  listaTarefas.innerHTML = '';

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach((tarefa) => {
    const itemTarefa = document.createElement('div');
    itemTarefa.classList.add('tarefa-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const conteudo = document.createElement('div');
    const acoes = document.createElement('div');
    const editar = document.createElement('button');
    const excluir = document.createElement('button');

    input.type = 'checkbox';
    input.checked = tarefa.concluida;
    span.classList.add('bolha');
    if (tarefa.categoria == 'pessoal') {
      span.classList.add('pessoal');
    } else {
      span.classList.add('negocios');
    }
    conteudo.classList.add('conteudo-tarefa');
    acoes.classList.add('acoes');
    editar.classList.add('editar');
    excluir.classList.add('excluir');

    conteudo.innerHTML = `<input type="text" value="${tarefa.conteudo}" readonly>`;
    editar.innerHTML = 'Editar';
    excluir.innerHTML = 'Excluir';

    label.appendChild(input);
    label.appendChild(span);
    acoes.appendChild(editar);
    acoes.appendChild(excluir);
    itemTarefa.appendChild(label);
    itemTarefa.appendChild(conteudo);
    itemTarefa.appendChild(acoes);

    listaTarefas.appendChild(itemTarefa);

    if (tarefa.concluida) {
      itemTarefa.classList.add('concluida');
    }

    input.addEventListener('change', (e) => {
      tarefa.concluida = e.target.checked;
      localStorage.setItem('tarefas', JSON.stringify(tarefas));

      if (tarefa.concluida) {
        itemTarefa.classList.add('concluida');
      } else {
        itemTarefa.classList.remove('concluida');
      }

      exibirTarefas();
    });

    editar.addEventListener('click', (e) => {
      const input = conteudo.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        tarefa.conteudo = e.target.value;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        exibirTarefas();
      });
    });

    excluir.addEventListener('click', () => {
      tarefas.splice(tarefas.indexOf(tarefa), 1);
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      exibirTarefas();
    });
  });
}
