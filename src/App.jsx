import { useState } from "react";
import "./App.css";
import "./styles/map.css";

import Characters from "./pages/Characters";
import Map from "./pages/Map";
import Adventure from "./pages/Adventure";
import Inventory from "./pages/Inventory";
import Conclusion from "./pages/Conclusion";
import FinalRiddle from "./pages/FinalRiddle";

function App() {

  const [regiaoSelecionada, setRegiaoSelecionada] =
    useState(null);

  const [tela, setTela] = useState("home");


  /* =========================================
     PERSONAGEM
  ========================================= */

  if (tela === "personagem") {

    return (
      <Characters
        voltar={() => setTela("home")}
        iniciar={() => setTela("mapa")}
      />
    );

  }


  /* =========================================
     MAPA
  ========================================= */

  if (tela === "mapa") {

    const personagemSalvo =
      localStorage.getItem(
        "abyssal_character"
      );

    const personagem = personagemSalvo
      ? JSON.parse(personagemSalvo)
      : null;


    return (
      <Map
        personagem={personagem}

        voltar={() =>
          setTela("personagem")
        }

        abrirInventario={() =>
          setTela("inventario")
        }

        entrarNaRegiao={(local) => {

          setRegiaoSelecionada(local);

          setTela("aventura");

        }}
      />
    );

  }


  /* =========================================
     INVENTÁRIO
  ========================================= */

  if (tela === "inventario") {

    return (
      <Inventory
        voltar={() =>
          setTela("mapa")
        }
      />
    );

  }

  if (tela === "enigma") {
    return (
      <FinalRiddle
        voltar={() => setTela("mapa")}
        concluir={() => setTela("conclusao")}
      />
    );
  }

  if (tela === "conclusao") {
  const personagemSalvo =
    localStorage.getItem("abyssal_character");

  const personagem = personagemSalvo
    ? JSON.parse(personagemSalvo)
    : null;

  return (
    <Conclusion
      personagem={personagem}
      reiniciar={() => setTela("home")}
    />
  );
}


  /* =========================================
     AVENTURA
  ========================================= */

  if (tela === "aventura") {

    const personagemSalvo =
      localStorage.getItem(
        "abyssal_character"
      );

    const personagem = personagemSalvo
      ? JSON.parse(personagemSalvo)
      : null;


    return (
      <Adventure
        location={regiaoSelecionada}
        personagem={personagem}

        concluir={(local) => {

          if (!local) {

            setTela("mapa");

            return;
          }


          const progressoSalvo =
            localStorage.getItem(
              "abyssal_progress"
            );


          const progresso =
            progressoSalvo
              ? JSON.parse(progressoSalvo)
              : {
                  currentLocation: 1,
                  completedLocations: [],
                };


          if (!progresso.completedLocations.includes(local.id)) {
            progresso.completedLocations.push(local.id);
          }

          const pistasAtuais = JSON.parse(
            localStorage.getItem("abyssal_clues") || "[]"
          );
          if (!pistasAtuais.some((pista) => pista.id === local.id)) {
            pistasAtuais.push({
              id: local.id,
              region: local.name,
              clue: local.clue,
              fragment: local.fragment.name,
              icon: local.fragment.icon,
              order: local.id,
            });
            localStorage.setItem("abyssal_clues", JSON.stringify(pistasAtuais));
          }


          if (local.id < 7) {
            progresso.currentLocation = local.id + 1;
          } else {
            progresso.currentLocation = 7;
          }


          localStorage.setItem(
            "abyssal_progress",
            JSON.stringify(progresso)
          );


          setTela(local.id === 7 ? "enigma" : "mapa");

        }}
      />
    );

  }


  /* =========================================
     TUTORIAL
  ========================================= */

  if (tela === "tutorial") {

    return (

      <main className="tela-tutorial">

        <div className="tutorial-card">

          <span className="tutorial-icon">
            📜
          </span>

          <h1>
            COMO JOGAR
          </h1>

          <p>
            Explore as regiões do mundo de
            Abyssal, complete os desafios,
            encontre tesouros e descubra
            as pistas escondidas.
          </p>


          <div className="tutorial-items">

            <div>
              <span>🗺️</span>

              <strong>
                Explore
              </strong>

              <p>
                Visite os locais disponíveis
                no mapa.
              </p>
            </div>


            <div>
              <span>❓</span>

              <strong>
                Resolva
              </strong>

              <p>
                Responda aos desafios
                para avançar.
              </p>
            </div>


            <div>
              <span>💎</span>

              <strong>
                Encontre
              </strong>

              <p>
                Colete tesouros e pistas.
              </p>
            </div>


            <div>
              <span>🧩</span>

              <strong>
                Descubra
              </strong>

              <p>
                Organize as pistas e
                resolva o enigma final.
              </p>
            </div>

          </div>


          <button
            className="botao-principal"
            onClick={() =>
              setTela("home")
            }
          >
            VOLTAR
          </button>

        </div>

      </main>

    );

  }


  /* =========================================
     HOME
  ========================================= */

  return (

    <main className="tela-home">

      <div className="efeito-luz luz-1"></div>

      <div className="efeito-luz luz-2"></div>


      <div className="bolhas">

        <span>○</span>
        <span>○</span>
        <span>○</span>
        <span>○</span>
        <span>○</span>

      </div>


      <section className="conteudo-home">

        <div className="simbolo-coroa">
          ♛
        </div>


        <p className="pre-titulo">
          AS CRÔNICAS DO
        </p>


        <h1>
          ABYSSAL
        </h1>


        <div className="linha-titulo">

          <span></span>

          <p>
            MAR ESQUECIDO
          </p>

          <span></span>

        </div>


        <p className="frase">

          “O oceano não esconde tesouros.
          <br />
          Esconde histórias.”

        </p>


        <div className="botoes-home">

          <button
            className="botao-principal"
            onClick={() =>
              setTela("personagem")
            }
          >
            ⚔ INICIAR AVENTURA
          </button>


          <button
            className="botao-secundario"
            onClick={() =>
              setTela("tutorial")
            }
          >
            📖 COMO JOGAR
          </button>

        </div>


        <p className="versao">
          ABYSSAL • v1.0
        </p>

      </section>


      <div className="onda onda-1"></div>

      <div className="onda onda-2"></div>

    </main>

  );
}

export default App;