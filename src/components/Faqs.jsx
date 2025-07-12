import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqsData = [
  {
    question: 'What is crowdfunding?',
    answer:
      'Crowdfunding is the practice of funding a project or venture by raising small amounts of money from a large number of people, typically via the internet.',
  },
  {
    question: 'Is crowdfunding legal in India?',
    answer:
      'Yes, crowdfunding is legal in India but is subject to regulatory compliance, especially in the case of donations or investments.',
  },
  {
    question: 'How much does it cost to raise funds on CrowdChain?',
    answer:
      'The cost depends on the type of campaign you are running. CrowdChain charges a small fee to cover platform costs, but it is relatively lower than other fundraising platforms.',
  },
  {
    question: 'Do we need to return the funds raised on donation-based crowdfunding platforms?',
    answer:
      'No, funds raised through donation-based crowdfunding are given as donations and do not need to be returned.',
  },
  {
    question: 'What do I need to start a fundraiser on CrowdChain?',
    answer:
      'You need a valid cause or reason for fundraising, a bank account for receiving donations, and a project description with relevant details.',
  },
  {
    question: 'When will I receive the raised funds?',
    answer:
      'Funds are typically disbursed after the campaign ends and the required compliance checks are completed.',
  },
  {
    question: 'What makes me ineligible to raise money online on donation platforms?',
    answer:
      'If your cause doesn’t comply with legal guidelines or if the funds are being used for unethical purposes, you may be ineligible.',
  },
  {
    question: 'Who should I contact if I have more questions about online crowdfunding?',
    answer:
      'You can contact the support team of the platform directly through their website or help desk.',
  },
  {
    question: "I don't see the medical treatment I want to raise funds for, what should I do?",
    answer:
      'Contact the support team for assistance or consider selecting a similar medical treatment category for your fundraiser.',
  },
  {
    question: 'What is the difference between medical crowdfunding and medical loans?',
    answer:
      'Medical crowdfunding raises money through donations, while medical loans involve borrowing funds that must be repaid with interest.',
  },
  {
    question: 'Why is CrowdChain the best fundraising platform to raise money for medical causes?',
    answer:
      'CrowdChain specializes in medical fundraising, offering tailored support, legal compliance, and low-cost platform fees.',
  },
  {
    question: 'How does crowdfunding help when I need money for my treatment?',
    answer:
      'Crowdfunding helps by gathering small donations from a large number of people, making it easier to raise large sums for medical treatment.',
  },
  {
    question: 'Is CrowdChain a donation platform?',
    answer:
      'Yes, CrowdChain is a donation platform that facilitates medical fundraising, personal causes, and charity initiatives.',
  },
  {
    question: 'How can I create a fundraiser to get donations on CrowdChain?',
    answer:
      'You can easily create a fundraiser by signing up on CrowdChain’s website and following the steps to set up a campaign.',
  },
  {
    question: 'I need donations urgently to raise funds for my medical treatment. How can CrowdChain help me fundraise?',
    answer:
      'CrowdChain offers expedited campaign approval and promotion to help raise funds as quickly as possible.',
  },
  {
    question: 'Is medical fundraising a good way to reduce my medical bills and help pay for my treatment expenses?',
    answer:
      'Yes, medical fundraising can significantly reduce your treatment bills by gathering funds from donors who want to help.',
  },
  {
    question: 'How can I accept donations for my medical expenses on CrowdChain?',
    answer:
      'You can set up a fundraiser on CrowdChain, and donations will be directed to your designated bank account.',
  },
  {
    question: 'What are other donation platforms in India?',
    answer:
      'Some other donation platforms in India include Milaap, Ketto, and GoFundMe.',
  },
  {
    question: 'Treatment expenses for which diseases can be covered through medical fundraising?',
    answer:
      'You can raise funds for a wide range of treatments, including cancer, surgery, critical illnesses, and emergency medical care.',
  },
  {
    question: 'How is CrowdChain different from Go Fund Me?',
    answer:
      'CrowdChain focuses specifically on medical fundraising and offers localized support for Indian campaigns, while GoFundMe has a broader international focus.',
  },
  {
    question: 'How else can I finance my medical treatment expenses apart from medical fundraising?',
    answer:
      'You can explore medical loans, insurance, or government financial assistance programs for additional support.',
  },
  {
    question: 'Can I finance my cancer treatment on CrowdChain?',
    answer:
      'Yes, CrowdChain specializes in raising funds for cancer treatment and provides tailored support for such causes.',
  },
  {
    question: 'Can I raise money for my surgery on CrowdChain?',
    answer:
      'Yes, you can raise funds for surgeries on CrowdChain. Simply set up a campaign with the surgery details.',
  },
  {
    question: 'Is raising funds for medical expenses safe on CrowdChain?',
    answer:
      'Yes, CrowdChain ensures that funds are used for legitimate medical expenses and complies with legal standards.',
  },
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 px-5 md:px-10 bg-gray-50 font-epilogue">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">FAQs</h2>
        <p className="text-lg text-gray-600">
          Find answers to the most common questions about crowdfunding and how it works.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 md:p-6 rounded-xl shadow-sm border hover:shadow-md transition duration-200"
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full flex items-center justify-between text-left"
              aria-expanded={activeIndex === index}
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              <span className="text-yellow-500">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                activeIndex === index ? 'max-h-screen mt-3' : 'max-h-0'
              }`}
            >
              <p className="text-gray-700 text-sm">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
