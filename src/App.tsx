import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Mail,
  Play,
  Volume2,
  X,
} from 'lucide-react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'

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
  'Vídeos UGC para anúncios',
  'Unboxing e ASMR',
  'Demonstração de produto',
  'Tutoriais e modo de uso',
  'Antes e depois',
  'Vídeos narrados',
  'Reviews e depoimentos',
  'Fotografia de produto e lifestyle',
]

const prices = [
  { number: '01', name: 'ESSENCIAL', detail: '1 VÍDEO UGC', unit: '', price: 'R$ 250' },
  { number: '02', name: 'DUO', detail: '2 VÍDEOS UGC', unit: 'R$ 230 POR VÍDEO', price: 'R$ 460' },
  { number: '03', name: 'CAMPANHA', detail: '3 VÍDEOS UGC', unit: 'R$ 210 POR VÍDEO', price: 'R$ 630' },
  { number: '04', name: 'CONTENT PACK', detail: '5 VÍDEOS UGC + 2 FOTOS', unit: '', price: 'R$ 1.050' },
  { number: '05', name: 'CONTRATO MENSAL', detail: 'UGC + REDES SOCIAIS', unit: '', price: 'SOB CONSULTA' },
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
      <style>{`
        :root {
          --ink: #000000;
          --graphite: #000000;
          --paper: #FFFFFF;
          --gray: #000000;
          --white: #FFFFFF;
          --line-dark: rgba(255, 255, 255, 0.22);
          --line-light: rgba(0, 0, 0, 0.22);
        }

        html,
        body,
        .site-shell {
          background: #000000;
        }

        .paper-section {
          background: #FFFFFF;
          color: #000000;
        }

        .dark-section,
        .graphite-section,
        .topbar,
        .specialty-strip {
          background: #000000;
          color: #FFFFFF;
        }

        .hero-media,
        .image-placeholder,
        .reel-card,
        .metric-placeholder,
        .tone-0,
        .tone-1,
        .tone-2,
        .tone-3,
        .tone-4 {
          background-color: #000000;
        }

        .reel-meta small {
          color: #FFFFFF;
        }

        .profile-panel {
          display: grid;
          grid-template-rows: auto minmax(120px, 1fr) auto;
        }

        .profile-panel .about-bio {
          align-self: center;
          margin: 0;
          padding: 1.75rem 0;
        }

        .profile-panel .profile-facts {
          margin: 0;
        }

        .metrics-handle {
          align-self: flex-end;
          margin: 0 0 0.55rem;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: none;
        }

        .metrics-handle:hover {
          opacity: 0.7;
        }

        .services-heading {
          padding-bottom: 0;
        }

        .services-intro {
          max-width: 90ch;
          margin: 2rem 0 2.4rem;
          color: #000000;
          font-size: 0.82rem;
          line-height: 1.55;
          opacity: 1;
        }

        .process-block {
          margin-bottom: 1.6rem;
        }

        .process-block .section-kicker {
          display: block;
          margin-bottom: 0.8rem;
        }

        .process-flow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 0;
          border-top: 1px solid var(--line-light);
          border-bottom: 1px solid var(--line-light);
          color: #000000;
          font-family: 'Inter Tight', Arial, sans-serif;
          font-size: 0.72rem;
          line-height: 1.3;
          letter-spacing: 0.035em;
        }

        .process-step {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          white-space: nowrap;
        }

        .process-separator {
          font-weight: 400;
          opacity: 0.55;
        }

        .service-info {
          margin: 1rem 0 0;
          color: #000000;
          font-size: 0.82rem;
          line-height: 1.5;
          opacity: 1;
        }

        .bases-block {
          margin-top: 1.4rem;
          padding-top: 1rem;
          border-top: 1px solid var(--line-light);
        }

        .bases-block .section-kicker {
          display: block;
          margin-bottom: 0.65rem;
        }

        .services-grid {
          border-top: 0;
          padding-top: 0;
        }

        .formats-column .section-kicker,
        .price-table .section-kicker {
          display: block;
          padding: 0 0 0.85rem;
        }

        .price-table {
          border-top: 0;
        }

        .contact {
          min-height: auto;
          padding-top: 3rem;
          padding-bottom: 2rem;
        }

        .contact h2 {
          margin: 0 0 2.4rem;
        }

        .contact-links {
          margin: 0 0 1rem;
          border-top: 1px solid var(--line-dark);
        }

        .contact-links a {
          grid-template-columns: minmax(180px, 0.45fr) 1fr;
          gap: 1.5rem;
          min-height: 64px;
          padding: 0;
        }

        .contact-links span,
        .contact-links strong {
          font-family: 'Inter Tight', Arial, sans-serif;
          font-size: 0.68rem;
          line-height: 1.3;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .contact-links strong {
          text-align: left;
          overflow-wrap: anywhere;
        }

        .contact-links a:hover {
          padding-left: 0;
          background: transparent;
          opacity: 0.72;
        }

        .social-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 0.7rem;
          padding: 1rem 0 0;
          border: 0;
        }

        .social-row a,
        .social-row .social-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
        }

        .social-row svg {
          width: 17px;
          height: 17px;
          flex: 0 0 auto;
        }

        .contact footer {
          margin-top: 2rem;
          border-top: 0;
          padding-top: 0;
        }

        @media (max-width: 720px) {
          .profile-panel {
            display: grid;
            grid-template-rows: auto auto auto;
          }

          .profile-panel .about-bio {
            padding: 1.35rem 0;
          }

          .metrics-handle {
            align-self: flex-start;
            margin: -0.8rem 0 0;
          }

          .services-intro {
            margin: 1.4rem 0 1.8rem;
            font-size: 0.8rem;
          }

          .process-flow {
            gap: 0.45rem;
            font-size: 0.68rem;
          }

          .process-step {
            gap: 0.45rem;
          }

          .service-info {
            font-size: 0.8rem;
          }

          .contact {
            padding-top: 2.25rem;
          }

          .contact h2 {
            margin: 0 0 2rem;
          }

          .contact-links a {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.35rem;
            min-height: 72px;
            padding: 0.85rem 0;
          }

          .contact-links strong {
            grid-column: 1;
            font-size: 0.68rem;
          }

          .social-row {
            gap: 0.65rem;
            padding: 1rem 0 0;
          }

          .contact footer {
            margin-top: 1.5rem;
          }
        }
      `}</style>

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
              <span className="section-kicker">PORTFÓLIO</span>
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
                      <span className="reel-visual" />
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

          <div className="portfolio-photos" id="fotografias" aria-label="Fotografias selecionadas">
            <div className="photo-track">
              {['HAIRCARE', 'SKINCARE', 'BEAUTY'].map((category, index) => (
                <article className="photo-item" key={category}>
                  <h3>{category}</h3>
                  <div className={`photo-card image-placeholder tone-${index + 1}`} role="img" aria-label={`Espaço reservado para fotografia de ${category.toLowerCase()}`}>
                    <span className="media-label"><strong>INSERIR FOTOGRAFIA</strong><small>PROPORÇÃO 4:5</small></span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="metrics dark-section" id="metricas">
          <div className="metrics-title section-heading">
            <div>
              <span className="section-kicker">MÉTRICAS</span>
              <h2>Dados da <em>audiência</em></h2>
            </div>
            <a className="metrics-handle" href="https://www.instagram.com/thamyresharmatiuk" target="_blank" rel="noreferrer">
              @thamyresharmatiuk
            </a>
          </div>
          <div className="metrics-grid">
            {[
              ['ALCANCE', 'INSERIR PRINT DO ALCANCE'],
              ['PÚBLICO', 'INSERIR PRINT DO PÚBLICO'],
              ['DESEMPENHO', 'INSERIR DADOS DE DESEMPENHO'],
            ].map(([label, placeholder]) => (
              <article className="metric-document" key={label}>
                <div className="metric-placeholder"><strong>{placeholder}</strong></div>
                <h3>{label}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="about paper-section" id="sobre">
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
              <span className="section-kicker">SERVIÇOS E INVESTIMENTO</span>
              <h2>Do conceito à <em>entrega</em></h2>
            </div>
          </div>

          <p className="services-intro">
            O orçamento final considera complexidade, locação, quantidade, prazo e período de uso. O escopo base inclui roteiro, gravação, edição, legenda e uma rodada de ajustes. Prazo padrão de até 7 dias corridos após aprovação do briefing e recebimento do produto.
          </p>

          <div className="process-block">
            <span className="section-kicker">PROCESSO</span>
            <div className="process-flow" aria-label="Etapas do processo">
              {process.map((item, index) => (
                <span className="process-step" key={item}>
                  <span>{item}</span>
                  {index < process.length - 1 && <span className="process-separator" aria-hidden="true">&gt;</span>}
                </span>
              ))}
            </div>

            <div className="bases-block">
              <span className="section-kicker">BASES E DISPONIBILIDADE</span>
              <p className="service-info">
                Resido em Alphaville, SP e Curitiba, PR. Disponibilidade para viagens.
              </p>
            </div>
          </div>

          <div className="services-grid">
            <div className="formats-column">
              <span className="section-kicker">FORMATOS</span>
              <div className="service-list">
                {services.map((service, index) => (
                  <div key={service}><span>{String(index + 1).padStart(2, '0')}</span><p>{service}</p></div>
                ))}
              </div>
            </div>

            <div className="price-table">
              <span className="section-kicker">PACOTES</span>
              {prices.map(({ number, name, detail, unit, price }) => (
                <div className="price-row" key={number}>
                  <span>{number}</span>
                  <strong>{name}</strong>
                  <small>{detail}{unit && <><br />{unit}</>}</small>
                  <b>{price}</b>
                </div>
              ))}

              <div className="price-row">
                <span />
                <strong>EXTRAS E DIREITOS</strong>
                <small>FOTOS, BRUTOS, GANCHOS E MÍDIA</small>
                <b>SOB CONSULTA</b>
              </div>
            </div>
          </div>
        </section>

        <section className="contact dark-section" id="contato">
          <h2>Vamos criar algo<br /><em>excepcional juntos?</em></h2>
          <div className="contact-links">
            <a href="https://wa.me/5511988242425" target="_blank" rel="noreferrer">
              <span>WHATSAPP COMERCIAL</span><strong>(11) 98824 2425</strong>
            </a>
            <a href="mailto:contato@thamyresharmatiuk.com">
              <span>E-MAIL PROFISSIONAL</span><strong>contato@thamyresharmatiuk.com</strong>
            </a>
          </div>
          <div className="social-row">
            <a href="https://www.instagram.com/thamyresharmatiuk" target="_blank" rel="noreferrer">
              <FaInstagram /> <span>Instagram · @thamyresharmatiuk</span>
            </a>
            <span className="social-item"><FaTiktok /> <span>TikTok · Thamyres Harmatiuk</span></span>
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