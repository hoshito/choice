export type Team = {
  id: string;
  teamName: string;
  pokemon1: string;
  pokemon2: string;
  pokemon3: string;
  pokemon4: string;
  pokemon5: string;
  pokemon6: string;
};

export type OpponentTeam = {
  id: string;
  teamName: string;
  memo: string;
};

export type SelectionType = '先発' | '後発' | '補欠';

export type Selection = {
  [opponentId: string]: {
    [pokemonName: string]: SelectionType;
  };
};
