function Footer() {
  return (
    <footer className="text-gray-600 border-t-[1px] body-font">
      <div className="bg-gray-100">
        <div className="container mx-auto py-8 px-8 flex flex-row items-center justify-center sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} FreshNest
          </p>
          <div className="flex-grow"></div>

    
        </div>
      </div>
    </footer>
  );
}

export default Footer;
