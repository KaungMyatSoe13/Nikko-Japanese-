// technically CRUD helpers
import { createClient } from "@/app/utils/supabase/server";
import { Customer, CreateCustomerData } from "@/app/types/user";

export class CustomerService {
  static async createCustomer(
    data: CreateCustomerData
  ): Promise<{ data: Customer | null; error: any }> {
    const supabase = await createClient();

    try {
      const { data: customer, error } = await supabase
        .from("customers")
        .insert([
          {
            name: data.name,
            email: data.email,
            number: data.number || null,
            role: data.role || "customer",
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      return { data: customer, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getCustomerById(
    id: string
  ): Promise<{ data: Customer | null; error: any }> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    return { data, error };
  }

  static async getCustomerByEmail(
    email: string
  ): Promise<{ data: Customer | null; error: any }> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();

    return { data, error };
  }

  static async updateCustomer(
    id: string,
    updates: Partial<CreateCustomerData>
  ): Promise<{ data: Customer | null; error: any }> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("customers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    return { data, error };
  }
}
