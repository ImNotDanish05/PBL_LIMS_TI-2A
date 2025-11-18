import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { data = [], resource = 'supplier', flash = {} } = usePage().props;
  const title = resource.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <div className="p-4">
      {(flash.success || flash.error) && (
        <div className={`mb-4 rounded px-4 py-2 text-sm ${flash.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {flash.success || flash.error}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link href={route(`${resource}.create`)} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="border px-3 py-2 text-left">{col}</th>
              ))}
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {(!data || data.length === 0) && (
              <tr>
                <td className="px-3 py-2 border text-center" colSpan={columns.length + 1}>No data</td>
              </tr>
            )}
            {data && data.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                {columns.map((col) => (
                  <td key={`${item.id}-${col}`} className="border px-3 py-2">{String(item[col] ?? '')}</td>
                ))}
                <td className="border px-3 py-2 space-x-3">
                  <Link href={route(`${resource}.show`, item.id)} className="text-yellow-600">
                    Show
                  </Link>
                  <Link href={route(`${resource}.edit`, item.id)} className="text-blue-600">Edit</Link>
                  <Link as="button" method="delete" href={route(`${resource}.destroy`, item.id)} className="text-red-600">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
