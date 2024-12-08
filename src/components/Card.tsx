import React from 'react';

type CardProps = {
  title: string;
  value: string | number;
  icon?: JSX.Element;
};

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
    </div>
  );
};

export default Card;
