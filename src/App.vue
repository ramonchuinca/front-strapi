<template>
  <div id="app">
    <!-- Botão tipo hambúrguer -->
    <button class="hamburger-btn" @click="toggleSidebar">
  <i class="fa" :class="isCollapsed ? 'fa-bars' : 'fa-times'"></i>
</button>

<nav :class="['sidebar-navigation', { collapsed: isCollapsed }]">

      <ul>
        <li class="active">
          <i class="fa fa-home"></i>
          <span class="tooltip">Home</span>
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

      <div class="navegações">
        <router-link to="/">Home</router-link>
        <router-link to="/Posts">Posts</router-link>
        <router-link to="/Midia">Midia</router-link>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import $ from 'jquery'



const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}


onMounted(() => {
  $('ul li').on('click', function () {
    $('li').removeClass('active')
    $(this).addClass('active')
  })
})
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Lato', sans-serif;
}

body {
  background-color:#54308A;
  overflow: hidden;
}

$sidebar-background-color: #54308A;
$active-sidebar-link-color: #22252E;
$active-link-color: #98D7EC;

// Botão tipo hamburguer
.hamburger-btn {
  position: fixed;
  // top: 5px;
  left: 20px;
  z-index: 1100;
  background: none;
  border: none;
  color:#98D7EC;
  font-size: 24px;
  cursor: pointer;
}

// Sidebar
.sidebar-navigation {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100px;
  background-color: $sidebar-background-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  z-index: 1000;

  &.collapsed {
    width: 79px;
    align-items: center;

    ul,
    .navegações {
      display: none;
    }
  }

  ul {
    padding-top: 50px;
    width: 100%;

    li {
      padding: 10px 0;
      cursor: pointer;
      position: relative;
      text-align: center;
      transition: background 0.3s ease;
      

      i {
        font-size: 32px;
        margin-bottom: 10px;
        color: white;
      }

      .tooltip {
        left: 90px;
        padding: 5% 10%;
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
