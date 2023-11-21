import { getPokemonType } from "@/lib/pokeapi";

const allTypes: string[] = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

type TypeTT = {
  [key: string]: {
    name: string;
    multiplier: number;
  };
};

let TypeMultiDictionary: TypeTT = {
  normal: {
    name: "normal",
    multiplier: 1,
  },
  fighting: {
    name: "fighting",
    multiplier: 1,
  },
  flying: {
    name: "flying",
    multiplier: 1,
  },
  poison: {
    name: "poison",
    multiplier: 1,
  },
  ground: {
    name: "ground",
    multiplier: 1,
  },
  rock: {
    name: "rock",
    multiplier: 1,
  },
  bug: {
    name: "bug",
    multiplier: 1,
  },
  ghost: {
    name: "ghost",
    multiplier: 1,
  },
  steel: {
    name: "steel",
    multiplier: 1,
  },
  fire: {
    name: "fire",
    multiplier: 1,
  },
  water: {
    name: "water",
    multiplier: 1,
  },
  grass: {
    name: "grass",
    multiplier: 1,
  },
  electric: {
    name: "electric",
    multiplier: 1,
  },
  psychic: {
    name: "psychic",
    multiplier: 1,
  },
  ice: {
    name: "ice",
    multiplier: 1,
  },
  dragon: {
    name: "dragon",
    multiplier: 1,
  },
  dark: {
    name: "dark",
    multiplier: 1,
  },
  fairy: {
    name: "fairy",
    multiplier: 1,
  },
};

export async function TypeFinalCheck(type1: string, type2: string) {
  TypeMultiDictionary = {
    normal: {
      name: "normal",
      multiplier: 1,
    },
    fighting: {
      name: "fighting",
      multiplier: 1,
    },
    flying: {
      name: "flying",
      multiplier: 1,
    },
    poison: {
      name: "poison",
      multiplier: 1,
    },
    ground: {
      name: "ground",
      multiplier: 1,
    },
    rock: {
      name: "rock",
      multiplier: 1,
    },
    bug: {
      name: "bug",
      multiplier: 1,
    },
    ghost: {
      name: "ghost",
      multiplier: 1,
    },
    steel: {
      name: "steel",
      multiplier: 1,
    },
    fire: {
      name: "fire",
      multiplier: 1,
    },
    water: {
      name: "water",
      multiplier: 1,
    },
    grass: {
      name: "grass",
      multiplier: 1,
    },
    electric: {
      name: "electric",
      multiplier: 1,
    },
    psychic: {
      name: "psychic",
      multiplier: 1,
    },
    ice: {
      name: "ice",
      multiplier: 1,
    },
    dragon: {
      name: "dragon",
      multiplier: 1,
    },
    dark: {
      name: "dark",
      multiplier: 1,
    },
    fairy: {
      name: "fairy",
      multiplier: 1,
    },
  };
  const type1Obj = await getPokemonType(type1);
  const type2Obj = await getPokemonType(type2);
  type1Obj.damage_relations.double_damage_from.map((doubleDamagefrom: any) => {
    TypeMultiDictionary[doubleDamagefrom.name].multiplier *= 2;
  });

  type1Obj.damage_relations.half_damage_from.map((halfDamagefrom: any) => {
    TypeMultiDictionary[halfDamagefrom.name].multiplier *= 0.5;
  });

  type1Obj.damage_relations.no_damage_from.map((noDamagefrom: any) => {
    TypeMultiDictionary[noDamagefrom.name].multiplier *= 0;
  });

  if (type2Obj.name !== type1Obj.name) {
    type2Obj.damage_relations.double_damage_from.map(
      (doubleDamagefrom: any) => {
        TypeMultiDictionary[doubleDamagefrom.name].multiplier *= 2;
      },
    );

    type2Obj.damage_relations.half_damage_from.map((halfDamagefrom: any) => {
      TypeMultiDictionary[halfDamagefrom.name].multiplier *= 0.5;
    });

    type2Obj.damage_relations.no_damage_from.map((noDamagefrom: any) => {
      TypeMultiDictionary[noDamagefrom.name].multiplier *= 0;
    });
  }

  //console.log("TypeMultiDictionary", TypeMultiDictionary);
  allTypes.map((type: string) => {
    const element = document.getElementById(type + "dmgdata");
    if (element) {
      element.innerHTML = TypeMultiDictionary[type].multiplier.toString();
    }
  });
  const element = document.getElementById("Type1&Typ2show");
  if (element) {
    element.innerHTML =
      type1Obj.name.charAt(0).toUpperCase() +
      type1Obj.name.slice(1) +
      " + " +
      type2Obj.name.charAt(0).toUpperCase() +
      type2Obj.name.slice(1);
  }
}
