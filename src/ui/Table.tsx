import {
  type PropsWithChildren,
  createContext,
  useContext,
  type ReactNode,
} from 'react';

type Table = {
  columns: string;
};

const TableContext = createContext<Table>({ columns: '' });

function Table({ children, columns }: Table & PropsWithChildren) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className='border border-gray-300 rounded-md overflow-hidden dark:border-gray-700'
        role='table'
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: PropsWithChildren) {
  const { columns } = useContext(TableContext);

  return (
    <div
      className={`grid ${columns} border-b dark:border-b-gray-700 py-2 gap-x-4 font-semibold items-center text-slate-700 dark:bg-gray-900 dark:text-slate-50`}
      role='header'
    >
      {children}
    </div>
  );
}

function Body<T>({
  data,
  render,
  error,
}: {
  data: T[];
  render: (item: T) => ReactNode;
  error?: Error | null;
}): ReactNode {
  if ((!data || data.length === 0) && error) {
    return (
      <p className='flex items-center justify-center font-medium px-2 py-4 bg-gray-50 text-slate-700 text-lg dark:bg-gray-800 dark:text-slate-50'>
        {error.message}
      </p>
    );
  }

  if ((!data || data.length === 0) && !error)
    return (
      <p className='flex items-center justify-center font-medium px-2 py-4 bg-gray-50 text-red-500 text-lg dark:text-slate-50'>
        هنوز داده ای ایجاد نشده است.
      </p>
    );

  return (
    <div className='divide-y text-slate-700 dark:text-slate-50 dark:divide-gray-700'>
      {data.map(render)}
    </div>
  );
}

function Row({ children }: PropsWithChildren) {
  const { columns } = useContext(TableContext);

  return (
    <div
      className={`relative grid ${columns} bg-gray-50 py-1 items-center gap-x-4 dark:bg-gray-800 dark:text-slate-50`}
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
