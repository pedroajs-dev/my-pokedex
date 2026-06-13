import { Pokemon } from './types';
import {
  addToTeam,
  removeFromTeam,
  getTypeCoverage,
  getCoverageGaps,
} from './teamUtils';

// Mock Pokemon data
const createPokemon = (id: number, name: string, types: string[]): Pokemon => ({
  id,
  name,
  types: types.map((t) => ({ slot: 0, type: { name: t, url: '' } })),
  sprites: {
    front_default: '',
    front_shiny: null,
    back_default: null,
    other: {
      'official-artwork': {
        front_default: '',
        front_shiny: null,
      },
    },
  },
  height: 1,
  weight: 1,
  base_experience: null,
  stats: [],
  abilities: [],
});

describe('teamUtils', () => {
  describe('addToTeam', () => {
    it('deve adicionar um pokémon a uma equipe vazia', () => {
      const team: Pokemon[] = [];
      const pikachu = createPokemon(25, 'Pikachu', ['electric']);
      const result = addToTeam(team, pikachu);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(25);
    });

    it('deve adicionar múltiplos pokémon até 6', () => {
      let team: Pokemon[] = [];
      for (let i = 1; i <= 6; i++) {
        team = addToTeam(team, createPokemon(i, `Pokémon${i}`, ['normal']));
      }
      expect(team).toHaveLength(6);
    });

    it('não deve adicionar pokémon se a equipe já tem 6', () => {
      let team: Pokemon[] = [];
      for (let i = 1; i <= 6; i++) {
        team = addToTeam(team, createPokemon(i, `Pokémon${i}`, ['normal']));
      }
      const seventh = createPokemon(7, 'Charizard', ['fire', 'flying']);
      const result = addToTeam(team, seventh);
      expect(result).toHaveLength(6);
    });

    it('não deve adicionar pokémon duplicado', () => {
      const pikachu = createPokemon(25, 'Pikachu', ['electric']);
      let team = addToTeam([], pikachu);
      const result = addToTeam(team, pikachu);
      expect(result).toHaveLength(1);
    });

    it('deve retornar uma nova array (imutável)', () => {
      const team: Pokemon[] = [];
      const pikachu = createPokemon(25, 'Pikachu', ['electric']);
      const result = addToTeam(team, pikachu);
      expect(result).not.toBe(team);
    });
  });

  describe('removeFromTeam', () => {
    it('deve remover pokémon existente da equipe', () => {
      const pikachu = createPokemon(25, 'Pikachu', ['electric']);
      const charizard = createPokemon(6, 'Charizard', ['fire', 'flying']);
      const team = [pikachu, charizard];
      const result = removeFromTeam(team, 25);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(6);
    });

    it('deve retornar a mesma equipe se pokémon não existe', () => {
      const pikachu = createPokemon(25, 'Pikachu', ['electric']);
      const team = [pikachu];
      const result = removeFromTeam(team, 999);
      expect(result).toHaveLength(1);
    });

    it('deve remover de uma equipe vazia sem erro', () => {
      const result = removeFromTeam([], 25);
      expect(result).toHaveLength(0);
    });

    it('deve remover apenas o pokémon correto', () => {
      const p1 = createPokemon(1, 'Bulbasaur', ['grass', 'poison']);
      const p2 = createPokemon(4, 'Charmander', ['fire']);
      const p3 = createPokemon(7, 'Squirtle', ['water']);
      const team = [p1, p2, p3];
      const result = removeFromTeam(team, 4);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(7);
    });

    it('deve retornar uma nova array (imutável)', () => {
      const pikachu = createPokemon(25, 'Pikachu', ['electric']);
      const team = [pikachu];
      const result = removeFromTeam(team, 25);
      expect(result).not.toBe(team);
    });
  });

  describe('getTypeCoverage', () => {
    it('deve retornar tipos únicos de uma equipe', () => {
      const team = [
        createPokemon(25, 'Pikachu', ['electric']),
        createPokemon(6, 'Charizard', ['fire', 'flying']),
      ];
      const result = getTypeCoverage(team);
      expect(result).toContain('electric');
      expect(result).toContain('fire');
      expect(result).toContain('flying');
    });

    it('não deve ter duplicatas de tipos', () => {
      const team = [
        createPokemon(1, 'Bulbasaur', ['grass', 'poison']),
        createPokemon(69, 'Bellsprout', ['grass', 'poison']),
      ];
      const result = getTypeCoverage(team);
      const grass = result.filter((t) => t === 'grass');
      const poison = result.filter((t) => t === 'poison');
      expect(grass).toHaveLength(1);
      expect(poison).toHaveLength(1);
    });

    it('deve retornar array vazia para equipe vazia', () => {
      const result = getTypeCoverage([]);
      expect(result).toHaveLength(0);
    });

    it('deve retornar todos os tipos cobertos em ordem consistente', () => {
      const team = [
        createPokemon(25, 'Pikachu', ['electric']),
        createPokemon(1, 'Bulbasaur', ['grass', 'poison']),
        createPokemon(4, 'Charmander', ['fire']),
      ];
      const result = getTypeCoverage(team);
      expect(result.length).toBe(4);
      expect(new Set(result)).toEqual(new Set(['electric', 'grass', 'poison', 'fire']));
    });
  });

  describe('getCoverageGaps', () => {
    it('deve retornar tipos não cobertos pela equipe', () => {
      const team = [createPokemon(25, 'Pikachu', ['electric'])];
      const result = getCoverageGaps(team);
      expect(result).toContain('fire');
      expect(result).toContain('water');
      expect(result).toContain('grass');
      expect(result).not.toContain('electric');
    });

    it('deve retornar todos os 18 tipos para equipe vazia', () => {
      const result = getCoverageGaps([]);
      expect(result).toHaveLength(18);
      expect(result).toContain('fire');
      expect(result).toContain('water');
      expect(result).toContain('grass');
      expect(result).toContain('electric');
      expect(result).toContain('ice');
      expect(result).toContain('fighting');
      expect(result).toContain('poison');
      expect(result).toContain('ground');
      expect(result).toContain('flying');
      expect(result).toContain('psychic');
      expect(result).toContain('bug');
      expect(result).toContain('rock');
      expect(result).toContain('ghost');
      expect(result).toContain('dragon');
      expect(result).toContain('dark');
      expect(result).toContain('steel');
      expect(result).toContain('fairy');
      expect(result).toContain('normal');
    });

    it('deve retornar array vazia se equipe cobre todos os tipos', () => {
      const team = [
        createPokemon(1, 'Bulbasaur', ['grass', 'poison']),
        createPokemon(4, 'Charmander', ['fire']),
        createPokemon(7, 'Squirtle', ['water']),
        createPokemon(25, 'Pikachu', ['electric']),
        createPokemon(86, 'Seel', ['ice']),
        createPokemon(66, 'Machop', ['fighting']),
        createPokemon(95, 'Onix', ['rock', 'ground']),
        createPokemon(16, 'Pidgeot', ['flying']),
        createPokemon(63, 'Abra', ['psychic']),
        createPokemon(10, 'Caterpie', ['bug']),
        createPokemon(92, 'Gastly', ['ghost']),
        createPokemon(147, 'Dratini', ['dragon']),
        createPokemon(58, 'Growlithe', ['fire']),
        createPokemon(133, 'Eevee', ['normal']),
        createPokemon(81, 'Magnemite', ['steel']),
        createPokemon(175, 'Togepi', ['fairy']),
        createPokemon(228, 'Houndour', ['dark', 'fire']),
      ];
      const result = getCoverageGaps(team);
      expect(result).toHaveLength(0);
    });

    it('deve não conter duplicatas', () => {
      const team = [createPokemon(25, 'Pikachu', ['electric'])];
      const result = getCoverageGaps(team);
      const unique = new Set(result);
      expect(result).toHaveLength(unique.size);
    });
  });
});
