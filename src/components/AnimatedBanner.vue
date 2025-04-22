<template>
    <header ref="banner" class="banner">
      <canvas ref="canvas" class="bubble-canvas"></canvas>
      <span class="background"></span>
      <h1 class="title" :class="{ show: showTitle }">Pen6</h1>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  const canvas = ref(null)
  const banner = ref(null)
  const showTitle = ref(false)
  
  let ctx, width, height, bubbles = [], animationFrame
  
  function random(min, max) {
    return Math.random() * (max - min) + min
  }
  
  function createBubble() {
    return {
      x: random(0, width),
      y: random(0, height),
      r: random(10, 40),
      speed: random(0.2, 1),
      opacity: random(0.2, 0.5),
      dx: random(-0.5, 0.5)
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height)
    bubbles.forEach(b => {
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(180, 100, 255, ${b.opacity})`
      ctx.fill()
  
      b.y -= b.speed
      b.x += b.dx
  
      if (b.y + b.r < 0 || b.x < -50 || b.x > width + 50) {
        Object.assign(b, createBubble())
        b.y = height + b.r
      }
    })
    animationFrame = requestAnimationFrame(draw)
  }
  
  function handleMouseMove(e) {
    const rect = canvas.value.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
  
    bubbles.forEach(b => {
      const dx = b.x - mouseX
      const dy = b.y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 80) {
        b.dx += dx / dist * 0.5
        b.y -= 0.3
      }
    })
  }
  
  onMounted(() => {
    const el = canvas.value
    ctx = el.getContext('2d')
    width = el.width = banner.value.clientWidth
    height = el.height = banner.value.clientHeight
    
    bubbles = Array.from({ length: 50 }, createBubble)
    draw()
  
    window.addEventListener('resize', () => {
      width = el.width = banner.value.clientWidth
      height = el.height = banner.value.clientHeight
    })
  
    el.addEventListener('mousemove', handleMouseMove)
  
    setTimeout(() => {
      showTitle.value = true
    }, 800)
  })
  
  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame)
    canvas.value.removeEventListener('mousemove', handleMouseMove)
  })
  </script>
  
  <style scoped>
  .banner {
    position: relative;
    width: 100%;
    height: 40rem;
    overflow: hidden;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .background {
    position: absolute;
    inset: 0;
    z-index: -2;
    background: black url('https://images.unsplash.com/photo-1531971085967-431db1ec65a2?auto=format&fit=crop&w=2250&q=80') no-repeat center center;
    background-size: cover;
    transform: scale(1.25);
    transition: transform 8s ease;
  }
  
  body.loaded .background {
    transform: scale(1);
  }
  
  .bubble-canvas {
    position: absolute;
    inset: 0;
    z-index: -1;
  }
  
  .title {
    color:#54308A ;
    font-size: 4rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1.5s ease;
    text-shadow: 0 0 0.5rem black;
  }
  
  .title.show {
    opacity: 1;
    transform: translateY(0);
  }
  </style>
  
  <style>
  body.loaded {
    opacity: 1;
    transition: opacity 1s ease;
  }
  
  body {
    margin: 0;
    opacity: 0;
  }
  </style>
  