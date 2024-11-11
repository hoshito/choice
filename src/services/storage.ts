import { Team, OpponentTeam, Selection } from '@/types/team';

export const TeamStorage = {
  getTeams: (): Team[] => {
    const teams = localStorage.getItem('teams');
    return teams ? JSON.parse(teams) : [];
  },

  saveTeam: (team: Team): void => {
    const teams = TeamStorage.getTeams();
    teams.push(team);
    localStorage.setItem('teams', JSON.stringify(teams));
  },

  updateTeam: (updatedTeam: Team): void => {
    const teams = TeamStorage.getTeams();
    const updatedTeams = teams.map(team =>
      team.id === updatedTeam.id ? updatedTeam : team
    );
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  },

  deleteTeam: (teamId: string): void => {
    const teams = TeamStorage.getTeams();
    const filteredTeams = teams.filter(team => team.id !== teamId);
    localStorage.setItem('teams', JSON.stringify(filteredTeams));
  }
};

export const OpponentStorage = {
  getTeams: (): OpponentTeam[] => {
    const teams = localStorage.getItem('opponentTeams');
    return teams ? JSON.parse(teams) : [];
  },

  saveTeam: (team: OpponentTeam): void => {
    const teams = OpponentStorage.getTeams();
    teams.push(team);
    localStorage.setItem('opponentTeams', JSON.stringify(teams));
  },

  updateTeam: (updatedTeam: OpponentTeam): void => {
    const teams = OpponentStorage.getTeams();
    const updatedTeams = teams.map(team =>
      team.id === updatedTeam.id ? updatedTeam : team
    );
    localStorage.setItem('opponentTeams', JSON.stringify(updatedTeams));
  },

  deleteTeam: (teamId: string): void => {
    const teams = OpponentStorage.getTeams();
    const filteredTeams = teams.filter(team => team.id !== teamId);
    localStorage.setItem('opponentTeams', JSON.stringify(filteredTeams));
  }
};

export const SelectionStorage = {
  getSelections: (): Selection => {
    const selections = localStorage.getItem('selections');
    return selections ? JSON.parse(selections) : {};
  },

  saveSelection: (selection: Selection): void => {
    localStorage.setItem('selections', JSON.stringify(selection));
  },

  getSelectedTeam: (): Team | null => {
    const team = localStorage.getItem('selectedTeam');
    return team ? JSON.parse(team) : null;
  },

  saveSelectedTeam: (team: Team): void => {
    localStorage.setItem('selectedTeam', JSON.stringify(team));
  }
}; 
