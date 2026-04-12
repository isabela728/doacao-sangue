const mapaCompatibilidade = {
    o_positivo: "o_posi",
    o_negativo: "o_neg",
    a_positivo: "a_posi",
    a_negativo: "a_neg",
    b_positivo: "b_posi",
    b_negativo: "b_neg",
    ab_positivo: "ab_posi",
    ab_negativo: "ab_neg"
};

function ativar(sangue) {
    const sufixoClasse = mapaCompatibilidade[sangue];
    if (!sufixoClasse) return;

    const cabecalhoAtivo = document.getElementById(`${sangue}_tabela`);
    const estaAtivo = cabecalhoAtivo?.classList.contains("ativo");

    // Toggle independente por tipo: permite vários ativos ao mesmo tempo.
    document.querySelectorAll(`.pode_${sufixoClasse}`).forEach((celula) => {
        celula.hidden = estaAtivo;
    });

    if (cabecalhoAtivo) {
        cabecalhoAtivo.classList.toggle("ativo", !estaAtivo);
    }
}