import { HTMLAttributes } from 'react';

const List = ({ children, className }: HTMLAttributes<HTMLElement>) => (
  <div className={`${className} text-slate-50`}>{children}</div>
);

export default List;
