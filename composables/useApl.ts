// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import {
  Applicant,
  FileWithAplType,
  Requests,
  WardsApplicant,
} from "@/interfaces/interfaces";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";
import { useProfileStore } from "@/store/profile";
import { useImageStore } from "@/store/images";
import { required, numeric } from "@vuelidate/validators";
import useVuelidate, { Validation } from "@vuelidate/core";
import { useStorage } from "@vueuse/core";
import { useRequestStore } from "@/store/requests";
import { useAplStore } from "@/store/apl";

// create a useApl composable that will help us manage the apl
export const useApl = (if_new: boolean = false) => {
  const { $SB } = useNuxtApp();
  const loading = ref(false);
  const { files } = storeToRefs(useImageStore());
  const applicant = ref<Applicant>({
    plastName: "",
    pfirstName: "",
    potherName: "",
    pdob: null,
    pcity_ob: "",
    pcountry_ob: "",
    pgender: "",
    pconf_code: "",
    pemail: "",
    ppassport_number: "",
    passport_ex: null,
    pcountry_live_today: "",
    peducation_level: "",
    ppostal: "",
    pmarital_status: "UNMARRIED",
    children_number: 0,
    fullName: "",
    user_id: useSupabaseUser().value?.id!,
    pcontact: "",
    wards: [],
    totalPayment: 0,
    pother_contact: "",
    psocial_media: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    aplImg_path: {
      primePath: [],
      secPath: [],
      wardsPath: [],
    },
    slastName: "",
    sfirstName: "",
    sotherName: "",
    scity_ob: "",
    scountry_ob: "",
    scontact: "",
    sgender: "",
    sdob: null,
    location: "",
  });
  const empty_ward = ref<WardsApplicant>({
    wlastName: "",
    wfirstName: "",
    wotherName: "",
    wcity_ob: "",
    wcountry_ob: "",
    wgender: "",
    wdob: null,
    index: null,
  });

  watch(
    () => applicant.value.children_number,
    (newVal) => {
      if (!if_new) return;
      applicant.value.wards = [];
      applicant.value.aplImg_path.wardsPath = [];
      for (let idx = 0; idx < newVal; idx++) {
        let ward = { ...empty_ward.value };
        ward.index = idx;
        applicant.value.wards.push(ward);
        applicant.value.aplImg_path.wardsPath.push(`ward${idx}`);
      }
      console.log(applicant.value.aplImg_path.wardsPath);
    },
  );

  const single_rules = computed(() => {
    return {
      plastName: { required, $autoDirty: true },
      pfirstName: { required, $autoDirty: true },
      pdob: { required, $autoDirty: true },
      pcity_ob: { required, $autoDirty: true },
      pcountry_ob: { required, $autoDirty: true },
      pgender: { required, $autoDirty: true },
      pcountry_live_today: { required, $autoDirty: true },
      peducation_level: { required, $autoDirty: true },
      ppostal: { required, $autoDirty: true },
      pmarital_status: { required, $autoDirty: true },
      children_number: { required, $autoDirty: true, numeric },
      pcontact: { required, $autoDirty: true },
      totalPayment: { required, $autoDirty: true },
      user_id: { required, $autoDirty: true },
    };
  });
  const spouse_only_rules = computed(() => {
    return {
      plastName: { required, $autoDirty: true },
      pfirstName: { required, $autoDirty: true },
      pdob: { required, $autoDirty: true },
      pcity_ob: { required, $autoDirty: true },
      pcountry_ob: { required, $autoDirty: true },
      pgender: { required, $autoDirty: true },
      pcountry_live_today: { required, $autoDirty: true },
      peducation_level: { required, $autoDirty: true },
      ppostal: { required, $autoDirty: true },
      pmarital_status: { required, $autoDirty: true },
      children_number: { required, $autoDirty: true, numeric },
      pcontact: { required, $autoDirty: true },
      totalPayment: { required, $autoDirty: true },
      user_id: { required, $autoDirty: true },
      slastName: { required, $autoDirty: true },
      sfirstName: { required, $autoDirty: true },
      scity_ob: { required, $autoDirty: true },
      scountry_ob: { required, $autoDirty: true },
      scontact: { required, $autoDirty: true },
      sgender: { required, $autoDirty: true },
      sdob: { required, $autoDirty: true },
    };
  });
  const wards_only_rules = computed(() => {
    return {
      plastName: { required, $autoDirty: true },
      pfirstName: { required, $autoDirty: true },
      pdob: { required, $autoDirty: true },
      pcity_ob: { required, $autoDirty: true },
      pcountry_ob: { required, $autoDirty: true },
      pgender: { required, $autoDirty: true },
      pcountry_live_today: { required, $autoDirty: true },
      peducation_level: { required, $autoDirty: true },
      ppostal: { required, $autoDirty: true },
      pmarital_status: { required, $autoDirty: true },
      children_number: { required, $autoDirty: true, numeric },
      pcontact: { required, $autoDirty: true },
      totalPayment: { required, $autoDirty: true },
      user_id: { required, $autoDirty: true },
      wards: { required, $autoDirty: true },
    };
  });
  const family_rules = computed(() => {
    return {
      plastName: { required, $autoDirty: true },
      pfirstName: { required, $autoDirty: true },
      pdob: { required, $autoDirty: true },
      pcity_ob: { required, $autoDirty: true },
      pcountry_ob: { required, $autoDirty: true },
      pgender: { required, $autoDirty: true },
      pcountry_live_today: { required, $autoDirty: true },
      peducation_level: { required, $autoDirty: true },
      ppostal: { required, $autoDirty: true },
      pmarital_status: { required, $autoDirty: true },
      children_number: { required, $autoDirty: true, numeric },
      pcontact: { required, $autoDirty: true },
      totalPayment: { required, $autoDirty: true },
      user_id: { required, $autoDirty: true },
      wards: { required, $autoDirty: true },
      slastName: { required, $autoDirty: true },
      sfirstName: { required, $autoDirty: true },
      scity_ob: { required, $autoDirty: true },
      scountry_ob: { required, $autoDirty: true },
      scontact: { required, $autoDirty: true },
      sgender: { required, $autoDirty: true },
      sdob: { required, $autoDirty: true },
    };
  });
  const ward_rules = computed(() => {
    return {
      wlastName: { required, $autoDirty: true },
      wfirstName: { required, $autoDirty: true },
      wcity_ob: { required, $autoDirty: true },
      wcountry_ob: { required, $autoDirty: true },
      wgender: { required, $autoDirty: true },
      wdob: { required, $autoDirty: true },
    };
  });

  const aplType = (
    apl: Applicant = applicant.value!,
  ):
    | "Family"
    | "With Kids Only"
    | "With Spouse Only"
    | "Single"
    | undefined => {
    if (apl.pmarital_status == "MARRIED" && apl.children_number > 0) {
      return "Family";
    } else if (apl.pmarital_status == "MARRIED" && apl.children_number == 0) {
      return "With Spouse Only";
    } else if (apl.pmarital_status != "MARRIED" && apl.children_number > 0) {
      return "With Kids Only";
    } else if (apl.pmarital_status != "MARRIED" && apl.children_number == 0) {
      return "Single";
    }
  };

  const validateApl = async (
    apl: Applicant = applicant.value!,
  ): Promise<{ validation: Validation; if_val: boolean; apl: Applicant }> => {
    let type, rules;
    type = aplType(apl ? apl : applicant.value!);

    if (type == "Family") {
      rules = family_rules.value;
    } else if (type == "With Kids Only") {
      rules = wards_only_rules.value;
    } else if (type == "With Spouse Only") {
      rules = spouse_only_rules.value;
    } else {
      rules = single_rules.value;
    }

    const v$ = useVuelidate(rules, apl ? apl : applicant.value!);
    const val = await v$.value.$validate();
    return {
      validation: v$.value,
      if_val: val,
      apl: apl ? apl : applicant.value!,
    };
  };

  const uploadApplicant = async (
    table: string = "applicants",
    apl: Applicant = applicant.value!,
  ) => {
    loading.value = true;
    try {
      const { if_val, validation } = await validateApl(
        apl ? apl : applicant.value!,
      );
      console.log(validation);
      if (!if_val) {
        throw new Error("Validation error");
      }

      const { data, error } = await $SB
        .from(table)
        .insert([apl])
        .select()
        .returns<Applicant[]>();
      if (error) {
        throw error;
      }
      loading.value = false;
      return data;
    } catch (error) {
      loading.value = false;
      console.log(error);
      return false;
    }
  };

  const getApplicant = async (
    table: string = "applicants",
    apl_id: string = applicant.value?.apl_id!,
  ) => {
    loading.value = true;
    try {
      const { data, error } = await $SB
        .from(table)
        .select("*")
        .eq("apl_id", apl_id)
        .returns<Applicant[]>();
      if (error) {
        throw error;
      }
      applicant.value = data[0];
      loading.value = false;
      return data;
    } catch (error) {
      loading.value = false;
      console.log(error);
      return false;
    }
  };

  const updateApplicant = async (
    table: string = "applicants",
    apl_data: Partial<Applicant>,
  ) => {
    loading.value = true;
    try {
      const { data, error } = await $SB
        .from(table)
        .update(apl_data)
        .eq("apl_id", apl_data.apl_id)
        .select()
        .returns<Applicant[]>();
      if (error) {
        throw error;
      }
      loading.value = false;
      return data;
    } catch (error) {
      loading.value = false;
      console.log(error);
      return false;
    }
  };

  const deleteApplicant = async (
    table: string = "applicants",
    apl_id: string = applicant.value?.apl_id!,
  ) => {
    loading.value = true;
    try {
      const { data, error } = await $SB
        .from(table)
        .delete()
        .eq("apl_id", apl_id)
        .select()
        .returns<Applicant[]>();
      if (error) {
        throw error;
      }
      loading.value = false;
      return data;
    } catch (error) {
      loading.value = false;
      console.log(error);
      return false;
    }
  };

  const insertApplicant = async (
    table: string = "applicants",
    apl_data: Partial<Applicant>,
  ) => {
    loading.value = true;
    try {
      const { data, error } = await $SB
        .from(table)
        .insert([apl_data])
        .select()
        .returns<Applicant[]>();
      if (error) {
        throw error;
      }
      loading.value = false;
      return data;
    } catch (error) {
      loading.value = false;
      console.log(error);
      return false;
    }
  };

  const updateImage = async () => {
    const image = useImageStore();
    loading.value = true;
    try {
      if (files.value[0].apl_type == "prime") {
        image.updateSingleAplImg(
          applicant.value!.aplImg_path.primePath[0],
          files.value[0],
        );
      } else if (files.value[0].apl_type == "sec") {
        image.updateSingleAplImg(
          applicant.value!.aplImg_path.secPath[0],
          files.value[0],
        );
      } else if (files.value[0].apl_type.includes("ward")) {
        const index = parseInt(files.value[0].apl_type.split("ward")[1]);
        image.updateSingleAplImg(
          applicant.value!.aplImg_path.wardsPath[index],
          files.value[0],
        );
      }
    } catch (error) {
      loading.value = false;
      console.log(error);
      return false;
    }
  };

  return {
    loading,
    aplType,
    validateApl,
    applicant,
    deleteApplicant,
    updateApplicant,
    getApplicant,
    insertApplicant,
    uploadApplicant,
    updateImage,
    family_rules,
    single_rules,
    wards_only_rules,
    ward_rules,
    spouse_only_rules,
  };
};
