import { useState } from "react";

const FAQSection = () => {
    const faqs = [
        { question: "How can I reset my password?", answer: "Go to settings and click 'Reset Password'." },
        { question: "How do I submit an assignment?", answer: "Go to the assignments section and upload your file." },
        { question: "Where can I check my grades?", answer: "You can view grades in the Grades Analytics section." }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        {faq.question}
                    </button>
                    {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
                </div>
            ))}
        </div>
    );
};

export default FAQSection;  // Ensure this line exists
