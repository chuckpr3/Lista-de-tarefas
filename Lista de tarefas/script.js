function meuEscopo() {
    const inputTarefa = document.querySelector('.input-tarefa');
    const btnTarefa = document.querySelector('.btn-tarefa');
    const tarefas = document.querySelector('.tarefas');

    function criaLista(){
        const lista = document.createElement('li');
        return lista;
    }

    inputTarefa.addEventListener('keypress', function(event){
        if (event.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        }
    });

    function limpaInput() {
        inputTarefa.value = '';
        inputTarefa.focus();
    }

    function criaBotaoApagar(lista){
        lista.innerText += ' ';
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        botaoApagar.setAttribute('class', 'Apagar');
        botaoApagar.setAttribute('tittle', 'Apagar esta tarefa');
        lista.appendChild(botaoApagar);

    }

    function criaTarefa (textoInput){
        const lista = criaLista();
        lista.innerText  = textoInput;
        tarefas.appendChild(lista);
        limpaInput();
        criaBotaoApagar(lista)
        salvarTarefas();
    }

    btnTarefa.addEventListener('click', function(){
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    });

    document.addEventListener('click', function(event){
        const elemeto = event.target;

        if (elemeto.classList.contains('Apagar')){
            elemeto.parentElement.remove();
            salvarTarefas();
        }
    });

    function salvarTarefas() {
        const liTarefas = tarefas.querySelectorAll('li');
        const listaDeTarefas = [];

        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar','').trim();
            listaDeTarefas.push(tarefaTexto);
        }

        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON );
    }

    function adicionaTarefasSalvas(){
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);
        for (let tarefa of listaDeTarefas){
            criaTarefa(tarefa);
        }
    }
    adicionaTarefasSalvas();

}
meuEscopo();