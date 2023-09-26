import { defineStore } from "pinia";
type NotifType = "error" | "success" | "warning" | "info";

export const useNotif = defineStore("notif", () => {
  const msg = ref("");
  const type = ref<NotifType>("info");
  const show = ref(false);

  function notify(message: string, _type: NotifType) {
    msg.value = message;
    type.value = _type;
    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 5000);
  }

  return {
    msg,
    type,
    show,
    notify,
  };
});
