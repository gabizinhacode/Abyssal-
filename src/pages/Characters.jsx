
import { useState } from "react";
import { characters } from "../data/characters";

function Characters({ voltar, iniciar }) {
  const [selecionado, setSelecionado] = useState(() => {
    try {
      const salvo = localStorage.getItem("abyssal_character");
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  function escolherPersonagem(personagem) {
    setSelecionado(personagem);
  }

  function confirmarEscolha() {
    if (!selecionado) return;

    localStorage.setItem(
      "abyssal_character",
      JSON.stringify(selecionado)
    );

    iniciar(selecionado);
  }

  return (
    <main className="tela-personagens">
      <section
        className="personagens-conteudo"
        aria-labelledby="titulo-personagens"
      >
        <p className="pre-titulo">SUA AVENTURA COMEÇA AQUI</p>

        <h1 id="titulo-personagens">
          ESCOLHA SEU AVENTUREIRO
        </h1>

        <p className="descricao-personagens">
          Cada aventureiro tem uma história. Quem vai viver a sua?
        </p>

        <div
          className="personagens-grid"
          role="radiogroup"
          aria-label="Escolha seu personagem"
        >
          {characters.map((personagem) => {
            const estaSelecionado =
              selecionado?.id === personagem.id;

            const imagem =
              personagem.image ||
              `/images/characters/${personagem.id}.png`;

            return (
              <article
                key={personagem.id}
                className={`personagem-card ${
                  estaSelecionado ? "personagem-selecionado" : ""
                }`}
              >
                <div className="personagem-retrato">
                  <img
                    src={imagem}
                    alt={`Retrato de ${personagem.name}`}
                    className="personagem-imagem"
                    loading="lazy"
                    onError={(evento) => {
                      evento.currentTarget.style.visibility = "hidden";
                    }}
                  />
                </div>

                <div className="personagem-detalhes">
                  <h2>{personagem.name}</h2>

                  <span className="personagem-classe">
                    {personagem.className}
                  </span>

                  <p>{personagem.description}</p>
                </div>

                <button
                  type="button"
                  className={`personagem-botao ${
                    estaSelecionado ? "personagem-escolhido" : ""
                  }`}
                  aria-pressed={estaSelecionado}
                  onClick={() => escolherPersonagem(personagem)}
                >
                  {estaSelecionado ? "✓ SELECIONADO" : "ESCOLHER"}
                </button>
              </article>
            );
          })}
        </div>

        <div className="acoes-personagem">
          <button
            type="button"
            className="botao-secundario"
            onClick={voltar}
          >
            ← VOLTAR
          </button>

          <button
            type="button"
            className="botao-principal"
            disabled={!selecionado}
            onClick={confirmarEscolha}
          >
            CONTINUAR →
          </button>
        </div>

        <p className="status-selecao" aria-live="polite">
          {selecionado
            ? `${selecionado.name}, ${selecionado.className}, foi selecionado.`
            : "Escolha um personagem para continuar."}
        </p>
      </section>
    </main>
  );
}

export default Characters;
