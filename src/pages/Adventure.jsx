import { useState } from "react";
import questions from "../data/questions";

function Adventure({ location, personagem, concluir }) {
  const [etapa, setEtapa] = useState("intro");
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState("");
  const [mensagem, setMensagem] = useState("");

  if (!location) {
    return (
      <main className="tela-aventura">
        <section className="painel-historia">
          <h1>REGIÃO NÃO ENCONTRADA</h1>

          <button onClick={() => concluir(null)}>
            VOLTAR AO MAPA
          </button>
        </section>
      </main>
    );
  }

  const perguntasDaRegiao = questions[location.id] || [];
  const questao = perguntasDaRegiao[questaoAtual];

  function iniciarQuiz() {
    setEtapa("quiz");
    setQuestaoAtual(0);
    setRespostaSelecionada("");
    setMensagem("");
  }

  function responder() {
    if (!respostaSelecionada) {
      setMensagem("Escolha uma resposta antes de continuar.");
      return;
    }

    if (respostaSelecionada === questao.answer) {
      setMensagem("Resposta correta! ⚔️");

      setTimeout(() => {
        if (questaoAtual < perguntasDaRegiao.length - 1) {
          setQuestaoAtual(questaoAtual + 1);
          setRespostaSelecionada("");
          setMensagem("");
        } else {
          setEtapa("tesouro");
          setMensagem("");
        }
      }, 700);
    } else {
      setMensagem("Resposta incorreta! Tente novamente. ❌");
    }
  }

  function voltarMapa() {
    concluir(null);
  }

  function pegarTesouro() {
    setEtapa("pista");
  }

  function verFragmento() {
    setEtapa("concluido");
  }

  function finalizarRegiao() {
  concluir(location);
}

  return (
    <main className="tela-aventura">

      {/* CABEÇALHO */}
      <header className="aventura-header">

        <button
          className="botao-voltar"
          onClick={voltarMapa}
          aria-label="Voltar para o mapa"
        >
          ← MAPA
        </button>

        <div className="aventura-titulo">
          <span className="aventura-icone">
            {location.icon}
          </span>

          <div>
            <p>REGIÃO {String(location.id).padStart(2, "0")}</p>

            <h1>{location.name}</h1>
          </div>
        </div>

        <div className="dificuldade">
          {"★".repeat(location.difficulty)}
        </div>

      </header>

      {/* PERSONAGEM */}
      <section className="personagem-aventura">

        <div className="personagem-avatar">
          {personagem?.icon || "🧙"}
        </div>

        <div>
          <span>AVENTUREIRO</span>

          <strong>
            {personagem?.name || "Aventureiro"}
          </strong>
        </div>

      </section>

      {/* INTRODUÇÃO */}
      {etapa === "intro" && (
        <section className="painel-historia">

          <div className="historia-cabecalho">
            <span className="npc-icon">
              {location.npc.icon}
            </span>

            <div>
              <span>{location.npc.role}</span>

              <h2>{location.npc.name}</h2>
            </div>
          </div>

          <div className="caixa-dialogo">
            <p>
              {location.npc.dialogue}
            </p>
          </div>

          <div className="local-info">

            <div className="local-icon">
              {location.icon}
            </div>

            <div>
              <h3>{location.name}</h3>

              <p>
                {location.description}
              </p>
            </div>

          </div>

          <div className="guardiao">

            <span className="guardiao-icon">
              {location.guardian.icon}
            </span>

            <div>
              <span>GUARDIÃO</span>

              <strong>
                {location.guardian.name}
              </strong>

              <small>
                {location.guardian.role}
              </small>
            </div>

          </div>

          <button
            className="botao-principal"
            onClick={iniciarQuiz}
          >
            INICIAR DESAFIO ⚔️
          </button>

        </section>
      )}

      {/* QUIZ */}
      {etapa === "quiz" && questao && (
        <section className="painel-quiz">

          <div className="quiz-topo">

            <span>
              DESAFIO {questaoAtual + 1} / {perguntasDaRegiao.length}
            </span>

            <div className="barra-progresso">
              <div
                style={{
                  width: `${
                    ((questaoAtual + 1) /
                      perguntasDaRegiao.length) *
                    100
                  }%`,
                }}
              />
            </div>

          </div>

          <div className="quiz-pergunta">

            <span className="quiz-numero">
              {String(questaoAtual + 1).padStart(2, "0")}
            </span>

            <h2>
              {questao.question}
            </h2>

          </div>

          <div
            className="quiz-opcoes"
            role="radiogroup"
            aria-label="Opções de resposta"
          >

            {questao.options.map((opcao) => (

              <button
                key={opcao}
                className={
                  respostaSelecionada === opcao
                    ? "opcao selecionada"
                    : "opcao"
                }
                onClick={() =>
                  setRespostaSelecionada(opcao)
                }
                aria-pressed={
                  respostaSelecionada === opcao
                }
              >
                <span>
                  {respostaSelecionada === opcao
                    ? "◉"
                    : "○"}
                </span>

                {opcao}
              </button>

            ))}

          </div>

          {mensagem && (
            <div
              className={
                mensagem.includes("correta")
                  ? "feedback correto"
                  : "feedback erro"
              }
              role="alert"
            >
              {mensagem}
            </div>
          )}

          <button
            className="botao-principal"
            onClick={responder}
          >
            CONFIRMAR RESPOSTA
          </button>

        </section>
      )}

      {/* TESOURO */}
      {etapa === "tesouro" && (
        <section className="painel-tesouro">

          <div className="tesouro-brilho">
            ✨
          </div>

          <p className="etiqueta">
            TESOURO ENCONTRADO
          </p>

          <div className="bau">
            🎁
          </div>

          <h2>
            {location.treasure.icon}{" "}
            {location.treasure.name}
          </h2>

          <p>
            {location.treasure.description}
          </p>

          <button
            className="botao-principal"
            onClick={pegarTesouro}
          >
            PEGAR TESOURO
          </button>

        </section>
      )}

      {/* PISTA */}
      {etapa === "pista" && (
        <section className="painel-pista">

          <div className="pista-decoracao">
            📜
          </div>

          <p className="etiqueta">
            PISTA DESCOBERTA
          </p>

          <div className="pergaminho">

            <span className="pista-marca">
              ✦
            </span>

            <p>
              "{location.clue}"
            </p>

            <span className="pista-marca">
              ✦
            </span>

          </div>

          <button
            className="botao-principal"
            onClick={verFragmento}
          >
            GUARDAR PISTA
          </button>

        </section>
      )}

      {/* CONCLUSÃO */}
      {etapa === "concluido" && (
        <section className="painel-concluido">

          <div className="concluido-titulo">
            ✨ REGIÃO CONCLUÍDA ✨
          </div>

          <h2>
            {location.name}
          </h2>

          <div className="recompensa">

            <div className="recompensa-item">
              <span>💎</span>

              <div>
                <small>FRAGMENTO</small>

                <strong>
                  FRAGMENTO{" "}
                  {String(
                    location.fragment.number
                  ).padStart(2, "0")}{" "}
                  —{" "}
                  {location.fragment.name.toUpperCase()}
                </strong>
              </div>
            </div>

            <div className="recompensa-item">
              <span>
                {location.treasure.icon}
              </span>

              <div>
                <small>TESOURO</small>

                <strong>
                  {location.treasure.name}
                </strong>
              </div>
            </div>

            <div className="recompensa-item">
              <span>📜</span>

              <div>
                <small>PISTA</small>

                <strong>
                  {location.clue}
                </strong>
              </div>
            </div>

          </div>

          <p className="mensagem-final">
            Uma nova parte da história foi revelada.
            O caminho continua...
          </p>

          <button
            className="botao-principal"
            onClick={finalizarRegiao}
          >
            CONTINUAR AVENTURA →
          </button>

        </section>
      )}

    </main>
  );
}

export default Adventure;