import React, { useState } from "react";
import { MdSend, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import sendEmail from '../../api/sendMail';

const EmailSubmit = () => {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      await sendEmail(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  return (
    <div className="max-w-md mx-auto pt-20 pb-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transform transition-all">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600 dark:text-teal-400 font-burtons">
          Contact Me
        </h2>

        {status === 'success' ? (
          <div className="text-center py-8">
            <MdCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
            <p className="text-lg font-medium">Message sent!</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Thanks for reaching out — I'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {status === 'error' && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                <MdErrorOutline className="shrink-0 text-lg" />
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                Name
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition 
                  ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                  dark:bg-gray-700 dark:text-white`}
                id="name" name="name" type="text"
                value={formData.name} onChange={handleChange}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                Email
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition
                  ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                  dark:bg-gray-700 dark:text-white`}
                id="email" name="email" type="email"
                value={formData.email} onChange={handleChange}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="subject">
                Subject
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition dark:bg-gray-700 dark:text-white"
                id="subject" name="subject" type="text"
                value={formData.subject} onChange={handleChange}
                placeholder="Subject of your message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition
                  ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                  dark:bg-gray-700 dark:text-white`}
                id="message" name="message" rows="4"
                value={formData.message} onChange={handleChange}
                placeholder="Your message..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition flex items-center justify-center disabled:opacity-60"
              >
                <MdSend className="mr-2" />
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default EmailSubmit;
