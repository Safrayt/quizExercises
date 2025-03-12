const quizLevels = [
  // Уровень 1
  [
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise1.png",
      options: ["Скручивания", "Отжимания от пола", "Подтягивания"],
      correctAnswer: "Отжимания от пола"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise2.png",
      options: ["Австралийские подтягивания", "Французские отжимания", "Планка на прямых руках"],
      correctAnswer: "Австралийские подтягивания"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise3.png",
      options: ["Горшок", "Стульчик", "Всадник"],
      correctAnswer: "Стульчик"
    },
  ],
  // Уровень 2
  [
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise4.png",
      options: ["Лёж лёжа", "Скалолаз", "Скручивания"],
      correctAnswer: "Скручивания"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise5.png",
      options: ["Отжимания на брусьях", "Подтягивания на брусьях", "Лыжник"],
      correctAnswer: "Отжимания на брусьях"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise6.png",
      options: ["Подтягивания верхним хватом", "Подтягивания нижним хватом", "Выходы силой"],
      correctAnswer: "Подтягивания верхним хватом"
    },
  ],
  // Уровень 3
  [
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise7.png",
      options: ["Планка на прямых руках", "Планка на локтях", "Постоянная Планка"],
      correctAnswer: "Планка на локтях"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise8.png",
      options: ["Французские отжимания", "Египетские отжимания", "Испанские отжимания"],
      correctAnswer: "Французские отжимания"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise9.png",
      options: ["Выпады", "Выходы", "Входы"],
      correctAnswer: "Выпады"
    },
  ],
  // Уровень 4
  [
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise10.png",
      options: ["Отжимания на перекладине", "Подтягивания на перекладине", "Приседания на перекладине"],
      correctAnswer: "Отжимания на перекладине"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise11.png",
      options: ["Подъёмы коленей к груди", "Уголок", "Отжимания на брусьях"],
      correctAnswer: "Подъёмы коленей к груди"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise12.png",
      options: ["Австралийские подтягивания на трицепс", "Австралийские подтягивания", "Австралийские подтягивания на бицепс"],
      correctAnswer: "Австралийские подтягивания на бицепс"
    },
  ],
  // Уровень 5
  [
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise13.png",
      options: ["Подъёмы в пиратский флаг", "Подъёмы во флаг годзиллы", "Подъёмы во флаг дракона"],
      correctAnswer: "Подъёмы во флаг дракона"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise14.png",
      options: ["Приседания", "Выпрыгивания", "Всадник"],
      correctAnswer: "Выпрыгивания"
    },
    {
      question: "Угадайте упражнение по картинке:",
      image: "exercise15.png",
      options: ["Пикачу", "Бульбасавр", "Чармондер"],
      correctAnswer: "Пикачу"
    },
  ],
];

let currentLevel = 0; // Текущий уровень (от 0 до 4)
let currentQuestion = 0; // Текущий вопрос в уровне
let score = 0; // Общий счет (сохраненный в Local Storage)
let quizScore = 0; // Счет за текущий квиз
let correctAnswersCount = 0; // Счетчик правильных ответов

// Получаем элементы DOM
const quizTitle = document.querySelector('h1');
const questionCounter = document.querySelector('.question-counter');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const quizImage = document.getElementById('quiz-image');
const optionsContainer = document.querySelector('.options');
const resultContainer = document.getElementById('result');

// Загружаем счет из Local Storage
let userScore = parseInt(localStorage.getItem('userScore')) || 0;

// Функция для загрузки вопроса
function loadQuestion() {
  const questionData = quizLevels[currentLevel][currentQuestion];
  quizImage.src = questionData.image;
  currentQuestionSpan.textContent = currentQuestion + 1;
  totalQuestionsSpan.textContent = quizLevels[currentLevel].length;

  optionsContainer.innerHTML = '';
  questionData.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option');
    button.dataset.correct = option === questionData.correctAnswer;
    button.addEventListener('click', handleAnswer);
    optionsContainer.appendChild(button);
  });
}

