import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-[#38a169]">AIGLE</span>
          <span className="text-[#1a202c]">System</span>
        </Link>
        
        <nav className="flex gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-[#38a169] ${
              isActive('/') ? 'text-[#38a169]' : 'text-[#718096]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-[#38a169] ${
              isActive('/dashboard') ? 'text-[#38a169]' : 'text-[#718096]'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/control-panel"
            className={`text-sm font-medium transition-colors hover:text-[#38a169] ${
              isActive('/control-panel') ? 'text-[#38a169]' : 'text-[#718096]'
            }`}
          >
            Control Panel
          </Link>
          <Link
            to="/ai-chat"
            className={`text-sm font-medium transition-colors hover:text-[#38a169] ${
              isActive('/ai-chat') ? 'text-[#38a169]' : 'text-[#718096]'
            }`}
          >
            AI Chat
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;