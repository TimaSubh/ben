// Главное меню
const mainMenuEl = document.getElementById("mainMenu");
const gameScreenEl = document.getElementById("gameScreen");
const rpgScreenEl = document.getElementById("rpgScreen");

// Детектив
const caseTitleEl = document.getElementById("caseTitle");
const caseIntroEl = document.getElementById("caseIntro");
const factsListEl = document.getElementById("factsList");
const suspectsEl = document.getElementById("suspects");
const messageEl = document.getElementById("message");
const caseListEl = document.getElementById("caseList");

const playDetectiveBtn = document.getElementById("playDetectiveBtn");
const backToMenuBtn = document.getElementById("backToMenuBtn");

let currentCaseIndex = -1;
let locked = false;

// Дела детектива
const cases = [
  {
    title: "Кофейня в дождливый вечер",
    intro:
      "В маленькой кофейне вечером отключили свет. Через пару минут нашли разбитую витрину и пропавший дорогой термос-коллекцию. В зале осталось три посетителя.",
    facts: [
      "Свет выключился ровно на 30 секунд.",
      "Часы над барной стойкой остановились в 19:45, когда ударили молнией в линию электропередачи.",
      "Термос стоял на верхней полке у окна, до неё не дотянуться, не встав хотя бы на стул.",
    ],
    suspects: [
      {
        name: "Антон",
        alibi:
          "Я сидел за дальним столиком у окна, пил капучино. Когда погас свет, я даже не вставал — в темноте только услышал звон стекла.",
        isLiar: true,
        note: "Если он сидел у окна, именно рядом с витриной, то должен был быть ближе всех к полке с термосом. И чтобы что-то упало, кто-то явно двигал стул или вставал.",
      },
      {
        name: "Марина",
        alibi:
          "Я как раз была в туалете, когда свет вырубился. Вернулась уже когда бариста кричал про витрину.",
        isLiar: false,
        note: "Её могли не быть в зале, когда витрину разбили.",
      },
      {
        name: "Олег",
        alibi:
          "Я стоял у барной стойки и выбирал пирожное. Когда всё погасло, бариста попросил не двигаться, я так и застыл на месте.",
        isLiar: false,
        note: "У стойки он относительно далеко от окна и полки.",
      },
    ],
  },
  {
    title: "Пропавший ключ от офиса",
    intro:
      "В маленькой фирме пропал мастер-ключ от всех кабинетов. Его держали в стеклянной коробке на ресепшене. Утром коробка была пустой.",
    facts: [
      "В коридоре стоит камера, но в 02:13 запись оборвалась и возобновилась только в 02:20.",
      "Охранник утверждает, что всю ночь не отходил от мониторов.",
      "Уборщица приходит в 06:00 и имеет ключ только от входной двери и подсобки.",
    ],
    suspects: [
      {
        name: "Охранник Пётр",
        alibi:
          "Я всю ночь сидел перед мониторами, никуда не ходил. Когда запись оборвалась, я только перезагрузил систему и дальше смотрел камеры.",
        isLiar: true,
        note: "Если он никуда не отходил, кто перезапустил систему в серверной? Обычно это отдельная комната, куда надо ходить.",
      },
      {
        name: "Уборщица Галина",
        alibi:
          "Пришла в шесть, как всегда. Коробка уже была пустая, я только мусор вынесла и ушла.",
        isLiar: false,
        note: "У неё нет доступа ночью и нет ключей от ресепшена, кроме входа.",
      },
      {
        name: "Менеджер Игорь",
        alibi:
          "Я забыл документы и вернулся около полуночи, но ключ не трогал, только быстро забежал в свой кабинет и ушёл.",
        isLiar: false,
        note: "Он мог вернуться, но исчезновение ключа совпадает с отключением камер позже.",
      },
    ],
  },
  {
    title: "Кража телефона в метро",
    intro:
      "В переполненном вагоне метро у пассажира пропал телефон. Он лежал в боковом кармане рюкзака, когда поезд остановился на станции.",
    facts: [
      "Вагон был заполнен, но лишь трое стояли достаточно близко к рюкзаку.",
      "Пассажир заметил пропажу сразу после того, как двери закрылись и поезд поехал.",
      "Рюкзак ни разу не снимали с плеч.",
    ],
    suspects: [
      {
        name: "Парень в наушниках",
        alibi:
          "Я всё время стоял у двери и слушал музыку, вообще ни на кого не смотрел.",
        isLiar: false,
        note: "Стоял у двери, мог быть далеко от кармана, но прямого противоречия нет.",
      },
      {
        name: "Женщина с зонтами",
        alibi:
          "Я держала два зонта и сумку, мне было не до чужих вещей. Я даже за поручень толком не держалась.",
        isLiar: true,
        note: "Если у неё руки заняты двумя зонтами и сумкой, как она тогда держалась в заполненном вагоне при торможении? Скорее всего, одну руку она освобождала.",
      },
      {
        name: "Студент с книгой",
        alibi:
          "Я читал учебник и почти не двигался. Мне вообще всё равно, кто где стоит.",
        isLiar: false,
        note: "Его алиби не противоречит фактам напрямую.",
      },
    ],
  },
  {
    title: "Сломанный дрон на крыше",
    intro:
      "Во дворе многоэтажки нашли разбитый дрон. Хозяин утверждает, что кто‑то сбил его с крыши соседнего дома.",
    facts: [
      "Дрон упал почти вертикально вниз.",
      "На корпусе есть следы удара тяжёлым предметом.",
      "На крыше соседнего дома нашли только одну металлическую трубу.",
    ],
    suspects: [
      {
        name: "Сосед‑строитель",
        alibi:
          "Я поднялся на крышу только утром с бригадой — проверять вентиляцию, ночью там не был.",
        isLiar: false,
        note: "Он действительно мог быть только утром, прямого противоречия нет.",
      },
      {
        name: "Подросток с рюкзаком",
        alibi:
          "Я люблю дроны, я бы никогда не стал их ломать. Я лишь поднялся посмотреть на вид с крыши, но дрон уже валялся во дворе.",
        isLiar: true,
        note: "Если дрон упал почти вертикально и есть только одна тяжёлая труба, логично, что именно с крыши его сбили. Подросток единственный признаётся, что поднимался туда один.",
      },
      {
        name: "Пожилой дворник",
        alibi:
          "Я вообще боюсь высоты, на крыши никогда не хожу. Я только утром подметал двор и увидел обломки.",
        isLiar: false,
        note: "Его алиби согласуется с фактом, что он был только во дворе.",
      },
    ],
  },
];

