import { emitLogin, _Null } from '../types/types';

export interface LoginInUser {
  (e: 'logIn', emit: emitLogin): void;
}

export interface UserData {
  profile: ProfileData[];
  apls: Applicant[];
}

export interface Announcement {
  id: number;
  created_at: Date;
  subject: string;
  body: _Null<string>;
  urgency: string;
}

export interface WardsApplicant {
  wlastName: _Null<string>;
  wfirstName: _Null<string>;
  wotherName: _Null<string>;
  wdob_day: _Null<number>;
  wdob_month: _Null<number>;
  wdob_year: _Null<number>;
  wgender: _Null<string>;
  wcity_ob: _Null<string>;
  wcountry_ob: _Null<string>;
  index: number;
}

export interface Applicant {
  created_at: Date;
  apl_id: _Null<string>;
  plastName: _Null<string>;
  pfirstName: _Null<string>;
  potherName: _Null<string>;
  pdob_day: _Null<number>;
  pdob_month: _Null<number>;
  pdob_year: _Null<number>;
  pcity_ob: _Null<string>;
  pcountry_ob: _Null<string>;
  pgender: _Null<string>;
  pconf_code: _Null<string>;
  pemail: _Null<string>;
  ppassport_number: _Null<string>;
  passport_ex_day: _Null<number>;
  passport_ex_month: _Null<number>;
  passport_ex_year: _Null<number>;
  pcountry_live_today: _Null<string>;
  peducation_level: _Null<string>;
  ppostal: _Null<string>;
  pmarital_status: _Null<string>;
  children_number: number;
  fullName: _Null<string>;
  user_id: string;
  pcontact: _Null<string>;
  slastName: _Null<string>;
  sfirstName: _Null<string>;
  sotherName: _Null<string>;
  scity_ob: _Null<string>;
  scountry_ob: _Null<string>;
  sgender: _Null<string>;
  sdob_day: _Null<number>;
  sdob_month: _Null<number>;
  sdob_year: _Null<number>;
  wards: WardsApplicant[];
  totalPayment: number;
  passportAvail: boolean;
  created_at_date: string;
  pother_contact: _Null<string>;
  psocial_media: {
    facebook: _Null<string>;
    instagram: _Null<string>;
    twitter: _Null<string>;
  };
  aplImg_path: {
    primePath: _Null<string[]>;
    secPath: _Null<string[]>;
    wardsPath: _Null<string[]>;
  };
}

export interface SupervisorInfo {
  created_at: Date;
  name: string;
  id: string;
  phone_number: string;
  whatsapp_number: string;
}
export interface UserSignIn {
  id: string;
  created_at: Date;
  user_id: string;
}

export interface ProfileData {
  id: string;
  updated_at: Date;
  username: string;
  full_name: string;
  settings: _Null<object>;
  email: string;
  avatar_url: _Null<string> | undefined;
  avatar_path: _Null<string> | undefined;
  role: boolean;
}

export interface DefaultProfile {
  id: string | undefined | null;
  full_name: 'User';
  username: 'user';
  email: string | undefined | null;
  role: boolean;
}

export interface Requests {
  id: string;
  created_at: Date;
  user_id: string;
  apl_id: string;
  reason_body: _Null<string>;
  status: string;
  modify_type: string;
  modify_apl: Applicant;
}

export interface SearchParams {
  fullName: string | undefined;
  apl_id: string | undefined;
}

export interface RegisterInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface toastOptions {
  severity: 'success' | 'error' | 'info';
  summary: string;
  detail: string;
  life: number;
}
