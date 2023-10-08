// define our parent property accessible via globalThis. Also apply the TypeScript type.
var app: globalAppVariables;

// define the child properties and their types. 
type globalAppVariables = {
  totalPokemon: number;
  maxid: number;
  // more can go here. 
};
