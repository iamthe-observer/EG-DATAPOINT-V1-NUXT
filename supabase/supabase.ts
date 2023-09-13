import { WardsApplicant } from "./../interfaces/interfaces";
const { $SB: supa } = useNuxtApp();

/**
 * Retrieves data from a specified table based on the given column name and optional equality condition.
 * @param table - The name of the table to retrieve data from.
 * @param col_name - The name of the column to select.
 * @param eq - The optional equality condition to filter the data.
 * @returns The retrieved data.
 */
export async function getTable<T>(
  table: string,
  col_name: string,
  eq?: { col_name: string; row_data: string | object } | undefined,
): Promise<T[]> {
  /**
   * Returns the data and throws an error if one exists.
   * @param error - The error object.
   * @param data - The data to be returned.
   * @returns The data.
   * @throws The error object if one exists.
   */
  function returnVal<B>(error: any, data: B[]): B[] {
    if (error) throw error;
    return data;
  }
  try {
    if (!eq) {
      const { data, error } = await supa
        .from(table)
        .select(col_name)
        .returns<T[]>();
      let DATA = returnVal<T>(error, data!);
      return DATA;
    } else {
      const { data, error } = await supa
        .from(table)
        .select(col_name)
        .eq(eq.col_name, eq.row_data)
        .returns<T[]>();
      let DATA = returnVal<T>(error, data!);
      return DATA;
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

export interface Applicant {
  created_at: Date | null;
  apl_id?: string;
  plastName: string;
  pfirstName: string;
  potherName: string;
  pdob: Date | null;
  pcity_ob: string;
  pcountry_ob: string;
  pgender: string;
  pconf_code: string;
  pemail: string;
  ppassport_number: string;
  passport_ex: Date | null;
  pcountry_live_today: string;
  peducation_level: string;
  ppostal: string;
  pmarital_status: string;
  children_number: number;
  fullName: string;
  user_id: string;
  pcontact: string;
  wards: WardsApplicant[];
  totalPayment: number;
  pother_contact: string;
  psocial_media: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  aplImg_path: {
    primePath: string[] | null;
    secPath: string[] | null;
    wardsPath: string[] | null;
  };
  slastName: string;
  sfirstName: string;
  sotherName: string;
  scity_ob: string;
  scountry_ob: string;
  scontact: string;
  sgender: string;
  sdob: Date | null;
}

export interface Prices {
  adult: number;
  child: number;
  id: number;
}

export interface Database {
  public: {
    Tables: {
      applicants: {
        Row: {
          created_at: Date | null;
          apl_id?: string;
          plastName: string;
          pfirstName: string;
          potherName: string;
          pdob: Date | null;
          pcity_ob: string;
          pcountry_ob: string;
          pgender: string;
          pconf_code: string;
          pemail: string;
          ppassport_number: string;
          passport_ex: Date | null;
          pcountry_live_today: string;
          peducation_level: string;
          ppostal: string;
          pmarital_status: string;
          children_number: number;
          fullName: string;
          user_id: string;
          pcontact: string;
          wards: WardsApplicant[];
          totalPayment: number;
          pother_contact: string;
          psocial_media: {
            facebook: string;
            instagram: string;
            twitter: string;
          };
          aplImg_path: {
            primePath: string[] | null;
            secPath: string[] | null;
            wardsPath: string[] | null;
          };
          slastName: string;
          sfirstName: string;
          sotherName: string;
          scity_ob: string;
          scountry_ob: string;
          scontact: string;
          sgender: string;
          sdob: Date | null;
        };
        Insert: {
          created_at: Date | null;
          apl_id?: string;
          plastName: string;
          pfirstName: string;
          potherName: string;
          pdob: Date | null;
          pcity_ob: string;
          pcountry_ob: string;
          pgender: string;
          pconf_code: string;
          pemail: string;
          ppassport_number: string;
          passport_ex: Date | null;
          pcountry_live_today: string;
          peducation_level: string;
          ppostal: string;
          pmarital_status: string;
          children_number: number;
          fullName: string;
          user_id: string;
          pcontact: string;
          wards: WardsApplicant[];
          totalPayment: number;
          pother_contact: string;
          psocial_media: {
            facebook: string;
            instagram: string;
            twitter: string;
          };
          aplImg_path: {
            primePath: string[] | null;
            secPath: string[] | null;
            wardsPath: string[] | null;
          };
          slastName: string;
          sfirstName: string;
          sotherName: string;
          scity_ob: string;
          scountry_ob: string;
          scontact: string;
          sgender: string;
          sdob: Date | null;
        };
        Relationships: [];
      };
      prices: {
        Row: {
          adult: number;
          child: number;
          id: number;
        };
        Insert: {
          adult?: number;
          child?: number;
          id?: number;
        };
        Update: {
          adult?: number;
          child?: number;
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
