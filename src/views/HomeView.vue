<template>
  <div class="page">
    <!-- Banner -->
    <header class="banner" ref="bannerRef">
      <span class="background"></span>
      <canvas ref="bubbleCanvas" @click="handleCanvasClick"></canvas>
      <h1 class="text-white text-4xl font-bold text-center pt-20">My Blog App</h1>
    </header>

    <!-- Cards de notícias -->
  <main class="max-w-7xl mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold mb-8 text-gray-800">Últimas Notícias</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <router-link
        v-for="(item, index) in fakePosts"
        :key="index"
        :to="item.route"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 block"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-48 object-cover"
        />
        <div class="p-5">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ item.excerpt }}</p>
          <p class="text-xs text-gray-500">{{ item.date }}</p>
          <span class="mt-4 text-sm text-blue-600 hover:underline font-medium block">Ver mais →</span>
        </div>
      </router-link>
    </div>
  </main>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const bubbleCanvas = ref(null)
const bannerRef = ref(null)

let bubbles = []

onMounted(() => {
  document.body.classList.add('loaded')

  const canvas = bubbleCanvas.value
  const ctx = canvas.getContext('2d')
  const banner = bannerRef.value

  function resizeCanvas() {
    canvas.width = banner.offsetWidth
    canvas.height = banner.offsetHeight
  }

  resizeCanvas()

  bubbles = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 20 + Math.random() * 25,
    speed: 0.3 + Math.random() * 0.7,
    alpha: 0.1 + Math.random() * 0.2,
    drift: (Math.random() - 0.5) * 0.5,
  }))

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const b of bubbles) {
      b.y -= b.speed
      b.x += b.drift

      if (b.y + b.radius < 0) {
        b.y = canvas.height + b.radius
        b.x = Math.random() * canvas.width
      }

      ctx.beginPath()
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(183, 148, 255, ${b.alpha})`
      ctx.fill()
    }

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener('resize', () => {
    resizeCanvas()
  })
})

function handleCanvasClick(e) {
  const canvas = bubbleCanvas.value
  const rect = canvas.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const clickY = e.clientY - rect.top

  for (const b of bubbles) {
    const dx = b.x - clickX
    const dy = b.y - clickY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < b.radius) {
  toast.success('✨ Bem-vindo ao nosso blog! Fique à vontade para explorar as últimas notícias 📰', {
    icon: '🫧', 
    timeout: 9000,
    position: 'top-center',
  });
  break;
}
  }
}

const fakePosts = [
  {
    slug: 'lancado-novo-recurso-vuejs',
    title: 'Lançado novo recurso no Vue.js',
    excerpt: 'A nova versão do Vue traz melhorias significativas de performance e novas APIs para desenvolvedores.',
    image: 'https://static-00.iconduck.com/assets.00/vue-icon-1024x1024-8qwdup5l.png',
    date: '20 de abril de 2025',
    route: '/posts', // vai para posts
  },
  {
    slug: 'atualizacao-no-strapi-cms',
    title: 'Atualização no Strapi CMS',
    excerpt: 'A plataforma Strapi agora suporta ainda mais integrações com serviços externos, além de melhorias no editor.',
    image: 'https://media.licdn.com/dms/image/C4D12AQGDy4sVaFDZmg/article-cover_image-shrink_600_2000/0/1599703763095?e=2147483647&v=beta&t=dUcslE6MeV5t-COkjc3jl6aRRV-5P8aGTdJpcJoCGlk',
    date: '18 de abril de 2025',
    route: '/midia', // vai para página mídia
  },
  {
    slug: 'design-responsivo-em-alta',
    title: 'Design Responsivo em Alta',
    excerpt: 'Tendência de 2025 foca na acessibilidade e experiência do usuário em diferentes dispositivos.',
    image: 'https://viverdeblog.com/wp-content/uploads/2017/04/thumbnail-design-responsivo.png',
    date: '17 de abril de 2025',
  }
]

</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 40rem;
  padding: 0 5%;
  overflow: hidden;
  backface-visibility: hidden;
}

.banner .background {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -2;
  transform: translate3d(0, 0, 0) scale(1.25);
  background: black url('https://static.vecteezy.com/ti/vetor-gratis/p2/13546201-projetor-holografico-de-mapa-do-mundo-moderno-em-fundo-de-tecnologia-vetor.jpg') no-repeat center center;
  background-size: cover;
}

.banner canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0; /* agora clicável */
  cursor: pointer;
}

.banner h1 {
  color:#4a0072;
  margin: 0;
  line-height: 40rem;
  text-transform: uppercase;
  text-shadow: 0 0 .3rem white;
  font-size: 2em;
  font-weight: bolder;
}

main {
  width: 90%;
  margin: 5rem auto;
}

main p {
  margin: 0 0 3rem 0;
}
</style>

<style>
* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  margin: 0;
  opacity: 0;
  font: 1.6rem/1.875 'Avenir Next', sans-serif;
}

body.loaded {
  opacity: 1;
  transition: 1s opacity;
}

body.loaded .banner .background {
  transform: scale(1);
  transition: 6.5s transform;
}

.custom-toast {
  background: linear-gradient(135deg, #b99cff, #e0c7ff);
  color: #4a0072;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(125, 82, 255, 0.3);
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  padding: 1.2rem 1.6rem;
  animation: popIn 0.4s ease-out;
}

@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

</style>
