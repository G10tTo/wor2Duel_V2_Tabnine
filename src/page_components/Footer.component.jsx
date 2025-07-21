import Fs from "../styles/Footer.module.css";

/**
 * Footer component
 * 
 * This component renders the footer of the application.
 * It displays a copyright notice with the current year and the author's name.
 * 
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer = () => {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className={Fs.footer}>
      {/* Copyright notice */}
      <p className={Fs.copyrightText}>
        &copy; {currentYear} Andrea Sargiotto. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;