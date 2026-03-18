import "../assets/styles/footer.css";
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-gradient">
      <p>© {year} ProjectShare. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
