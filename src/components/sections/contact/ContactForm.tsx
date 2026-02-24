"use client";
import React, { useState } from "react";

interface ContactFormProps {
  data?: {
    heading: string;
    description: string;
    name: string;
    organisation: string;
    jobTitle: string;
    email: string;
    phone: string;
    message: string;
    buttonText: string;
  };
}

interface FormData {
  name: string;
  organization: string;
  jobTitle: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ data }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    organization: "",
    jobTitle: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.organization ||
      !formData.jobTitle ||
      !formData.phone
    ) {
      setStatus("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        organization: "",
        jobTitle: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setStatus("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-8 bg-card">
      <h2 className="text-2xl font-semibold text-foreground mb-2 text-start">
        {data?.heading || "Contact Us"}
      </h2>
      <p className="text-muted-foreground text-start mb-8">
        {data?.description || "Kindly provide the following details..."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-foreground font-medium mb-1">
            {data?.name || "Name"}
            <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Organization */}
        <div>
          <label className="block text-foreground font-medium mb-1">
            {data?.organisation || "Organization"}
            <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="organization"
            placeholder="Organization Name"
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-foreground font-medium mb-1">
            {data?.jobTitle || "Job Title"}
            <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Your designation"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-foreground font-medium mb-1">
            {data?.email || "Email Address"}
            <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="janesmith@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-foreground font-medium mb-1">
            {data?.phone || "Phone Number"}
            <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 (XXX) XXX-XXXX"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-foreground font-medium mb-1">
            {data?.message || "Your Message"}
            <span className="text-destructive">*</span>
          </label>
          <textarea
            name="message"
            placeholder="Your message..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : data?.buttonText || "Send Message"}
        </button>

        {/* Status */}
        {status && (
          <p
            className={`text-center mt-2 text-sm ${
              status.includes("success")
                ? "text-primary"
                : "text-destructive"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;