

<template>
  <div id="app">
    <nav class="sidebar-navigation">
      <ul>
        <li class="active">
        <i class="fa fa-home"></i> <!-- Ícone de home substituído -->
       <span class="tooltip">Home</span> <!-- Tooltip visível com "Home" -->
       </li>
        <li>
          <i class="fa fa-hdd-o"></i>
          <span class="tooltip">Devices</span>
        </li>
        <li>
          <i class="fa fa-newspaper-o"></i>
          <span class="tooltip">Contacts</span>
        </li>
        <li>
          <i class="fa fa-print"></i>
          <span class="tooltip">Fax</span>
        </li>
        <li>
          <i class="fa fa-sliders"></i>
          <span class="tooltip">Settings</span>
        </li>
      </ul>

      <!-- Inserido o menu com router-link aqui -->
      <div class="navegações" style="display: flex; flex-direction: column; gap: 10px; padding: 10px; color: blue;">
        <router-link to="/">Home</router-link>
        <router-link to="/Posts">Posts</router-link>
        <router-link to="/Midia">Midia</router-link>
      </div>
    </nav>
      <!-- <div class="flex flex-col gap-4 p-4">
    <div class="flex items-center gap-2">
      <Home class="w-5 h-5 text-blue-500" />
      <span class="text-sm text-gray-700">Início</span>
    </div>
    <div class="flex items-center gap-2">
      <User class="w-5 h-5 text-green-500" />
      <span class="text-sm text-gray-700">Perfil</span>
    </div>
    <div class="flex items-center gap-2">
      <Settings class="w-5 h-5 text-purple-500" />
      <span class="text-sm text-gray-700">Configurações</span>
    </div>
  </div> -->


    <RouterView/>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import $ from 'jquery'
import { Home, User, Settings } from 'lucide-vue-next'

onMounted(() => {
  $('ul li').on('click', function () {
    $('li').removeClass('active')
    $(this).addClass('active')
  })
})
</script>



<style lang="scss" scoped>
// Basics
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Lato', sans-serif;
  line-height: 1;
}

body {
  background-color: #F5F6F8;
  overflow: hidden;
}

// Color Variables
$sidebar-background-color: #54308A;
$active-sidebar-link-color: #22252E;
$hover-sidebar-link-color: $active-sidebar-link-color;
$active-link-color: #98D7EC;
$tooltip-background-color: $sidebar-background-color;

.sidebar-navigation {
  position: fixed; /* sempre visível e fora do fluxo do conteúdo */
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background-color: $sidebar-background-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;

  ul {
    padding-top: 20px;
    width: 100%;

    li {
      padding: 30px 0;
      cursor: pointer;
      position: relative;
      text-align: center;

      i {
        font-size: 32px; // ícone maior
        margin-bottom: 10px;
      }

      .tooltip {
        left: 90px;
        padding: 10px 20px;
        font-size: 15px;
        background-color: #444;
        color: white;
        border-radius: 4px;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease;
      }

      &:hover .tooltip {
        opacity: 1;
        visibility: visible;
      }

      &.active {
        background-color: $active-sidebar-link-color;

        i {
          color: $active-link-color;
        }
      }
    }
  }
  .navegações {
    margin-top: auto;
    padding: 20px 10px;
    color: white;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}


</style>



