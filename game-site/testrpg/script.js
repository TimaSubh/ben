let xp = 0, hp = 100, maxhp = 100, coin = 50, currentWeap = 0, potCount = 0;
let currentEnemy, monHp;

const controls = document.querySelector("#controls");
const buttons = [-1, document.querySelector("#button1"), document.querySelector("#button2"), document.querySelector("#button3")];

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const hpText = document.querySelector("#hpText");
const coinText = document.querySelector("#coinText");
const monsterStats = document.querySelector("#monsterStats");
const monsterHP = document.querySelector("#monsterHP");
const monsterName = document.querySelector("#monsterName");

const locations = [
    {
        name : "Городская площадь",
        bTexts : [-1, "Идти в торговый район", "Идти в пещеру", "Сразиться с Владыкой Демонов"],
        bFunctions : [-1, goToMDistrict, goToCave, fightDemon],
        text : "Ты находишься в центре городской площади. Выбери, что делать дальше, используя кнопки выше."
    },

    {
        name : "Торговый район",
        bTexts : [-1, "Зайти в магазин", "Зайти к кузнецу", "Вернуться на площадь"],
        bFunctions : [-1, goToStore, goToBlacksmith, goToTown],
        text : "Ты вошёл в торговый район и видишь два здания с вывесками «Магазин» и «Кузнец»."
    },

    {
        name : "Магазин",
        bTexts : [-1, "Купить благословение (+10 макс. HP)(-10 монет)", "Купить зелье +50 HP (-20 монет)", "Вернуться в торговый район"],
        bFunctions : [-1, buyBlessings, buyPotion, goToMDistrict],
        text : "Ты вошёл в магазин и видишь несколько интересных вещей на прилавке. Выбери, что купить, или вернись в торговый район, когда закончишь, с помощью кнопок выше."
    },

    {
        name : "Кузнец",
        bTexts : [-1, "Улучшить оружие (-30 монет)", "Ослабить оружие (+15 монет)", "Вернуться в торговый район"],
        bFunctions : [-1, upgradeWeapon, downgradeWeapon, goToMDistrict],
        text : "Ты пришёл к кузнецу. Здесь можно улучшить или ослабить оружие. Выбери действие или вернись в торговый район с помощью кнопок выше."
    },

    {
        name : "Пещера",
        bTexts : [-1, "Сразиться со слизнем", "Сразиться с орком", "Вернуться на площадь"],
        bFunctions : [-1, fightSlime, fightOrc, goToTown],
        text : "Ты входишь в пещеру и сразу чувствуешь присутствие монстров поблизости. Выбери, с кем сразиться, или вернись на площадь."
    },

    {
        name : "Бой",
        bTexts : [-1, "Атаковать", "Использовать зелье", "Сбежать на площадь"],
        bFunctions : [-1, attack, usePotion, goToTown],
        text : "Ты вступаешь в бой и подвергаешься атаке врага. Что будешь делать?"
    }
]

const weapons = [
    {
        name : "Палка",
        damage : 5,
        accuracy : 50
    },

    {
        name : "Кинжал",
        damage : 10,
        accuracy : 60
    },

    {
        name : "Короткий меч",
        damage : 15,
        accuracy : 70
    },

    {
        name : "Длинный меч",
        damage : 20,
        accuracy : 80
    },

    {
        name : "Большой меч",
        damage : 25,
        accuracy : 90
    },

    {
        name : "Священный меч",
        damage : 30,
        accuracy : 95
    }
]

const monsters = [
    {
        name : "Слизень",
        hp : 15,
        damage : 5,
        accuracy : 50,
        coin : 10,
        xp : 1
    },

    {
        name : "Орк",
        hp : 60,
        damage : 10,
        accuracy : 75,
        coin : 40,
        xp : 3
    },

    {
        name : "Владыка Демонов",
        hp : 400,
        damage : 40,
        accuracy : 90
    }
]

// Инициализация кнопок
buttons[1].onclick = goToMDistrict;
buttons[2].onclick = goToCave;
buttons[3].onclick = fightDemon;

