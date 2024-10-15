// import React, { useEffect, useState } from "react";
// import { FaGithub } from "react-icons/fa6";
// import { FaLinkedin } from "react-icons/fa";
// import { FaInstagramSquare } from "react-icons/fa";
// import { GiCharacter } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import { TypeAnimation } from "react-type-animation";

// const Footer = () => {
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [scrollDirection, setScrollDirection] = useState("down");

//   const controlFooter = () => {
//     const currentScrollY = window.scrollY;

//     if (currentScrollY > lastScrollY) {
//       setScrollDirection("down"); // Scrolling down
//     } else {
//       setScrollDirection("up"); // Scrolling up
//     }

//     setLastScrollY(currentScrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", controlFooter);
//     return () => {
//       window.removeEventListener("scroll", controlFooter);
//     };
//   }, [lastScrollY]);
//   return (
//     // <footer className="w-full bg-gray-200 md:fixed bottom-0 left-0">
//     //   <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly px-4 gap-2 h-[100px] md:h-auto w-full py-3">
//     //     {/* { shows on long screen only} */}
//     //     <div className="h-full hidden md:flex gap-1 md:w-1/2">
//     //       <p>Welcome!</p>
//     //       <TypeAnimation
//     //         className="transition-all ease-in-out"
//     //         sequence={[
//     //           "Experience the perfect blend of quality and affordability, crafted just for you.",
//     //           2000,
//     //           "Your One-Stop Shop for the Latest Tech: Premium Gadgets at Unbeatable Prices.",
//     //           2000,
//     //         ]}
//     //         wrapper="span"
//     //         speed={50}
//     //         repeat={Infinity}
//     //       />
//     //     </div>

//     //     {/* {shows on small screen only} */}
//     //     <div className="h-1/2 md:hidden">
//     //       <div className="h-full flex gap-1 w-full">
//     //         <p>Welcome!</p>
//     //         <TypeAnimation
//     //           className="transition-all ease-in-out"
//     //           sequence={[
//     //             "Where quality meets affordability.",
//     //             2000,
//     //             "Where innovation meets affordability.",
//     //             2000,
//     //           ]}
//     //           wrapper="span"
//     //           speed={50}
//     //           repeat={Infinity}
//     //         />
//     //       </div>
//     //     </div>

//     //     <div className="flex md:flex-row gap-6 md:gap-5 text-xl">
//     //       <Link
//     //         to="https://github.com/jhaman-09"
//     //         className="hover:animate-glow rounded-full hover:text-primary transition-all"
//     //       >
//     //         <FaGithub />
//     //       </Link>
//     //       <Link
//     //         to="https://www.linkedin.com/in/aman-kumar-jha-3b254823b/"
//     //         className="hover:animate-glow rounded-full hover:text-primary transition-all"
//     //       >
//     //         <FaLinkedin />
//     //       </Link>
//     //       <Link
//     //         to="https://www.instagram.com/a_manj9/"
//     //         className="hover:animate-glow rounded-full hover:text-primary transition-all"
//     //       >
//     //         <FaInstagramSquare />
//     //       </Link>
//     //       <Link
//     //         to="https://jhaman-09.github.io/portfolio/"
//     //         className="hover:animate-glow rounded-full hover:text-primary transition-all"
//     //       >
//     //         <GiCharacter />
//     //       </Link>
//     //     </div>

//     //     <div className="text-center">
//     //       <p className="text-sm text-gray-500 text-center hover:text-black transition-all">
//     //         &copy; {new Date().getFullYear()} Aman Kumar Jha. All rights
//     //         reserved.
//     //       </p>
//     //     </div>
//     //   </div>
//     // </footer>

//   );
// };

// export default Footer;



import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { GiCharacter } from "react-icons/gi";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Footer = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const controlFooter = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setScrollDirection("down"); // Scrolling down
    } else {
      setScrollDirection("up"); // Scrolling up
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlFooter);
    return () => {
      window.removeEventListener("scroll", controlFooter);
    };
  }, [lastScrollY]);

  return (
    <footer
      id="footer"
      className={`fixed bottom-0 left-0 w-full bg-gray-200 transition-transform duration-300 ${
        scrollDirection === "up" ? "show-footer" : "hide-footer"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly px-4 gap-2 h-[100px] md:h-auto w-full py-3">
        {/* Shows on long screen only */}
        <div className="h-full hidden md:flex gap-1 md:w-1/2">
          <p>Welcome!</p>
          <TypeAnimation
            className="transition-all ease-in-out"
            sequence={[
              "Experience the perfect blend of quality and affordability, crafted just for you.",
              2000,
              "Your One-Stop Shop for the Latest Tech: Premium Gadgets at Unbeatable Prices.",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* Shows on small screen only */}
        <div className="h-1/2 md:hidden">
          <div className="h-full flex gap-1 w-full">
            <p>Welcome!</p>
            <TypeAnimation
              className="transition-all ease-in-out"
              sequence={[
                "Where quality meets affordability.",
                2000,
                "Where innovation meets affordability.",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        </div>

        <div className="flex md:flex-row gap-6 md:gap-5 text-xl">
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

        <div className="text-center">
          <p className="text-sm text-gray-500 text-center hover:text-black transition-all">
            &copy; {new Date().getFullYear()} Aman Kumar Jha. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

