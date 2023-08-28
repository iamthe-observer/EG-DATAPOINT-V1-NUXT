import { Announcement } from "./../interfaces/interfaces";
import { defineStore } from "pinia";

export const useAnnStore = defineStore("announcements", () => {
  const announcements = ref<Announcement[]>([]);
  const announcement = ref<Announcement>({
    urgency: false,
    body: "",
    title: "",
    seen: [],
  });
  const announcement_def = ref<Announcement>({
    urgency: false,
    body: "",
    title: "",
    seen: [],
  });
  const { $SB } = useNuxtApp();

  async function getAnnounce() {
    try {
      let { data, error } = await useNuxtApp()
        .$SB.from("announcements")
        .select("*");
      if (error) throw error;
      announcements.value = data!;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function Announce() {
    console.log(announcement.value);
    try {
      let { data, error } = await $SB
        .from("announcements")
        .insert(announcement.value)
        .select();
      if (error) throw error;
      console.log(data);
      console.log("done");
      announcement.value = announcement_def.value;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function reset() {
    announcements.value = [];
    announcement.value = announcement_def.value;
  }

  $SB
    .channel("prices-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "announcements" },
      async (payload) => {
        await getAnnounce();
      },
    )
    .subscribe();

  return {
    getAnnounce,
    announcements,
    Announce,
    announcement,
    reset,
  };
});