function showMainMenu() {
  mainMenuEl.style.display = "block";
  gameScreenEl.style.display = "none";
  rpgScreenEl.style.display = "none";
}

function showDetectiveGame() {
  mainMenuEl.style.display = "none";
  gameScreenEl.style.display = "block";
  rpgScreenEl.style.display = "none";
}

function showRpgGame() {
  mainMenuEl.style.display = "none";
  gameScreenEl.style.display = "none";
  rpgScreenEl.style.display = "block";
}

function renderCaseList() {
  caseListEl.innerHTML = "";
  cases.forEach((c, idx) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = c.title;
    li.appendChild(span);

    if (idx === currentCaseIndex) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      renderCase(idx);
      renderCaseList();
    });

    caseListEl.appendChild(li);
  });
}

function renderCase(index) {
  const data = cases[index];
  currentCaseIndex = index;
  locked = false;
  messageEl.textContent = "";
  messageEl.className = "";

  caseTitleEl.textContent = data.title;
  caseIntroEl.textContent = data.intro;

  factsListEl.innerHTML = "";
  data.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    factsListEl.appendChild(li);
  });

  suspectsEl.innerHTML = "";
  data.suspects.forEach((suspect, idx) => {
    const card = document.createElement("div");
    card.className = "suspect-card";
    card.dataset.index = idx;

    const h3 = document.createElement("h3");
    h3.textContent = suspect.name;

    const p = document.createElement("p");
    p.textContent = suspect.alibi;

    card.appendChild(h3);
    card.appendChild(p);

    card.addEventListener("click", () => onSuspectClick(idx, card));

    suspectsEl.appendChild(card);
  });
}

