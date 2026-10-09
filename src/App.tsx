import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Play,
  X,
} from 'lucide-react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'

type PortfolioVideo = {
  id: string
  category: string
  format: string
  duration: string
  tone: string
  sourceParts?: string[]
  poster?: string
  title?: string
  brand?: string
  description?: string
}

type Category = {
  name: string
  videos: PortfolioVideo[]
}

const categoryBlueprints = [
  {
    name: 'HAIRCARE',
    description: 'Loiro natural, textura, movimento e performance',
    formats: ['Demonstração', 'Rotina real', 'Tutorial narrado'],
  },
  {
    name: 'SKINCARE',
    description: 'Aplicação, textura, acabamento e experiência',
    formats: ['Rotina', 'Demonstração', 'Review narrado'],
  },
  {
    name: 'BODYCARE',
    description: 'Sensorial, ritual de cuidado e acabamento de pele',
    formats: ['Rotina sensorial', 'Demonstração', 'ASMR'],
  },
  {
    name: 'MAKEUP',
    description: 'Maquiagem elegante, detalhes e transformação',
    formats: ['GRWM', 'Tutorial', 'Aplicação'],
  },
  {
    name: 'ASMR',
    description: 'Som, textura, embalagem e presença do produto',
    formats: ['Unboxing sonoro', 'Detalhes de produto', 'Aplicação'],
  },
]

