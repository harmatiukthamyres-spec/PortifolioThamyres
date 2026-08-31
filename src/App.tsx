import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  Mail,
  Play,
  Volume2,
  X,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

type PortfolioVideo = {
  id: string
  category: string
  format: string
  duration: string
  tone: string
}

type Category = {
  name: string
  videos: PortfolioVideo[]
}

const categoryBlueprints = [
  {
    name: 'HAIRCARE',
    description: 'Loiro natural, textura, movimento e performance',
    formats: ['Demonstração', 'Rotina real', 'Tutorial narrado', 'Antes e depois'],
  },
  {
    name: 'SKINCARE',
    description: 'Aplicação, textura, acabamento e experiência',
    formats: ['Rotina', 'Demonstração', 'Review narrado', 'Tutorial'],
  },
  {
    name: 'BODYCARE',
    description: 'Sensorial, ritual de cuidado e acabamento de pele',
    formats: ['Rotina sensorial', 'Demonstração', 'ASMR', 'Lifestyle'],
  },
  {
    name: 'BEAUTY',
    description: 'Maquiagem elegante, detalhes e transformação',
    formats: ['GRWM', 'Tutorial', 'Aplicação', 'Conceito editorial'],
  },
  {
    name: 'ADS',
    description: 'Ganchos claros, prova visual e intenção comercial',
    formats: ['Dor e solução', 'Prova de uso', 'Gancho direto', 'UGC narrado'],
  },
]

const categories: Category[] = categoryBlueprints.map((category, categoryIndex) => ({
  name: category.name,
  videos: category.formats.map((format, videoIndex) => ({
    id: `${category.name.toLowerCase()}-${videoIndex + 1}`,
    category: category.name,
    format,
    duration: ['00:30', '00:45', '00:35', '00:60'][videoIndex],
    tone: `tone-${(categoryIndex + videoIndex) % 5}`,
  })),
}))

const profileFacts = [
  ['ALTURA', 'A INSERIR'],
  ['PESO', 'A INSERIR'],
  ['BUSTO', 'A INSERIR'],
  ['CINTURA', 'A INSERIR'],
  ['QUADRIL', 'A INSERIR'],
  ['MANEQUIM', 'P'],
  ['CALÇADO', '36 · 37 EM FORMAS MENORES'],
  ['CABELO', 'NATURALMENTE LOIRO'],
  ['OLHOS', 'VERDES AZULADOS'],
  ['IDIOMA', 'PORTUGUÊS'],
]

const services = [
  'Vídeos UGC orgânicos',
  'Anúncios UGC para conversão',
  'Roteiro, gravação e edição',
  'Demonstração de produto e textura',
  'Tutoriais e comparativos',
  'Antes e depois',
  'Vídeos narrados',
  'Lifestyle e rotinas',
  'Unboxing e ASMR',
  'Fotografias de produto e lifestyle',
]

const prices = [
  ['01', '1 VÍDEO UGC EDITADO', 'ATÉ 60 SEGUNDOS', 'A PARTIR DE R$ 450'],
  ['02', 'PACOTE COM 3 VÍDEOS', 'PLANEJAMENTO INTEGRADO', 'A PARTIR DE R$ 1.200'],
  ['03', 'PACOTE COM 5 VÍDEOS', 'BANCO DE CONTEÚDO', 'A PARTIR DE R$ 1.850'],
  ['04', 'EXTRAS E DIREITOS', 'FOTOS, BRUTOS, GANCHOS E MÍDIA', 'SOB CONSULTA'],
]

const process = ['Briefing', 'Estratégia e roteiro', 'Gravação', 'Edição e revisão', 'Entrega']

