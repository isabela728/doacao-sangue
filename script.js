const mapaCompatibilidade = {
    o_positivo: "o_posi",
    o_negativo: "o_neg",
    a_positivo: "a_posi",
    a_negativo: "a_neg",
    b_positivo: "b_posi",
    b_negativo: "b_neg",
    ab_positivo: "ab_posi",
    ab_negativo: "ab_neg"
}; //Sangues válidos

function ativar(sangue) {
    const tipo_sangue = mapaCompatibilidade[sangue]; // validação do sangue clicado
    if (!tipo_sangue) return;

    const cabecalhoAtivo = document.getElementById(`${sangue}_tabela`);
    const estaAtivo = cabecalhoAtivo?.classList.contains("ativo");

    // Permite vários ativos ao mesmo tempo.
    document.querySelectorAll(`.pode_${tipo_sangue}`).forEach((celula) => {
        celula.hidden = estaAtivo;
    });

    if (cabecalhoAtivo) {
        cabecalhoAtivo.classList.toggle("ativo", !estaAtivo); //ativa e deasativa o tipo sanguíneo clicado
    }
}


//JS forms
const form = document.getElementById("form");
const array_dados = {
    nome: "",
    email: "",
    idade: "",
    peso: "",
    tipo_sanguineo: "",
    telefone: "",
    cidade: "",
    estado: ""
};

if (form) {
    const cards = Array.from(form.querySelectorAll(".card"));
    const botao_proximo = document.getElementById("botao_proximo");
    const botao_enviar = document.getElementById("botao_enviar");
    const container_proximo = botao_proximo?.closest(".botao_container");
    const container_enviar = botao_enviar?.closest(".botao_container");

    let questao_atual = 0;

    const mostrarErro = (mensagem, campo) => {
        alert(mensagem);
        campo?.focus();
    };

    const validarQuestao = (indice) => {
        const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numeroInteiroRegex = /^\d+$/;
        const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

        if (indice === 0) {
            const nome = document.getElementById("nome");
            const valor = nome?.value.trim() ?? "";

            if (!valor) {
                mostrarErro("Preencha o nome antes de continuar.", nome);
                return false;
            }

            if (!nomeRegex.test(valor)) {
                mostrarErro("O nome deve conter apenas letras e espaços.", nome);
                return false;
            }

            return true;
        }

        if (indice === 1) {
            const email = document.getElementById("email");
            const valor = email?.value.trim() ?? "";

            if (!valor) {
                mostrarErro("Preencha o email antes de continuar.", email);
                return false;
            }

            if (!emailRegex.test(valor)) {
                mostrarErro("Digite um email válido.", email);
                return false;
            }

            return true;
        }

        if (indice === 2) {
            const idade = document.getElementById("idade");
            const valor = idade?.value.trim() ?? "";

            if (!valor) {
                mostrarErro("Preencha a idade antes de continuar.", idade);
                return false;
            }

            if (!numeroInteiroRegex.test(valor)) {
                mostrarErro("A idade deve ser informada apenas com números.", idade);
                return false;
            }

            const idadeNumero = Number.parseInt(valor, 10);
            if (idadeNumero < 16 || idadeNumero > 69) {
                mostrarErro("A idade para doação deve estar entre 16 e 69 anos.", idade);
                return false;
            }

            return true;
        }

        if (indice === 3) {
            const peso = document.getElementById("peso");
            const valor = peso?.value.trim() ?? "";

            if (!valor) {
                mostrarErro("Preencha o peso antes de continuar.", peso);
                return false;
            }

            const pesoNumero = Number.parseFloat(valor.replace(",", "."));
            if (Number.isNaN(pesoNumero)) {
                mostrarErro("Digite um peso válido. Exemplo: 62 ou 62,5.", peso);
                return false;
            }

            if (pesoNumero < 50) {
                mostrarErro("Para doar sangue, o peso mínimo é 50 kg.", peso);
                return false;
            }

            return true;
        }

        if (indice === 4) {
            const tipoSelecionado = form.querySelector('input[name="tipo_s"]:checked');

            if (!tipoSelecionado) {
                alert("Selecione um tipo sanguíneo antes de continuar.");
                return false;
            }

            return true;
        }

        if (indice === 5) {
            const telefone = document.getElementById("telefone");
            const valor = telefone?.value.trim() ?? "";

            if (!valor) {
                mostrarErro("Preencha o telefone antes de continuar.", telefone);
                return false;
            }

            if (!telefoneRegex.test(valor)) {
                mostrarErro("Digite um telefone válido. Exemplo: (47) 99999-9999.", telefone);
                return false;
            }

            return true;
        }

        if (indice === 6) {
            const cidade = document.getElementById("cidade");
            const valor = cidade?.value.trim() ?? "";

            if (!valor) {
                mostrarErro("Preencha a cidade antes de continuar.", cidade);
                return false;
            }

            if (!nomeRegex.test(valor)) {
                mostrarErro("A cidade deve conter apenas letras e espaços.", cidade);
                return false;
            }

            return true;
        }

        if (indice === 7) {
            const estado = document.getElementById("estado");
            const valor = estado?.value.trim() ?? "";

            if (!valor) {
                mostrarErro("Preencha o estado antes de enviar.", estado);
                return false;
            }

            if (!nomeRegex.test(valor)) {
                mostrarErro("O estado deve conter apenas letras e espaços.", estado);
                return false;
            }

            return true;
        }

        return true;
    };

    const trocar_pergunta = () => {
        cards.forEach((card, indice) => {
            card.hidden = indice !== questao_atual;
        });

        const ultima_pergunta = questao_atual === cards.length - 1;

        if (container_proximo) {
            container_proximo.hidden = ultima_pergunta;
        }

        if (botao_proximo) {
            botao_proximo.hidden = ultima_pergunta;
        }

        if (container_enviar) {
            container_enviar.hidden = !ultima_pergunta;
        }

        if (botao_enviar) {
            botao_enviar.hidden = !ultima_pergunta;
        }
    };

    if (botao_proximo) {
        botao_proximo.addEventListener("click", () => {
            if (!validarQuestao(questao_atual)) {
                return;
            }

            if (questao_atual < cards.length - 1) {
                questao_atual += 1;
                trocar_pergunta();
            }
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        for (let indice = 0; indice < cards.length; indice += 1) {
            if (!validarQuestao(indice)) {
                questao_atual = indice;
                trocar_pergunta();
                return;
            }
        }

        const tipo_selecionado = form.querySelector('input[name="tipo_s"]:checked');

        array_dados.nome = document.getElementById("nome")?.value.trim() ?? "";
        array_dados.email = document.getElementById("email")?.value.trim() ?? "";
        array_dados.idade = document.getElementById("idade")?.value.trim() ?? "";
        array_dados.peso = document.getElementById("peso")?.value.trim() ?? "";
        array_dados.tipo_sanguineo = tipo_selecionado ? tipo_selecionado.value : "";
        array_dados.telefone = document.getElementById("telefone")?.value.trim() ?? "";
        array_dados.cidade = document.getElementById("cidade")?.value.trim() ?? "";
        array_dados.estado = document.getElementById("estado")?.value.trim() ?? "";

        const dados_enviados = { ...array_dados };

        form.reset();
        questao_atual = 0;
        trocar_pergunta();
    });

    trocar_pergunta();
}

//validação por pergunta

