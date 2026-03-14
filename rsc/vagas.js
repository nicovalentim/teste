// função de ler o json
async function carregarJSON() {
    const fetchJSON = await fetch("https://nicovalentim.github.io/teste/vagas.json"); // ??? pq online?
    const objJSON = await fetchJSON.json(); // json pra objeto no javascript
    return objJSON.vagas; // objeto para arrays
}

const arraysJSON = await carregarJSON(); // guardar as arrays em uma variável

// contador de vagas
let contadorVaga = 0

do {
    // converte número para valor em texto
    let presenca = ""
        if (arraysJSON[contadorVaga].presenca == 0) {
            presenca = "Presencial"
        } else if (arraysJSON[contadorVaga].presenca == 1) {
            presenca = "Híbrido"
        } else if (arraysJSON[contadorVaga].presenca == 2) {
            presenca = "100% remoto"
        } else {
            presenca = "Tipo de presença não registrada no banco de dados."
        }

    let tempoDeTrabalho = ""
        if (arraysJSON[contadorVaga].tempo == 0) {
            tempoDeTrabalho = "Meio-período"
        } else if (arraysJSON[contadorVaga].tempo == 1) {
            tempoDeTrabalho = "Período Integral"
        } else {
            tempoDeTrabalho = "Não foi cadastrado o período dessa vaga."
        }

    let descNaPagina = arraysJSON[contadorVaga].descricao
    if (descNaPagina > 200) {
        descNaPagina = descNaPagina.substring(0,200) + "(...)";
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
    } while (arraysJSON.length >= contadorVaga)