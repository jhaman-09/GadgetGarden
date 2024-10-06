import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { GiCharacter } from "react-icons/gi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto flex flex-col items-center justify-center p-4">
        <p
          className="text-center font-semibold shadow-sm py-1 px-4"
          title="Aman Kumar Jha border"
        >
          Welcome! Experience the perfect blend of quality and affordability,
          crafted just for you.
        </p>

        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col md:flex-row justify-between items-center md:gap-8">
            <div className="flex md:flex-row gap-4 mt-2 text-xl">
              <Link
                to="https://github.com/jhaman-09"
                className="hover:animate-glow rounded-full hover:text-primary transition-all"
              >
                <FaGithub />
              </Link>
              <Link
                to="https://www.linkedin.com/in/aman-kumar-jha-3b254823b/"
                className="hover:animate-glow rounded-full hover:text-primary transition-all"
              >
                <FaLinkedin />
              </Link>
              <Link
                to="https://www.instagram.com/a_manj9/"
                className="hover:animate-glow rounded-full hover:text-primary transition-all"
              >
                <FaInstagramSquare />
              </Link>
              <Link
                to="https://jhaman-09.github.io/portfolio/"
                className="hover:animate-glow rounded-full hover:text-primary transition-all"
              >
                <GiCharacter />
              </Link>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 hover:text-black transition-all">
                &copy; {new Date().getFullYear()} Aman Kumar Jha. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
