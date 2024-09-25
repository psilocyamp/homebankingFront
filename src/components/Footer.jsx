import React from 'react'
import SocialMediaLinks from './SocialMediaLinks';

const socialMediaData = [
  {
    name: 'Instagram',
    url: '#',
    logo: '/iglogo.png'
  },
  {
    name: 'Facebook',
    url: '#',
    logo: '/fblogo.png'
  },
  {
    name: 'WhatsApp',
    url: '#',
    logo: '/wpplogo.png'
  }
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="flex flex-col items-center space-y-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-between sm:space-y-0 lg:py-12">
        
      <p className="text-sm text-gray-700 text-center">
          Open-source{" "}
          <a href="https://github.com/psilocyamp/HTML-MindHub" target="_blank" rel="noreferrer" className="text-[#8b52ff] hover:underline">
            code
          </a>{" "}
          by{" "}
          <a href="https://www.linkedin.com/in/amparo-p%C3%A9rez/" target="_blank" rel="noreferrer" className="text-[#8b52ff] hover:underline">
            Amparo Perez
          </a>
        </p>
        
        <SocialMediaLinks links={socialMediaData} />

      </div>
    </footer>
  );
}

export default Footer;


  
