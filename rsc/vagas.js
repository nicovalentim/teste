// função de ler o json
async function carregarJSON() {
    const fetchJSON = await import("https://nicovalentim.github.io/teste/rsc/vagas.json"); // ??? pq online?
    const objJSON = await fetchJSON.json(); // json pra objeto no javascript
    return objJSON.vagas; // objeto para arrays
}

const arraysJSON = await carregarJSON(); // guardar as arrays em uma variável

// contador de vagas
let contadorVaga = 0

// converte número para valor em texto
const tiposPresenca = [
    "Presencial",
    "Híbrido",
    "100% remoto"
];

const tiposTempo = [
    "Meio-período",
    "Período Integral"
];

while (arraysJSON.length > contadorVaga) {
    let presenca = tiposPresenca[arraysJSON[contadorVaga].presenca] ?? "Tipo de presença não registrado.";
    let tempoDeTrabalho = tiposTempo[arraysJSON[contadorVaga].tempo] ?? "Período não cadastrado.";

    let descNaPagina = arraysJSON[contadorVaga].descricao
    if (descNaPagina.length > 500) {
        descNaPagina = descNaPagina.substring(0,500) + "(...)";
    }

    // traduzir esses dados pra html
    const textoHTML = `
    <hr />

    <section class="tituloVaga">
        <h1>${arraysJSON[contadorVaga].nome}</h1>
        <button class="filtro">
        <img src="icon/mapa.png" />
        ${presenca}
        </button>
        <button class="filtro">
        <img src="icon/relogio.png" />
        ${tempoDeTrabalho}
        </button>
    </section>

    <section class="textoVaga">
        Empresa: ${arraysJSON[contadorVaga].empresa}<br />
        Local: ${arraysJSON[contadorVaga].local}<br />
        Salário: R$ ${arraysJSON[contadorVaga].salario}<br /><br />
        ${descNaPagina}
    </section>

    <section class="botadoCandidatar">
        <a>
        Quero me candidatar!
        </a>
    </section>`;

    // função para importar as vagas na página
        document.getElementById("vaga").innerHTML += textoHTML;
        contadorVaga += 1
}