function App() {
  const [activeVideo, setActiveVideo] = useState<PortfolioVideo | null>(null)

  useEffect(() => {
    if (!activeVideo) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveVideo(null)
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeVideo])

  return (
    <div className="site-shell">
      <header className="topbar">
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#portfolio">Portfólio</a>
          <a href="#metricas">Métricas</a>
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
        </nav>
        <div className="header-actions">
          <a href="mailto:contato@thamyresharmatiuk.com" aria-label="Enviar e-mail">
            <Mail size={16} />
            <span>E-mail</span>
          </a>
          <a href="https://wa.me/5511988242425" target="_blank" rel="noreferrer">
            <FaWhatsapp size={17} />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero dark-section" id="inicio">
          <div className="hero-media">
            <picture className="hero-picture">
              <source media="(max-width: 720px)" srcSet="/images/hero-thamyres-mobile.webp" />
              <img
                src="/images/hero-thamyres-desktop.webp"
                alt="Thamyres Harmatiuk segurando um produto de beleza diante do mar"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <span className="image-index">01</span>
            <div className="hero-identity">
              <h1>Thamyres Harmatiuk</h1>
              <p>UGC com estética editorial, demonstração real e intenção comercial para marcas de beleza.</p>
            </div>
          </div>
          <div className="specialty-strip" aria-label="Especialidades">
            <span>HAIRCARE</span>
            <span>SKINCARE</span>
            <span>BODYCARE</span>
            <span>BEAUTY</span>
            <span>ADS</span>
          </div>
        </section>

        <section className="portfolio paper-section" id="portfolio">
          <div className="portfolio-heading section-heading">
            <div>
              <span className="section-kicker">PORTFÓLIO EM VÍDEO</span>
              <h2>Trabalhos <em>selecionados</em></h2>
            </div>
          </div>

          <div className="portfolio-grid">
            {categories.map((category) => (
              <article className="category-column" id={category.name.toLowerCase()} key={category.name}>
                <header className="category-header">
                  <h3>{category.name}</h3>
                </header>
                <div className="reel-stack">
                  {category.videos.map((video) => (
                    <button
                      className={`reel-card ${video.tone}`}
                      type="button"
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      aria-label={`Abrir ${video.format} de ${video.category}`}
                    >
                      <span className="reel-visual"><span className="placeholder-cross" /></span>
                      <span className="reel-play"><Play fill="currentColor" size={14} /></span>
                      <span className="reel-meta">
                        <strong>{video.format}</strong>
                        <small>{video.category} · {video.duration}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="photos dark-section" id="fotografias">
          <div className="section-heading photo-heading">
            <h2>Fotografias</h2>
          </div>
          <div className="photo-track">
            {[1, 2, 3].map((photo) => (
              <div className={`photo-card image-placeholder tone-${photo}`} key={photo} role="img" aria-label="Espaço reservado para fotografia real">
                <span className="placeholder-cross" aria-hidden="true" />
                <span className="media-label"><strong>INSERIR FOTOGRAFIA</strong><small>PROPORÇÃO 4:5</small></span>
              </div>
            ))}
          </div>
        </section>

        <section className="metrics paper-section" id="metricas">
          <div className="metrics-title section-heading">
            <div>
              <span className="section-kicker">04 · MÉTRICAS</span>
              <h2>Dados que <em>contextualizam</em> a audiência</h2>
            </div>
            <p>Dados atualizados conforme os Insights das plataformas.</p>
          </div>
          <div className="metrics-grid">
            {[
              ['01', 'ALCANCE', 'INSERIR PRINT DO ALCANCE'],
              ['02', 'PÚBLICO', 'INSERIR PRINT DO PÚBLICO'],
              ['03', 'DESEMPENHO', 'INSERIR DADOS DE DESEMPENHO'],
            ].map(([number, label, placeholder]) => (
              <article className="metric-document" key={number}>
                <div className="metric-doc-head"><span>{number}</span><span>INSTAGRAM INSIGHTS</span></div>
                <div className="metric-placeholder"><span className="placeholder-cross" /><strong>{placeholder}</strong></div>
                <h3>{label}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="about dark-section" id="sobre">
          <div className="about-media-grid">
            <div className="profile-panel">
              <h2 className="about-title">Sobre mim</h2>
              <p className="about-bio">
                Sou Thamyres Harmatiuk, criadora de conteúdo UGC especializada em beleza e lifestyle. Crio vídeos que unem estética editorial, linguagem natural e demonstração clara para transformar benefícios de produto em desejo e decisão de compra.
              </p>
              <dl className="profile-facts">
                {profileFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <button className="video-intro image-placeholder tone-1" type="button" aria-label="Adicionar vídeo de apresentação">
              <span className="image-index">02</span>
              <span className="play-disc"><Play fill="currentColor" size={17} /></span>
              <span className="media-label"><strong>VÍDEO DE APRESENTAÇÃO</strong><small>FORMATO 9:16 · 30 A 60 SEGUNDOS</small></span>
            </button>
          </div>
        </section>

        <section className="services paper-section" id="servicos">
          <div className="section-heading services-heading">
            <div>
              <span className="section-kicker">05 · SERVIÇOS E INVESTIMENTO</span>
              <h2>Do conceito à <em>entrega</em></h2>
            </div>
            <p>Produção pensada para conteúdo orgânico, campanhas, anúncios e páginas de produto.</p>
          </div>

          <div className="services-grid">
            <div className="service-list">
              {services.map((service, index) => (
                <div key={service}><span>{String(index + 1).padStart(2, '0')}</span><p>{service}</p></div>
              ))}
            </div>
            <div className="price-table">
              {prices.map(([number, name, detail, price]) => (
                <div className="price-row" key={number}>
                  <span>{number}</span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                  <b>{price}</b>
                </div>
              ))}
              <p className="price-note">
                O orçamento final considera complexidade, locação, quantidade, prazo e período de uso. O escopo base inclui roteiro, gravação, edição, legenda e uma rodada de ajustes simples.
              </p>
            </div>
          </div>
        </section>

        <section className="process dark-section" id="processo">
          <div className="section-heading">
            <div><span className="section-kicker">06 · PROCESSO</span><h2>Clareza em <em>cada etapa</em></h2></div>
            <p>Prazo padrão de até 7 dias corridos após aprovação do briefing e recebimento do produto.</p>
          </div>
          <ol className="process-list">
            {process.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><ArrowDown size={18} /></li>
            ))}
          </ol>
        </section>

        <section className="profile-coverage paper-section" id="atuacao">
          <div className="coverage-copy">
            <span className="section-kicker">07 · PERFIL E ATUAÇÃO</span>
            <h2>De duas bases,<br /><em>para todo o Brasil.</em></h2>
          </div>
          <div className="coverage-grid">
            <div><span>BASE 01</span><strong>ALPHAVILLE</strong><small>SÃO PAULO</small></div>
            <div><span>BASE 02</span><strong>IRATI</strong><small>PARANÁ</small></div>
            <div><span>ATUAÇÃO</span><strong>BRASIL</strong><small>PROJETOS PRESENCIAIS E REMOTOS</small></div>
            <div><span>LOGÍSTICA</span><strong>NACIONAL</strong><small>RECEBIMENTO DE PRODUTOS E VIAGENS</small></div>
          </div>
        </section>

        <section className="contact dark-section" id="contato">
          <div className="contact-top">
            <span className="section-kicker">08 · CONTATO</span>
            <p>PORTUGUÊS · BRASIL · UGC CREATOR</p>
          </div>
          <h2>Vamos criar algo<br /><em>excepcional juntos?</em></h2>
          <p className="contact-copy">Se sua marca procura conteúdo de beleza com estética, clareza e intenção comercial, fale comigo para receber uma proposta personalizada.</p>
          <div className="contact-links">
            <a href="https://wa.me/5511988242425" target="_blank" rel="noreferrer">
              <span>WHATSAPP COMERCIAL</span><strong>(11) 98824 2425</strong><ArrowUpRight />
            </a>
            <a href="mailto:contato@thamyresharmatiuk.com">
              <span>E-MAIL PROFISSIONAL</span><strong>contato@thamyresharmatiuk.com</strong><ArrowUpRight />
            </a>
          </div>
          <div className="social-row">
            <a href="https://www.instagram.com/thamyresharmatiuk" target="_blank" rel="noreferrer"><AtSign size={17} /> Instagram · @thamyresharmatiuk</a>
            <span>TikTok · PERFIL A INSERIR</span>
          </div>
          <footer>
            <span>© {new Date().getFullYear()} THAMYRES HARMATIUK</span>
            <a href="#inicio">VOLTAR AO TOPO <ArrowUpRight size={15} /></a>
          </footer>
        </section>
      </main>

      <div className="mobile-contact-dock" aria-label="Contato rápido">
        <a href="https://wa.me/5511988242425" target="_blank" rel="noreferrer"><FaWhatsapp size={18} /> WhatsApp</a>
        <a href="mailto:contato@thamyresharmatiuk.com"><Mail size={18} /> E-mail</a>
      </div>

      {activeVideo && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveVideo(null)}>
          <section className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setActiveVideo(null)} aria-label="Fechar vídeo"><X size={20} /></button>
            <div className={`modal-video-placeholder ${activeVideo.tone}`}>
              <Play fill="currentColor" size={26} />
              <span>INSERIR VÍDEO REAL</span>
            </div>
            <div className="modal-info">
              <span>{activeVideo.category} · {activeVideo.duration}</span>
              <h2 id="video-modal-title">{activeVideo.format}</h2>
              <p>Este espaço está preparado para receber o arquivo final do Reel sem alterar o layout.</p>
              <span className="sound-label"><Volume2 size={15} /> ASSISTIR COM SOM</span>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
