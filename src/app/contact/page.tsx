import React from "react";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {"Have questions? We'd love to hear from you."}
          </p>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-2xl border border-indigo-700/30 shadow-xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
