export const calorieLevels = [
  {"val": 1200, "disp": "1,2000-1,499"},
  {"val": 1500, "disp": "1,5000-1,799"},
  {"val": 1800, "disp": "1,8000-2,099"},
  {"val": 2100, "disp": "2,1000-2,300"}
]

export const containerLevels = {
  "1200": {
    "green": 3,
    "purple": 2,
    "red": 4,
    "yellow": 2,
    "blue": 1,
    "orange": 1,
    "tsp": 2
  },
  "1500": {
    "green": 3,
    "purple": 2,
    "red": 4,
    "yellow": 2,
    "blue": 1,
    "orange": 1,
    "tsp": 2
  },
  "1800": {
    "green": 3,
    "purple": 2,
    "red": 4,
    "yellow": 2,
    "blue": 1,
    "orange": 1,
    "tsp": 2
  },
  "2100": {
    "green": 3,
    "purple": 2,
    "red": 4,
    "yellow": 2,
    "blue": 1,
    "orange": 1,
    "tsp": 2
  }
}

export function buildEmptyContainers(level) {
  let c = {
    "green": [],
    "purple": [],
    "red": [],
    "yellow": [],
    "blue": [],
    "orange": [],
    "tsp": []
  }
  for(let color in c) {
    if(c.hasOwnProperty(color)) {
      for(let i = 0; i < containerLevels[level][color]; i++) {
        c[color].push("")
      }
    }
  }

  return c
}
