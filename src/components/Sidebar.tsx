import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaChartLine, FaCogs, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar(): JSX.Element {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      {/* App Title */}
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">Fin360</h2>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 p-4">
        <Link
          to="/"
          className="flex items-center hover:bg-gray-700 p-2 rounded"
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </Link>
        <Link
          to="/analytics"
          className="flex items-center hover:bg-gray-700 p-2 rounded"
        >
          <FaChartLine className="mr-3" />
          Analytics
        </Link>
        <Link
          to="/settings"
          className="flex items-center hover:bg-gray-700 p-2 rounded"
        >
          <FaCogs className="mr-3" />
          Settings
        </Link>
        <Link
          to="/login"
          className="flex items-center hover:bg-gray-700 p-2 rounded"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </Link>
      </nav>
    </aside>
  );
}
