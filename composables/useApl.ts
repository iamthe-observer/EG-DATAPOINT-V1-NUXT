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
import useVuelidate from "@vuelidate/core";
import { useStorage } from "@vueuse/core";
import { useRequestStore } from "@/store/requests";
import { useAplStore } from "@/store/apl";

export const useApl = (id?: string) => {
  const { prices, total_apls } = storeToRefs(useAppStore());
  const { profile } = storeToRefs(useProfileStore());
  const { has_files } = storeToRefs(useImageStore());
  const { $SB, $trimStringProperties } = useNuxtApp();
  const user = useSupabaseUser();
  const edit_mode = ref(false);
  const if_sent = ref<boolean>(false);
  const if_req_sent = ref<boolean>(false);
  const apl_sending = ref(false);
  const prime_image = ref();
  const sec_image = ref();
  const wards_image = ref<any[]>([]);
  const prime_file = ref<FileWithAplType>();
  const sec_file = ref<FileWithAplType>();
  const wards_file = ref<FileWithAplType[]>([]);
  const curr_ward_file = ref<FileWithAplType>();

  const request = ref<Requests>({
    apl_id: "",
    modified_apl: null,
    modify_type: "",
    body: "",
    status: "",
    user_id: "",
  });
  const empty_req = ref<Requests>({
    apl_id: "",
    modified_apl: null,
    modify_type: "",
    body: "",
    status: "",
    user_id: "",
  });
  const curr_compared_request = ref(
    useStorage<Requests>("curr_compared_request", {
      ...empty_req.value,
    }),
  );
  const applicant = ref<Applicant>(
    total_apls.value.find((apl) => apl.apl_id == id)!,
  );

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
  const applicant_type = computed(() => {
    if (
      applicant.value.pmarital_status == "MARRIED" &&
      applicant.value.children_number == 0
    ) {
      return "spouse only";
    } else if (
      applicant.value.pmarital_status == "MARRIED" &&
      applicant.value.children_number > 0
    ) {
      return "family";
    } else if (
      applicant.value.pmarital_status != "MARRIED" &&
      applicant.value.children_number > 0
    ) {
      return "wards only";
    } else if (
      applicant.value.pmarital_status != "MARRIED" &&
      applicant.value.children_number == 0
    ) {
      return "single";
    }
  });
  const single_rules = computed(() => {
    return {
      plastName: { required },
      pfirstName: { required },
      pdob: { required },
      pcity_ob: { required },
      pcountry_ob: { required },
      pgender: { required },
      pcountry_live_today: { required },
      peducation_level: { required },
      ppostal: { required },
      pmarital_status: { required },
      children_number: { required, numeric },
      pcontact: { required },
      totalPayment: { required },
      user_id: { required },
    };
  });
  const spouse_only_rules = computed(() => {
    return {
      plastName: { required },
      pfirstName: { required },
      pdob: { required },
      pcity_ob: { required },
      pcountry_ob: { required },
      pgender: { required },
      pcountry_live_today: { required },
      peducation_level: { required },
      ppostal: { required },
      pmarital_status: { required },
      children_number: { required, numeric },
      pcontact: { required },
      totalPayment: { required },
      user_id: { required },
      slastName: { required },
      sfirstName: { required },
      scity_ob: { required },
      scountry_ob: { required },
      scontact: { required },
      sgender: { required },
      sdob: { required },
    };
  });
  const wards_only_rules = computed(() => {
    return {
      plastName: { required },
      pfirstName: { required },
      pdob: { required },
      pcity_ob: { required },
      pcountry_ob: { required },
      pgender: { required },
      pcountry_live_today: { required },
      peducation_level: { required },
      ppostal: { required },
      pmarital_status: { required },
      children_number: { required, numeric },
      pcontact: { required },
      totalPayment: { required },
      user_id: { required },
      wards: { required },
    };
  });
  const family_rules = computed(() => {
    return {
      plastName: { required },
      pfirstName: { required },
      pdob: { required },
      pcity_ob: { required },
      pcountry_ob: { required },
      pgender: { required },
      pcountry_live_today: { required },
      peducation_level: { required },
      ppostal: { required },
      pmarital_status: { required },
      children_number: { required, numeric },
      pcontact: { required },
      totalPayment: { required },
      user_id: { required },
      wards: { required },
      slastName: { required },
      sfirstName: { required },
      scity_ob: { required },
      scountry_ob: { required },
      scontact: { required },
      sgender: { required },
      sdob: { required },
    };
  });
  const ward_rules = computed(() => {
    return {
      wlastName: { required },
      wfirstName: { required },
      wcity_ob: { required },
      wcountry_ob: { required },
      wgender: { required },
      wdob: { required },
    };
  });
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

  function setApl() {
    applicant.value = total_apls.value.find((apl) => apl.apl_id == id)!;
  }

  watch(
    () => applicant.value.children_number,
    (newVal) => {
      applicant.value.wards = [];
      applicant.value.aplImg_path.wardsPath = [];
      for (let idx = 0; idx < newVal; idx++) {
        let ward = { ...empty_ward.value };
        ward.index = idx;
        applicant.value.wards.push(ward);
        applicant.value.aplImg_path.wardsPath.push(`ward${idx}`);
      }
      // console.log(applicant.value.aplImg_path.wardsPath);
    },
  );

  watch(applicant, (val) => {
    console.log(val);
  });

  async function loadUrl() {
    try {
      const { data, error } = await $SB.storage
        .from("applicants")
        .createSignedUrls(
          [
            applicant.value.aplImg_path!.primePath[0],
            applicant.value.aplImg_path.secPath[0],
            ...applicant.value.aplImg_path.wardsPath,
          ],
          3600,
        );

      if (error) throw error;
      // console.log(apl.value.aplImg_path);

      // console.log(data);

      prime_image.value = data[0].signedUrl || "";
      sec_image.value = data[1].signedUrl || "";
      if (!data) return;
      wards_image.value = data.slice(2).map((img) => img.signedUrl);
      // console.log(wards_image.value);
    } catch (err: any) {
      console.log(err);
    }
  }

  function toggleEditMode(val: boolean) {
    edit_mode.value = val!;
  }

  async function validate(rules: ComputedRef, value: any) {
    const v$ = useVuelidate(rules, value);
    const val = await v$.value.$validate();
    return val;
  }

  const submitApl = async (apl: Applicant) => {
    apl_sending.value = true;
    console.log(apl.aplImg_path.wardsPath);
    try {
      if (has_files.value) {
        let { primePath, secPath, wardsPath } =
          await useImageStore().uploadFiles(apl.apl_id);
        apl.aplImg_path.primePath = primePath;
        apl.aplImg_path.secPath = secPath;
        wardsPath.forEach((path) => {
          for (let i = 0; i < apl.aplImg_path.wardsPath.length; i++) {
            const el = apl.aplImg_path.wardsPath[i];
            if (path.includes(el)) apl.aplImg_path.wardsPath[i] = path;
          }
        });
        console.log(apl.aplImg_path.wardsPath, wardsPath);
      }

      const { error } = await $SB
        .from("applicants")
        .insert([$trimStringProperties(apl)]);

      if (error) throw error;
      if_sent.value = true;
      apl_sending.value = false;
      resetAplData();
      return "done";
    } catch (err: any) {
      if_sent.value = false;
      apl_sending.value = false;
      console.log(err);
    }
  };

  function handleDate(e: { name: string; date: Date; ward_idx?: number }) {
    if (e.name == "pdob") {
      applicant.value.pdob = e.date;
      console.log(applicant.value);
    } else if (e.name == "sdob") {
      applicant.value.sdob = e.date;
      console.log(applicant.value);
    } else if (e.name == "passport_ex") {
      applicant.value.passport_ex = e.date;
      console.log(applicant.value);
    } else if (e.name == "wdob") {
      applicant.value.wards[e.ward_idx! - 1].wdob = e.date;
      console.log(applicant.value);
    }
  }

  async function handleSend() {
    let err_msg =
      "Error! Validation Failed. (Go over and check if all the fields have been filled.)";
    applicant.value.apl_id = uuidv4();
    applicant.value.fullName = `${applicant.value.plastName} ${applicant.value.pfirstName} ${applicant.value.potherName}`;
    let pricer = await useAppStore().getPrices();
    let price: number = 0;
    const if_sp = applicant.value.pmarital_status == "MARRIED";
    const if_wa = applicant.value.children_number > 0;

    if (pricer) {
      if (!if_sp && if_wa) {
        price = pricer.adult + pricer.child * applicant.value.children_number;
      } else if (if_sp && !if_wa) {
        price = pricer.adult * 2;
      } else if (if_sp && if_wa) {
        price =
          pricer.adult * 2 + pricer.child * applicant.value.children_number;
      } else if (!if_sp && !if_wa) {
        price = pricer.adult;
      }
    } else {
      throw new Error("Get Prices First");
    }

    console.log(pricer, price);

    applicant.value.totalPayment = price;

    if (applicant_type.value == "spouse only") {
      let if_spouse = await validate(spouse_only_rules, applicant.value);
      console.log(if_spouse);

      if (await validate(spouse_only_rules, applicant.value)) {
        await sendApplicant(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_sent.value = false;
        alert(err_msg);
      }
    } else if (applicant_type.value == "family") {
      // getting val for all wards
      let val: boolean[] = [];
      for (let idx = 0; idx < applicant.value.wards.length; idx++) {
        const ward = { ...applicant.value.wards[idx] };
        val.push(await validate(ward_rules, ward));
      }
      if (
        (await validate(family_rules, applicant.value)) &&
        val.every((ward) => ward == true)
      ) {
        await sendApplicant(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_sent.value = false;
        alert(err_msg);
      }
    } else if (applicant_type.value == "wards only") {
      // getting val for all wards
      let val: boolean[] = [];
      for (let idx = 0; idx < applicant.value.wards.length; idx++) {
        const ward = { ...applicant.value.wards[idx] };
        val.push(await validate(ward_rules, ward));
      }
      if (
        (await validate(wards_only_rules, applicant.value)) &&
        val.every((ward) => ward == true)
      ) {
        await sendApplicant(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_sent.value = false;
        alert(err_msg);
      }
    } else if (applicant_type.value == "single") {
      let if_spouse = await validate(single_rules, applicant.value);
      console.log(if_spouse);
      if (await validate(single_rules, applicant.value)) {
        await sendApplicant(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_sent.value = false;
        alert(err_msg);
      }
    }
  }

  async function sendApplicant(apl_info: any) {
    apl_info.location = profile.value?.location;
    console.log(apl_info);

    await submitApl(apl_info);
    console.log("done");
  }

  function handleFile(evt: any, type: string) {
    let file = evt.target.files[0];
    useImageStore().setFiles(file, type);
  }

  async function requestDiscount() {
    let err_msg =
      "Error! Validation Failed. (Go over and check if all the fields have been filled.)";

    applicant.value.apl_id = uuidv4();
    applicant.value.fullName =
      `${applicant.value.plastName} ${applicant.value.pfirstName} ${applicant.value.potherName}`.trim();
    let pricer = await useAppStore().getPrices();
    let price: number = 0;
    const if_sp = applicant.value.pmarital_status == "MARRIED";
    const if_wa = applicant.value.children_number > 0;

    if (pricer) {
      if (!if_sp && if_wa) {
        price = pricer.adult + pricer.child * applicant.value.children_number;
      } else if (if_sp && !if_wa) {
        price = pricer.adult * 2;
      } else if (if_sp && if_wa) {
        price =
          pricer.adult * 2 + pricer.child * applicant.value.children_number;
      } else if (!if_sp && !if_wa) {
        price = pricer.adult;
      }
    } else {
      throw new Error("Get Prices First");
    }

    applicant.value.totalPayment = price;

    if (applicant_type.value == "spouse only") {
      if (await validate(spouse_only_rules, applicant.value)) {
        await sendDiscountRequest(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_req_sent.value = false;
        alert(err_msg);
      }
    } else if (applicant_type.value == "family") {
      // getting val for all wards
      let val: boolean[] = [];
      for (let idx = 0; idx < applicant.value.wards.length; idx++) {
        const ward = { ...applicant.value.wards[idx] };
        val.push(await validate(ward_rules, ward));
      }
      if (
        (await validate(family_rules, applicant.value)) &&
        val.every((ward) => ward == true)
      ) {
        await sendDiscountRequest(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_req_sent.value = false;
        alert(err_msg);
      }
    } else if (applicant_type.value == "wards only") {
      // getting val for all wards
      let val: boolean[] = [];
      for (let idx = 0; idx < applicant.value.wards.length; idx++) {
        const ward = { ...applicant.value.wards[idx] };
        val.push(await validate(ward_rules, ward));
      }
      if (
        (await validate(wards_only_rules, applicant.value)) &&
        val.every((ward) => ward == true)
      ) {
        await sendDiscountRequest(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_req_sent.value = false;
        alert(err_msg);
      }
    } else if (applicant_type.value == "single") {
      let if_spouse = await validate(single_rules, applicant.value);
      console.log(if_spouse);
      if (await validate(single_rules, applicant.value)) {
        await sendDiscountRequest(applicant.value);
      } else {
        console.log(applicant_type.value);

        if_req_sent.value = false;
        alert(err_msg);
      }
    }
  }

  async function sendDiscountRequest(applicant: Applicant) {
    console.log(applicant.aplImg_path.wardsPath);
    try {
      if (has_files.value) {
        let { primePath, secPath, wardsPath } =
          await useImageStore().uploadFiles(applicant.apl_id);
        applicant.aplImg_path.primePath = primePath;
        applicant.aplImg_path.secPath = secPath;
        wardsPath.forEach((path) => {
          for (let i = 0; i < applicant.aplImg_path.wardsPath.length; i++) {
            const el = applicant.aplImg_path.wardsPath[i];
            if (path.includes(el)) applicant.aplImg_path.wardsPath[i] = path;
          }
        });
        console.log(applicant.aplImg_path.wardsPath, wardsPath);
      }

      request.value.apl_id = applicant.apl_id!;
      request.value.modified_apl = applicant;
      request.value.modify_type = "discount";
      request.value.status = "pending";
      request.value.user_id = useSupabaseUser().value?.id!;

      console.log(request.value);

      const { error } = await $SB
        .from("requests")
        .insert([$trimStringProperties(request.value)]);

      if (error) throw error;
      if_req_sent.value = true;
      apl_sending.value = false;
      resetAplData();
      resetRequest();
      return "done";
    } catch (err: any) {
      if_req_sent.value = false;
      apl_sending.value = false;
      console.log(err);
    }
  }

  function resetAplData() {
    applicant.value = {
      // created_at: new Date(),
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
      user_id: user.value?.id!,
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
    };
    request.value = empty_req.value;
  }

  function resetRequest() {
    request.value = empty_req.value;
  }

  async function onLoad() {
    await loadUrl();

    request.value.apl_id = applicant.value.apl_id!;
    request.value.modify_type = "edit";
    request.value.modified_apl = applicant.value;
    request.value.status = "pending";
    request.value.fullName = applicant.value.fullName;
    request.value.user_id = useSupabaseUser().value?.id!;
    useRequestStore().setRequest(request.value);

    useAplStore().toggleEditMode(false);
  }

  return {
    onLoad,
    handleDate,
    setApl,
    applicant,
    applicant_type,
    empty_ward,
    resetAplData,
    edit_mode,
    toggleEditMode,
    validate,
    handleSend,
    if_sent,
    apl_sending,
    handleFile,
    request,
    requestDiscount,
    resetRequest,
    if_req_sent,
    curr_compared_request,
    loadUrl,
  };
};
