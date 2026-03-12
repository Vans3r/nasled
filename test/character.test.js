import Character, { Bowerman, Swordsman, Magician, Daemon, Undead, Zombie } from '../src/characters';

describe('Character', () => {
  test('создаёт персонажа с корректными данными', () => {
    const char = new Character('Hero', 'Bowman');
    expect(char.name).toBe('Hero');
    expect(char.type).toBe('Bowman');
    expect(char.health).toBe(100);
    expect(char.level).toBe(1);
  });

  test('выбрасывает ошибку при некорректном имени (слишком короткое)', () => {
    expect(() => new Character('A', 'Bowman')).toThrow('Имя должно быть от 2 до 10 символов');
  });

  test('выбрасывает ошибку при некорректном имени (слишком длинное)', () => {
    expect(() => new Character('VeryLongNameThatExceedsLimit', 'Bowman')).toThrow('Имя должно быть от 2 до 10 символов');
  });

  test('выбрасывает ошибку при некорректном типе', () => {
    expect(() => new Character('Hero', 'Unknown')).toThrow('Некорректный тип персонажа');
  });

  test('levelUp повышает уровень и характеристики', () => {
    const char = new Character('Hero', 'Bowman');
    char.attack = 20;
    char.defence = 30;
    char.levelUp();
    expect(char.level).toBe(2);
    expect(char.attack).toBeCloseTo(24);
    expect(char.defence).toBeCloseTo(36);
    expect(char.health).toBe(100);
  });

  test('damage корректно уменьшает здоровье', () => {
    const char = new Character('Hero', 'Bowman');
    char.defence = 50;
    char.damage(20);
    expect(char.health).toBe(90);
  });

  test('damage не позволяет здоровью упасть ниже 0', () => {
    const char = new Character('Hero', 'Bowman');
    char.damage(200);
    expect(char.health).toBe(0);
  });
});

describe('Bowerman', () => {
  test('наследует от Character и имеет правильные характеристики', () => {
    const bowman = new Bowerman('Legolas');
    expect(bowman.name).toBe('Legolas');
    expect(bowman.type).toBe('Bowman');
    expect(bowman.attack).toBe(25);
    expect(bowman.defence).toBe(25);
  });
});

describe('Swordsman', () => {
  test('имеет правильные характеристики', () => {
    const swordsman = new Swordsman('Aragorn');
    expect(swordsman.attack).toBe(40);
    expect(swordsman.defence).toBe(10);
  });
});

describe('Magician', () => {
  test('имеет правильные характеристики', () => {
    const magician = new Magician('Gandalf');
    expect(magician.attack).toBe(10);
    expect(magician.defence).toBe(40);
  });
});

describe('Daemon', () => {
  test('имеет правильные характеристики', () => {
    const daemon = new Daemon('Balrog');
    expect(daemon.attack).toBe(10);
    expect(daemon.defence).toBe(40);
  });
});

describe('Undead', () => {
  test('имеет правильные характеристики', () => {
    const undead = new Undead('Sauron');
    expect(undead.attack).toBe(25);
    expect(undead.defence).toBe(25);
  });
});

describe('Zombie', () => {
  test('имеет правильные характеристики', () => {
    const zombie = new Zombie('Walker');
    expect(zombie.attack).toBe(40);
    expect(zombie.defence).toBe(10);
  });
});

describe('levelUp method', () => {
  test('повышает уровень на 1', () => {
    const character = new Bowerman('Test');
    const initialLevel = character.level;
    character.levelUp();
    expect(character.level).toBe(initialLevel + 1);
  });

  test('увеличивает атаку на 20%', () => {
    const character = new Swordsman('Test');
    const initialAttack = character.attack;
    character.levelUp();
    expect(character.attack).toBeCloseTo(initialAttack * 1.2);
  });

  test('увеличивает защиту на 20%', () => {
    const character = new Magician('Test');
    const initialDefence = character.defence;
    character.levelUp();
    expect(character.defence).toBeCloseTo(initialDefence * 1.2);
  });

  test('восстанавливает здоровье до 100', () => {
    const character = new Daemon('Test');
    character.health = 50;
    character.levelUp();
    expect(character.health).toBe(100);
  });

  test('выбрасывает ошибку при мёртвом персонаже', () => {
    const character = new Undead('Test');
    character.health = 0;
    expect(() => character.levelUp()).toThrow('Нельзя повысить уровень умершего персонажа');
  });
});

describe('damage method', () => {
  test('уменьшает здоровье с учётом защиты', () => {
    const character = new Bowerman('Test');
    character.defence = 50; 
    const initialHealth = character.health;
    character.damage(40); 
    expect(character.health).toBe(initialHealth - 20);
  });

  test('выбрасывает ошибку при отрицательном уроне', () => {
    const character = new Magician('Test');
    expect(() => character.damage(-10)).toThrow('Урон не может быть отрицательным');
  });

  test('корректно рассчитывает урон при 0 защите', () => {
    const character = new Zombie('Test');
    character.defence = 0;
    const initialHealth = character.health;
    character.damage(30);
    expect(character.health).toBe(initialHealth - 30);
  });

  test('корректно рассчитывает урон при максимальной защите', () => {
    const character = new Daemon('Test');
    character.defence = 100; 
    const initialHealth = character.health;
    character.damage(50);
    expect(character.health).toBe(initialHealth); 
  });
});

describe('complex interactions', () => {
  test('levelUp после получения урона', () => {
    const character = new Bowerman('Complex');
    character.damage(30); 
    expect(character.health).toBe(77.5);

    character.levelUp(); 
    expect(character.health).toBe(100);
    expect(character.level).toBe(2);
  });

  test('последовательное применение damage', () => {
    const character = new Swordsman('Sequential');
    character.damage(20); 
    expect(character.health).toBeCloseTo(82);

    character.damage(30); 
    expect(character.health).toBeCloseTo(55);
  });
});