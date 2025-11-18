import { Link, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export default function Create() {
  const { fields = [], resource = 'sample', flash = {} } = usePage().props;
  const initial = useMemo(() => {
    const obj = {};
    fields.forEach((f) => (obj[f] = ''));
    return obj;
  }, [fields]);

  const form = useForm(initial);

  function submit(e) {
    e.preventDefault();
    form.post(route(`${resource}.store`));
  }

  return (
    <div className="p-4 max-w-3xl">
      {(flash.success || flash.error) && (
        <div className={`mb-4 rounded px-4 py-2 text-sm ${flash.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {flash.success || flash.error}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Create</h1>
      <form onSubmit={submit} className="space-y-4">
        {fields.map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium mb-1">{f}</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              value={form.data[f] ?? ''}
              onChange={(e) => form.setData(f, e.target.value)}
            />
            {form.errors[f] && (
              <div className="text-red-600 text-sm mt-1">{form.errors[f]}</div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={form.processing}>
            Save
          </button>
          <Link href={route(`${resource}.index`)} className="text-gray-700">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
