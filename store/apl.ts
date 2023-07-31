// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { defineStore, storeToRefs } from 'pinia'
import { required, email, numeric } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import {
  Applicant,
  FileWithAplType,
  WardsApplicant,
} from '@/interfaces/interfaces'
import { useImageStore } from './images'
import { useAppStore } from './app'

export const useAplStore = defineStore('apl', () => {
  const { prices } = storeToRefs(useAppStore())
  const { has_files } = storeToRefs(useImageStore())
  const { $SB } = useNuxtApp()
  const user = useSupabaseUser()
  const edit_mode = ref(false)
  const if_sent = ref<boolean>(false)
  const apl_sending = ref(false)

  const applicant = ref<Applicant>({
    created_at: new Date(),
    plastName: '',
    pfirstName: '',
    potherName: '',
    pdob: null,
    pcity_ob: '',
    pcountry_ob: '',
    pgender: '',
    pconf_code: '',
    pemail: '',
    ppassport_number: '',
    passport_ex: null,
    pcountry_live_today: '',
    peducation_level: '',
    ppostal: '',
    pmarital_status: 'UNMARRIED',
    children_number: 0,
    fullName: '',
    user_id: user.value?.id!,
    pcontact: '',
    wards: [],
    totalPayment: 0,
    pother_contact: '',
    psocial_media: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
    aplImg_path: {
      primePath: [],
      secPath: [],
      wardsPath: [],
    },
    slastName: '',
    sfirstName: '',
    sotherName: '',
    scity_ob: '',
    scountry_ob: '',
    scontact: '',
    sgender: '',
    sdob: null,
  })
  const empty_ward = ref<WardsApplicant>({
    wlastName: '',
    wfirstName: '',
    wotherName: '',
    wcity_ob: '',
    wcountry_ob: '',
    wgender: '',
    wdob: null,
    index: null,
  })

  const applicant_type = computed(() => {
    if (
      applicant.value.pmarital_status == 'MARRIED' &&
      applicant.value.children_number == 0
    ) {
      return 'spouse only'
    } else if (
      applicant.value.pmarital_status == 'MARRIED' &&
      applicant.value.children_number > 0
    ) {
      return 'family'
    } else if (
      applicant.value.pmarital_status != 'MARRIED' &&
      applicant.value.children_number > 0
    ) {
      return 'wards only'
    } else if (
      applicant.value.pmarital_status != 'MARRIED' &&
      applicant.value.children_number == 0
    ) {
      return 'single'
    }
  })
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
    }
  })
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
    }
  })
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
    }
  })
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
    }
  })
  const ward_rules = computed(() => {
    return {
      wlastName: { required },
      wfirstName: { required },
      wcity_ob: { required },
      wcountry_ob: { required },
      wgender: { required },
      wdob: { required },
    }
  })
  const price = computed(() => {
    const pp = prices.value
    const if_sp = applicant.value.pmarital_status == 'MARRIED'
    const if_wa = applicant.value.children_number! > 0

    if (pp) {
      if (!if_sp && if_wa) {
        return pp.adult + pp.child * applicant.value.children_number!
      } else if (if_sp && !if_wa) {
        return pp.adult * 2
      } else if (if_sp && if_wa) {
        return pp.adult * 2 + pp.child * applicant.value.children_number!
      } else if (!if_sp && !if_wa) {
        return pp.adult
      }
    } else {
      return 0
    }
  })

  watch(
    () => applicant.value.children_number,
    newVal => {
      applicant.value.wards = []
      for (let idx = 0; idx < newVal; idx++) {
        let ward = { ...empty_ward.value }
        ward.index = idx
        applicant.value.wards.push(ward)
      }
    }
  )

  watchEffect(() => {
    if (
      applicant.value.aplImg_path.wardsPath.length! >
        applicant.value.children_number! &&
      applicant.value.wards?.length != 0
    ) {
      let diff =
        applicant.value.wards?.length! - applicant.value.children_number!
      for (let ii = 0; ii < diff; ii++) {
        applicant.value.aplImg_path.wardsPath.pop()
      }
      console.log(applicant.value.aplImg_path.wardsPath)
      console.log('done')
    }
  })

  function toggleEditMode(val: boolean) {
    edit_mode.value = val!
  }

  async function validate(rules: ComputedRef, value: any) {
    const v$ = useVuelidate(rules, value)
    const val = await v$.value.$validate()
    return val
  }

  const handleWardPath = (ward: WardsApplicant) => {
    if (
      applicant.value.wards?.length! > 0 &&
      applicant.value.wards!.some(warder => warder.index == ward.index)
    ) {
      const filtered_path = applicant.value.aplImg_path.wardsPath.filter(
        path => !path.includes(`ward${ward.index}`)
      )!

      filtered_path.push(`ward${ward.index}`)

      filtered_path.sort(
        (a, b) =>
          useNuxtApp().$extractNumFromPhrase(a)! -
          useNuxtApp().$extractNumFromPhrase(b)!
      )

      applicant.value.aplImg_path.wardsPath = filtered_path
      // console.log(applicant.value.aplImg_path.wardsPath);
    } else {
      applicant.value.aplImg_path.wardsPath.push(`ward${ward.index}`)

      applicant.value.aplImg_path.wardsPath.sort(
        (a, b) =>
          useNuxtApp().$extractNumFromPhrase(a)! -
          useNuxtApp().$extractNumFromPhrase(b)!
      )

      // console.log(apl_data.prime!.aplImg_path.wardsPath);
    }
  }

  const submitApl = async (apl: Applicant) => {
    console.log(apl.aplImg_path.wardsPath)
    try {
      if (has_files.value) {
        let { primePath, secPath, wardsPath } =
          await useImageStore().uploadFiles(apl.apl_id)
        apl.aplImg_path.primePath = primePath
        apl.aplImg_path.secPath = secPath
        wardsPath.forEach(path => {
          for (let i = 0; i < apl.aplImg_path.wardsPath.length; i++) {
            const el = apl.aplImg_path.wardsPath[i]
            if (path.includes(el)) apl.aplImg_path.wardsPath[i] = path
          }
        })
        console.log(apl.aplImg_path.wardsPath, wardsPath)
      }

      const { error } = await $SB.from('applicants').insert([apl])

      if (error) throw error
      if_sent.value = true
      apl_sending.value = false
      resetAplData()
      return 'done'
    } catch (err: any) {
      if_sent.value = false
      apl_sending.value = false
      console.log(err)
    }
  }

  async function handleSend() {
    let err_msg =
      'Error! Validation Failed. (Go over and check if all the fields have been filled.)'
    applicant.value.apl_id = uuidv4()
    applicant.value.fullName = `${applicant.value.plastName} ${applicant.value.pfirstName} ${applicant.value.potherName}`
    let pricer = await useAppStore().getPrices()
    let price: number = 0
    const if_sp = applicant.value.pmarital_status == 'MARRIED'
    const if_wa = applicant.value.children_number > 0

    if (pricer) {
      if (!if_sp && if_wa) {
        price = pricer.adult + pricer.child * applicant.value.children_number
      } else if (if_sp && !if_wa) {
        price = pricer.adult * 2
      } else if (if_sp && if_wa) {
        price =
          pricer.adult * 2 + pricer.child * applicant.value.children_number
      } else if (!if_sp && !if_wa) {
        price = pricer.adult
      }
    } else {
      throw new Error('Get Prices First')
    }

    console.log(pricer, price)

    applicant.value.totalPayment = price

    if (applicant_type.value == 'spouse only') {
      let if_spouse = await validate(spouse_only_rules, applicant.value)
      console.log(if_spouse)

      if (await validate(spouse_only_rules, applicant.value)) {
        await sendApplicant(applicant.value)
      } else {
        console.log(applicant_type.value)

        if_sent.value = false
        alert(err_msg)
      }
    } else if (applicant_type.value == 'family') {
      // getting val for all wards
      let val: boolean[] = []
      for (let idx = 0; idx < applicant.value.wards.length; idx++) {
        const ward = { ...applicant.value.wards[idx] }
        val.push(await validate(ward_rules, ward))
      }
      if (
        (await validate(family_rules, applicant.value)) &&
        val.every(ward => ward == true)
      ) {
        await sendApplicant(applicant.value)
      } else {
        console.log(applicant_type.value)

        if_sent.value = false
        alert(err_msg)
      }
    } else if (applicant_type.value == 'wards only') {
      // getting val for all wards
      let val: boolean[] = []
      for (let idx = 0; idx < applicant.value.wards.length; idx++) {
        const ward = { ...applicant.value.wards[idx] }
        val.push(await validate(ward_rules, ward))
      }
      if (
        (await validate(wards_only_rules, applicant.value)) &&
        val.every(ward => ward == true)
      ) {
        await sendApplicant(applicant.value)
      } else {
        console.log(applicant_type.value)

        if_sent.value = false
        alert(err_msg)
      }
    } else if (applicant_type.value == 'single') {
      let if_spouse = await validate(single_rules, applicant.value)
      console.log(if_spouse)
      if (await validate(single_rules, applicant.value)) {
        await sendApplicant(applicant.value)
      } else {
        console.log(applicant_type.value)

        if_sent.value = false
        alert(err_msg)
      }
    }
  }

  async function sendApplicant(apl_info: any) {
    await submitApl(apl_info)
    console.log('done')
  }

  function handleFile(evt: any, type: string) {
    let file = evt.target.files[0]
    useImageStore().setFiles(file, type)
  }

  function resetAplData() {
    applicant.value = {
      created_at: new Date(),
      plastName: '',
      pfirstName: '',
      potherName: '',
      pdob: null,
      pcity_ob: '',
      pcountry_ob: '',
      pgender: '',
      pconf_code: '',
      pemail: '',
      ppassport_number: '',
      passport_ex: null,
      pcountry_live_today: '',
      peducation_level: '',
      ppostal: '',
      pmarital_status: 'UNMARRIED',
      children_number: 0,
      fullName: '',
      user_id: user.value?.id!,
      pcontact: '',
      wards: [],
      totalPayment: 0,
      pother_contact: '',
      psocial_media: {
        facebook: '',
        instagram: '',
        twitter: '',
      },
      aplImg_path: {
        primePath: [],
        secPath: [],
        wardsPath: [],
      },
      slastName: '',
      sfirstName: '',
      sotherName: '',
      scity_ob: '',
      scountry_ob: '',
      scontact: '',
      sgender: '',
      sdob: null,
    }
  }

  return {
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
    handleWardPath,
  }
})
