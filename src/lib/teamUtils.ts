import { Pokemon } from './types';

const ALL_TYPES = [
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
  'normal',
];

/**
 * Adiciona um pokémon à equipe se houver espaço (< 6) e não houver duplicata
 */
export function addToTeam(team: Pokemon[], pokemon: Pokemon): Pokemon[] {
  if (team.length >= 6) {
    return [...team];
  }
  if (team.some(p => p.id === pokemon.id)) {
    return [...team];
  }
  return [...team, pokemon];
}

/**
 * Remove um pokémon da equipe pelo ID
 */
export function removeFromTeam(team: Pokemon[], pokemonId: number): Pokemon[] {
  return team.filter(p => p.id !== pokemonId);
}

/**
 * Retorna todos os tipos únicos cobertos pela equipe
 */
export function getTypeCoverage(team: Pokemon[]): string[] {
  const types = new Set<string>();
  team.forEach(pokemon => {
    pokemon.types.forEach(typeWrapper => {
      types.add(typeWrapper.type.name);
    });
  });
  return Array.from(types);
}

/**
 * Retorna os tipos NÃO cobertos por nenhum membro da equipe
 */
export function getCoverageGaps(team: Pokemon[]): string[] {
  const coverage = getTypeCoverage(team);
  return ALL_TYPES.filter(type => !coverage.includes(type));
}
