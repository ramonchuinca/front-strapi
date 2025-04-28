<template>
  <div v-if="!loading">
    <!-- Seu conteúdo aqui -->
    <div
      ref="carousel"
      class="grid gap-6 p-4 no-scrollbar overflow-x-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="(item, index) in post"
        :key="index"
        class="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        <router-link :to="`/posts/${item.id}`">
          <div>
            <h1 class="text-lg font-extrabold text-indigo-600 text-center mb-4">
              {{ item.title }}
            </h1>
            <p class="text-gray-700 text-sm font-semibold leading-relaxed">
              {{ item.content }}
            </p>
            <p class="text-right text-xs text-purple-400 italic mt-6">
              {{ formatDate(item.publishedAt) }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- Aqui você pode mostrar um indicador de carregamento enquanto aguarda os posts -->
    <p>Carregando...</p>
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
  carousel.value.scrollBy({ left: -300, behavior: 'smooth' })
}

const scrollRight = () => {
  carousel.value.scrollBy({ left: 300, behavior: 'smooth' })
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
    console.log('Posts recebidos:', post.value) // Verifique no console
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
  } finally {
    loading.value = false
  }
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
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
