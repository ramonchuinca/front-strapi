<template>
    <div class="container mx-auto px-4 py-8">
      <!-- Título -->
      <h1 class="text-3xl font-bold text-center mb-8">Últimos Posts</h1>
  
      <!-- Spinner de carregamento -->
      <div v-if="loading" class="flex justify-center items-center h-60">
        <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      </div>
  
      <!-- Lista de posts -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="post in posts" :key="post.id" class="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <img
            v-if="post.attributes.coverImage?.data"
            :src="getImageUrl(post.attributes.coverImage.data.attributes.url)"
            :alt="post.attributes.title"
            class="h-48 w-full object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ post.attributes.title }}</h2>
            <p class="text-sm text-gray-600 mb-2">
              <strong>Publicado em:</strong> {{ formatDate(post.attributes.publishedAt) }}
            </p>
            <router-link
              :to="`/post/${post.attributes.slug}`"
              class="text-blue-600 hover:underline"
            >
              Ler mais →
            </router-link>
          </div>
        </div>
      </div>
  
      <!-- Paginação -->
      <div class="flex justify-center mt-10 gap-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ← Anterior
        </button>
        <span class="text-gray-600 font-semibold self-center">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Próxima →
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axiosInstance from '../utils/axios'
  
  // Estados
  const posts = ref([])
  const loading = ref(true)
  
  const currentPage = ref(1)
  const pageSize = 6
  const totalPages = ref(1)
  
  // Função de formatação de data
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  
  // URL da imagem
  const getImageUrl = (url) => `http://localhost:1337${url}`
  
  // Buscar posts com paginação
  const fetchPosts = async () => {
    loading.value = true
    try {
      const res = await axiosInstance.get(
        `/posts`
        
      )
      console.log(res.data)
      posts.value = res.data.data
      totalPages.value = res.data.meta.pagination.pageCount
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Mudar de página
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      fetchPosts()
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchPosts()
    }
  }
  
  // Buscar posts ao carregar a página
  onMounted(async()=>await fetchPosts)
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    
  }
  </style>
  