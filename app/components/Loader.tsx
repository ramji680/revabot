import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-4 h-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
