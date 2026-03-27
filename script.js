let datos = [];
let i = 0;
let contadorResueltas = 0;
let contadorCorrectas = 0;
let contadorIncorrectas = 0;

async function iniciar() {
    try {
        const r = await fetch('api.php');
        datos = await r.json();
        render();
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function render() {
    if (!datos || datos.length === 0) return;
    const q = datos[i];
    
    // LOG DE SEGURANÇA: Abra o console (F12) para ver se os dados chegaram
    console.log("Dados da questão atual:", q);

    // 1. Preenchendo textos superiores (Metadados)
    // Se na sua planilha a coluna se chamar 'bloque', use q.bloque.
    document.getElementById('txt-tema').innerText = q.bloque || q.BLOQUE || "---";
    document.getElementById('txt-asunto').innerText = q.asunto || q.ASUNTO || "---";
    document.getElementById('txt-id').innerText = q.id || q.ID || i + 1;
    document.getElementById('txt-oposicion').innerText = q.bloque || ""; 
    document.getElementById('txt-ano').innerText = q.ano || q.ANO || "";
    
    // 2. Conteúdo Principal (Onde estava o erro de "em branco")
    // Testamos minúsculo e MAIÚSCULO para garantir
    document.getElementById('enunciado').innerText = q.pregunta || q.PREGUNTA || "Erro ao carregar enunciado";
    document.getElementById('label-a').innerText = q.a || q.A || "";
    document.getElementById('label-b').innerText = q.b || q.B || "";
    document.getElementById('label-c').innerText = q.c || q.C || "";
    
    // 3. Contadores de posição (Pregunta X de Y)
    document.getElementById('num-atual').innerText = i + 1;
    document.getElementById('num-total').innerText = datos.length;
    
    // 4. Limpeza visual para a nova questão
    document.getElementById('area-comentario').classList.add('oculto');
    document.getElementsByName('opcao').forEach(r => r.checked = false);
    document.querySelectorAll('.opcao-item').forEach(item => {
        item.style.backgroundColor = "";
        item.style.borderColor = "#eee";
    });
}
function verificar() {
    const q = datos[i];
    const marcado = document.querySelector('input[name="opcao"]:checked');
    
    if (!marcado) return alert("¡Seleccione una opción!");

    const respostaCorreta = q.respuesta.trim().toUpperCase();
    const todasOpcoes = document.querySelectorAll('.opcao-item');

    // Lógica de cores
    todasOpcoes.forEach(item => {
        const radio = item.querySelector('input');
        if (radio.value === respostaCorreta) {
            item.style.backgroundColor = "#d4edda"; // Verde
            item.style.borderColor = "#28a745";
        } else if (radio.checked && radio.value !== respostaCorreta) {
            item.style.backgroundColor = "#f8d7da"; // Vermelho
            item.style.borderColor = "#dc3545";
        }
    });

    // Atualiza estatísticas (Contador no topo)
    contadorResueltas++;
    if (marcado.value === respostaCorreta) {
        contadorCorrectas++;
    } else {
        contadorIncorrectas++;
    }

    document.getElementById('resueltas').innerText = contadorResueltas;
    document.getElementById('acertos').innerText = contadorCorrectas + " Correctas";
    document.getElementById('erros').innerText = contadorIncorrectas + " Incorrectas";

    // Mostra comentário
    document.getElementById('gabarito').innerText = respostaCorreta;
    document.getElementById('texto-comentario').innerText = q.explicacion;
    document.getElementById('area-comentario').classList.remove('oculto');
}

function proxima() { if (i < datos.length - 1) { i++; render(); } }
function anterior() { if (i > 0) { i--; render(); } }

iniciar();