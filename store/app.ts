import { Applicant } from "@/interfaces/interfaces";
import { Prices } from "@/supabase/supabase";
import { defineStore, storeToRefs } from "pinia";
import { useAplStore } from "./apl";

export const useAppStore = defineStore("app", () => {
  const { $SB } = useNuxtApp();
  const { applicant } = storeToRefs(useAplStore());
  const dark_mode = ref(useLocalStorage("dark_mode", false));
  const is_mobile = ref(false);
  const restricted_user = ref(false);
  const daily_urls = ref<
    | {
        error: string | null;
        path: string | null;
        signedUrl: string;
      }[]
    | null
    | undefined
  >();
  // watchEffect(() => console.log(dark_mode.value))

  watch(dark_mode, () => {
    if (dark_mode.value) return document.documentElement.classList.add("dark");
    if (!dark_mode.value)
      return document.documentElement.classList.remove("dark");
  });

  function setDarkMode(params: boolean) {
    dark_mode.value = params;
  }

  const all_my_apls = ref<Applicant[]>([]);
  const total_apls = ref<Applicant[]>([]);
  const prices = ref<Prices>({
    adult: 0,
    child: 0,
    id: 0,
  });
  const app_loading = ref(true);
  const locations = ref([
    "circle",
    "madina",
    "accra",
    "ashaiman",
    "lapaz",
    "kaneshie",
    "ablekuma",
    "spintex",
  ]);

  const price = computed(() => {
    const pp = prices.value;
    const if_sp = applicant.value.pmarital_status == "MARRIED";
    const if_wa = applicant.value.children_number! > 0;

    if (pp) {
      if (!if_sp && if_wa) {
        return pp.adult + pp.child * applicant.value.children_number!;
      } else if (if_sp && !if_wa) {
        return pp.adult * 2;
      } else if (if_sp && if_wa) {
        return pp.adult * 2 + pp.child * applicant.value.children_number!;
      } else if (!if_sp && !if_wa) {
        return pp.adult;
      }
    } else {
      return 0;
    }
  });

  const getPayments_admin = async () => {
    try {
      const { data, error } = await useNuxtApp()
        .$SB.from("applicants")
        .select("totalPayment");
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPayments = async () => {
    try {
      const { data, error } = await useNuxtApp()
        .$SB.from("applicants")
        .select("totalPayment")
        .eq("user_id", useSupabaseUser().value?.id!);
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  async function getApplicant(id: string) {
    try {
      let { data, error } = await $SB
        .from("applicants")
        .select("*")
        .eq("apl_id", id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllMyApls() {
    try {
      let { data, error } = await $SB
        .from("applicants")
        .select("*")
        .eq("user_id", useSupabaseUser().value?.id);

      if (error) throw error;
      all_my_apls.value = data!;
      // console.log(data)
      return data;
    } catch (err: any) {
      console.log(err);
    }
  }

  async function getTotalApls() {
    try {
      let { data, error } = await $SB.from("applicants").select("*");

      if (error) throw error;
      total_apls.value = data!;

      all_my_apls.value = data!.filter(
        (apl) => apl.user_id == useSupabaseUser().value?.id,
      );
      return data;
    } catch (err: any) {
      console.log(err);
    }
  }

  async function getPrices() {
    try {
      let { data: user, error: err } = await $SB
        .from("profiles")
        .select("location")
        .eq("id", useSupabaseUser().value?.id);
      if (err) throw err;

      let { data, error } = await $SB.from("prices").select("*");
      if (error) throw error;

      if (user![0].location == "madina" || user![0].location == "ablekuma") {
        prices.value = data![1];
        // console.log(prices.value);
      } else if (user![0].location == "spintex") {
        prices.value = data![2];
        // console.log(prices.value);
      } else {
        prices.value = data![0];
      }

      return data![0];
    } catch (err: any) {
      console.log(err);
    }
  }

  const total_daily_applicants = computed(() => {
    return all_my_apls.value?.filter(
      (apl) =>
        useNuxtApp().$formatDate(new Date(apl.created_at!)) ==
        useNuxtApp().$formatDate(new Date()),
    );
  });

  const total_daily_applicants_admin = computed(() => {
    return total_apls.value?.filter(
      (apl) =>
        useNuxtApp().$formatDate(new Date(apl.created_at!)) ==
        useNuxtApp().$formatDate(new Date()),
    );
  });

  const today_sales = computed(() => {
    if (total_daily_applicants.value.length > 0) {
      let sum = 0;
      for (let i = 0; i < total_daily_applicants.value!.length; i++) {
        const payment = total_daily_applicants.value![i].totalPayment;
        if (!isNaN(payment)) {
          sum += payment;
        }
      }
      return sum;
    } else {
      return 0;
    }
  });

  const today_sales_admin = computed(() => {
    if (total_daily_applicants_admin.value.length > 0) {
      let sum = 0;
      for (let i = 0; i < total_daily_applicants_admin.value!.length; i++) {
        const payment = total_daily_applicants_admin.value![i].totalPayment;
        if (!isNaN(payment)) {
          sum += payment;
        }
      }
      return sum;
    } else {
      return 0;
    }
  });
  const yesterday_sales = computed(() => {
    let yesterday_apls = all_my_apls.value.filter(
      (apl) =>
        useNuxtApp().$formatDate(new Date(apl.created_at!)) ===
        useNuxtApp().$formatDate(new Date(Date.now() - 86400000)),
    );

    if (yesterday_apls.length > 0) {
      let sum = 0;
      for (let i = 0; i < yesterday_apls.length; i++) {
        const payment = yesterday_apls[i].totalPayment;
        if (!isNaN(payment)) {
          sum += payment;
        }
      }
      return sum;
    } else {
      return 0;
    }
  });
  const yesterday_sales_admin = computed(() => {
    let yesterday_apls = total_apls.value.filter(
      (apl) =>
        useNuxtApp().$formatDate(new Date(apl.created_at!)) ===
        useNuxtApp().$formatDate(new Date(Date.now() - 86400000)),
    );

    if (yesterday_apls.length > 0) {
      let sum = 0;
      for (let i = 0; i < yesterday_apls.length; i++) {
        const payment = yesterday_apls[i].totalPayment;
        if (!isNaN(payment)) {
          sum += payment;
        }
      }
      return sum;
    } else {
      return 0;
    }
  });

  const perc_compared_to_yesterday = computed(() => {
    const percentageChange =
      ((today_sales.value - yesterday_sales.value) / yesterday_sales.value) *
      100;

    if (!isFinite(percentageChange)) {
      return "No change in sales compared to yesterday.";
    } else if (percentageChange > 0) {
      return `There was a ${percentageChange.toFixed(
        2,
      )}% increase in sales compared to yesterday.`;
    } else if (percentageChange < 0) {
      return `There was a ${Math.abs(percentageChange).toFixed(
        2,
      )}% decrease in sales compared to yesterday.`;
    } else {
      return "No change in sales compared to yesterday.";
    }
  });

  const perc_compared_to_yesterday_admin = computed(() => {
    const percentageChange =
      ((today_sales_admin.value - yesterday_sales_admin.value) /
        yesterday_sales_admin.value) *
      100;

    if (!isFinite(percentageChange)) {
      return "No change in sales compared to yesterday.";
    } else if (percentageChange > 0) {
      return `There was a ${percentageChange.toFixed(
        2,
      )}% increase in sales compared to yesterday.`;
    } else if (percentageChange < 0) {
      return `There was a ${Math.abs(percentageChange).toFixed(
        2,
      )}% decrease in sales compared to yesterday.`;
    } else {
      return "No change in sales compared to yesterday.";
    }
  });

  function reset() {
    all_my_apls.value = [];
    total_apls.value = [];
    prices.value = {
      adult: 0,
      child: 0,
      id: 0,
    };
  }

  // real-time channels
  $SB
    .channel("applicants-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "applicants" },
      async (payload) => {
        await getTotalApls();
      },
    )
    .subscribe();

  $SB
    .channel("prices-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "prices" },
      async (payload) => {
        await getPrices();
      },
    )
    .subscribe();

  return {
    restricted_user,
    locations,
    dark_mode,
    setDarkMode,
    all_my_apls,
    total_apls,
    total_daily_applicants,
    total_daily_applicants_admin,
    app_loading,
    prices,
    price,
    getAllMyApls,
    getTotalApls,
    getPrices,
    getApplicant,
    reset,
    getPayments,
    getPayments_admin,
    today_sales,
    today_sales_admin,
    perc_compared_to_yesterday,
    perc_compared_to_yesterday_admin,
    daily_urls,
    is_mobile,
  };
});
