export interface Customer {
  id: string;
  name: string;
  email: string;
  number?: string | null;
  role: "admin" | "user" | "customer";
  created_at: string;
  // No password field - handled by Supabase Auth
}

export interface CreateCustomerData {
  name: string;
  email: string;
  number?: string;
  role?: "admin" | "user" | "customer";
  // No password field
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  number?: string;
  role?: "admin" | "user" | "customer";
}
