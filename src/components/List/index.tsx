import { HTMLAttributes } from 'react';

const List = ({ children, className }: HTMLAttributes<HTMLElement>) => (
  // try to play with neumorphism-border px-8 py-0 mt-8
  <div className={`${className} text-slate-50 scroll-smooth`}>
    {children}
  </div>
);

export default List;
