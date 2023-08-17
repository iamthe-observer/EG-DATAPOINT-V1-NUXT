import { Profile } from "@/interfaces/interfaces";
import { defineStore } from "pinia";

export const useProfileStore = defineStore(
  "profile",
  () => {
    const profile = ref<Profile>();
    const profiles = ref<Profile[]>([]);
    const { $SB } = useNuxtApp();
    const loading = ref(false);

    function setProfile(prof: Profile) {
      profile.value = prof;
    }

    async function getProfile() {
      loading.value = true;
      const session = await $SB.auth.getSession();
      try {
        let { data, error } = await useNuxtApp()
          .$SB.from("profiles")
          .select("*")
          .eq("id", session.data.session?.user.id!);
        if (error) throw error;
        profile.value = data![0];
        loading.value = false;
        return data!;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    }

    async function getProfiles() {
      try {
        let { data, error } = await $SB.from("profiles").select("*");
        if (error) throw error;
        // console.log(data)
        profiles.value = data!;
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    function reset() {
      profile.value = undefined;
    }

    const role = computed(() => {
      if (profile.value) return profile.value.role;
      return false;
    });

    return {
      getProfile,
      getProfiles,
      profile,
      profiles,
      setProfile,
      reset,
      loading,
      role,
    };
  },
  {
    persist: true,
  },
);
