import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Fin360</h1>
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
