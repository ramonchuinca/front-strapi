<template>
  <div v-for="item in midias" :key="item.id" class="card-midia">
    <h2>{{ item.titulo }}</h2>
    <p>{{ item.descricao }}</p>

    <div class="imagens">
      <img
        v-for="(img, index) in item.imagens"
        :key="index"
        :src="baseURL + (img.formats?.medium?.url || img.url)"
        :alt="img.name"
        class="imagem"
      />
    </div>

    <div class="videos">
      <video
        v-for="(video, index) in item.videos"
        :key="index"
        :src="baseURL + video.url"
        controls
        class="video"
      ></video>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'Midias',
  data() {
    return {
      midias: [],
      baseURL: 'http://localhost:1337'
    }
  },

  mounted() {
  axios.get("http://localhost:1337/api/midias?populate=*")
    .then(res => {
      console.log("Resposta da API:", res)
      if (res.data && res.data.data) {
        this.midias = res.data.data
      } else {
        console.error("Formato inesperado:", res)
      }
    })
    .catch(err => {
      console.error("Erro ao buscar mídias:", err)
    })
}

}
</script>




<style scoped>
.card-midia {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 1000px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-midia h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #222;
}

.card-midia p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.imagens, .videos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.imagem {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.imagem:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.video {
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #000;
}

</style>

