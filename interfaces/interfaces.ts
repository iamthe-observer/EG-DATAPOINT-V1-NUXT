// import { emitLogin, _Null } from '../types/types';

// export interface LoginInUser {
//   (e: 'logIn', emit: emitLogin): void;
// }

export interface UserData {
  profile: ProfileData[]
  apls: PrimeApplicant[]
}

export interface Announcement {
  id: number
  created_at: Date
  subject: string
  body: string
  urgency: string
}

export interface WardsApplicant {
  wlastName: string
  wfirstName: string
  wotherName: string
  wdob: string
  wgender: string
  wcity_ob: string
  wcountry_ob: string
  index: number
  // wdob_month: number>
  // wdob_year: number>
}

export interface SecApplicant {
  slastName: string
  sfirstName: string
  sotherName: string
  scity_ob: string
  scountry_ob: string
  scontact: string
  sgender: string
  sdob: string
}

export interface PrimeApplicant {
  created_at: Date
  apl_id?: string
  plastName: string
  pfirstName: string
  potherName: string
  pdob: string
  // pdob_month: number>
  // pdob_year: number>
  pcity_ob: string
  pcountry_ob: string
  pgender: string
  pconf_code: string
  pemail: string
  ppassport_number: string
  passport_ex: string
  // passport_ex_month: number>
  // passport_ex_year: number>
  pcountry_live_today: string
  peducation_level: string
  ppostal: string
  pmarital_status: string
  children_number: number
  fullName: string
  user_id: string
  pcontact: string
  // sdob_month: number>
  // sdob_year: number>
  wards: WardsApplicant[]
  totalPayment: number
  passportAvail: boolean
  created_at_date: string
  pother_contact: string
  psocial_media: {
    facebook: string
    instagram: string
    twitter: string
  }
  aplImg_path: {
    primePath: string[]
    secPath: string[]
    wardsPath: string[]
  }
}

export interface SupervisorInfo {
  created_at: Date
  name: string
  id: string
  phone_number: string
  whatsapp_number: string
}
export interface UserSignIn {
  id: string
  created_at: Date
  user_id: string
}

export interface ProfileData {
  id: string
  updated_at: Date
  username: string
  full_name: string
  settings: object
  email: string
  avatar_url: string | undefined
  avatar_path: string | undefined
  role: boolean
}

export interface DefaultProfile {
  id: string | undefined
  full_name: 'User'
  username: 'user'
  email: string | undefined
  role: boolean
}

export interface Requests {
  id: string
  created_at: Date
  user_id: string
  apl_id: string
  reason_body: string
  status: string
  modify_type: string
  modify_apl: PrimeApplicant
}

export interface SearchParams {
  fullName: string | undefined
  apl_id: string | undefined
}

export interface RegisterInfo {
  email: string
  password: string
  confirmPassword: string
}

export interface toastOptions {
  severity: 'success' | 'error' | 'info'
  summary: string
  detail: string
  life: number
}
