<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <div v-if="loading" class="flex justify-center items-center h-60">
      <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    </div>

    <div v-else>
      <div
  v-for="(item, index) in post"
  :key="index"
  @click="$router.push(`/posts/${item.slug}`)"
  class="bg-white border border-purple-300 rounded-xl shadow-md p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
>
  <h1 class="text-xl font-extrabold text-indigo-600 text-center mb-4 leading-snug">
    {{ item.title }}
  </h1>
  <p class="text-sm text-gray-700 font-semibold leading-relaxed">
    {{ item.content }}
  </p>
  <div class="text-right mt-8">
    <p class="text-xs text-purple-400 italic">
      {{ formatDate(item.publishedAt) }}
    </p>
  </div>
</div>


      <!-- Título -->
     <div></div>

      <!-- Data de publicação -->


      <!-- Imagem de capa -->
      <img
        v-if="post?.attributes?.coverImage?.data"
        :src="getImageUrl(post.attributes.coverImage.data.attributes.url)"
        :alt="post.attributes.title"
        class="rounded-lg w-full max-h-[500px] object-cover mb-8 shadow"
      />

      <!-- Conteúdo do post -->
      <div
        class="prose max-w-none prose-p:leading-relaxed prose-img:rounded-md prose-headings:text-gray-800 prose-a:text-blue-600 hover:prose-a:underline"
        v-html="post?.attributes?.content"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '../utils/axios'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

const getImageUrl = (url) => `http://localhost:1337${url}`

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
    const res = await axiosInstance.get(
      `/posts`
    )
  
    post.value = res.data.data
  } catch (error) {
    console.error('Erro ao buscar post:', error)
  } finally {
    loading.value = false
  }
}

onMounted( ()=>{
  fetchPost()
})
</script>

<style scoped>
/* Se quiser deixar a tipografia ainda mais clean */
.prose {
  font-family: 'Inter', sans-serif;
}
</style>
