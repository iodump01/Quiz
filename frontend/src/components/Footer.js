import React, { Fragment } from "react";
import { AiOutlineFacebook, AiOutlineGithub, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <Fragment>
      <footer className="text-center bg-gray-900 text-white">
        <div className="container mx-auto px-1 lg:px-6 pt-6">
          <div className="flex flex-wrap justify-center items-center mb-6">
            <a className="mx-2" href={'https://github.com/iodump01'}>
                <AiOutlineGithub className="text-2xl" />
            </a>
            <a className="mx-2" href={'https://instagram.com/iodump01'}>
                <AiOutlineInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright: 
          <a className="text-whitehite ml-2" href="https://tailwind-elements.com/">
            CyberTronic
          </a>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