function onSuspectClick(idx, cardEl) {
  if (locked) return;

  const data = cases[currentCaseIndex];
  const suspect = data.suspects[idx];

  locked = true;

  if (suspect.isLiar) {
    cardEl.classList.add("correct");
    messageEl.textContent = `Верно. ${suspect.note}`;
    messageEl.className = "win";
  } else {
    cardEl.classList.add("wrong");
    messageEl.textContent = "Нет, этот подозреваемый говорит правду. Выбери другое дело.";
    messageEl.className = "lose";
  }
}

playDetectiveBtn.addEventListener("click", () => {
  showDetectiveGame();
  if (cases.length > 0) {
    renderCase(0);
    renderCaseList();
  }
});

backToMenuBtn.addEventListener("click", () => {
  showMainMenu();
});

// ---- RPG часть ----

const playRpgBtn = document.getElementById("playRpgBtn");
const backToMenuRpgBtn = document.getElementById("backToMenuRpgBtn");
const rpgClassEl = document.getElementById("rpgClass");
const rpgStatsEl = document.getElementById("rpgStats");
const rpgSceneEl = document.getElementById("rpgScene");
const rpgSceneTitleEl = document.getElementById("rpgSceneTitle");
const rpgSceneTextEl = document.getElementById("rpgSceneText");
const rpgChoicesEl = document.getElementById("rpgChoices");
const rpgLogEl = document.getElementById("rpgLog");
const rpgClassButtons = document.querySelectorAll(".rpg-class-btn");
const startRpgBtn = document.getElementById("startRpgBtn");

let rpgState = {
  class: null,
  stats: {
    str: 0,
    dex: 0,
    int: 0,
  },
  sceneId: null,
};

const rpgClasses = {
  mage: {
    name: "Маг",
    stats: { str: 2, dex: 2, int: 5 },
    desc: "Высокий интеллект, слабее в физическом плане.",
  },
  fighter: {
    name: "Боец",
    stats: { str: 5, dex: 3, int: 1 },
    desc: "Сильный и живучий, но не самый тонкий стратег.",
  },
  ranger: {
    name: "Стрелок",
    stats: { str: 3, dex: 5, int: 1 },
    desc: "Ловкий стрелок, делает ставку на точность и скорость.",
  },
};

const rpgScenes = {
  intro: {
    title: "Ночная подворотня",
    text: "Ты стоишь в узком переулке современного города, где магия — редкость, но именно из‑за неё большинство проблем. Вдали слышен шум улиц, а перед тобой — дверь в подпольный бар, куда доступ только избранным.",
    choices: [
      {
        text: "Подойти к двери и постучать.",
        next: "bouncer",
        check: null,
      },
      {
        text: "Осмотреть переулок на наличие камер и ловушек.",
        next: "scan",
        check: { stat: "int", dc: 12 },
      },
    ],
  },
  scan: {
    title: "Поиск следов",
    text: "Ты осматриваешь переулок, пытаясь заметить что‑то подозрительное.",
    onEnter: { stat: "int", dc: 12 },
    successText:
      "Ты замечаешь маленький магический датчик над дверью и старую камеру, направленную в сторону переулка. Похоже, за гостями тут внимательно следят.",
    failText:
      "Ты осматриваешься, но ничего полезного не замечаешь. Темнота и дождь мешают сосредоточиться.",
    choices: [
      {
        text: "Подойти к двери и постучать.",
        next: "bouncer",
        check: null,
      },
    ],
  },
  bouncer: {
    title: "Охранник на входе",
    text: "Дверь открывается, и на пороге появляется здоровенный охранник с неестественно светящимися глазами. Он сканирует тебя взглядом.",
    choices: [
      {
        text: "Сделать вид, что ты тут постоянный клиент (харизма/интеллект).",
        next: "talk",
        check: { stat: "int", dc: 13 },
      },
      {
        text: "Попробовать пройти силой, оттолкнув его.",
        next: "force",
        check: { stat: "str", dc: 15 },
      },
    ],
  },
  talk: {
    title: "Разговор у двери",
    text: "Ты пытаешься уверенно заговорить с охранником, делая вид, что прекрасно знаешь местные правила.",
    onEnter: { stat: "int", dc: 13 },
    successText:
      "Охранник хмыкает, кивает и отступает в сторону. Ты проходишь внутрь бара, чувствуя на себе его взгляд.",
    failText:
      "Охранник мгновенно понимает, что ты здесь впервые, и с лёгким рыком просит проваливать.",
    end: true,
  },
  force: {
    title: "Попытка прорваться",
    text: "Ты собираешься с силами и резко толкаешь охранника, пытаясь проскользнуть внутрь.",
    onEnter: { stat: "str", dc: 15 },
    successText:
      "Твой рывок оказывается неожиданно сильным: охранник отступает на шаг, и ты проскакиваешь мимо него в бар, пока он ещё не успел среагировать.",
    failText:
      "Ты бьёшься о него, как о бетонную стену. Охранник только ухмыляется и выдворяет тебя обратно в переулок.",
    end: true,
  },
};

