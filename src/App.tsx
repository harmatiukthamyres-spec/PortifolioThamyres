import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Mail,
  MessageCircle,
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
  product?: string
  objective?: string
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
    sourceParts: ['/videos/haircare-mascaras.mp4?v=20261010-r2'],
    poster: '/images/haircare-mascaras-icloud.webp',
    duration: '00:37',
    brand: 'BRAÉ',
    format: 'Apresentação de máscaras',
    title: 'BRAÉ: três máscaras na rotina de cuidado',
    description: 'Blonde Oil, Fiber Mask e Essential se encontram em uma apresentação que destaca as embalagens e a experiência de incluir máscaras no cuidado dos fios. Um conteúdo próximo que transforma a seleção de produtos em uma conversa sobre a rotina capilar.',
  },
  'haircare-3': {
    sourceParts: ['/videos/haircare-antifrizz.mp4?v=20261010'],
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
    sourceParts: ['/videos/bodycare-fragrancias.mp4?v=20261010'],
    poster: '/images/bodycare-fragrancias-icloud.webp',
    duration: '00:43',
    brand: 'Bath & Body Works',
    format: 'Rotina de perfumação',
    title: 'Duas fragrâncias, um ritual de cuidado',
    description: 'In the Stars e Into the Night entram em cena em uma apresentação próxima, com os frascos em destaque e a aplicação do cuidado corporal nas mãos. Um conteúdo que combina descoberta de fragrâncias, detalhes das embalagens e gestos de uso para trazer os produtos para a rotina.',
  },
  'bodycare-2': {
    sourceParts: ['/videos/bodycare-perfumacao.mp4'],
    poster: '/images/bodycare-loccitane-icloud.webp',
    duration: '00:24',
    brand: 'L’Occitane',
    format: 'Apresentação de produto',
    title: 'Amêndoa L’Occitane: um toque de perfume na rotina',
    description: 'O mist perfumado da linha Amêndoa, da L’Occitane, é apresentado em uma conversa próxima, com o frasco e seus detalhes em destaque. Um conteúdo que conecta a descoberta do produto ao gesto cotidiano de se perfumar, valorizando a experiência pessoal e o universo de cuidado da marca.',
  },
  'bodycare-3': {
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
    sourceParts: ['/videos/skincare-vichy.mp4?v=20261010'],
    poster: '/images/skincare-vichy-mineral89-atualizada.webp',
    duration: '00:26',
    brand: 'Vichy',
    format: 'Aplicação de skincare',
    title: 'Minéral 89: hidratação e viço na rotina',
    description: 'Uma apresentação do Minéral 89, da Vichy, com a textura leve e a aplicação na pele em destaque. O vídeo acompanha o sérum após a limpeza facial e mostra como ele se integra à rotina, inclusive antes da maquiagem, com foco em hidratação, conforto e viço.',
  },
  'skincare-3': {
    sourceParts: ['/videos/skincare-serum.mp4?v=20261010-r2'],
    poster: '/images/skincare-serum-icloud.webp',
    duration: '00:36',
    brand: 'CARE Natural Beauty',
    format: 'Review de sérum',
    title: 'CARE: o glow como parte do cuidado',
    description: 'O sérum facial hidratante e iluminador Skindrops é apresentado em uma conversa próxima, com o frasco e o acabamento luminoso da pele em destaque. Um conteúdo que conecta textura, experiência pessoal e cuidado diário, valorizando o produto sem perder a naturalidade.',
  },
  'skincare-4': {
    sourceParts: ['/videos/skincare-bastao.mp4?v=20261010'],
    poster: '/images/skincare-ollie-capa-alta.webp',
    duration: '00:39',
    brand: 'Ollie',
    format: 'Demonstração de proteção solar',
    title: 'Ollie: proteção solar em um gesto',
    description: 'A aplicação do protetor solar em bastão Ollie é acompanhada de perto, com movimentos sobre o rosto que mostram o produto em uso. A demonstração valoriza a praticidade do formato e o acabamento na pele, trazendo a proteção para uma rotina real.',
  },
  'skincare-5': {
    sourceParts: ['/videos/skincare-creamy-sabonete.mp4?v=20261010'],
    poster: '/images/skincare-creamy-sabonete-icloud.webp',
    duration: '00:26',
    brand: 'Creamy',
    format: 'Rotina de limpeza facial',
    title: 'Creamy: limpeza facial na rotina de skincare',
    description: 'Uma demonstração do limpador facial da Creamy, da textura à aplicação e ao enxágue. Os gestos de cuidado e os detalhes do produto aproximam a limpeza facial de uma rotina real.',
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
    sourceParts: ['/videos/makeup-mascara.mp4?v=20261010'],
    poster: '/images/makeup-mascara-icloud.webp',
    duration: '00:50',
    brand: 'Detoni',
    format: 'Aplicação de máscara para cílios',
    title: 'Máscara de cílios: definição em foco',
    description: 'Da escovinha à aplicação, o vídeo acompanha a máscara de cílios Detoni em uso, com movimentos precisos que destacam a definição dos fios. A câmera se aproxima dos olhos para mostrar a aplicação e o resultado de um jeito claro, direto e natural.',
  },
  'makeup-1': {
    sourceParts: ['/videos/makeup-rare-beauty.mp4?v=20261010'],
    poster: '/images/makeup-rare-beauty-capa-alta.webp',
    duration: '00:15',
    brand: 'Rare Beauty',
    format: 'Aplicação de maquiagem',
    title: 'Rare Beauty: cor e luminosidade em foco',
    description: 'A aplicação de um produto compacto da Rare Beauty ganha destaque em uma demonstração próxima, da apresentação da embalagem ao esfumado nas maçãs do rosto. Os movimentos do pincel e o resultado luminoso aparecem em detalhe, valorizando a textura e o acabamento da maquiagem na pele.',
  },
  'asmr-2': {
    sourceParts: ['/videos/asmr-joia.mp4'],
    poster: '/images/asmr-pacco-capa-cortada.webp',
    duration: '00:16',
    brand: 'Pacco',
    format: 'Unboxing sonoro',
    title: 'Vyta Pacco: o som de uma descoberta',
    description: 'Uma abertura guiada pelos sons da embalagem e pela reação à descoberta do Vyta, da Pacco. O ritmo curto valoriza o momento de revelar o produto e cria uma experiência sensorial limpa, com foco em textura, presença e expectativa.',
  },
  'asmr-3': {
    sourceParts: ['/videos/asmr-brinco.mp4'],
    poster: '/images/asmr-brinco-capa.webp',
    duration: '00:07',
    format: 'Detalhes de produto',
    title: 'Brilho em close: um detalhe que prende o olhar',
    description: 'Um close silencioso e delicado que aproxima o espectador dos detalhes de uma peça brilhante. A composição valoriza reflexos, movimento e acabamento para transformar a apresentação do produto em uma pequena experiência visual.',
  },
  'asmr-1': {
    sourceParts: ['/videos/bodycare-rotina.mp4?v=20261010-r2'],
    poster: '/images/bodycare-granado-icloud.webp',
    duration: '00:24',
    brand: 'Granado',
    format: 'Unboxing sonoro',
    title: 'Granado: um presente para os sentidos',
    description: 'Os sons da abertura da caixa, do manuseio da embalagem e da descoberta dos sabonetes conduzem este unboxing da Granado. Um vídeo sem narração, com ritmo tranquilo e atenção às texturas, aos detalhes e à experiência sensorial do produto.',
  },
}

