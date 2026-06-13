'use client';

interface HeaderProps {
  search: string;
  onSearch: (value: string) => void;
  onRandom: () => void;
  showOnlyFavorites: boolean;
  onToggleFavoritesFilter: (show: boolean) => void;
  favoriteCount: number;
  loadedCount: number;
  totalCount: number;
}

export default function Header({
  search,
  onSearch,
  onRandom,
  showOnlyFavorites,
  onToggleFavoritesFilter,
  favoriteCount,
  loadedCount,
  totalCount,
}: HeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-[#1e2038] bg-[#0a0b15] px-4 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-xl" aria-hidden="true">🔴</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-100">Pokédex Starter</p>
          <p className="text-[11px] text-slate-500">Build features step by step in the lab.</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or Pokédex number..."
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1a1b2e] border border-[#2a2d4a] rounded-lg text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <button
        onClick={onRandom}
        className="shrink-0 px-3 py-1.5 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        title="Select a random Pokémon"
      >
        🎲 Random
      </button>

      <button
        onClick={() => onToggleFavoritesFilter(!showOnlyFavorites)}
        className={`shrink-0 px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
          showOnlyFavorites
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-[#2a2d4a] text-slate-200 hover:bg-[#3a3d5a]'
        }`}
        title={showOnlyFavorites ? 'Show all Pokémon' : 'Show only favorites'}
      >
        ❤️ {favoriteCount}
      </button>

      <div className="shrink-0 text-right">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Loaded</p>
        <p className="text-sm font-bold text-slate-200">{loadedCount} / {totalCount}</p>
      </div>
    </header>
  );
}
