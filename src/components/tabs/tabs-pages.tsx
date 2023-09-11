import React from 'react';

interface TabsPagesProps {
  active: number;
  children: React.ReactElement[] | null;
}

const TabsPages = ({active, children}: TabsPagesProps) => {
  let el = null;

  React.Children.forEach(children, (child, idx) => {
    if (idx === active) el = child;
  });

  return el;
};

export {TabsPages};
