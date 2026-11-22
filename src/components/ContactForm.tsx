"use client";

import { useState } from "react";
import type { SyntheticEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess(false);
  }

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log("Contact form submitted:", {
      fullName: formData.fullName.trim(),
      subject: formData.subject.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    router.push("/success");

    setFormData({
      fullName: "",
      subject: "",
      email: "",
      message: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex max-w-md flex-col"
    >
      <div className="flex flex-col py-1">
        <label htmlFor="name">Full Name:</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          required
          minLength={3}
          className="h-10 rounded-sm border border-gray-300 bg-white p-2 shadow-inner"
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-sm text-red-600">
            {errors.fullName}
          </p>
        )}
      </div>
      <div className="flex flex-col py-1">
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          required
          minLength={3}
          className="h-10 rounded-sm border border-gray-300 bg-white p-2 shadow-inner"
        />
        {errors.subject && (
          <p id="subject-error" className="text-sm text-red-600">
            {errors.subject}
          </p>
        )}
      </div>
      <div className="flex flex-col py-1">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
          className="h-10 rounded-sm border border-gray-300 bg-white p-2 shadow-inner"
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>
      <div className="flex flex-col py-1">
        <label htmlFor="message">Your Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
          minLength={10}
          className="h-50 rounded-sm border border-gray-300 bg-white p-2 shadow-inner"
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black font-heading mt-5 h-12 rounded-sm text-center font-medium text-white shadow-lg"
      >
        Send message
      </button>
    </form>
  );
}
