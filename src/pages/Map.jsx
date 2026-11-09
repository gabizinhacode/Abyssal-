import { useEffect, useState } from "react";
import { locations } from "../data/locations";
import "../styles/map.css";

const POSICOES = [
  { x: 15, y: 72 },
  { x: 37, y: 55 },
  { x: 59, y: 70 },
  { x: 80, y: 51 },
  { x: 76, y: 25 },
  { x: 48, y: 20 },
  { x: 22, y: 27 },
];

// Milo fica ao lado da região atual, sem cobrir a placa.
const POSICOES_PERSONAGEM = [
  { x: 22, y: 80 },
  { x: 47, y: 66 },
  { x: 66, y: 78 },
  { x: 87, y: 59 },
  { x: 83, y: 33 },
  { x: 55, y: 28 },
  { x: 29, y: 35 },
];

const ILHAS = [
  { classe: "porto", detalhe: "⚓" },
  { classe: "corais", detalhe: "🪸" },
  { classe: "vulkar", detalhe: "🌋" },
  { classe: "nymora", detalhe: "🌳" },
  { classe: "leviata", detalhe: "🐋" },
  { classe: "abismo", detalhe: "🌑" },
  { classe: "templo", detalhe: "🏛️" },
];

function lerProgresso() {
  try {
    const salvo = localStorage.getItem("abyssal_progress");
    if (salvo) {
      const dados = JSON.parse(salvo);
      return {
        currentLocation: dados.currentLocation ?? 1,
        completedLocations: Array.isArray(dados.completedLocations)
          ? dados.completedLocations
          : [],
      };
    }
  } catch {
    // Mantém o progresso inicial caso os dados salvos estejam inválidos.
  }
  return { currentLocation: 1, completedLocations: [] };
}

