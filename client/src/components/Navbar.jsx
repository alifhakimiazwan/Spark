const Navbar = ({ scrollToRef }) => {
  const handleGetStartedClick = () => {
    if (scrollToRef && scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto  lg:justify-between xl:px-1">
        {/* Logo  */}
        <a href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            <span>
              <a className="text-black">Spark</a>
            </span>
          </span>
        </a>

        {/* get started  */}
        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          <div className="hidden mr-3 lg:flex nav__item">
            <button
              onClick={handleGetStartedClick}
              className="btn px-6 py-2 font-light text-white bg-teal hover:bg-teal-600 rounded-md md:ml-5"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