// Утилитарные функции
function changeLoc(loc) {
    resetButton();
    buttons[1].innerText = loc.bTexts[1];
    buttons[2].innerText = loc.bTexts[2];
    buttons[3].innerText = loc.bTexts[3];

    buttons[1].onclick = loc.bFunctions[1];
    buttons[2].onclick = loc.bFunctions[2];
    buttons[3].onclick = loc.bFunctions[3];

    text.innerText = loc.text;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetButton() {
    for (let i = 1 ; i < buttons.length; i++) {
        buttons[i].style.display = "inline-block";
    }
}

function refreshStatus() {
    hpText.innerText = hp;
    monsterHP.innerText = monHp;
    xpText.innerText = xp;
    coinText.innerText = coin;
}

function retryGame() {
    xp = 0, hp = 100, maxhp = 100, coin = 50, currentWeap = 0, potCount = 0, currentEnemy = -1, monHp = -1;
    refreshStatus();
    goToTown();
}

// Функции перехода по локациям
function goToTown() {
    monsterStats.style.display = "none";
    changeLoc(locations[0]);
}

function goToMDistrict() {
    changeLoc(locations[1]);
}

function goToStore() {
    changeLoc(locations[2]);
}

function goToBlacksmith() {
    changeLoc(locations[3]);
    if (currentWeap == (weapons.length - 1)) buttons[1].style.display = "none";
    if (currentWeap == 0) buttons[2].style.display = "none";
}

function goToCave() {
    changeLoc(locations[4]);
}

function goToBattle() {
    changeLoc(locations[5]);
    monHp = monsters[currentEnemy].hp;
    monsterStats.style.display = "block";

    monsterHP.innerText = monHp;
    monsterName.innerText = monsters[currentEnemy].name;
}

// Функции магазина
function buyBlessings() {
    if (coin >= 10) {
        coin -= 10;
        hp += 10;
        maxhp += 10;

        coinText.innerText = coin;
        hpText.innerText = hp;

        text.innerText = "Вы успешно увеличили своё здоровье до " + hp + ". Если больше ничего не хотите сделать, вернитесь на площадь с помощью кнопок выше.";

    } else {
        text.innerText = "У вас недостаточно монет, чтобы увеличить здоровье. Попробуйте отправиться в пещеру и сразиться с монстрами ради награды, но берегите себя.";
    }
}

function buyPotion() {
    if (coin >= 20) {
        coin -= 20;
        potCount++;

        coinText.innerText = coin;
        text.innerText = "Вы успешно купили зелье. Сейчас у вас всего " + potCount + " зелье(ий) в инвентаре.";

    } else {
        text.innerText = "У вас недостаточно монет, чтобы купить зелье. Попробуйте отправиться в пещеру и сразиться с монстрами ради награды, но берегите себя.";
    }
}

// Функции кузнеца
function upgradeWeapon() {
    if (currentWeap == (weapons.length - 1)) {
        text.innerText = "Ваше оружие уже является лучшим из существующих. Может, стоит попробовать бросить вызов Владыке Демонов?";
    } else if (coin >= 30) {
        coin -= 30;
        coinText.innerText = coin;

        currentWeap++;
        if (currentWeap == (weapons.length - 1)) {
            buttons[1].style.display = "none";
        } else {
            buttons[1].style.display = "block";
        }

        text.innerText = "Вы успешно улучшили оружие до \"" + weapons[currentWeap].name + "\" с уроном " + weapons[currentWeap].damage + "! Если больше ничего не хотите сделать, вернитесь в торговый район с помощью кнопок выше.";
    } else {
        text.innerText = "У вас недостаточно монет для улучшения оружия. Попробуйте отправиться в пещеру и сразиться с монстрами ради награды.";
    }
}

function downgradeWeapon() {
    if (currentWeap == 0) {
        text.innerText = "Ваше оружие уже является худшим из существующих. Может, стоит сначала улучшить его?";
    }

    coin += 15;
    coinText.innerText = coin;
    currentWeap--;
    if (currentWeap == 0) {
        buttons[2].style.display = "none";
    } else {
        buttons[1].style.display = "block";
    }

    text.innerText = "Вы успешно ослабили оружие до \"" + weapons[currentWeap].name + "\" с уроном " + weapons[currentWeap].damage + "! Если больше ничего не хотите сделать, вернитесь в торговый район с помощью кнопок выше.";
}

// Функции начала боя
function fightSlime() {
    currentEnemy = 0;
    goToBattle();
}

function fightOrc() {
    currentEnemy = 1;
    goToBattle();
}

function fightDemon() {
    currentEnemy = 2;
    goToBattle();
}

// Боевые функции
function attack() {
    let isHit = (randomInt(0, 100) <= monsters[currentEnemy].accuracy ? 1 : 0);
    
    if (isHit) {
        text.innerText = monsters[currentEnemy].name + " атакует вас и наносит " + monsters[currentEnemy].damage + " урона!\n";
        hp -= monsters[currentEnemy].damage;
        if (hp <= 0){
            refreshStatus();
            lose();
            return;
        }
    } else {
        text.innerText = "Атака " + monsters[currentEnemy].name + " промахнулась!\n";
    }

    isHit = (randomInt(0, 100) <= weapons[currentWeap].accuracy ? 1 : 0);
    if (!isHit) {
        text.innerText += "Ваша атака промахнулась!";
    } else {
        let isCrit = randomInt(0, 1);
        let dmg = weapons[currentWeap].damage + (isCrit * (xp + 1));

        if (isCrit) {
            text.innerText += "Вы атакуете " + monsters[currentEnemy].name + " своим \"" + weapons[currentWeap].name + "\" и наносите " + dmg + " урона критическим ударом!";
        } else {
            text.innerText += "Вы атакуете " + monsters[currentEnemy].name + " своим \"" + weapons[currentWeap].name + "\" и наносите " + dmg + " урона!";
        }

        monHp -= dmg;
        if (monHp <= 0) killedMonster();
    }
    
    refreshStatus();
}

function usePotion() {
    if (potCount > 0) {
        potCount--;
        if (hp <= (maxhp - 50)) hp += 50;
        else hp = maxhp;

        if (potCount == 0) {
            text.innerText = "Вы успешно использовали зелье, восстановив здоровье до " + hp + " HP. Запас зелий пуст.\n";
        } else {
            text.innerText = "Вы успешно использовали зелье, восстановив здоровье до " + hp + " HP. Осталось зелий: " + potCount + ".\n";
        }

        let isHit = (randomInt(0, 100) <= monsters[currentEnemy].accuracy ? 1 : 0);
        if (isHit) {
            text.innerText += monsters[currentEnemy].name + " атакует вас и наносит " + monsters[currentEnemy].damage + " урона!\n";
            hp -= monsters[currentEnemy].damage;
            if (hp <= 0){
                refreshStatus();
                lose();
                return;
            }
        } else {
            text.innerText += "Атака " + monsters[currentEnemy].name + " промахнулась!\n";
        }
    } else {
        text.innerText = "У вас больше не осталось зелий в инвентаре...";
    }

    refreshStatus();
}

function lose() {
    text.innerText += "Вы погибли...";
    buttons[2].innerText = "Попробовать снова";
    buttons[2].onclick = retryGame;

    buttons[1].style.display = "none";
    buttons[3].style.display = "none";
    monsterStats.style.display = "none";
}

function killedMonster() {
    if (currentEnemy === (monsters.length - 1)) {
        text.innerText += "Поздравляем! Вы спасли Fantasy Sekai, и ваше имя навсегда войдёт в историю как Спаситель...";
        buttons[2].innerText = "Сыграть ещё раз";
        buttons[2].onclick = retryGame;

        buttons[1].style.display = "none";
        buttons[3].style.display = "none";
        monsterStats.style.display = "none";
    } else {
        xp += monsters[currentEnemy].xp;
        coin += monsters[currentEnemy].coin;
        refreshStatus();

        text.innerText += ("Вы победили " + monsters[currentEnemy].name + " и получили "
        + monsters[currentEnemy].xp + " ОП + " + monsters[currentEnemy].coin + " монет!");
        
        buttons[2].innerText = "Вернуться";
        buttons[2].onclick = goToCave;
        
        buttons[1].style.display = "none";
        buttons[3].style.display = "none";
        monsterStats.style.display = "none";
    }
}
