import { defineStore } from "pinia";
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

export const useViewAplStore = defineStore("view_apl", () => {
  const APL_ID = ref(useStorage<string>("apl_id", ""));
  const USER_ID = ref(useStorage<string>("user_id", ""));

  const { prices, total_apls, total_apls_ex } = storeToRefs(useAppStore());
  const { profile } = storeToRefs(useProfileStore());
  const { has_files } = storeToRefs(useImageStore());
  const { $SB, $trimStringProperties } = useNuxtApp();
  const edit_mode = ref(false);
  const if_updated = ref(false);
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
  const p_loading = ref(false);
  const s_loading = ref(false);
  const w_loading = ref(false);
  const if_applicant_ex = ref(false);
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
    if_applicant_ex.value
      ? { ...total_apls_ex.value.find((apl) => apl.apl_id == APL_ID.value)! }
      : { ...total_apls.value.find((apl) => apl.apl_id == APL_ID.value)! },
  );

  watch(APL_ID, (val) => {
    applicant.value = if_applicant_ex.value
      ? { ...total_apls_ex.value.find((apl) => apl.apl_id == val)! }
      : { ...total_apls.value.find((apl) => apl.apl_id == val)! };
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

  watch(
    () => applicant.value.children_number,
    (newVal, oldVal) => {
      let wards_len = applicant.value.wards.length;

      if (newVal == wards_len) return;

      if (newVal > oldVal) {
        let diff = newVal - oldVal;
        for (let idx = 0; idx < diff; idx++) {
          let ward = { ...empty_ward.value };
          ward.index = idx + wards_len;

          applicant.value.wards.push(ward);
          applicant.value.aplImg_path.wardsPath.push(`ward${ward.index}`);
        }
        console.log(applicant.value.wards);
        console.log(applicant.value.aplImg_path.wardsPath);
      } else if (oldVal > newVal) {
        let diff = oldVal - newVal;
        for (let idx = 0; idx < diff; idx++) {
          applicant.value.wards.pop();
          applicant.value.aplImg_path.wardsPath.pop();
        }
        console.log(applicant.value.wards);
        console.log(applicant.value.aplImg_path.wardsPath);
      }
    },
  );

  watch(
    () => applicant.value.pmarital_status,
    (val) => {
      if (val === "MARRIED") return;
      applicant.value.slastName = "";
      applicant.value.sfirstName = "";
      applicant.value.sotherName = "";
      applicant.value.scity_ob = "";
      applicant.value.scountry_ob = "";
      applicant.value.sdob = null;
      applicant.value.sgender = "";
      applicant.value.scontact = "";
    },
  );

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
      applicant.value.wards[e.ward_idx!].wdob = e.date;
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

  function logger(e: any) {
    console.log(e);

    setTimeout(() => {
      request.value.apl_id = applicant.value.apl_id!;
      request.value.modify_type = "edit";
      request.value.modified_apl = applicant.value;
      request.value.status = "pending";
      request.value.fullName = applicant.value.fullName;
      request.value.user_id = useSupabaseUser().value?.id!;
      useRequestStore().setRequest(request.value);
      // emit("request", request.value);
    }, 10);
  }

  function handleFile(evt: any, type: string, idx?: number) {
    // console.log(evt.target.files[0], type);
    let file = evt.target.files[0];
    file.apl_type = type;
    curr_ward_file.value = file;

    console.log(file, type);

    if (type === "prime") {
      prime_file.value = file;
      prime_image.value = URL.createObjectURL(file);
    } else if (type === "sec") {
      sec_file.value = file;
      sec_image.value = URL.createObjectURL(file);
    } else if (type.includes("ward")) {
      // const updatedImages = wards_file.value.filter(
      // 	x => x.apl_type !== file.apl_type
      // )
      // updatedImages.push(file)
      // wards_file.value = updatedImages
      wards_file.value = [];
      wards_file.value.push(file);
      wards_image.value[idx!] = URL.createObjectURL(file);
      console.log(wards_file.value);
      console.log(wards_image.value);
    }
  }

  async function handlePrimeUpdate() {
    p_loading.value = true;
    let aplVal = total_apls.value.filter(
      (apl) => applicant.value.apl_id == apl.apl_id,
    )[0];
    if (!prime_file.value) return;
    if (applicant.value.aplImg_path.primePath.length == 0) {
      try {
        let path = await useImageStore().uploadAplImg2(
          applicant.value.apl_id,
          prime_file.value,
        );
        aplVal.aplImg_path.primePath.push(path);

        if (!path)
          aplVal.aplImg_path.primePath.push(
            `${applicant.value.apl_id}/prime.jpeg`,
          );
        const { error: err } = await $SB
          .from("applicants")
          .delete()
          .eq("apl_id", aplVal.apl_id);
        if (err) {
          console.log("delete err");
          throw err;
        }
        let { data, error } = await $SB
          .from("applicants")
          .insert([$trimStringProperties(aplVal)])
          .eq("apl_id", aplVal.apl_id!)
          .select();
        if (error) throw error;
        if_updated.value = true;
        prime_file.value = undefined;

        applicant.value.aplImg_path = data![0].aplImg_path;
        p_loading.value = false;
      } catch (error) {
        prime_file.value = undefined;
        console.log(error);
        p_loading.value = false;
      }
    } else {
      p_loading.value = true;
      let path = await useImageStore().updateSingleAplImg(
        applicant.value.aplImg_path.primePath[0],
        prime_file.value!,
      );
      if (path) if_updated.value = true;
      prime_file.value = undefined;
      p_loading.value = false;
    }
  }
  async function handleSecUpdate() {
    s_loading.value = true;
    let aplVal = total_apls.value.filter(
      (apl) => applicant.value.apl_id == apl.apl_id,
    )[0];
    if (!sec_file.value) return;
    if (applicant.value.aplImg_path.secPath.length == 0) {
      try {
        // sec_file.value!.apl_type = 'sec'
        let path = await useImageStore().uploadAplImg2(
          applicant.value.apl_id,
          sec_file.value,
        );
        aplVal.aplImg_path.secPath.push(path);
        console.log(aplVal);
        console.log(path);
        if (!path)
          aplVal.aplImg_path.secPath.push(`${applicant.value.apl_id}/sec.jpeg`);
        const { error: err } = await $SB
          .from("applicants")
          .delete()
          .eq("apl_id", aplVal.apl_id);
        if (err) {
          console.log("delete err");
          throw err;
        }
        let { data, error } = await $SB
          .from("applicants")
          .insert([$trimStringProperties(aplVal)])
          .eq("apl_id", aplVal.apl_id!)
          .select();
        if (error) throw error;
        if_updated.value = true;
        sec_file.value = undefined;

        applicant.value.aplImg_path = data![0].aplImg_path;
        s_loading.value = false;
      } catch (error) {
        console.log(error);
        sec_file.value = undefined;
        s_loading.value = false;
      }
    } else {
      s_loading.value = true;
      let path = await useImageStore().updateSingleAplImg(
        applicant.value.aplImg_path.secPath[0],
        sec_file.value!,
      );
      if (path) if_updated.value = true;
      sec_file.value = undefined;
      s_loading.value = false;
    }
  }
  async function handleWardUpdate(idx: number) {
    w_loading.value = true;
    let aplVal = total_apls.value.filter(
      (apl) => applicant.value.apl_id == apl.apl_id,
    )[0];

    // to see if theres a file before going ahead and sending
    if (wards_file.value.length == 0) return;

    if (
      applicant.value.aplImg_path.wardsPath[idx] == `ward${idx}` ||
      applicant.value.aplImg_path.wardsPath[idx] == undefined
    ) {
      try {
        console.log(wards_file.value);

        let path = await useImageStore().uploadAplImg2(
          applicant.value.apl_id,
          wards_file.value[0],
        );
        aplVal.aplImg_path.wardsPath[idx] = path;
        console.log(aplVal);
        console.log(path);
        if (!path)
          aplVal.aplImg_path.wardsPath[
            idx
          ] = `${applicant.value.apl_id}/ward${idx}.jpeg`;
        const { error: err } = await $SB
          .from("applicants")
          .delete()
          .eq("apl_id", aplVal.apl_id);
        if (err) {
          console.log("delete err");
          throw err;
        }
        let { data, error } = await $SB
          .from("applicants")
          .insert([$trimStringProperties(aplVal)])
          .eq("apl_id", aplVal.apl_id!)
          .select();
        if (error) throw error;
        if_updated.value = true;

        applicant.value.aplImg_path = data![0].aplImg_path;
        wards_file.value = [];
        w_loading.value = false;
      } catch (error) {
        console.log(error);
        wards_file.value = [];
        w_loading.value = false;
      } finally {
        wards_file.value = [];
        w_loading.value = false;
      }
    } else {
      w_loading.value = true;
      let path = await useImageStore().updateSingleAplImg(
        applicant.value.aplImg_path.wardsPath[idx],
        wards_file.value[0],
      );
      if (path) if_updated.value = true;
      wards_file.value = [];
      w_loading.value = false;
    }
  }

  const resetApl = async () => {
    // let aplVal = await getApplicant(APL_ID.value!)
    // applicant.value = aplVal

    applicant.value = total_apls.value.find(
      (aplz) => aplz.apl_id == applicant.value.apl_id,
    )!;
  };

  function setID(id: string) {
    APL_ID.value = id.toString();
  }

  function setUSER(id: string) {
    USER_ID.value = id.toString();
  }

  return {
    if_applicant_ex,
    empty_req,
    prime_file,
    sec_file,
    wards_file,
    curr_ward_file,
    onLoad,
    handleDate,
    applicant,
    applicant_type,
    empty_ward,
    resetAplData,
    edit_mode,
    toggleEditMode,
    validate,
    handleSend,
    handlePrimeUpdate,
    handleSecUpdate,
    handleWardUpdate,
    resetApl,
    if_sent,
    apl_sending,
    handleFile,
    request,
    requestDiscount,
    resetRequest,
    if_req_sent,
    curr_compared_request,
    loadUrl,
    prime_image,
    sec_image,
    wards_image,
    APL_ID,
    USER_ID,
    setID,
    setUSER,
    p_loading,
    s_loading,
    w_loading,
    if_updated,
  };
});
