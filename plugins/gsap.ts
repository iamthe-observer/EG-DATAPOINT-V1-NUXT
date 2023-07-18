import { gsap } from 'gsap'
// import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { ScrollSmoother } from 'gsap/all'
// import { Observer } from 'gsap/Observer'
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
// import { Draggable } from 'gsap/Draggable'
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(
  // Flip,
  ScrollTrigger
  // ScrollSmoother
  // Observer,
  // ScrollToPlugin,
  // Draggable,
  // MotionPathPlugin
)

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(gsap)
  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)
  // nuxtApp.provide('ScrollSmoother', ScrollSmoother)
})
