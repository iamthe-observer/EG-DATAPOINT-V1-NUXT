// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import {
  Applicant,
  FileWithAplType,
  WardsApplicant,
} from '@/interfaces/interfaces'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { required, numeric } from '@vuelidate/validators'
import { useImageStore } from '@/store/images'
import useVuelidate from '@vuelidate/core'

export const useApl = () => {
  // state
  const edit_mode = ref(false)
  const apl_sending = ref(false)
  const if_sent = ref(false)
  const if_updated = ref(false)
  const { $SB } = useNuxtApp()
  const { total_apls } = storeToRefs(useAppStore())
  const { has_files } = storeToRefs(useImageStore())
  const prime_image = ref()
  const sec_image = ref()
  const wards_image = ref<any[]>([])
  const prime_file = ref<FileWithAplType>()
  const sec_file = ref<FileWithAplType>()
  const wards_file = ref<FileWithAplType[]>([])
  const curr_ward_file = ref<FileWithAplType>()

  // const applicant = ref<Applicant>()
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
    user_id: useSupabaseUser().value?.id!,
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

  // getters
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

  // methods
  async function getApplicant(id: string) {
    try {
      let { data, error } = await $SB
        .from('applicants')
        .select('*')
        .eq('apl_id', id)
      if (error) throw error
      applicant.value = data![0]
      return data
    } catch (error) {
      console.log(error)
    }
  }
  function setApplicant(apl: Applicant) {
    applicant.value = apl
  }
  function toggleEditMode(val: boolean) {
    edit_mode.value = val
  }
  async function validate(rules: ComputedRef, value: any) {
    const v$ = useVuelidate(rules, value)
    const val = await v$.value.$validate()
    return val
  }
  const submitApl = async (apl: Applicant) => {
    if_sent.value = false
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

    // applicant.value.totalPayment = price.value!

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
      user_id: useSupabaseUser().value!.id,
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
  async function loadUrl() {
    try {
      const { data, error } = await $SB.storage
        .from('applicants')
        .createSignedUrls(
          [
            applicant.value.aplImg_path.primePath[0],
            applicant.value.aplImg_path.secPath[0],
            ...applicant.value.aplImg_path.wardsPath,
          ],
          3600
        )

      if (error) throw error

      console.log(data)

      prime_image.value = data[0].signedUrl || ''
      sec_image.value = data[1].signedUrl || ''
      wards_image.value = data.slice(2).map(img => img.signedUrl)
      // wards_data.value = data.slice(2)
    } catch (err: any) {
      console.log(err)
    }
  }
  function handleDate(e: { name: string; date: Date; ward_idx?: number }) {
    if (e.name == 'pdob') {
      applicant.value.pdob = e.date
      console.log(applicant.value)
    } else if (e.name == 'sdob') {
      applicant.value.sdob = e.date
      console.log(applicant.value)
    } else if (e.name == 'passport_ex') {
      applicant.value.passport_ex = e.date
      console.log(applicant.value)
    } else if (e.name == 'wdob') {
      applicant.value.wards[e.ward_idx! - 1].wdob = e.date
      console.log(applicant.value)
    }
  }
  function handleFile(evt: any, type: string, idx?: number) {
    // console.log(evt.target.files[0], type);
    let file = evt.target.files[0]
    file.apl_type = type
    curr_ward_file.value = file

    console.log(file, type)

    if (type === 'prime') {
      prime_file.value = file
      prime_image.value = URL.createObjectURL(file)
    } else if (type === 'sec') {
      sec_file.value = file
      sec_image.value = URL.createObjectURL(file)
    } else if (type.includes('ward')) {
      // const updatedImages = wards_file.value.filter(
      // 	x => x.apl_type !== file.apl_type
      // )
      // updatedImages.push(file)
      // wards_file.value = updatedImages
      wards_file.value = []
      wards_file.value.push(file)
      wards_image.value[idx!] = URL.createObjectURL(file)
      console.log(wards_file.value)
      console.log(wards_image.value)
    }
  }
  async function handlePrimeUpdate() {
    let aplVal = total_apls.value.filter(
      applicant => applicant.apl_id == useNuxtApp()._route.params.id
    )[0]
    if (!prime_file.value) return
    if (applicant.value.aplImg_path.primePath.length == 0) {
      try {
        // let apl_paths = applicant.value.aplImg_path
        prime_file.value!.apl_type = 'prime'
        let path = await useImageStore().uploadAplImg2(
          applicant.value.apl_id,
          prime_file.value
        )
        aplVal.aplImg_path.primePath.push(path)
        console.log(aplVal)
        console.log(path)
        if (!path) return
        const { error: err } = await $SB
          .from('applicants')
          .delete()
          .eq('apl_id', aplVal.apl_id)
        if (err) {
          console.log('delete err')
          throw err
        }
        let { data, error } = await $SB
          .from('applicants')
          .insert([aplVal])
          .eq('apl_id', aplVal.apl_id!)
          .select()
        if (error) throw error
        if_updated.value = true
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    } else {
      let path = await useImageStore().updateSingleAplImg(
        applicant.value.aplImg_path.primePath[0],
        prime_file.value!
      )
      if (path) if_updated.value = true
    }
  }
  async function handleSecUpdate() {
    let aplVal = total_apls.value.filter(
      applicant => applicant.apl_id == useNuxtApp()._route.params.id
    )[0]
    if (!sec_file.value) return
    if (applicant.value.aplImg_path.secPath.length == 0) {
      try {
        sec_file.value!.apl_type = 'sec'
        let path = await useImageStore().uploadAplImg2(
          applicant.value.apl_id,
          sec_file.value
        )
        aplVal.aplImg_path.secPath.push(path)
        console.log(aplVal)
        console.log(path)
        if (!path) return
        const { error: err } = await $SB
          .from('applicants')
          .delete()
          .eq('apl_id', aplVal.apl_id)
        if (err) {
          console.log('delete err')
          throw err
        }
        let { data, error } = await $SB
          .from('applicants')
          .insert([aplVal])
          .eq('apl_id', aplVal.apl_id!)
          .select()
        if (error) throw error
        if_updated.value = true
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    } else {
      let path = await useImageStore().updateSingleAplImg(
        applicant.value.aplImg_path.secPath[0],
        sec_file.value!
      )
      if (path) if_updated.value = true
    }
  }
  async function handleWardUpdate(idx: number) {
    let aplVal = total_apls.value.filter(
      applicant => applicant.apl_id == useNuxtApp()._route.params.id
    )[0]

    // to see if theres a file before going ahead and sending
    if (wards_file.value.length == 0) return

    if (
      applicant.value.aplImg_path.wardsPath[idx] == `ward${idx}` ||
      applicant.value.aplImg_path.wardsPath[idx] == ''
    ) {
      try {
        console.log(wards_file.value)

        let path = await useImageStore().uploadAplImg2(
          applicant.value.apl_id,
          wards_file.value[0]
        )
        aplVal.aplImg_path.wardsPath[idx] = path
        console.log(aplVal)
        console.log(path)
        if (!path) return
        const { error: err } = await $SB
          .from('applicants')
          .delete()
          .eq('apl_id', aplVal.apl_id)
        if (err) {
          console.log('delete err')
          throw err
        }
        let { data, error } = await $SB
          .from('applicants')
          .insert([aplVal])
          .eq('apl_id', aplVal.apl_id!)
          .select()
        if (error) throw error
        if_updated.value = true
        console.log(data)
        wards_file.value = []
      } catch (error) {
        console.log(error)
        wards_file.value = []
      } finally {
        wards_file.value = []
      }
    } else {
      let path = await useImageStore().updateSingleAplImg(
        applicant.value.aplImg_path.wardsPath[idx],
        wards_file.value[0]
      )
      if (path) if_updated.value = true
    }
  }

  // watchers
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

  return {
    applicant,
    getApplicant,
    setApplicant,
    edit_mode,
    toggleEditMode,
    handleSend,
    validate,
    resetAplData,
    applicant_type,
    if_sent,
    apl_sending,
    loadUrl,
    prime_image,
    sec_image,
    wards_image,
    handleDate,
    handleFile,
    handlePrimeUpdate,
    handleSecUpdate,
    handleWardUpdate,
    prime_file,
    sec_file,
    wards_file,
    if_updated,
    curr_ward_file,
  }
}
