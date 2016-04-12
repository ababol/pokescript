'use strict';

import fetch from 'node-fetch';

async function fetchPokemon(q) {
  let response = await fetch(`http://babol.me:3333/api/v1/pokemon/search?q=${q}`);
  let json = await response.json();
  return json[0];
}

export async function getPokemonPrevo(qString) {
  let isAPrevo = false;
  let isFirstFetch = true;
  let result = [];
  let q = qString;

  while (isFirstFetch || isAPrevo) {
    let pokemon = await fetchPokemon(q);
    let pId = pokemon.pkdx_id;
    if (q !== qString)   {
      isFirstFetch = false;
    }

    isAPrevo = pokemon.evolutions.some(function(p) {
      return p.pkdx_id === pId + 1;
    });

    if (isAPrevo) {
      result.push(pokemon);
    }

    q = pId - 1;
  }

  return result;
}
