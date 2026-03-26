let questoes = [];
let indiceAtual = 0;

console.log("JS carregado");

// Fetch do CSV convertido em JSON via sua API
fetch('http://localhost/OPOSICION/banco-questoes/api.php')
    .then(res => res.json())
    .then(data => {
        console.log("DATOS:", data);
        questoes = data;
        mostrarQuestao();
    })
    .catch(error => {
        console.error("ERRO:", error);
    });

function mostrarQuestao() {
    if (questoes.length === 0) return;

    let q = questoes[indiceAtual];

    // Atualiza a pergunta e alternativas
    document.getElementById('enunciado').innerText = q.enunciado;

    document.getElementById('altA').innerText = "A) " + q.alternativa_a;
    document.getElementById('altB').innerText = "B) " + q.alternativa_b;
    document.getElementById('altC').innerText = "C) " + q.alternativa_c;

    // Limpa feedback
    document.getElementById('feedback').innerText = "";

    // Habilita botões e remove classes
    ['A','B','C'].forEach(l => {
        let botao = document.getElementById('alt' + l);
        botao.disabled = false;
        botao.classList.remove('correta', 'errada');
    });

    // Atualiza contador se tiver
    if(document.getElementById('contador')) {
        document.getElementById('contador').innerText = `Questão ${indiceAtual + 1} de ${questoes.length}`;
    }
}

function responder(letra) {
    let q = questoes[indiceAtual];
    let correta = q.resposta_correta.toUpperCase();

    // Remove classes de respostas anteriores
    ['A','B','C'].forEach(l => {
        document.getElementById('alt' + l).classList.remove('correta', 'errada');
    });

    let botaoSelecionado = document.getElementById('alt' + letra);
    let botaoCorreto = document.getElementById('alt' + correta);

    if (letra === correta) {
        botaoSelecionado.classList.add('correta');
        document.getElementById('feedback').innerText = "Correto!";
    } else {
        botaoSelecionado.classList.add('errada');
        botaoCorreto.classList.add('correta');
        document.getElementById('feedback').innerText = "Errado! " + q.explicacao;
    }

    // Desabilita todas as alternativas
    ['A','B','C'].forEach(l => {
        document.getElementById('alt' + l).disabled = true;
    });
}

function proxima() {
    if (indiceAtual < questoes.length - 1) {
        indiceAtual++;
        mostrarQuestao();
    }
}

function anterior() {
    if (indiceAtual > 0) {
        indiceAtual--;
        mostrarQuestao();
    }
}