const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-aigle-text text-sm">
            <p>Contact: support@aigle-system.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div className="text-aigle-text text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} AIGLE System. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;