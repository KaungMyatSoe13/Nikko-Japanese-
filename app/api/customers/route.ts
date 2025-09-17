// Api route to handle customer creation(this ask the server to create the customer in supabase using signUp.ts when fronted calls this route)
import { NextResponse } from "next/server";
import { signUpCustomer } from "@/app/utils/supabase/services/signUp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, number, role } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const { data, error } = await signUpCustomer({
      name,
      email,
      password: body.password,
      number,
      role,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        data,
        message: "Customer created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Customer creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
