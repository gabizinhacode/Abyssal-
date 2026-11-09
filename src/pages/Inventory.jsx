import { useEffect, useState } from "react";
import { locations } from "../data/locations";

function Inventory({ voltar }) {
  const [progresso, setProgresso] = useState(() => {
    const salvo = localStorage.getItem("abyssal_progress");

    if (salvo) {
      return JSON.parse(salvo);
    }

    return {
      currentLocation: 1,
      completedLocations: [],
    };
  });

  const [pistas, setPistas] = useState([]);

  const [pistaSelecionada, setPistaSelecionada] =
    useState(null);

  useEffect(() => {
    const regioesConcluidas =
      progresso.completedLocations
        .map((id) =>
          locations.find((local) => local.id === id)
        )
        .filter(Boolean);

    const pistasSalvas = localStorage.getItem(
      "abyssal_clues"
    );

    if (pistasSalvas) {
      setPistas(JSON.parse(pistasSalvas));
      return;
    }

    const novasPistas = regioesConcluidas.map((local) => ({
      id: local.id,
      region: local.name,
      clue: local.clue,
      fragment: local.fragment.name,
      icon: local.fragment.icon,
      order: local.id,
    }));

    setPistas(novasPistas);
  }, [progresso.completedLocations]);

  useEffect(() => {
    if (pistas.length > 0) {
      localStorage.setItem(
        "abyssal_clues",
        JSON.stringify(pistas)
      );
    }
  }, [pistas]);

  function moverPista(indiceOrigem, indiceDestino) {
    if (indiceOrigem === indiceDestino) {
      return;
    }

    const novaLista = [...pistas];

    const [itemMovido] =
      novaLista.splice(indiceOrigem, 1);

    novaLista.splice(indiceDestino, 0, itemMovido);

    setPistas(novaLista);
  }

  function arrastarInicio(event, indice) {
    event.dataTransfer.setData(
      "text/plain",
      indice
    );
  }

  function soltarPista(event, indiceDestino) {
    event.preventDefault();

    const indiceOrigem = Number(
      event.dataTransfer.getData("text/plain")
    );

    if (Number.isNaN(indiceOrigem)) {
      return;
    }

    moverPista(indiceOrigem, indiceDestino);
  }

  function selecionarPista(indice) {
    setPistaSelecionada(indice);
  }

  function moverComTeclado(indice, direcao) {
    const novoIndice = indice + direcao;

    if (
      novoIndice < 0 ||
      novoIndice >= pistas.length
    ) {
      return;
    }

    moverPista(indice, novoIndice);
    setPistaSelecionada(novoIndice);
  }

  const fragmentosEncontrados =
    progresso.completedLocations.length;

  return (
    <main className="tela-inventario">


      <header className="inventario-header">

        <button
          type="button"
          className="botao-secundario"
          onClick={voltar}
        >
          ← MAPA
        </button>

        <div className="inventario-titulo">

          <span>🎒</span>

          <div>
            <p>DIÁRIO DO AVENTUREIRO</p>

            <h1>INVENTÁRIO</h1>
          </div>

        </div>

        <div className="inventario-contador">

          <strong>
            {fragmentosEncontrados} / 7
          </strong>

          <small>
            FRAGMENTOS
          </small>

        </div>

      </header>




      <section className="inventario-conteudo">

        <div className="inventario-introducao">

          <p>TESOUROS E MEMÓRIAS</p>

          <h2>
            AS PISTAS DO MAR ESQUECIDO
          </h2>

          <span>
            Organize as pistas encontradas.
            A ordem correta será importante
            para descobrir o segredo final.
          </span>

        </div>


    
        <section className="inventario-secao">

          <div className="secao-titulo">

            <span>💎</span>

            <div>
              <h3>
                TESOUROS ENCONTRADOS
              </h3>

              <small>
                Objetos recuperados durante a aventura
              </small>
            </div>

          </div>


          <div className="tesouros-grid">

            {locations
              .filter((local) =>
                progresso.completedLocations.includes(
                  local.id
                )
              )
              .map((local) => (

                <article
                  className="tesouro-card"
                  key={local.id}
                >

                  <div className="tesouro-icon">
                    {local.treasure.icon}
                  </div>

                  <div>
                    <span>
                      REGIÃO {local.id}
                    </span>

                    <h4>
                      {local.treasure.name}
                    </h4>

                    <p>
                      {local.treasure.description}
                    </p>
                  </div>

                </article>

              ))}

            {fragmentosEncontrados === 0 && (

              <div className="inventario-vazio">

                <span>🗝️</span>

                <p>
                  Você ainda não encontrou nenhum
                  tesouro.
                </p>

              </div>

            )}

          </div>

        </section>




        <section className="inventario-secao">

          <div className="secao-titulo">

            <span>📜</span>

            <div>
              <h3>
                PISTAS COLETADAS
              </h3>

              <small>
                Arraste para reorganizar
              </small>
            </div>

          </div>


          {pistas.length === 0 ? (

            <div className="inventario-vazio">

              <span>🌊</span>

              <p>
                Nenhuma pista foi encontrada ainda.
              </p>

              <small>
                Complete uma região para encontrar
                a primeira pista.
              </small>

            </div>

          ) : (

            <div
              className="pistas-lista"
              aria-label="Lista de pistas encontradas"
            >

              {pistas.map((pista, indice) => (

                <article
                  key={pista.id}
                  className={`pista-card ${
                    pistaSelecionada === indice
                      ? "pista-selecionada"
                      : ""
                  }`}
                  draggable
                  onDragStart={(event) =>
                    arrastarInicio(
                      event,
                      indice
                    )
                  }
                  onDragOver={(event) =>
                    event.preventDefault()
                  }
                  onDrop={(event) =>
                    soltarPista(
                      event,
                      indice
                    )
                  }
                  onClick={() =>
                    selecionarPista(indice)
                  }
                  tabIndex="0"
                  role="button"
                  aria-label={`Pista ${indice + 1}: ${pista.clue}`}
                  onKeyDown={(event) => {

                    if (
                      event.key === "ArrowUp"
                    ) {
                      event.preventDefault();

                      moverComTeclado(
                        indice,
                        -1
                      );
                    }

                    if (
                      event.key === "ArrowDown"
                    ) {
                      event.preventDefault();

                      moverComTeclado(
                        indice,
                        1
                      );
                    }

                  }}
                >

                  <div className="pista-numero">
                    {String(indice + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>


                  <div className="pista-fragmento">
                    {pista.icon}
                  </div>


                  <div className="pista-conteudo">

                    <span>
                      {pista.region}
                    </span>

                    <p>
                      “{pista.clue}”
                    </p>

                    <small>
                      Fragmento: {pista.fragment}
                    </small>

                  </div>


                  <div
                    className="pista-arrastar"
                    aria-hidden="true"
                  >
                    ⋮⋮
                  </div>

                </article>

              ))}

            </div>

          )}

        </section>



        {pistas.length > 0 && (

          <div className="inventario-ajuda">

            <span>💡</span>

            <p>
              <strong>Como organizar?</strong>
              <br />
              Você pode arrastar as pistas com o
              mouse. Também pode selecionar uma
              pista e usar as teclas
              <strong> ↑ </strong>
              e
              <strong> ↓ </strong>
              para reorganizá-la.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default Inventory;