function Conclusion({ personagem, reiniciar }) {
  const nome = personagem?.name || "Aventureiro";
  const icone = personagem?.icon || "🧭";

  function jogarNovamente() {
    localStorage.removeItem("abyssal_progress");
    localStorage.removeItem("abyssal_character");

    reiniciar();
  }

  return (
    <main className="tela-conclusao">
      <div className="conclusao-brilho brilho-1"></div>
      <div className="conclusao-brilho brilho-2"></div>

      <div className="particulas" aria-hidden="true">
        <span>✦</span>
        <span>·</span>
        <span>✧</span>
        <span>·</span>
        <span>✦</span>
        <span>·</span>
      </div>

      <section
        className="conclusao-card"
        aria-labelledby="titulo-conclusao"
      >
        <p className="conclusao-pre-titulo">
          AS CRÔNICAS DO ABYSSAL
        </p>

        <div
          className="tesouro-final"
          aria-hidden="true"
        >
          👑
        </div>

        <p className="conclusao-etapa">
          ✦ A LENDA FOI REVELADA ✦
        </p>

        <h1 id="titulo-conclusao">
          O TESOURO DE ABYSSAL
        </h1>

        <div className="linha-conclusao">
          <span></span>
          <span>◆</span>
          <span></span>
        </div>

        <div className="epilogo">
          <p>
            As sete pistas finalmente se uniram.
          </p>

          <p>
            Depois de atravessar águas esquecidas,
            enfrentar antigos guardiões e decifrar
            os enigmas deixados pelo passado,
            <strong>
              {icone} {nome}
            </strong>{" "}
            chegou ao coração do Mar Esquecido.
          </p>

          <p>
            Ali, escondida durante séculos,
            estava a Coroa de Maré — o último
            vestígio do antigo reino de Abyssal.
          </p>

          <p className="revelacao">
            Mas o verdadeiro tesouro nunca foi
            o ouro.
          </p>

          <p>
            Foi a história de um reino perdido
            que agora voltou a ser lembrado.
          </p>
        </div>

        <div className="resultado-aventura">
          <div>
            <span>🗺️</span>
            <strong>7 / 7</strong>
            <small>REGIÕES</small>
          </div>

          <div>
            <span>🧩</span>
            <strong>7 / 7</strong>
            <small>PISTAS</small>
          </div>

          <div>
            <span>👑</span>
            <strong>1</strong>
            <small>TESOURO</small>
          </div>
        </div>

        <div className="mensagem-final-jogo">
          <span>✦</span>

          <p>
            A história de Abyssal não terminou aqui.
          </p>

          <span>✦</span>
        </div>

        <button
          type="button"
          className="botao-principal"
          onClick={jogarNovamente}
        >
          ↻ JOGAR NOVAMENTE
        </button>
      </section>
    </main>
  );
}

export default Conclusion;