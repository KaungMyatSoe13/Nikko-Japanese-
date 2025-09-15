import { createAdminClient } from "@/app/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { type, email, password, isPasswordReset, origin } =
      await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let data;

    switch (type) {
      case "verification":
        const supabase = createAdminClient();
        const res = await supabase.auth.admin.generateLink({
          type: isPasswordReset ? "recovery" : "signup",
          email,
          password: isPasswordReset ? undefined : password,
        });

        if (res.data.properties?.email_otp) {
          // Use HTML string instead of React component
          const htmlContent = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>${isPasswordReset ? "Reset your password" : "Verify your email"}</title>
              </head>
              <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px;">
                <div style="max-width: 580px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px;">
                  <h1 style="color: #333; font-size: 24px; text-align: center; margin-bottom: 30px;">
                    ${isPasswordReset ? "Reset your password" : "Verify your email address"}
                  </h1>
                  <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                    ${
                      isPasswordReset
                        ? "You requested to reset your password. Please use the following code to verify your identity:"
                        : "Thank you for signing up! Please use the following code to verify your account:"
                    }
                  </p>
                  <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 30px;">
                    <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #333;">
                      ${res.data.properties.email_otp}
                    </span>
                  </div>
                  <p style="color: #555; font-size: 14px;">
                    If you didn't request this email, you can safely ignore it.
                  </p>
                </div>
              </body>
            </html>
          `;

          data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // Use Resend's verified domain
            to: email,
            subject: isPasswordReset
              ? "Reset your password"
              : "Verify your email",
            html: htmlContent,
          });
          console.log("Sending email to:", email, "Type:", type);

          console.log("Resend response:", data);
        } else {
          return NextResponse.json({ data: null, error: res.error });
        }
        break;

      case "welcome":
        const shopUrl = origin
          ? `${origin}/shop`
          : `${new URL(request.url).origin}/shop`;

        const welcomeHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Welcome to our platform!</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px;">
              <div style="max-width: 580px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px; text-align: center; margin-bottom: 30px;">
                  Welcome to our platform!
                </h1>
                <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                  Thank you for joining us, ${email}! We're excited to have you on board.
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                  You can now access all features of our platform. If you have any questions or need assistance, feel free to reach out to our support team.
                </p>
                <div style="text-align: center;">
                  <a href="${shopUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                    Go to Shop
                  </a>
                </div>
              </div>
            </body>
          </html>
        `;

        data = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: email,
          subject: "Welcome to our platform!",
          html: welcomeHtml,
        });
        break;

      case "password-reset-confirmation":
        const loginUrl = origin
          ? `${origin}/auth/login`
          : `${new URL(request.url).origin}/auth/login`;

        const resetHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Password Reset Confirmation</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px;">
              <div style="max-width: 580px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px; text-align: center; margin-bottom: 30px;">
                  Your password has been reset
                </h1>
                <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                  Your password has been successfully reset. You can now log in with your new password.
                </p>
                <div style="text-align: center;">
                  <a href="${loginUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                    Go to Login
                  </a>
                </div>
              </div>
            </body>
          </html>
        `;

        data = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: email,
          subject: "Your password has been reset",
          html: resetHtml,
        });
        break;

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
