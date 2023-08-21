import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(gsap);
  nuxtApp.provide("ScrollTrigger", ScrollTrigger);

  return {
    provide: {
      gsap: gsap,
    },
  };
});
