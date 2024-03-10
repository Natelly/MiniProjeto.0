const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sIdade = document.querySelector('#m-idade')
const sSerie = document.querySelector('#m-serie')
const btnSalvar = document.querySelector('#btnSalvar')

let alunos
let id

const getAlunosBD = () => JSON.parse(localStorage.getItem('dbalunos')) ?? []
const setAlunosBD = () => localStorage.setItem('dbalunos', JSON.stringify(alunos))

function loadAlunos() {
  alunos = getAlunosBD()
  tbody.innerHTML = ''
  alunos.forEach((aluno, index) => {
    insertAluno(aluno, index)
  })
}

loadAlunos()

function insertAluno(aluno, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${aluno.nome}</td>
    <td>${aluno.idade}</td>
    <td>${aluno.serie}</td>
    <td class="acao">
      <button onclick="editAluno(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteAluno(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

function editAluno(index) {
  openModal(true, index)
}

function deleteAluno(index) {
  alunos.splice(index, 1)
  setAlunosBD()
  loadAlunos()
}

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = alunos[index].nome
    sIdade.value = alunos[index].idade
    sSerie.value = alunos[index].serie
    id = index
  } else {
    sNome.value = ''
    sIdade.value = ''
    sSerie.value = ''
  }
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || sIdade.value == '' || sSerie.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    alunos[id].nome = sNome.value
    alunos[id].idade = sIdade.value
    alunos[id].serie = sSerie.value
  } else {
    alunos.push({'nome': sNome.value, 'idade': sIdade.value, 'serie': sSerie.value})
  }

  setAlunosBD()

  modal.classList.remove('active')
  loadAlunos()
  id = undefined
};
