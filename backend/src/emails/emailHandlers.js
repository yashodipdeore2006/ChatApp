
import { resendClient } from "../lib/resend.js";
import { generateWelcomeEmail } from "./emailTemplates.js";

const sender = {
  name: process.env.EMAIL_FROM_NAME || "ChatApp",
  email: process.env.EMAIL_FROM,
};

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to ChatApp",
      html: generateWelcomeEmail(name, clientURL),
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);

    return data;
  } catch (error) {
    console.error("Welcome email error:", error);
    throw error;
  }
};
