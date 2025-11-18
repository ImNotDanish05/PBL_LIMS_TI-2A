import { Link, usePage } from '@inertiajs/react';

export default function Show() {
  const { item = {}, resource = 'n_order_sample', flash = {} } = usePage().props;
  const entries = Object.entries(item || {});

  return (
    <div className="p-4 max-w-3xl">
      {(flash.success || flash.error) && (
        <div className={`mb-4 rounded px-4 py-2 text-sm ${flash.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {flash.success || flash.error}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <tbody>
            {entries.length === 0 && (
              <tr>
                <td className="border px-3 py-2">No data</td>
              </tr>
            )}
            {entries.map(([key, value]) => (
              <tr key={key} className="odd:bg-white even:bg-gray-50">
                <th className="w-48 border px-3 py-2 text-left bg-gray-100">{key}</th>
                <td className="border px-3 py-2">{String(value ?? '')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 space-x-3">
        <Link href={route(`${resource}.index`)} className="text-gray-700">Back</Link>
        {item?.id && (
          <Link href={route(`${resource}.edit`, item.id)} className="text-blue-600">Edit</Link>
        )}
      </div>
    </div>
  );
}
