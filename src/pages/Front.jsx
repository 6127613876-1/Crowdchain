// FrontPage.js
import React from 'react';
import {
  NavbarHome,
  Header,
  Why,
  FundTypes,
  Start,
  Define,
  HowWorks,
  Faqs,
  Footer,
} from '../components';

const FrontPage = () => {
  return (
    <main className="w-full min-h-screen bg-white text-black">
      <NavbarHome />
      <Header />
      <Why />
      <FundTypes />
      <Start />
      <Define />
      <HowWorks />
      <Faqs />
      <Footer />
    </main>
  );
};

export default FrontPage;
