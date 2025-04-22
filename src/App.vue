

<template>
 <div id="app">
   <nav class="navegações" style="display: flex; gap: 20px; padding: 10px; color:blue">
     <router-link to="/">Home</router-link>
     <router-link to="/Posts">Posts</router-link>
     <router-link to="/Midia">Midia</router-link>
   </nav>
   <RouterView/>
 </div>
</template>

<script setup>

</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}


.navegações {
  background-color:#54308A;
  display: flex;
  justify-content: flex-end; /* Alinha os links à direita */
  gap: 2rem;                 /* Espaço entre os links */
  padding: 1rem 2rem;        /* Espaçamento interno */
}

.navegações a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

</style>


