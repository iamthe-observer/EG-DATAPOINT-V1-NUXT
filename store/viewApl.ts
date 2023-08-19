import { useApl } from "./../composables/useApl";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useViewAplStore = defineStore("view_apl", () => {
  const APL_ID = ref(useStorage<string>("apl_id", ""));
  const USER_ID = ref(useStorage<string>("user_id", ""));

  function setID(id: string) {
    APL_ID.value = id.toString();
  }

  function setUSER(id: string) {
    USER_ID.value = id.toString();
  }

  return {
    APL_ID,
    USER_ID,
    setID,
    setUSER,
  };
});