// Обработка ответа
function handleAnswer(event) {
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  if (isCorrect) {
    userScore += 10; // Добавляем 10 очков за правильный ответ
    quizScore += 10; // Добавляем 10 очков за текущий квиз
    correctAnswersCount++; // Увеличиваем счетчик правильных ответов
    selectedButton.classList.add('correct');
  } else {
    userScore -= 5; // Отнимаем 5 очков за неправильный ответ
    quizScore -= 5; // Отнимаем 5 очков за текущий квиз
    selectedButton.classList.add('incorrect');
    // Подсветка правильного ответа
    const correctButton = Array.from(optionsContainer.children).find(
      button => button.dataset.correct === 'true'
    );
    correctButton.classList.add('correct');
  }

  // Сохраняем счет в Local Storage
  localStorage.setItem('userScore', userScore);

  // Переход к следующему вопросу через 1 секунду
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizLevels[currentLevel].length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

// Показ результата
function showResult() {
  // Скрываем ненужные элементы
  quizTitle.style.display = 'none';
  quizImage.style.display = 'none';
  optionsContainer.style.display = 'none';
  questionCounter.style.display = 'none';

  // Определяем цвет текста в зависимости от результата
  let scoreColorClass = '';
  if (quizScore > 0) {
    scoreColorClass = 'positive'; // Зеленый цвет
  } else if (quizScore < 0) {
    scoreColorClass = 'negative'; // Красный цвет
  } else {
    scoreColorClass = 'neutral'; // Черный цвет
  }

  // Проверяем, пройдены ли все уровни
  const isLastLevel = currentLevel === quizLevels.length - 1;

  // Отображаем результат
  resultContainer.innerHTML = `
    <div class="result-icon">
      <img src="logo.png" alt="Логотип">
    </div>
    <h1>Результаты:</h1>
    <div class="result">
      <div class="result-line">Ваш общий счет: ${userScore} очков</div>
      <div class="result-line ${scoreColorClass}">Очков получено: ${quizScore}</div>
      <div class="result-line">Правильных ответов: ${correctAnswersCount} из ${quizLevels[currentLevel].length}</div>
      <div class="result-line">Спасибо за участие!</div>
      <button id="next-level-button" ${isLastLevel ? 'data-action="reset"' : ''}>
        ${isLastLevel ? 'Начать заново' : 'Следующий уровень'}
      </button>
    </div>
  `;

  // Показываем контейнер с результатами
  resultContainer.style.display = 'block';

  // Добавляем обработчик для кнопки
  const nextLevelButton = document.getElementById('next-level-button');
  nextLevelButton.addEventListener('click', () => {
    if (isLastLevel) {
      resetProgress(); // Сброс прогресса, если это последний уровень
    } else {
      nextLevel(); // Переход на следующий уровень
    }
  });
}

// Переход на следующий уровень
function nextLevel() {
  currentLevel++;
  currentQuestion = 0;
  quizScore = 0;
  correctAnswersCount = 0;

  // Скрываем контейнер с результатами
  resultContainer.style.display = 'none';

  // Показываем элементы квиза
  quizTitle.style.display = 'block';
  quizImage.style.display = 'block';
  optionsContainer.style.display = 'flex';
  questionCounter.style.display = 'block';

  // Загружаем первый вопрос нового уровня
  loadQuestion();
}

// Сброс прогресса
function resetProgress() {
  currentLevel = 0;
  currentQuestion = 0;
  userScore = 0;
  quizScore = 0;
  correctAnswersCount = 0;

  // Очищаем Local Storage
  localStorage.removeItem('userScore');

  // Скрываем контейнер с результатами
  resultContainer.style.display = 'none';

  // Показываем элементы квиза
  quizTitle.style.display = 'block';
  quizImage.style.display = 'block';
  optionsContainer.style.display = 'flex';
  questionCounter.style.display = 'block';

  // Загружаем первый вопрос первого уровня
  loadQuestion();
}

// Загрузка первого вопроса
loadQuestion();