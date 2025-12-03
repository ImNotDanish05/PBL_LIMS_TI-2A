export default function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-6 border border-gray-100 hover:border-primary-hijauTerang group">
      {Icon && (
        <div className="bg-gradient-to-br from-primary-hijauTerang to-primary-hijauTerang/80 p-4 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} className="text-primary-hijauTua" />
        </div>
      )}

      <div className="flex-1">
        <p className="text-primary-hijauTua/70 font-semibold text-sm uppercase tracking-wide mb-1">
          {stat.title}
        </p>
        <p className="text-4xl font-bold text-primary-hijauTua bg-gradient-to-r from-primary-hijauTua to-primary-hijauTua/80 bg-clip-text">
          {stat.value}
        </p>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 bg-primary-hijauTerang/5 rounded-full blur-2xl -z-10 group-hover:bg-primary-hijauTerang/10 transition-colors duration-300" />
    </div>
  );
}