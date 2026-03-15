const caseTitleEl = document.getElementById("caseTitle");
const caseIntroEl = document.getElementById("caseIntro");
const factsListEl = document.getElementById("factsList");
const suspectsEl = document.getElementById("suspects");
const messageEl = document.getElementById("message");
const nextCaseBtn = document.getElementById("nextCaseBtn");

let currentCaseIndex = -1;
let locked = false;

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
        note: "Если он сидел у окна, именно рядом с витриной, то должен был быть ближе всех к полке с термосом. И чтобы что-то упало, кто-то явно двигал стул или вставал." ,
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
];

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
    messageEl.textContent = "Нет, этот подозреваемый говорит правду. Попробуй ещё одно дело.";
    messageEl.className = "lose";
  }
}

function nextCase() {
  const nextIndex = (currentCaseIndex + 1) % cases.length;
  renderCase(nextIndex);
}

nextCaseBtn.addEventListener("click", () => {
  nextCase();
});

// Инициализация
if (cases.length > 0) {
  renderCase(0);
}
