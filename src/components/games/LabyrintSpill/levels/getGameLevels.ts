import labyrint_0 from './labyrint_0.html?url';
import labyrint_1 from './labyrint_1.html?url';
import labyrint_2 from './labyrint_2.html?url';
import labyrint_3 from './labyrint_3.html?url';
import labyrint_4 from './labyrint_4.html?url';
import labyrint_5 from './labyrint_5.html?url';
import labyrint_6 from './labyrint_6.html?url';
import labyrint_7 from './labyrint_7.html?url';
import labyrint_8 from './labyrint_8.html?url';

const LEVEL_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 1, 3, 5, 7, 0, 2, 4, 6, 8, 1, 4, 7, 0, 3, 6, 2, 5, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export function getGameLevel(level: number) {
  switch (LEVEL_ORDER[level - 1]) {
    case 0:
      return labyrint_0;
    case 1:
      return labyrint_1;
    case 2:
      return labyrint_2;
    case 3:
      return labyrint_3;
    case 4:
      return labyrint_4;
    case 5:
      return labyrint_5;
    case 6:
      return labyrint_6;
    case 7:
      return labyrint_7;
    case 8:
      return labyrint_8;
  }
}