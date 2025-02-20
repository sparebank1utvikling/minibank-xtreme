type position = {
  x: number;
  y: number;
}

export interface IMonster {
  element: HTMLDivElement;
  position: position;
}



export const generateMonsters = (numberOfMonsters: number, monsterCssClass: string) => {
  const monsters = [] as IMonster[];
  let row = 0
  let col = 1
  for (let i = 1; i < numberOfMonsters; i++) {

    const monsterElement = document.createElement("div");
    monsterElement.id = `monster_${i}`;
    monsterElement.className = monsterCssClass;
    monsterElement.style.left =  (col*(20+25)) + "px";
    monsterElement.style.top = row*50 +"px";

    const monster = {
      element: monsterElement,
      position: {
        x: (i*10),
        y: 900
      }
    }
    monsters.push(monster);
    if (i%8 === 0) {
      col = 1
      row +=1
    }else{
      col +=1
    }
  }
  return monsters;
};

export const drawMonsters = (monsters: IMonster[]) => {
  monsters.map((monster) => {
    document.querySelector("#monsterContainer")?.appendChild(monster.element);
  });
}