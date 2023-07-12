import { defineStore } from 'pinia'
import {
  PrimeApplicant,
  SecApplicant,
  WardsApplicant,
} from 'interfaces/interfaces'

export const useAplStore = defineStore('apl', () => {
  const { $formatDate } = useNuxtApp()
  const user = useSupabaseUser()
  const prime_apl = ref<PrimeApplicant>({
    created_at: new Date(),
    plastName: '',
    pfirstName: '',
    potherName: '',
    pdob: '',
    pcity_ob: '',
    pcountry_ob: '',
    pgender: '',
    pconf_code: '',
    pemail: '',
    ppassport_number: '',
    passport_ex: '',
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
    passportAvail: false,
    created_at_date: $formatDate(new Date()),
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
  })
  const sec_apl = ref<SecApplicant>({
    slastName: '',
    sfirstName: '',
    sotherName: '',
    scity_ob: '',
    scountry_ob: '',
    scontact: '',
    sgender: '',
    sdob: '',
  })
  const wards_apl = ref<WardsApplicant[]>([])

  watchEffect(() => {
    if (prime_apl.value.pmarital_status == 'UNMARRIED') {
      setSecApl({
        slastName: '',
        sfirstName: '',
        sotherName: '',
        scity_ob: '',
        scountry_ob: '',
        scontact: '',
        sgender: '',
        sdob: '',
      })
    }
  })

  watchEffect(() => {
    if (prime_apl.value.children_number == 0) {
      setWardsApl([])
    }
  })

  function setPrimeApl(val: PrimeApplicant) {
    prime_apl.value = val
  }
  function setSecApl(val: SecApplicant) {
    sec_apl.value = val
  }
  function setWardsApl(val: WardsApplicant[]) {
    wards_apl.value = val
  }

  function resetAplData() {
    prime_apl.value = {
      created_at: new Date(),
      plastName: '',
      pfirstName: '',
      potherName: '',
      pdob: '',
      pcity_ob: '',
      pcountry_ob: '',
      pgender: '',
      pconf_code: '',
      pemail: '',
      ppassport_number: '',
      passport_ex: '',
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
      passportAvail: false,
      created_at_date: $formatDate(new Date()),
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
    }
    sec_apl.value = {
      slastName: '',
      sfirstName: '',
      sotherName: '',
      scity_ob: '',
      scountry_ob: '',
      scontact: '',
      sgender: '',
      sdob: '',
    }
    wards_apl.value = []
  }

  return {
    prime_apl,
    sec_apl,
    wards_apl,
    setPrimeApl,
    setSecApl,
    setWardsApl,
    resetAplData,
  }
})
