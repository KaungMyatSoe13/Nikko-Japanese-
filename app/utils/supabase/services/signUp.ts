// Which use CRUD helpers from customer.ts and use logic to create the user in Supabase(middle man between api route and helpers)
import { CustomerService } from "./customer";
import { SignUpData } from "@/app/types/user";

export const signUpCustomer = async (signUpData: SignUpData) => {
  try {
    // Check if customer already exists
    const { data: existingCustomer } = await CustomerService.getCustomerByEmail(
      signUpData.email
    );

    if (existingCustomer) {
      return {
        data: null,
        error: { message: "Customer with this email already exists" },
      };
    }

    // Create customer record in database
    const { data: customerData, error: customerError } =
      await CustomerService.createCustomer({
        name: signUpData.name,
        email: signUpData.email,
        number: signUpData.number,
        role: signUpData.role || "customer",
      });

    if (customerError) {
      console.error("Failed to create customer:", customerError);
      return { data: null, error: customerError };
    }

    return {
      data: customerData,
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};
