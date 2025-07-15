const date = new Date();
const month = date.getMonth();
const seasonSwitch = month >= 7;
const year = date.getFullYear();
const startingYear = seasonSwitch ? year : year - 1;
export const currentSeason = `${startingYear}-${(startingYear + 1) % 2000}`;