function setRpgClass(id) {
  rpgState.class = id;
  rpgState.stats = { ...rpgClasses[id].stats };
  rpgClassEl.textContent = rpgClasses[id].name;
  rpgStatsEl.textContent = `СИЛ: ${rpgState.stats.str}, ЛОВ: ${rpgState.stats.dex}, ИНТ: ${rpgState.stats.int} — ${rpgClasses[id].desc}`;

  rpgClassButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.class === id);
  });
}

function rpgLog(message) {
  const p = document.createElement("p");
  p.textContent = message;
  rpgLogEl.appendChild(p);
  rpgLogEl.scrollTop = rpgLogEl.scrollHeight;
}

function roll(statKey, dc) {
  const rollVal = Math.floor(Math.random() * 20) + 1; // d20
  const mod = rpgState.stats[statKey] || 0;
  const total = rollVal + mod;
  rpgLog(`Бросок d20: ${rollVal} + модификатор (${mod}) = ${total} против сложности ${dc}.`);
  return total >= dc;
}

function renderRpgScene(id, fromChoice = false, choiceCheck = null) {
  const scene = rpgScenes[id];
  rpgState.sceneId = id;
  rpgLogEl.innerHTML = "";

  // Если при входе есть проверка
  if (scene.onEnter && scene.onEnter.stat && scene.onEnter.dc) {
    const success = roll(scene.onEnter.stat, scene.onEnter.dc);
    if (success) {
      rpgLog(scene.successText);
    } else {
      rpgLog(scene.failText);
    }
  }

  rpgSceneTitleEl.textContent = scene.title;
  rpgSceneTextEl.textContent = scene.text;

  rpgChoicesEl.innerHTML = "";

  if (scene.end) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = "Вернуться в меню игр";
    btn.addEventListener("click", () => {
      showMainMenu();
    });
    li.appendChild(btn);
    rpgChoicesEl.appendChild(li);
    return;
  }

  scene.choices.forEach((choice) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.addEventListener("click", () => {
      if (choice.check && choice.check.stat && choice.check.dc) {
        const ok = roll(choice.check.stat, choice.check.dc);
        if (!ok) {
          rpgLog("Проверка провалена. Последствия могут быть неприятными.");
        } else {
          rpgLog("Проверка успешна, ситуация складывается в твою пользу.");
        }
      }
      renderRpgScene(choice.next, true, choice.check || null);
    });
    li.appendChild(btn);
    rpgChoicesEl.appendChild(li);
  });
}

playRpgBtn.addEventListener("click", () => {
  showRpgGame();
  rpgSceneEl.style.display = "none";
  rpgStatsEl.textContent = "Выбери класс: маг, боец или стрелок.";
});

backToMenuRpgBtn.addEventListener("click", () => {
  showMainMenu();
});

rpgClassButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setRpgClass(btn.dataset.class);
  });
});

startRpgBtn.addEventListener("click", () => {
  if (!rpgState.class) {
    rpgStatsEl.textContent = "Сначала выбери класс.";
    return;
  }
  rpgSceneEl.style.display = "block";
  renderRpgScene("intro");
});

// Инициализация: показываем главное меню
showMainMenu();