const projectContext: Record<string, { product: string; objective: string; format?: string }> = {
  'haircare-1': { product: 'Máscara e óleo Blonde Oil, da BRAÉ', objective: 'Apresentar os produtos e mostrar como entram no cuidado dos fios loiros.' },
  'haircare-2': { product: 'Máscaras Blonde Oil, Fiber Mask e Essential, da BRAÉ', objective: 'Apresentar as três máscaras e aproximar os produtos de uma rotina de cuidado capilar.' },
  'haircare-3': { product: 'Cera Antifrizz Hidratei', objective: 'Mostrar a embalagem, a aplicação e o acabamento do finalizador no penteado.' },
  'bodycare-1': { product: 'In the Stars e Into the Night, da Bath & Body Works', objective: 'Apresentar as duas fragrâncias com detalhes dos frascos e gestos de aplicação.' },
  'bodycare-2': { product: 'Mist perfumado Amêndoa, da L’Occitane', objective: 'Apresentar o produto e mostrar o gesto de perfumação na rotina.' },
  'bodycare-3': { product: 'Iluminador corporal Skelt', objective: 'Mostrar a aplicação no braço e o reflexo da luz sobre o acabamento da pele.' },
  'skincare-1': { product: 'Minéral 89, da Vichy', objective: 'Mostrar a textura do sérum e sua aplicação como etapa da rotina de skincare.' },
  'skincare-2': { product: 'Protetor solar facial', objective: 'Demonstrar a aplicação, a espalhabilidade e o acabamento na pele.' },
  'skincare-3': { product: 'Sérum Skindrops, da CARE Natural Beauty', objective: 'Apresentar o sérum e mostrar seu acabamento luminoso na pele.' },
  'skincare-4': { product: 'Protetor solar em bastão Ollie', objective: 'Demonstrar o uso do bastão diretamente no rosto e a praticidade da aplicação.' },
  'skincare-5': { product: 'Limpador facial Creamy', objective: 'Mostrar a textura, a aplicação e o enxágue do produto na limpeza facial.' },
  'makeup-1': { product: 'Compacto Rare Beauty', objective: 'Mostrar o produto, a aplicação com pincel e o acabamento nas maçãs do rosto.' },
  'makeup-2': { product: 'The POREfessional Power Powder, da Benefit Cosmetics', objective: 'Demonstrar a aplicação do pó com pincel e o acabamento da maquiagem.' },
  'makeup-3': { product: 'Máscara de cílios Detoni', objective: 'Mostrar a escovinha, a aplicação e a definição dos cílios em close.' },
  'asmr-1': { product: 'Kit de sabonetes Granado', objective: 'Apresentar a abertura da caixa e os detalhes dos sabonetes e da embalagem.', format: 'Unboxing de produto' },
  'asmr-2': { product: 'Vyta, da Pacco', objective: 'Valorizar os sons da abertura da embalagem e o momento de revelar o produto.' },
  'asmr-3': { product: 'Brinco com detalhes brilhantes', objective: 'Apresentar os reflexos, o movimento e o acabamento da peça em close.' },
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
      format: projectContext[id]?.format ?? media?.format ?? format,
      title: media?.title,
      brand: media?.brand,
      description: media?.description,
      product: projectContext[id]?.product,
      objective: projectContext[id]?.objective,
      duration: media?.duration ?? ['00:30', '00:45', '00:35', '00:60'][videoIndex],
      tone: `tone-${(categoryIndex + videoIndex) % 5}`,
      sourceParts: media?.sourceParts,
      poster: media?.poster,
    }
  }),
}))

