import { HTMLAttributes } from 'react';

const List = ({ children }: HTMLAttributes<HTMLElement>) => (
  <div className="text-slate-50">{children}</div>
);

export default List;