// Cada vídeo publicado tem sua própria capa, marca, formato e apresentação.
const portfolioMedia: Record<string, Partial<PortfolioVideo>> = {
  'haircare-1': {
    sourceParts: ['/videos/haircare-loiro.mp4'],
    poster: '/images/haircare-loiro-capa.webp',
    duration: '01:04',
    brand: 'BRAÉ',
    format: 'Review de cuidado capilar',
    title: 'Blonde Oil: cuidado em foco para os fios loiros',
    description: 'Uma apresentação da linha Blonde Oil, da BRAÉ, com a máscara e o óleo em destaque. A conversa diante da câmera aproxima o cuidado capilar da rotina e valoriza os detalhes dos produtos, com uma linguagem pessoal e acessível.',
  },
  'haircare-2': {
    sourceParts: ['/videos/haircare-mascaras.mp4'],
    poster: '/images/haircare-mascaras-icloud.webp',
    duration: '00:37',
    brand: 'BRAÉ',
    format: 'Apresentação de máscaras',
    title: 'BRAÉ: três máscaras na rotina de cuidado',
    description: 'Blonde Oil, Fiber Mask e Essential se encontram em uma apresentação que destaca as embalagens e a experiência de incluir máscaras no cuidado dos fios. Um conteúdo próximo que transforma a seleção de produtos em uma conversa sobre a rotina capilar.',
  },
  'haircare-3': {
    sourceParts: ['/videos/haircare-antifrizz.mp4'],
    poster: '/images/haircare-antifrizz-icloud.webp',
    duration: '00:09',
    brand: 'Hidratei',
    format: 'Aplicação de finalizador',
    title: 'Hidratei: o toque final no penteado',
    description: 'Uma demonstração direta da Cera Antifrizz Hidratei, da embalagem à aplicação sobre os fios. O formato curto concentra a atenção no gesto de finalizar o penteado e permite acompanhar o acabamento em uso real.',
  },
  'haircare-4': {
    format: 'Protetor Térmico Amino',
    title: 'Protetor Térmico Amino — vídeo em breve',
    brand: 'TRUSS',
  },
  'haircare-5': {
    format: 'Demonstração de impermeabilização',
    title: 'TRUSS Impassable: impermeabilização dos fios',
    brand: 'TRUSS',
  },
  'haircare-6': {
    format: 'Beauty Sleep',
    title: 'Beauty Sleep — vídeo em breve',
    brand: 'BRAÉ',
  },
  'haircare-7': {
    format: 'Proteína capilar',
    title: 'Proteína capilar — vídeo em breve',
    brand: 'BRAÉ',
  },
  'bodycare-1': {
    sourceParts: ['/videos/bodycare-rotina.mp4'],
    poster: '/images/bodycare-granado-icloud.webp',
    duration: '00:24',
    brand: 'Granado',
    format: 'Unboxing sensorial',
    title: 'Granado: um presente para os sentidos',
    description: 'Da caixa estampada à descoberta dos sabonetes, um unboxing que valoriza as cores, as embalagens e a experiência de explorar as fragrâncias. Os detalhes em destaque e as reações diante da câmera aproximam o produto de quem assiste e apresentam o cuidado como um gesto de presente.',
  },
  'bodycare-2': {
    sourceParts: ['/videos/bodycare-fragrancias.mp4'],
    poster: '/images/bodycare-fragrancias-icloud.webp',
    duration: '00:43',
    brand: 'Bath & Body Works',
    format: 'Rotina de perfumação',
    title: 'Duas fragrâncias, um ritual de cuidado',
    description: 'In the Stars e Into the Night entram em cena em uma apresentação próxima, com os frascos em destaque e a aplicação do cuidado corporal nas mãos. Um conteúdo que combina descoberta de fragrâncias, detalhes das embalagens e gestos de uso para trazer os produtos para a rotina.',
  },
  'bodycare-3': {
    sourceParts: ['/videos/bodycare-perfumacao.mp4'],
    poster: '/images/bodycare-loccitane-icloud.webp',
    duration: '00:24',
    brand: 'L’Occitane',
    format: 'Apresentação de produto',
    title: 'Amêndoa L’Occitane: um toque de perfume na rotina',
    description: 'O mist perfumado da linha Amêndoa, da L’Occitane, é apresentado em uma conversa próxima, com o frasco e seus detalhes em destaque. Um conteúdo que conecta a descoberta do produto ao gesto cotidiano de se perfumar, valorizando a experiência pessoal e o universo de cuidado da marca.',
  },
  'bodycare-4': {
    sourceParts: ['/videos/bodycare-brilho.mp4'],
    poster: '/images/bodycare-brilho-icloud.webp',
    duration: '00:43',
    brand: 'Skelt',
    format: 'Demonstração de acabamento',
    title: 'Skelt: pele iluminada em movimento',
    description: 'O iluminador corporal da Skelt ganha destaque em uma demonstração no braço, com movimentos que revelam o reflexo da luz natural sobre a pele. A aplicação e os detalhes do acabamento mostram o brilho em uso real, aproximando a apresentação do produto do resultado que se vê na pele.',
  },
  'skincare-2': {
    sourceParts: ['/videos/skincare-protecao.mp4'],
    poster: '/images/skincare-protecao-capa.webp',
    duration: '00:49',
    format: 'Aplicação de skincare',
    title: 'Proteção que se espalha com leveza',
    description: 'Uma demonstração próxima da aplicação de um protetor solar facial, com textura, espalhabilidade e acabamento acompanhados na pele. O conteúdo traduz o cuidado diário em um gesto simples e visual, ideal para apresentar o produto com naturalidade e clareza.',
  },
  'skincare-1': {
    sourceParts: ['/videos/skincare-vichy.mp4'],
    poster: '/images/skincare-vichy-capa-alta.webp',
    duration: '00:26',
    brand: 'Vichy',
    format: 'Aplicação de skincare',
    title: 'Minéral 89: hidratação e viço na rotina',
    description: 'Uma apresentação do Minéral 89, da Vichy, com a textura leve e a aplicação na pele em destaque. O vídeo acompanha o sérum após a limpeza facial e mostra como ele se integra à rotina, inclusive antes da maquiagem, com foco em hidratação, conforto e viço.',
  },
  'skincare-3': {
    sourceParts: ['/videos/skincare-serum.mp4'],
    poster: '/images/skincare-serum-icloud.webp',
    duration: '00:36',
    brand: 'CARE Natural Beauty',
    format: 'Review de sérum',
    title: 'CARE: o glow como parte do cuidado',
    description: 'O sérum facial hidratante e iluminador Skindrops é apresentado em uma conversa próxima, com o frasco e o acabamento luminoso da pele em destaque. Um conteúdo que conecta textura, experiência pessoal e cuidado diário, valorizando o produto sem perder a naturalidade.',
  },
  'skincare-4': {
    sourceParts: ['/videos/skincare-bastao.mp4'],
    poster: '/images/skincare-ollie-capa-alta.webp',
    duration: '00:39',
    brand: 'Ollie',
    format: 'Demonstração de proteção solar',
    title: 'Ollie: proteção solar em um gesto',
    description: 'A aplicação do protetor solar em bastão Ollie é acompanhada de perto, com movimentos sobre o rosto que mostram o produto em uso. A demonstração valoriza a praticidade do formato e o acabamento na pele, trazendo a proteção para uma rotina real.',
  },
  'skincare-5': {
    sourceParts: ['/videos/skincare-creamy.mp4'],
    poster: '/images/skincare-creamy-rotina-capa-alta.webp',
    duration: '00:26',
    brand: 'Creamy',
    format: 'Skincare sensorial · ASMR',
    title: 'Creamy: limpeza e retinol em uma rotina sensorial',
    description: 'Sem fala ou música, o vídeo acompanha a limpeza com o sabonete facial antioxidante da Creamy e a aplicação do retinol em closes de textura e gestos. A ausência de narração e trilha deixa a experiência mais sensorial, quase um ASMR de skincare.',
  },
  'skincare-6': {
    format: 'Antes e depois',
    title: 'Principia: antes e depois — vídeo em breve',
    brand: 'Principia',
  },
  'makeup-2': {
    sourceParts: ['/videos/makeup-benefit.mp4'],
    poster: '/images/benefit-capa-icloud.webp',
    duration: '00:53',
    brand: 'Benefit Cosmetics',
    format: 'Aplicação de pó facial',
    title: 'Benefit: o acabamento da maquiagem em foco',
    description: 'The POREfessional Power Powder ganha destaque em uma demonstração com pincel, da apresentação da embalagem à aplicação no rosto. Os detalhes de cada gesto e do acabamento aproximam o espectador da experiência de finalizar a maquiagem.',
  },
  'makeup-3': {
    sourceParts: ['/videos/makeup-mascara.mp4'],
    poster: '/images/makeup-mascara-icloud.webp',
    duration: '00:50',
    brand: 'Detoni',
    format: 'Aplicação de máscara para cílios',
    title: 'Máscara de cílios: definição em foco',
    description: 'Da escovinha à aplicação, o vídeo acompanha a máscara de cílios Detoni em uso, com movimentos precisos que destacam a definição dos fios. A câmera se aproxima dos olhos para mostrar a aplicação e o resultado de um jeito claro, direto e natural.',
  },
  'makeup-1': {
    sourceParts: ['/videos/makeup-rare-beauty.mp4'],
    poster: '/images/makeup-rare-beauty-capa-alta.webp',
    duration: '00:15',
    brand: 'Rare Beauty',
    format: 'Aplicação de maquiagem',
    title: 'Rare Beauty: cor e luminosidade em foco',
    description: 'A aplicação de um produto compacto da Rare Beauty ganha destaque em uma demonstração próxima, da apresentação da embalagem ao esfumado nas maçãs do rosto. Os movimentos do pincel e o resultado luminoso aparecem em detalhe, valorizando a textura e o acabamento da maquiagem na pele.',
  },
  'asmr-1': {
    sourceParts: ['/videos/asmr-joia.mp4'],
    poster: '/images/asmr-pacco-icloud.webp',
    duration: '00:16',
    brand: 'Pacco',
    format: 'Unboxing sonoro',
    title: 'Vyta Pacco: o som de uma descoberta',
    description: 'Uma abertura guiada pelos sons da embalagem e pela reação à descoberta do Vyta, da Pacco. O ritmo curto valoriza o momento de revelar o produto e cria uma experiência sensorial limpa, com foco em textura, presença e expectativa.',
  },
  'asmr-2': {
    sourceParts: ['/videos/asmr-brinco.mp4'],
    poster: '/images/asmr-brinco-capa-alta.webp',
    duration: '00:07',
    format: 'Detalhes de produto',
    title: 'Brilho em close: um detalhe que prende o olhar',
    description: 'Um close silencioso e delicado que aproxima o espectador dos detalhes de uma peça brilhante. A composição valoriza reflexos, movimento e acabamento para transformar a apresentação do produto em uma pequena experiência visual.',
  },
}

