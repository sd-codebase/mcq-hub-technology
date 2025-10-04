"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "info", message: "Sending..." });

    // Here you would implement your form submission logic
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setStatus({
        type: "success",
        message: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-300"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/50 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
        />
      </div>

      {status.message && (
        <div
          className={`p-4 rounded-lg border ${
            status.type === "success"
              ? "bg-green-900/50 border-green-500/30 text-green-100"
              : status.type === "error"
              ? "bg-red-900/50 border-red-500/30 text-red-100"
              : "bg-blue-900/50 border-blue-500/30 text-blue-100"
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-6 rounded-lg text-white font-medium
                 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600
                 transition-all duration-200 transform hover:scale-[1.02]
                 shadow-lg shadow-indigo-500/25"
      >
        Send Message
      </button>
    </form>
  );
}
