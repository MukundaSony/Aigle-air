import React from 'react';

export const ChartContainer = ({ children, className, config }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};