import {
  getPokemonPrevo
} from './pokemon';

const pokemon = process.argv.pop();

getPokemonPrevo(pokemon).then((result) => {
  const preEvos = result.map((pok) => {
    return pok.name;
  });
  console.log(`There is ${result.length} pre-evolution(s) of ${pokemon} : ${preEvos.join(', ')}`);
});
