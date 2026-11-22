import React from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactUsPage() {
  return (
    <div>
      <div className="mx-auto flex max-w-md flex-col text-center p-2">
        <h1 className="font-bold text-3xl p-2">Contact Us</h1>
        <p>Do you have any questions?</p>
        <p>
          Fill out this form, and we will get back to you as soon as possible:
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
