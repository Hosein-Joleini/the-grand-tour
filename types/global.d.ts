export type TourRowType = Database['public']['Tables']['tours']['Row'];

export type CreatedTourType = Database['public']['Tables']['tours']['Insert'];

export type BookingDetailType =
  Database['public']['Tables']['bookings']['Row'] & {
    tours: {
      tourName: string;
      startDate: string;
      endDate: string;
    };
    guests: Database['public']['Tables']['guests']['Row'];
  };

type Tour = {
  id: number;
  tourName: string;
  startDate: string;
};

type Guest = {
  id: number;
  fullName: string;
  phoneNumber: string;
};

export type BookingRowType = {
  id: number;
  status: string | null;
  totalPrice: number;
  tours: Tour;
  guests: Guest;
};

export type BookingTableType = BookingRowType[] | null;

export type SettingsType = {
  id: number;
  created_at: string;
  mealsPrice: number;
};

export type UpdateBooking = {
  id: number;
  status: 'confirmed';
  extrasPrice: number | null;
  totalPrice: number | null;
  hasMeals: boolean | null;
  isPaid: boolean | null;
};

export type TourRowInputsType = {
  accomodation: string | null;
  description: string | null;
  discount: number | null;
  endDate: string | null;
  imageUrl?: FileList | string | null;
  location: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  startDate: string | null;
  tourName: string | null;
};

export type UpdateSettingType = {
  id?: number;
  mealsPrice?: number;
};

export type SignUpInputsType = {
  fullName: string;
  email: string;
  password: string;
  repeatedPassword: string;
  avatar: '';
};

export type LoginInputsType = {
  email: string;
  password: string;
};

export type UpdateUserType = {
  email?: string;
  fullName?: string | null;
  avatar?: FileList | string | null;
  password?: string | null;
};

export type RecentBookingsType = {
  totalPrice: number;
  tourPrice: number;
  extrasPrice: number;
  numGuests: number;
  status: string;
  id: number;
  isPaid: boolean;
  tourId: number;
  tours: {
    startDate: string;
    tourName: string;
    maxCapacity: number;
  };
};

export type TodayBookingsType = {
  id: number;
  isPaid: boolean;
  status: string;
  tours: {
    id: number;
    tourName: string;
    maxCapacity: number;
    location: string;
    imageUrl: string;
    regularPrice: number;
  };
};

export type TodayActivityType = {
  id: number;
  tourId: number;
  maxCapacity: number;
  imageUrl: string;
  location: string;
  numOfBookings: number;
  tourPrice: number;
  tourName: string;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: number;
          created_at: string;
          numGuests: number | null;
          tourPrice: number | null;
          extrasPrice: number | null;
          totalPrice: number | null;
          status: string | null;
          hasMeals: boolean | null;
          isPaid: boolean | null;
          observation: string | null;
          tourId: number | null;
          guestId: number | null;
        };
        Insert: {
          created_at?: string;
          extrasPrice?: number | null;
          guestId?: number | null;
          hasMeals?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numGuests?: number | null;
          observation?: string | null;
          status?: string | null;
          totalPrice?: number | null;
          tourId?: number | null;
          tourPrice?: number | null;
        };
        Update: {
          created_at?: string;
          extrasPrice?: number | null;
          guestId?: number | null;
          hasMeals?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numGuests?: number | null;
          observation?: string | null;
          status?: string | null;
          totalPrice?: number | null;
          tourId?: number | null;
          tourPrice?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_guestId_fkey';
            columns: ['guestId'];
            isOneToOne: false;
            referencedRelation: 'guests';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_tourId_fkey';
            columns: ['tourId'];
            isOneToOne: false;
            referencedRelation: 'tours';
            referencedColumns: ['id'];
          }
        ];
      };
      guests: {
        Row: {
          countryFlag: string | null;
          created_at: string;
          email: string | null;
          fullName: string | null;
          id: number;
          nationalId: string | null;
          nationality: string | null;
          phoneNumber: string | null;
        };
        Insert: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id?: number;
          nationalId?: string | null;
          nationality?: string | null;
          phoneNumber?: string | null;
        };
        Update: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id?: number;
          nationalId?: string | null;
          nationality?: string | null;
          phoneNumber?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          created_at: string;
          id: number;
          mealsPrice: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          mealsPrice?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          mealsPrice?: number | null;
        };
        Relationships: [];
      };
      tours: {
        Row: {
          accomodation: string | null;
          created_at: string;
          description: string | null;
          discount: number | null;
          endDate: string | null;
          id: number;
          imageUrl: string | null;
          location: string | null;
          maxCapacity: number | null;
          regularPrice: number | null;
          startDate: string | null;
          tourName: string | null;
        };
        Insert: {
          accomodation?: string | null;
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          endDate?: string | null;
          id?: number;
          imageUrl?: string | null;
          location?: string | null;
          maxCapacity?: number | null;
          regularPrice?: number | null;
          startDate?: string | null;
          tourName?: string | null;
        };
        Update: {
          accomodation?: string | null;
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          endDate?: string | null;
          id?: number;
          imageUrl?: string | null;
          location?: string | null;
          maxCapacity?: number | null;
          regularPrice?: number | null;
          startDate?: string | null;
          tourName?: string | null;
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
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