const categories: Category[] = categoryBlueprints.map((category, categoryIndex) => ({
  name: category.name,
  videos: Array.from({ length: Math.max(category.name === 'ASMR' ? 2 : 3, ...Object.keys(portfolioMedia)
    .filter((id) => id.startsWith(`${category.name.toLowerCase()}-`))
    .map((id) => Number(id.split('-').pop()))) }, (_, videoIndex) => {
    const format = category.formats[videoIndex] ?? 'Vídeo'
    const id = `${category.name.toLowerCase()}-${videoIndex + 1}`
    const media = portfolioMedia[id]
    return {
      id,
      category: category.name,
      format: media?.format ?? format,
      title: media?.title,
      brand: media?.brand,
      description: media?.description,
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
  ['01', 'ESSENCIAL', '1 VÍDEO UGC', 'R$ 250'],
  ['02', 'DUO', '2 VÍDEOS UGC|R$ 230 POR VÍDEO', 'R$ 460'],
  ['03', 'CAMPANHA', '3 VÍDEOS UGC|R$ 210 POR VÍDEO', 'R$ 630'],
  ['04', 'CONTENT PACK', '5 VÍDEOS UGC + 2 FOTOS', 'R$ 1.050'],
  ['05', 'CONTRATO MENSAL', 'UGC + REDES SOCIAIS', 'PLANO PERSONALIZADO CONFORME A PROPOSTA'],
]

const process = ['Briefing', 'Estratégia e roteiro', 'Gravação', 'Edição e finalização', 'Entrega']

function App() {
  const [activeVideo, setActiveVideo] = useState<PortfolioVideo | null>(null)
  const [playbackSource, setPlaybackSource] = useState<string | null>(null)
  const [videoLoadError, setVideoLoadError] = useState(false)
  const reelTracks = useRef<Record<string, HTMLDivElement | null>>({})

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

    // Arquivos completos são reproduzidos diretamente, com carregamento progressivo.
    if (activeVideo.sourceParts.length === 1) {
      setPlaybackSource(activeVideo.sourceParts[0])
      return
    }

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
          <div className="hero-showcase">
            <div className="hero-name-panel">
              <picture className="hero-name-image">
                <img
                  src="/images/hero-thamyres-center-original.png"
                  alt="Thamyres Harmatiuk, criadora de conteúdo UGC para marcas de beleza"
                  width="496"
                  height="620"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              <div className="hero-image-fade" aria-hidden="true" />
              <div className="hero-name-copy">
                <h1>Thamyres <em>Harmatiuk</em></h1>
                <p>UGC com estética editorial, demonstração real e intenção comercial para marcas de beleza.</p>
              </div>
            </div>

          </div>
          <div className="specialty-strip" aria-label="Especialidades">
            <span>HAIRCARE</span>
            <span>SKINCARE</span>
            <span>BODYCARE</span>
            <span>MAKEUP</span>
            <span>ASMR</span>
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
                <div className="reel-carousel">
                  <div className={`reel-stack ${category.name === 'ASMR' ? 'reel-stack-centered' : ''}`} ref={(element) => { reelTracks.current[category.name] = element }} aria-label={`Vídeos de ${category.name}`}>
                    {category.videos.map((video) => (
                      <button
                        className={`reel-card ${video.tone} ${video.sourceParts ? '' : 'reel-card-placeholder'}`}
                        type="button"
                        key={video.id}
                        onClick={() => setActiveVideo(video)}
                        disabled={!video.sourceParts}
                        aria-label={video.sourceParts
                          ? `Abrir ${video.title ?? `${video.format} de ${video.category}`}`
                          : `Espaço reservado: ${video.title ?? `${video.format} de ${video.category}`}`}
                      >
                        <span className="reel-visual">
                          {video.poster ? (
                            <img className="reel-poster" src={video.poster} alt="" loading="lazy" decoding="async" />
                          ) : (
                            <span className="placeholder-cross" />
                          )}
                        </span>
                        {video.sourceParts && <span className="reel-play"><Play fill="currentColor" size={14} /></span>}
                        <span className="reel-meta">
                          <strong>{video.format}</strong>
                          <small>{video.brand ? `${video.brand} · ${video.category}` : video.category}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                  {category.videos.length > 3 && (
                    <button
                      className="carousel-next"
                      type="button"
                      aria-label={`Ver mais vídeos de ${category.name}`}
                      onClick={() => {
                        const track = reelTracks.current[category.name]
                        const firstCard = track?.querySelector('.reel-card')
                        if (track && firstCard) {
                          const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
                          const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
                          track.scrollTo({
                            left: atEnd ? 0 : track.scrollLeft + firstCard.getBoundingClientRect().width + gap,
                            behavior: 'smooth',
                          })
                        }
                      }}
                    >
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="portfolio-photos" id="fotografias" aria-label="Fotografias selecionadas">
            <div className="photo-track">
              {[
                { category: 'HAIRCARE', image: '/images/portfolio-haircare.webp', alt: 'Thamyres apresenta produtos Blonde Oil da BRAÉ, incluindo o óleo capilar.' },
                { category: 'SKINCARE', image: '/images/portfolio-skincare.webp', alt: 'Thamyres apresenta o sérum facial Mineral 89 da Vichy.' },
                { category: 'MAKEUP', image: '/images/portfolio-makeup.webp', alt: 'Thamyres apresenta o pó facial The POREfessional Power Powder da Benefit.' },
              ].map(({ category, image, alt }) => (
                <article className="photo-item" key={category}>
                  <h3>{category}</h3>
                  <div className="photo-card">
                    <img src={image} alt={alt} loading="lazy" decoding="async" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="metrics paper-section" id="metricas">
          <div className="metrics-title section-heading">
            <div>
              <span className="section-kicker">MÉTRICAS</span>
              <h2>Dados da <em>audiência</em></h2>
            </div>
          </div>
          <div className="metrics-grid">
            {[
              ['ALCANCE', '', 'Visualizações dos últimos 30 dias no Instagram'],
              ['GÊNERO', '/images/metricas-genero.webp', 'Distribuição por gênero dos seguidores no Instagram'],
              ['FAIXA ETÁRIA', '/images/metricas-faixa-etaria.webp', 'Faixa etária dos seguidores no Instagram'],
              ['DESEMPENHO', '', 'Conteúdos principais e visualizações no Instagram'],
            ].map(([label, image, alt]) => (
              <article className="metric-document" key={label}>
                <div className="metric-placeholder">
                  {image ? <img src={image} alt={alt} loading="lazy" decoding="async" /> : null}
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
                Sou Thamyres Harmatiuk, criadora de conteúdo UGC para marcas de beleza. Desenvolvo vídeos e fotos de haircare, skincare, bodycare e maquiagem que equilibram estética editorial com demonstrações próximas e naturais. Da textura ao resultado em uso, cada detalhe é pensado para apresentar os diferenciais do produto com clareza, criar identificação e despertar vontade de experimentar. Meu objetivo é entregar conteúdo autêntico, visualmente cuidado e alinhado à proposta de cada marca, fortalecendo sua presença e a conexão com o público.
              </p>
            </div>
            <dl className="profile-facts">
              {profileFacts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="services paper-section" id="servicos">
          <div className="services-intro">
            <span className="section-kicker">SERVIÇOS E INVESTIMENTO</span>
            <h2>Do conceito à <em>entrega</em></h2>
            <p>
              Os pacotes incluem roteiro, gravação com a câmera traseira em 4K a 30 FPS, edição e legendas. Cada vídeo é finalizado com excelência conforme o briefing aprovado. Se necessário, serão realizados ajustes para que a entrega atenda ao que foi proposto. Direitos de uso para mídia paga e períodos de veiculação são definidos separadamente. Custos adicionais de produção, deslocamento ou locação, quando necessários, são orçados à parte. Prazo padrão de até 7 dias corridos após aprovação do briefing e recebimento do produto.
            </p>
          </div>

          <div className="compact-process">
            <span className="section-kicker">PROCESSO</span>
            <div>{process.map((item, index) => <span key={item}>{item}{index < process.length - 1 && <b aria-hidden="true">›</b>}</span>)}</div>
          </div>

          <div className="services-grid">
            <div className="service-column">
              <h3>FORMATOS</h3>
              <div className="service-list">
                {services.map((service, index) => (
                  <div key={service}><span>{String(index + 1).padStart(2, '0')}</span><p>{service}</p></div>
                ))}
              </div>
            </div>
            <div className="package-column">
              <h3>PACOTES</h3>
              <div className="price-table">
                {prices.map(([number, name, detail, price]) => (
                  <div className="price-row" key={number}>
                    <span>{number}</span>
                    <strong>{name}</strong>
                    <small>{detail.split('|').map((line) => <span key={line}>{line}</span>)}</small>
                    <b className={price.length > 15 ? 'price-note' : undefined}>{price}</b>
                  </div>
                ))}
                <div className="price-row extra-row">
                  <span aria-hidden="true" />
                  <strong>EXTRAS E DIREITOS</strong>
                  <small><span>FOTOS, BRUTOS, GANCHOS E MÍDIA</span></small>
                  <b className="price-note">LICENÇA DE USO CONFORME O ESCOPO</b>
                </div>
              </div>
              <div className="availability">
                <h3>BASES E DISPONIBILIDADE</h3>
                <p>Resido em Alphaville, SP e Curitiba, PR. Disponibilidade para viagens.</p>
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
            <a href="https://www.instagram.com/thamyresharmatiuk" target="_blank" rel="noreferrer"><FaInstagram size={17} /> Instagram · @thamyresharmatiuk</a>
            <a href="https://www.tiktok.com/@thamyres.harmatiuk" target="_blank" rel="noreferrer"><FaTiktok size={17} /> TikTok · @thamyres.harmatiuk</a>
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
          <section className="video-modal" role="dialog" aria-modal="true" aria-label={activeVideo.title ?? `Vídeo de ${activeVideo.category}`} onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setActiveVideo(null)} aria-label="Fechar vídeo"><X size={20} /></button>
            {activeVideo.sourceParts ? (
              <div className="modal-video-player">
                {playbackSource && !videoLoadError ? (
                  <video key={activeVideo.id} src={playbackSource} controls autoPlay playsInline preload="metadata" poster={activeVideo.poster} onError={() => setVideoLoadError(true)}>
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
          </section>
        </div>
      )}
    </div>
  )
}

export default App
