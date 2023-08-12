import { useApl } from "./../composables/useApl";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useViewAplStore = defineStore("view_apl", () => {
  const state = useApl();
  const APL_ID = ref(useStorage<string>("search", ""));
  const USER_ID = ref(useStorage<string>("search", ""));

  function setID(id: string) {
    APL_ID.value = id.toString();
  }

  function setUSER(id: string) {
    USER_ID.value = id.toString();
  }

  return {
    state,
    APL_ID,
    USER_ID,
    setID,
    setUSER,
  };
});
