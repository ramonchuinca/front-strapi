<template>
  <div v-if="!loading">
    <div
      ref="carousel"
      class="grid gap-6 p-4 no-scrollbar overflow-x-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center"
    >
      <div
        v-for="(item, index) in post"
        :key="index"
        class="card"
      >
        <!-- Bolinha com imagem ao invés de ícone -->
        <div class="card-image-circle">
          <img :src="getImageUrl(item.coverImage)" alt="Imagem do post" />
        </div>
        <h1>{{ item.title }}</h1>
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- Loading ou Spinner -->
  </div>
</template>





<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axiosInstance from '../utils/axios'

const post = ref([])
const loading = ref(true)
const carousel = ref(null)
let autoplayInterval = null

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    scrollRight()
  }, 3000)
}

const stopAutoplay = () => {
  clearInterval(autoplayInterval)
}

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const fetchPost = async () => {
  try {
    const res = await axiosInstance.get('/posts')
    post.value = res.data.data
    console.log('Posts recebidos:', post.value)
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
  } finally {
    loading.value = false
  }
}

// Função para retornar URL completa da imagem do Strapi
const baseURL = 'http://localhost:1337'

const getImageUrl = (image) => {
  if (!image) return ''
  return `${baseURL}${image.url}`
}

onMounted(() => {
  fetchPost()
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* body {
  background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Ubuntu;
} */

.card {
  position: relative;
  width: 300px;
  height: 350px;
  padding: 20px;
  margin: 0 25%;
  margin-top: 50px;
  background: rgba(83, 47, 135, 0.2);
  text-align: center;
  align-items: center;
  transition: .5s;
}
/* .card i {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  line-height: 60px;
  margin: auto;
  font-size: 25px;
  color: #333;
  background:#55C3C0;
  top: 80px;
  transition: .5s;
  position: relative;
} */

.card-image-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  background: #55C3C0;
  position: relative;
  top: 80px;
  transition: 0.5s;
}

.card-image-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card h1 {
  font-size: 30px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  top: 100px;
  transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.card p {
  font-size: 16px;
  color: #fff;
  font-weight: 300;
  line-height: 26px;
  letter-spacing: 1px;
  opacity: 0;
  transition: .5s;
}
.card:hover {
  cursor: pointer;
}
.card:hover p {
  opacity: 1;
  transition: .5s;
}
.card:hover h1 {
  top: -20px;
  transition: .5s;
}
.card:hover i {
  top: -50px;
  transition: .5s;
}
.card:nth-child(1):hover {
  background: #173840;
  box-shadow: 0 0 5px 0 #666;
}
.card:nth-child(1):hover i {
  color: #173840;
  box-shadow: 0 0 5px 0 #666;
}
.card:nth-child(2):hover {
  background: #3b5999;
  box-shadow: 0 0 5px 0 #666;
}
.card:nth-child(2):hover i {
  color: #3b5999;
  box-shadow: 0 0 5px 0 #666;
}
.card:nth-child(3):hover {
  background: #262216;
  box-shadow: 0 0 5px 0 #666;
}
.card:nth-child(3):hover i {
  color: #262216;
  box-shadow: 0 0 5px 0 #666;
}
</style>



