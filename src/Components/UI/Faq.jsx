"use client";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How can I borrow a book from the library?",
    answer:
      "Go to the book details page and click 'Borrow Book'. If the book is available, it will be added to your borrowed list instantly.",
  },
  {
    question: "Can I renew a borrowed book?",
    answer:
      "Yes. Visit your 'My Borrowed Books' section and click 'Renew' before the due date to extend the borrowing period.",
  },
  {
    question: "What happens if I return a book late?",
    answer:
      "A small late fee may apply depending on how long you keep the book past its due date. You’ll see the details in your account.",
  },
  {
    question: "How do I check my borrowing history?",
    answer:
      "Open your profile and navigate to 'Borrowing History' to see all previously borrowed and returned books.",
  },
  {
    question: "Can I reserve a book that’s currently borrowed by someone else?",
    answer:
      "Yes. You can place a reservation on any borrowed book. Once it’s returned, you’ll get a notification to borrow it.",
  },
];

const FAQSection = () => {
  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className=" mt-2 text-sm md:text-base">
          Common questions about using the Book Galaxy Library Management System
              </p>
              <hr className="mt-6 w-24 mx-auto border-2 border-teal-500 rounded-full" />
      </motion.div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="collapse collapse-arrow border-teal-500 border-l-8 rounded-2xl border-t-2 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-base md:text-lg font-semibold">
              {faq.question}
            </div>
            <div className="collapse-content text-sm md:text-base leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
