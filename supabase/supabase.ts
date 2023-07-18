import { WardsApplicant } from './../interfaces/interfaces'

export interface Applicant {
  created_at: Date | null
  apl_id?: string
  plastName: string
  pfirstName: string
  potherName: string
  pdob: Date | null
  pcity_ob: string
  pcountry_ob: string
  pgender: string
  pconf_code: string
  pemail: string
  ppassport_number: string
  passport_ex: Date | null
  pcountry_live_today: string
  peducation_level: string
  ppostal: string
  pmarital_status: string
  children_number: number
  fullName: string
  user_id: string
  pcontact: string
  wards: WardsApplicant[]
  totalPayment: number
  pother_contact: string
  psocial_media: {
    facebook: string
    instagram: string
    twitter: string
  }
  aplImg_path: {
    primePath: string[] | null
    secPath: string[] | null
    wardsPath: string[] | null
  }
  slastName: string
  sfirstName: string
  sotherName: string
  scity_ob: string
  scountry_ob: string
  scontact: string
  sgender: string
  sdob: Date | null
}

export interface Prices {
  adult: number
  child: number
  id: number
}

export interface Database {
  public: {
    Tables: {
      applicants: {
        Row: {
          created_at: Date | null
          apl_id?: string
          plastName: string
          pfirstName: string
          potherName: string
          pdob: Date | null
          pcity_ob: string
          pcountry_ob: string
          pgender: string
          pconf_code: string
          pemail: string
          ppassport_number: string
          passport_ex: Date | null
          pcountry_live_today: string
          peducation_level: string
          ppostal: string
          pmarital_status: string
          children_number: number
          fullName: string
          user_id: string
          pcontact: string
          wards: WardsApplicant[]
          totalPayment: number
          pother_contact: string
          psocial_media: {
            facebook: string
            instagram: string
            twitter: string
          }
          aplImg_path: {
            primePath: string[] | null
            secPath: string[] | null
            wardsPath: string[] | null
          }
          slastName: string
          sfirstName: string
          sotherName: string
          scity_ob: string
          scountry_ob: string
          scontact: string
          sgender: string
          sdob: Date | null
        }
        Insert: {
          created_at: Date | null
          apl_id?: string
          plastName: string
          pfirstName: string
          potherName: string
          pdob: Date | null
          pcity_ob: string
          pcountry_ob: string
          pgender: string
          pconf_code: string
          pemail: string
          ppassport_number: string
          passport_ex: Date | null
          pcountry_live_today: string
          peducation_level: string
          ppostal: string
          pmarital_status: string
          children_number: number
          fullName: string
          user_id: string
          pcontact: string
          wards: WardsApplicant[]
          totalPayment: number
          pother_contact: string
          psocial_media: {
            facebook: string
            instagram: string
            twitter: string
          }
          aplImg_path: {
            primePath: string[] | null
            secPath: string[] | null
            wardsPath: string[] | null
          }
          slastName: string
          sfirstName: string
          sotherName: string
          scity_ob: string
          scountry_ob: string
          scontact: string
          sgender: string
          sdob: Date | null
        }
        Relationships: []
      }
      prices: {
        Row: {
          adult: number
          child: number
          id: number
        }
        Insert: {
          adult?: number
          child?: number
          id?: number
        }
        Update: {
          adult?: number
          child?: number
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
