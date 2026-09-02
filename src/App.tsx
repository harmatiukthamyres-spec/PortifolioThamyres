import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  Play,
  Volume2,
  X,
} from 'lucide-react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import metricasAlcanceRestaurado from './assets/metricas-alcance-restaurado.png'
import skincareDemonstracaoPoster from './assets/skincare-demonstracao-poster.webp'

type PortfolioVideo = {
  id: string
  category: string
  format: string
  duration: string
  tone: string
  sourceParts?: string[]
  poster?: string
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

const portfolioMedia: Record<string, Pick<PortfolioVideo, 'sourceParts' | 'poster' | 'duration'>> = {
  'skincare-2': {
    sourceParts: Array.from({ length: 7 }, (_, index) => `/videos/skincare-demonstracao.mp4.part-${String(index).padStart(2, '0')}`),
    poster: skincareDemonstracaoPoster,
    duration: '00:24',
  },
}

const categories: Category[] = categoryBlueprints.map((category, categoryIndex) => ({
  name: category.name,
  videos: category.formats.map((format, videoIndex) => {
    const id = `${category.name.toLowerCase()}-${videoIndex + 1}`
    const media = portfolioMedia[id]
    return {
      id,
      category: category.name,
      format,
      duration: media?.duration ?? ['00:30', '00:45', '00:35', '00:60'][videoIndex],
      tone: `tone-${(categoryIndex + videoIndex) % 5}`,
      sourceParts: media?.sourceParts,
      poster: media?.poster,
    }
  }),
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
  const [playbackSource, setPlaybackSource] = useState<string | null>(null)
  const [videoLoadError, setVideoLoadError] = useState(false)

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

  useEffect(() => {
    setPlaybackSource(null)
    setVideoLoadError(false)
    if (!activeVideo?.sourceParts) return

    const controller = new AbortController()
    let objectUrl: string | null = null

    const loadVideo = async () => {
      try {
        const responses = await Promise.all(
          activeVideo.sourceParts!.map((part) => fetch(part, { signal: controller.signal })),
        )
        if (responses.some((response) => !response.ok)) throw new Error('Não foi possível carregar o vídeo')
        const chunks = await Promise.all(responses.map((response) => response.arrayBuffer()))
        objectUrl = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }))
        setPlaybackSource(objectUrl)
      } catch (error) {
        if (!controller.signal.aborted) setVideoLoadError(true)
      }
    }

    void loadVideo()
    return () => {
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
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
          <div className="hero-black-cover">
            <div className="hero-black-copy">
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
                      <span className="reel-visual">
                        {video.poster ? (
                          <img className="reel-poster" src={video.poster} alt="" loading="lazy" />
                        ) : (
                          <span className="placeholder-cross" />
                        )}
                      </span>
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
                    <span className="placeholder-cross" aria-hidden="true" />
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
          </div>
          <div className="metrics-grid">
            {[
              ['ALCANCE', metricasAlcanceRestaurado, 'Visualizações dos últimos 30 dias no Instagram'],
              ['GÊNERO', '/images/metricas-genero.webp', 'Distribuição por gênero dos seguidores no Instagram'],
              ['FAIXA ETÁRIA', '/images/metricas-faixa-etaria.webp', 'Faixa etária dos seguidores no Instagram'],
              ['DESEMPENHO', '/images/metricas-desempenho.webp', 'Conteúdos principais e visualizações no Instagram'],
            ].map(([label, image, alt]) => (
              <article className="metric-document" key={label}>
                <div className="metric-placeholder">
                  <img src={image} alt={alt} loading="lazy" />
                </div>
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
            <a href="https://www.instagram.com/thamyresharmatiuk" target="_blank" rel="noreferrer"><FaInstagram size={17} /> Instagram · @thamyresharmatiuk</a>
            <a href="https://www.tiktok.com/@thamyres.harmatiu" target="_blank" rel="noreferrer"><FaTiktok size={17} /> TikTok · @thamyres.harmatiu</a>
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
            {activeVideo.sourceParts ? (
              <div className="modal-video-player">
                {playbackSource ? (
                  <video src={playbackSource} controls autoPlay playsInline preload="metadata" poster={activeVideo.poster}>
                    Seu navegador não oferece suporte à reprodução deste vídeo.
                  </video>
                ) : (
                  <div className="video-loading" role="status">
                    <Play fill="currentColor" size={24} />
                    <span>{videoLoadError ? 'NÃO FOI POSSÍVEL CARREGAR' : 'CARREGANDO VÍDEO'}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className={`modal-video-placeholder ${activeVideo.tone}`}>
                <Play fill="currentColor" size={26} />
                <span>INSERIR VÍDEO REAL</span>
              </div>
            )}
            <div className="modal-info">
              <span>{activeVideo.category} · {activeVideo.duration}</span>
              <h2 id="video-modal-title">{activeVideo.format}</h2>
              <p>{activeVideo.sourceParts ? 'Demonstração de skincare em formato vertical.' : 'Este espaço está preparado para receber o arquivo final do Reel sem alterar o layout.'}</p>
              <span className="sound-label"><Volume2 size={15} /> ASSISTIR COM SOM</span>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
