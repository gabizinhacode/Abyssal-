import { useState } from "react";
import { finalRiddle, locations } from "../data/locations";

function FinalRiddle({ voltar, concluir }) {
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState("");
  const [resolvido, setResolvido] = useState(
    localStorage.getItem("abyssal_final_solved") === "true"
  );

  const progresso = JSON.parse(localStorage.getItem("abyssal_progress") || "{}");
  const concluidas = progresso.completedLocations || [];
  const pistasSalvas = JSON.parse(localStorage.getItem("abyssal_clues") || "[]");
  const todasRegioesConcluidas = locations.every((local) => concluidas.includes(local.id));
  const todasPistas = locations.every((local) => pistasSalvas.some((pista) => pista.id === local.id));

  function validarResposta() {
    if (!resposta) {
      setFeedback("Escolha uma alternativa para revelar o segredo.");
      return;
    }
    if (resposta === finalRiddle.correctAnswer) {
      localStorage.setItem("abyssal_final_solved", "true");
      setResolvido(true);
      setFeedback(finalRiddle.successMessage);
    } else {
      setFeedback("Ainda não é essa a resposta. Releia os fragmentos e tente novamente.");
    }
  }

  if (!todasRegioesConcluidas || !todasPistas) {
    return (
      <main className="tela-enigma-final">
        <section className="enigma-card">
          <p className="enigma-etiqueta">AS CRÔNICAS DO ABYSSAL</p>
          <h1>O ENIGMA AINDA ESTÁ SELADO</h1>
          <p>Conclua as sete regiões e reúna todas as pistas antes de tentar revelar o segredo.</p>
          <p className="enigma-contagem">Regiões: {concluidas.length}/7 · Pistas: {pistasSalvas.length}/7</p>
          <button className="botao-principal" onClick={voltar}>VOLTAR AO MAPA</button>
        </section>
      </main>
    );
  }

  return (
    <main className="tela-enigma-final">
      <section className="enigma-card" aria-labelledby="titulo-enigma">
        <p className="enigma-etiqueta">✦ AS CRÔNICAS DO ABYSSAL ✦</p>
        <div className="enigma-icone" aria-hidden="true">🔐</div>
        <h1 id="titulo-enigma">{resolvido ? finalRiddle.successTitle : finalRiddle.title}</h1>
        <p>{resolvido ? finalRiddle.successMessage : finalRiddle.description}</p>

        <div className="enigma-fragmentos" aria-label="Sete pistas coletadas">
          {[...pistasSalvas].sort((a, b) => a.id - b.id).map((pista) => (
            <div className="enigma-fragmento" key={pista.id}>
              <span>FRAGMENTO {String(pista.id).padStart(2, "0")}</span>
              <strong>{pista.clue}</strong>
            </div>
          ))}
        </div>

        {!resolvido && (
          <>
            <h2>{finalRiddle.question}</h2>
            <div className="enigma-opcoes" role="radiogroup" aria-label="Alternativas do enigma final">
              {finalRiddle.options.map((opcao) => (
                <button
                  type="button"
                  key={opcao.id}
                  className={resposta === opcao.id ? "enigma-opcao selecionada" : "enigma-opcao"}
                  onClick={() => { setResposta(opcao.id); setFeedback(""); }}
                  aria-pressed={resposta === opcao.id}
                >
                  <span aria-hidden="true">{resposta === opcao.id ? "◉" : "○"}</span>
                  {opcao.text}
                </button>
              ))}
            </div>
            <button className="botao-principal" onClick={validarResposta}>REVELAR A VERDADE</button>
          </>
        )}

        {feedback && <p className="enigma-feedback" role="status">{feedback}</p>}
        {resolvido ? (
          <button className="botao-principal" onClick={concluir}>CONCLUIR A AVENTURA →</button>
        ) : (
          <button className="botao-secundario" onClick={voltar}>VOLTAR AO MAPA</button>
        )}
      </section>
    </main>
  );
}

export default FinalRiddle;
