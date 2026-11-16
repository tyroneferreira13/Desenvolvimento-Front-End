// Requisito: Comentário de planejamento (tema, entrada, processamento, saída)[cite: 5]
/* 
  Planejamento de Lógica (Aula 09):
  - Tema: Plataforma Multidisciplinar de Apoio Acadêmico (EstudaFácil)
  - Entrada: Notas parciais de etapas e projeto prático
  - Processamento: Soma ponderada e condicional de aprovação baseada em acumulador/loops
  - Saída: Exibição dinâmica do resultado formatado via DOM sem innerHTML vulnerável
*/

// Array de objetos com 5+ itens e 3+ propriedades cada (Exigência Aula 09 a 11)[cite: 5]
const disciplinasAcervo = [
    { id: 1, nome: "Matemática Aplicada", categoria: "exatas", cargaHoraria: 60 },
    { id: 2, nome: "Anatomia Humana", categoria: "saude", cargaHoraria: 80 },
    { id: 3, nome: "Direito Constitucional", categoria: "humanas", cargaHoraria: 75 },
    { id: 4, nome: "Gestão Financeira", categoria: "negocios", cargaHoraria: 60 },
    { id: 5, nome: "Metodologia Científica e ABNT", categoria: "normas", cargaHoraria: 40 }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. EFEITO PARALLAX NA ROLAGEM
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const orb1 = document.getElementById('orb1');
        const orb2 = document.getElementById('orb2');
        const orb3 = document.getElementById('orb3');

        if (orb1 && orb2 && orb3) {
            orb1.style.transform = `translate(${scrollY * 0.15}px, ${scrollY * 0.25}px)`;
            orb2.style.transform = `translate(-${scrollY * 0.2}px, -${scrollY * 0.15}px)`;
            orb3.style.transform = `translate(${scrollY * 0.12}px, -${scrollY * 0.22}px)`;
        }
    });

    // 2. FUNÇÕES E ESCOPO (Aula 10)[cite: 5]
    function processarCalculoNotas(n1, n2, proj) {
        // Coerção explícita de tipos com Number()[cite: 5]
        const total = Number(n1) + Number(n2) + Number(proj);
        return total;
    }

    function classificarSituacao(media) {
        let status = "";
        // Uso obrigatório de if/else e switch conforme exigência estrutural[cite: 5]
        if (media >= 7.0) {
            status = "Aprovado(a) com distinção!";
        } else if (media >= 5.0) {
            status = "Em acompanhamento / Recuperação.";
        } else {
            status = "Reprovado - Necessário refazer o bloco.";
        }
        return status;
    }

    // Evento do Simulador de Média
    const btnCalcular = document.getElementById("btnCalcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const nota1 = document.getElementById('nota1').value || 0;
            const nota2 = document.getElementById('nota2').value || 0;
            const projeto = document.getElementById('projeto').value || 0;
            const containerResultado = document.getElementById('resultadoMedia');

            const soma = processarCalculoNotas(nota1, nota2, projeto);
            const situacao = classificarSituacao(soma);

            // Manipulação segura do DOM sem innerHTML de dados de usuário[cite: 5]
            containerResultado.style.display = 'block';
            containerResultado.textContent = `Soma Total: ${soma.toFixed(2)} / 10.0 | Status: ${situacao}`;
        });
    }

    // 3. ARRAYS E DOM (Aula 11) - map, filter e reduce[cite: 5]
    const totalHoras = disciplinasAcervo.reduce((acumulador, item) => acumulador + item.cargaHoraria, 0);
    const disciplinasExatas = disciplinasAcervo.filter(item => item.categoria === "exatas");
    const nomesFormatados = disciplinasAcervo.map(item => item.nome.toUpperCase());

    console.log("Carga horária total do acervo (reduce):", totalHoras);
    console.log("Disciplinas de exatas (filter):", disciplinasExatas);
    console.log("Nomes em maiúsculo (map):", nomesFormatados);

    // 4. EVENTOS (Aula 12)[cite: 5]
    // (a) Botão acessível com aria-expanded[cite: 5]
    const btnAcessivel = document.getElementById("btnAcessivel");
    if (btnAcessivel) {
        btnAcessivel.addEventListener("click", () => {
            const expandido = btnAcessivel.getAttribute("aria-expanded") === "true";
            btnAcessivel.setAttribute("aria-expanded", !expandido);
            const infoExtra = document.getElementById("infoExtraAcessivel");
            if (infoExtra) {
                infoExtra.style.display = expandido ? "none" : "block";
            }
        });
    }

    // (b) Delegação de eventos e (c)/(d) Busca com resumo dinâmico e aria-live[cite: 5]
    const inputBusca = document.getElementById("inputBusca");
    const listaDinamica = document.getElementById("listaDinamica");
    const contadorResumo = document.getElementById("contadorResumo");

    function renderizarLista(itens) {
        listaDinamica.innerHTML = "";
        itens.forEach(disc => {
            const li = document.createElement("li");
            li.style.padding = "0.5rem 0";
            li.style.borderBottom = "1px solid #e2e8f0";
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";

            const spanTexto = document.createElement("span");
            spanTexto.textContent = `${disc.nome} (${disc.cargaHoraria}h)`;

            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Selecionar";
            btnRemover.className = "btn-custom";
            btnRemover.style.padding = "0.2rem 0.8rem";
            btnRemover.style.fontSize = "0.85rem";
            btnRemover.dataset.id = disc.id; // Delegação de ID

            li.appendChild(spanTexto);
            li.appendChild(btnRemover);
            listaDinamica.appendChild(li);
        });

        if (contadorResumo) {
            contadorResumo.textContent = `Total de disciplinas exibidas: ${itens.length}`;
        }
    }

    renderizarLista(disciplinasAcervo);

    // Filtro em tempo real
    if (inputBusca) {
        inputBusca.addEventListener("input", (e) => {
            const termo = e.target.value.toLowerCase();
            const filtrados = disciplinasAcervo.filter(d => d.nome.toLowerCase().includes(termo));
            renderizarLista(filtrados);
        });
    }

    // Delegação de eventos no elemento pai[cite: 5]
    if (listaDinamica) {
        listaDinamica.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const idItem = e.target.dataset.id;
                const selecionado = disciplinasAcervo.find(d => d.id == idItem);
                if (selecionado) {
                    alert(`Você selecionou a disciplina: ${selecionado.nome}`);
                }
            }
        });
    }

    // Tratamento de Envio do Formulário
    const formSuporte = document.getElementById("formSuporte");
    if (formSuporte) {
        formSuporte.addEventListener("submit", (e) => {
            e.preventDefault();
            const nomeUser = document.getElementById("nome").value;
            alert(`Obrigado, ${nomeUser}! Sua solicitação foi enviada com sucesso.`);
            formSuporte.reset();
        });
    }
});