function Map({ personagem, voltar, entrarNaRegiao, abrirInventario }) {
  const [progresso, setProgresso] = useState(lerProgresso);
  const [mensagem, setMensagem] = useState(
    "Sua aventura começa na vila. Escolha um caminho!"
  );
  const [viajandoPara, setViajandoPara] = useState(null);
  const [noite, setNoite] = useState(false);

  useEffect(() => {
    localStorage.setItem("abyssal_progress", JSON.stringify(progresso));
  }, [progresso]);

  useEffect(() => {
    if (viajandoPara === null) return undefined;
    const destino = locations.find((local) => local.id === viajandoPara);
    if (!destino) {
      setViajandoPara(null);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      entrarNaRegiao(destino);
      setViajandoPara(null);
    }, 950);
    return () => window.clearTimeout(timer);
  }, [viajandoPara, entrarNaRegiao]);

  const estaCompleta = (id) => progresso.completedLocations.includes(id);
  const estaDisponivel = (id) => id === progresso.currentLocation && !estaCompleta(id);
  const estaBloqueada = (id) => id > progresso.currentLocation && !estaCompleta(id);

  function selecionarLocalizacao(local) {
    if (viajandoPara !== null) return;
    if (estaBloqueada(local.id)) {
      setMensagem(`${local.name} ainda está encoberta pela névoa. Continue sua jornada!`);
      return;
    }
    if (estaCompleta(local.id)) {
      setMensagem(`${local.name} já foi explorada. Escolha a próxima região!`);
      return;
    }
    setMensagem(`${personagem?.name || "Milo"} está seguindo pela trilha até ${local.name}...`);
    setViajandoPara(local.id);
  }

  const personagemNome = personagem?.name || "Milo";
  const imagemPersonagem = personagem?.image ||
    (personagem?.id ? `/images/characters/${personagem.id}.png` : "/images/characters/milo.png");
  const regioesConcluidas = progresso.completedLocations.length;
  const idAtual = viajandoPara ?? progresso.currentLocation;
  const indiceAtual = Math.max(0, locations.findIndex((local) => local.id === idAtual));
  const posicaoAtual = POSICOES_PERSONAGEM[indiceAtual] || POSICOES_PERSONAGEM[0];

  return (
    <main className={`tela-mapa ${noite ? "mapa-noite" : ""}`}>
      <header className="jogo-hud">
        <button type="button" className="hud-personagem" onClick={voltar} aria-label="Voltar à seleção de personagens">
          <span className="hud-avatar"><img src={imagemPersonagem} alt="" /></span>
          <span className="hud-identidade"><small>AVENTUREIRO</small><strong>{personagemNome}</strong></span>
        </button>

        <div className="hud-titulo" aria-label="Abyssal, as terras esquecidas">
          <span className="estrela-compass">✦</span>
          <div><strong>ABYSSAL</strong><small>AS TERRAS ESQUECIDAS</small></div>
          <span className="estrela-compass">✦</span>
        </div>

        <div className="hud-acoes">
          <div className="hud-progresso"><span>★</span><strong>{regioesConcluidas}/7</strong><small>REGIÕES</small></div>
          <button type="button" className="hud-botao" onClick={abrirInventario}><span>🎒</span> Bolsa</button>
          <button type="button" className="hud-botao botao-config" onClick={() => setNoite((valor) => !valor)} aria-label="Alternar aparência do mapa">⚙</button>
        </div>
      </header>

      <section className="mundo-container" aria-label="Mapa-múndi de Abyssal">
        <div className="mundo-cabecalho"><span className="placa-madeira">✧ MAPA DAS TERRAS ✧</span><p>Sete regiões. Um segredo perdido sob as ondas.</p></div>

        <div className="mundo-cenario">
          <div className="mapa-oceano" aria-hidden="true">
            <span className="onda onda-1">〰</span><span className="onda onda-2">〰</span><span className="onda onda-3">〰</span>
            <span className="onda onda-4">〰</span><span className="onda onda-5">〰</span><span className="onda onda-6">〰</span>
            <div className="rosa-ventos"><b>N</b><span>✥</span><b>S</b><i>L</i><i>O</i></div>
            <div className="serpente-marinha"><span>〰</span><strong>🐉</strong><span>〰</span></div>
            <span className="rocha rocha-1" /><span className="rocha rocha-2" /><span className="rocha rocha-3" />
            <span className="bolha bolha-1" /><span className="bolha bolha-2" /><span className="bolha bolha-3" />
          </div>

          <div className="pergaminho" aria-hidden="true" />

          <div className="caminho-mundo" aria-hidden="true">
            <svg viewBox="0 0 1000 620" preserveAspectRatio="none">
              <path className="trilha-sombra" d="M150 446 Q220 390 370 341 T590 434 Q730 400 800 316 T760 155 Q600 90 480 124 T220 167" />
              <path className="trilha-vermelha" d="M150 446 Q220 390 370 341 T590 434 Q730 400 800 316 T760 155 Q600 90 480 124 T220 167" />
            </svg>
          </div>

          <div className="rosa-detalhe" aria-hidden="true">✦</div>

          {locations.map((local, index) => {
            const completa = estaCompleta(local.id);
            const disponivel = estaDisponivel(local.id);
            const bloqueada = estaBloqueada(local.id);
            const posicao = POSICOES[index] || { x: 50, y: 50 };
            const ilha = ILHAS[index];
            return (
              <button
                key={local.id}
                type="button"
                className={`ponto-regiao ilha-${ilha.classe} ${completa ? "regiao-concluida" : disponivel ? "regiao-atual" : bloqueada ? "regiao-bloqueada" : ""} ${local.id === 3 && bloqueada ? "proxima-regiao" : ""}`}
                style={{ "--pos-x": `${posicao.x}%`, "--pos-y": `${posicao.y}%`, "--atraso": `${index * 0.12}s` }}
                onClick={() => selecionarLocalizacao(local)}
                disabled={viajandoPara !== null}
                aria-label={`${local.name}: ${completa ? "explorada" : disponivel ? "disponível" : "bloqueada"}`}
              >
                <span className="ilha-ilustracao" aria-hidden="true"><span className="ilha-emoji">{ilha.detalhe}</span><i className="ilha-base" /></span>
                <span className="regiao-placa"><small>{String(local.id).padStart(2, "0")}</small><strong>{local.name}</strong></span>
                {completa && <span className="selo-concluido">✓</span>}
                {bloqueada && <span className="nevoa-ilha"><i>🔒</i></span>}
                {disponivel && <span className="selo-atual">VOCÊ ESTÁ AQUI</span>}
              </button>
            );
          })}

          <div className={`personagem-mundo ${viajandoPara !== null ? "personagem-caminhando" : ""}`} style={{ "--personagem-x": `${posicaoAtual.x}%`, "--personagem-y": `${posicaoAtual.y}%` }} aria-label={`Personagem no mapa: ${personagemNome}`}>
            <span className="personagem-sombra" />
            <span className="personagem-sprite"><img src={imagemPersonagem} alt="" /><i className="personagem-estrela">✦</i></span>
            <span className="personagem-nome">{personagemNome}</span>
          </div>

          <div className="placa-regiao"><span className="placa-pin">✦</span><div><small>{viajandoPara !== null ? "VIAJANDO PARA" : "JORNADA ATUAL"}</small><strong>{locations.find((local) => local.id === idAtual)?.name || "Porto de Eldoria"}</strong></div></div>
        </div>

        <footer className="mundo-rodape">
          <button type="button" className="botao-madeira" onClick={voltar}>← Personagens</button>
          <div className="fala-aventureiro"><img src={imagemPersonagem} alt="" /><p aria-live="polite">{mensagem}</p></div>
          <div className="rodape-decoracao" aria-hidden="true"><span>⛰</span><span>🌴</span></div>
        </footer>
      </section>
    </main>
  );
}

export default Map;
