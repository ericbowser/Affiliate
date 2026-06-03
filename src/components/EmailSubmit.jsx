import React, { useState } from "react";
import { MdSend, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { sendContactEmail } from "../utils/emailService";

const EmailSubmit = () => {
  const [status, setStatus]     = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const next = {};
    if (!formData.name.trim())    next.name    = "Name is required";
    if (!formData.email.trim())   next.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = "Email address is invalid";
    if (!formData.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      await sendContactEmail(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.text || err?.message || "Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  return (
    <div className="max-w-md mx-auto pt-20 pb-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600 dark:text-teal-400 font-burtons">
          Contact Us
        </h2>

        {status === "success" ? (
          <div className="text-center py-8">
            <MdCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
            <p className="text-lg font-medium">Message sent!</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Thanks for reaching out — we'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {status === "error" && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                <MdErrorOutline className="shrink-0 text-lg" />
                {errorMsg}
              </div>
            )}

            {[
              { id: "name",    label: "Name",    type: "text",  placeholder: "Your name",               required: true },
              { id: "email",   label: "Email",   type: "email", placeholder: "your.email@example.com",  required: true },
              { id: "subject", label: "Subject", type: "text",  placeholder: "Subject of your message", required: false },
            ].map(({ id, label, type, placeholder, required }) => (
              <div key={id}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={id}>
                  {label}
                </label>
                <input
                  id={id} name={id} type={type}
                  value={formData[id]} onChange={handleChange}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition
                    dark:bg-gray-700 dark:text-white
                    ${errors[id] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                />
                {errors[id] && <p className="mt-1 text-sm text-red-500">{errors[id]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message" name="message" rows="4"
                value={formData.message} onChange={handleChange}
                placeholder="Your message..."
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition
                  dark:bg-gray-700 dark:text-white
                  ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition flex items-center justify-center disabled:opacity-60"
              >
                <MdSend className="mr-2" />
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default EmailSubmit;