const profileFacts = [
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
  { name: 'Essencial', videos: '1 vídeo UGC', photos: 'Fotos avulsas sob orçamento', price: 'R$ 250', unit: '' },
  { name: 'Duo', videos: '2 vídeos UGC', photos: 'Fotos avulsas sob orçamento', price: 'R$ 460', unit: 'R$ 230 por vídeo' },
  { name: 'Campanha', videos: '3 vídeos UGC', photos: 'Fotos avulsas sob orçamento', price: 'R$ 630', unit: 'R$ 210 por vídeo' },
  { name: 'Content Pack', videos: '5 vídeos UGC', photos: '2 fotos incluídas', price: 'R$ 1.050', unit: '' },
]

const process = ['Briefing', 'Estratégia e roteiro', 'Gravação', 'Edição e finalização', 'Entrega']
const proposalUrl = 'https://wa.me/5511988242425?text=' + encodeURIComponent('Olá, Thamyres! Gostaria de solicitar uma proposta para produção de conteúdo para minha marca.')

function CategoryReels({ category, onOpen }: { category: Category; onOpen: (video: PortfolioVideo) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ index: 0, previous: false, next: false, scrollable: false })
  const trackId = `videos-${category.name.toLowerCase()}`
  const hintId = `${trackId}-hint`
  const published = category.videos.filter((video) => video.sourceParts).length
  const upcoming = category.videos.length - published

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const card = track.querySelector<HTMLElement>('.reel-card')
      if (!card) return
      const step = card.getBoundingClientRect().width + (Number.parseFloat(getComputedStyle(track).columnGap) || 0)
      const max = track.scrollWidth - track.clientWidth
      setPosition({
        index: Math.min(category.videos.length - 1, Math.max(0, Math.round(track.scrollLeft / step))),
        previous: track.scrollLeft > 2,
        next: track.scrollLeft < max - 2,
        scrollable: max > 2,
      })
    }
    const observer = new ResizeObserver(update)
    observer.observe(track)
    track.addEventListener('scroll', update, { passive: true })
    update()
    return () => { observer.disconnect(); track.removeEventListener('scroll', update) }
  }, [category])

  const move = (direction: number, edge?: 'start' | 'end') => {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>('.reel-card')
    if (!track || !card) return
    const step = card.getBoundingClientRect().width + (Number.parseFloat(getComputedStyle(track).columnGap) || 0)
    track.scrollTo({
      left: edge === 'start' ? 0 : edge === 'end' ? track.scrollWidth - track.clientWidth : track.scrollLeft + direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const onTrackKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Home') move(0, 'start')
    else if (event.key === 'End') move(0, 'end')
    else move(event.key === 'ArrowRight' ? 1 : -1)
  }

  return (
    <article className="category-column" id={category.name.toLowerCase()}>
      <header className="category-header">
        <div><h3>{category.name}</h3><p>{published} vídeos{upcoming > 0 ? ` · ${upcoming} em breve` : ''}</p></div>
        <div className="reel-controls" aria-label={`Controles de ${category.name}`}>
          <button type="button" onClick={() => move(-1)} disabled={!position.previous} aria-label={`Vídeos anteriores de ${category.name}`} aria-controls={trackId}><ArrowLeft size={18} aria-hidden="true" /></button>
          <span className="reel-position" aria-live="polite" aria-atomic="true">{position.scrollable ? `${position.index + 1} / ${category.videos.length}` : `${category.videos.length} itens`}</span>
          <button type="button" onClick={() => move(1)} disabled={!position.next} aria-label={`Próximos vídeos de ${category.name}`} aria-controls={trackId}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </header>
      <p className="reel-hint" id={hintId}>{position.scrollable ? 'Deslize ou use as setas para ver mais.' : 'Abra um vídeo para conhecer a produção.'}<span className="sr-only"> Use as setas do teclado, Home e End quando a lista estiver em foco.</span></p>
      <div className="reel-carousel">
        <div className="reel-stack" id={trackId} ref={trackRef} role="region" aria-roledescription="carrossel" aria-label={`Vídeos de ${category.name}`} aria-describedby={hintId} tabIndex={0} onKeyDown={onTrackKeyDown}>
          {category.videos.map((video) => (
            <button className={`reel-card ${video.tone} ${video.sourceParts ? '' : 'reel-card-placeholder'}`} type="button" key={video.id} onClick={() => onOpen(video)} disabled={!video.sourceParts} aria-label={video.sourceParts ? `Abrir ${video.title ?? video.format}` : `Espaço reservado: ${video.title ?? video.format}`} aria-haspopup={video.sourceParts ? 'dialog' : undefined}>
              <span className="reel-visual">{video.poster ? <img className="reel-poster" src={video.poster} alt="" loading="lazy" decoding="async" /> : null}</span>
              {video.sourceParts && <span className="reel-play"><Play fill="currentColor" size={14} aria-hidden="true" /></span>}
              <span className="reel-meta"><strong>{video.format}</strong><small>{video.brand ? `${video.brand} · ${video.category}` : video.category}</small>{!video.sourceParts && <span className="placeholder-status">Vídeo em breve</span>}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

function App() {
  const [activeVideo, setActiveVideo] = useState<PortfolioVideo | null>(null)
  const [playbackSource, setPlaybackSource] = useState<string | null>(null)
  const [videoLoadError, setVideoLoadError] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!activeVideo || !dialog) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.classList.add('modal-open')
    if (!dialog.open) dialog.showModal()
    return () => {
      document.body.classList.remove('modal-open')
      if (dialog.open) dialog.close()
      previousFocus?.focus({ preventScroll: true })
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
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="topbar">
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#portfolio">Portfólio</a>
          <a href="#metricas">Métricas</a>
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
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

      <main id="conteudo" tabIndex={-1}>
        <section className="hero dark-section" id="inicio">
          <div className="hero-showcase">
            <div className="hero-name-panel">
              <picture className="hero-name-image">
                <source media="(max-width: 720px)" srcSet="/images/hero-thamyres-scene-continued.webp" />
                <img
                  src="/images/hero-thamyres-scene-continued.webp"
                  alt="Thamyres Harmatiuk, criadora de conteúdo UGC para marcas de beleza"
                  width="1672"
                  height="941"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              <div className="hero-image-fade" aria-hidden="true" />
              <div className="hero-name-copy">
                <h1>Thamyres <em>Harmatiuk</em></h1>
                <p>Vídeos e fotos de beleza: roteiro, demonstração de produto e edição para os canais da sua marca.</p>
              </div>
            </div>

          </div>
          <div className="specialty-strip" aria-label="Especialidades">
            <a href="#haircare">HAIRCARE</a>
            <a href="#skincare">SKINCARE</a>
            <a href="#bodycare">BODYCARE</a>
            <a href="#makeup">MAKEUP</a>
            <a href="#asmr">ASMR</a>
          </div>
        </section>

        <section className="portfolio paper-section" id="portfolio">
          <div className="portfolio-heading section-heading">
            <div>
              <span className="section-kicker">PORTFÓLIO</span>
              <h2>Trabalhos <em>selecionados</em></h2>
            </div>
          </div>

          <p className="portfolio-note">Produções autorais. Abra cada vídeo para ver o produto, a proposta do conteúdo e minha participação.</p>
          <div className="portfolio-grid">
            {categories.map((category) => <CategoryReels key={category.name} category={category} onOpen={setActiveVideo} />)}
          </div>

          <div className="portfolio-photos" id="fotografias" aria-label="Fotografias selecionadas">
            <div className="photo-track">
              {[
                { category: 'HAIRCARE', image: '/images/portfolio-haircare.webp', alt: 'Thamyres apresenta produtos Blonde Oil da BRAÉ, incluindo o óleo capilar.' },
                { category: 'SKINCARE', image: '/images/skincare-vichy-mineral89-atualizada.webp', alt: 'Thamyres apresenta o sérum facial Mineral 89 da Vichy.' },
                { category: 'MAKEUP', image: '/images/portfolio-makeup.webp', alt: 'Thamyres apresenta o pó facial The POREfessional Power Powder da Benefit.' },
              ].map(({ category, image, alt }) => (
                <article className={`photo-item photo-item-${category.toLowerCase()}`} key={category}>
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
            ].filter(([, image]) => image).map(([label, image, alt]) => (
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
              <p className="about-bio">Minha experiência em beleza reúne reviews, demonstrações e unboxings. Trabalho com textura, aplicação e acabamento em rotinas de cabelo, pele, maquiagem e cuidados corporais, adaptando cada conteúdo ao briefing.</p>
              <p className="about-bio">Assino roteiro, apresentação, gravação e edição. Cuido da iluminação, dos enquadramentos, do som e das legendas para que o produto e seu uso apareçam com clareza.</p>
            </div>
            <div className="about-practical">
              <h3>Localização e disponibilidade</h3>
              <p>Alphaville, SP e Curitiba, PR.</p>
              <p>Disponibilidade para viagens.</p>
              <details className="model-profile">
                <summary>Perfil para trabalhos como modelo</summary>
                <p>Informações para produções em que o perfil físico é relevante.</p>
                <dl className="profile-facts">{profileFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              </details>
            </div>
          </div>
        </section>

        <section className="services paper-section" id="servicos">
          <div className="services-intro">
            <span className="section-kicker">SERVIÇOS E INVESTIMENTO</span>
            <h2>Conteúdo para <em>sua marca</em></h2>
            <p>Produção autoral de vídeos e fotos de beleza, com roteiro, apresentação do produto, gravação e edição conforme o briefing aprovado.</p>
          </div>

          <div className="service-types">
            <article>
              <h3>Produção UGC para os canais da marca</h3>
              <p>Conteúdo entregue para a marca publicar em seus canais. A produção inclui captação com a câmera traseira em 4K a 30 FPS, edição e legendas, com atenção à luz, ao som, ao enquadramento e à demonstração do produto.</p>
            </article>
            <article>
              <h3>Conteúdo para redes sociais</h3>
              <p>Projetos recorrentes com entregas e frequência definidas na proposta. O escopo de conteúdo para redes sociais é apresentado separadamente da produção UGC.</p>
            </article>
          </div>

          <div className="compact-process">
            <span className="section-kicker">ETAPAS DA PRODUÇÃO</span>
            <div>{process.map((item, index) => <span key={item}>{item}{index < process.length - 1 && <b aria-hidden="true">›</b>}</span>)}</div>
          </div>

          <div className="service-formats"><h3>Formatos que produzo</h3><ul>{services.map((service) => <li key={service}>{service}</li>)}</ul></div>

          <div className="package-heading" id="pacotes"><div><h3>Pacotes de produção UGC</h3><p>Cada vídeo inclui uma versão. Duração e revisões são definidas na proposta antes da produção; novos ganchos são orçados à parte.</p></div><a className="project-proposal" href={proposalUrl} target="_blank" rel="noreferrer">Solicitar proposta <ArrowUpRight size={16} aria-hidden="true" /></a></div>
          <div className="package-list">
            {prices.map((pack) => (
              <article className="package-card" key={pack.name}>
                <header><h4>{pack.name}</h4><strong>{pack.price}</strong></header>
                <p className="package-quantity">{pack.videos}</p>
                <p className="package-photos">{pack.photos}{pack.unit && <span>{pack.unit}</span>}</p>
                <dl className="package-details">
                  <div><dt>Duração prevista</dt><dd>Definida na proposta</dd></div>
                  <div><dt>Versões entregues</dt><dd>1 versão por vídeo</dd></div>
                  <div><dt>Revisões</dt><dd>Ajustes ao briefing aprovado; rodadas definidas na proposta</dd></div>
                  <div><dt>Prazo</dt><dd>Até 7 dias corridos após aprovação do briefing e recebimento do produto</dd></div>
                </dl>
              </article>
            ))}
          </div>

          <div className="delivery-scope">
            <article><h3>O que está incluído</h3><ul><li>Roteiro conforme o briefing aprovado.</li><li>Gravação com a câmera traseira em 4K a 30 FPS.</li><li>Edição e legendas.</li><li>Ajustes para que a entrega atenda ao briefing, conforme as revisões combinadas.</li></ul></article>
            <article><h3>O que é orçado separadamente</h3><ul><li>Fotos extras, arquivos brutos e ganchos adicionais.</li><li>Direitos de uso para mídia paga e períodos de veiculação.</li><li>Custos adicionais de produção, deslocamento e locação, quando necessários.</li></ul></article>
          </div>

          <article className="monthly-offer"><div><h3>Contrato mensal</h3><p>Plano personalizado conforme a proposta.</p></div><p>Quantidade de vídeos e fotos, duração, revisões e cronograma são definidos para cada projeto. Cada vídeo UGC inclui uma versão; novos ganchos são orçados à parte. Produção UGC e conteúdo para redes sociais têm seus escopos identificados na proposta.</p></article>
          <div className="proposal-callout"><div><h3>Vamos definir as entregas para sua marca?</h3><p>Conte o produto, os canais de publicação e o que você precisa produzir.</p></div><a className="action-link" href={proposalUrl} target="_blank" rel="noreferrer">Solicitar proposta <ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </section>

        <section className="contact dark-section" id="contato">
          <h2>Vamos planejar seu<br /><em>próximo conteúdo?</em></h2>
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

      <nav className="mobile-contact-dock" aria-label="Navegação rápida">
        <a href="#portfolio"><Play size={18} aria-hidden="true" /> Trabalhos</a>
        <a href="#servicos"><Briefcase size={18} aria-hidden="true" /> Serviços</a>
        <a href="#contato"><MessageCircle size={18} aria-hidden="true" /> Contato</a>
      </nav>

      {activeVideo && (
        <dialog ref={dialogRef} className="video-modal" aria-labelledby="project-title" onCancel={(event) => { event.preventDefault(); setActiveVideo(null) }} onClick={(event) => {
          if (event.target !== event.currentTarget) return
          const bounds = event.currentTarget.getBoundingClientRect()
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setActiveVideo(null)
        }}>
          <header className="modal-header"><span>Projeto autoral · {activeVideo.category}</span><button className="modal-close" type="button" autoFocus onClick={() => setActiveVideo(null)} aria-label="Fechar vídeo"><X size={22} aria-hidden="true" /></button></header>
          <div className="modal-content">
            <div className="modal-video-player">
              {playbackSource && !videoLoadError ? (
                <video key={activeVideo.id} src={playbackSource} controls autoPlay playsInline preload="metadata" poster={activeVideo.poster} aria-label={activeVideo.title} onError={() => setVideoLoadError(true)}>Seu navegador não oferece suporte à reprodução deste vídeo.</video>
              ) : (
                <div className="video-loading" role="status"><Play fill="currentColor" size={24} aria-hidden="true" /><span>{videoLoadError ? 'Não foi possível carregar o vídeo.' : 'Carregando vídeo…'}</span>{videoLoadError && <a href={activeVideo.sourceParts?.[0]} target="_blank" rel="noreferrer">Abrir o arquivo do vídeo</a>}</div>
              )}
            </div>
            <div className="modal-info">
              <h2 id="project-title">{activeVideo.title}</h2>
              <dl className="project-facts">
                <div><dt>Produto</dt><dd>{activeVideo.product}</dd></div>
                <div><dt>Formato</dt><dd>{activeVideo.format} · {activeVideo.duration}</dd></div>
                <div><dt>Objetivo do conteúdo</dt><dd>{activeVideo.objective}</dd></div>
                <div><dt>Minha participação</dt><dd>Produção autoral: concepção, roteiro, apresentação, gravação e edição.</dd></div>
              </dl>
              <a className="project-proposal" href={proposalUrl} target="_blank" rel="noreferrer">Produzir um conteúdo para minha marca <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default App
