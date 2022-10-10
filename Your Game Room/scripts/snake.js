  //animation-control-but

  var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("control-but");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  // следим за кадрами анимации, чтобы если что — остановить игру
  let rAF = null;  

  //кнопки управления игрой
  var playBut = document.getElementById('play-pause');
  var restartBut = document.getElementById('restart');

  //подсчет очков
  var score = 0;
  var scoreBar = document.getElementById('score'); 
  var balance = Number(localStorage.getItem("balance"));
  function drawScore(){
    scoreBar.innerHTML = "Score : "+ score;
  }

  // Поле, на котором всё будет происходить, — тоже как бы переменная
  var canvas = document.getElementById('game');
  // Классическая змейка — двухмерная, сделаем такую же
  var context = canvas.getContext('2d');
  // Размер одной клеточки на поле — 16 пикселей
  var grid = 16;
  // Служебная переменная, которая отвечает за скорость змейки
  var count = 0;
  // А вот и сама змейка
  var snake = {
    // Начальные координаты
    x: 160,
    y: 160,
    // Скорость змейки — в каждом новом кадре змейка смещается по оси Х или У. На старте будет двигаться горизонтально, поэтому скорость по игреку равна нулю.
    dx: grid,
    dy: 0,
    // Тащим за собой хвост, который пока пустой
    cells: [],
    // Стартовая длина змейки — 4 клеточки
    maxCells: 4
  };
  // А это — еда. Представим, что это красные яблоки.
  var apple = {
    // Начальные координаты яблока
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid
  };
  // Делаем генератор случайных чисел в заданном диапазоне
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // Игровой цикл — основной процесс, внутри которого будет всё происходить
  function loop() {
    // Хитрая функция, которая замедляет скорость игры с 60 кадров в секунду до 15 (60/15 = 4)
    rAF = requestAnimationFrame(loop);
    // Игровой код выполнится только один раз из четырёх, в этом и суть замедления кадров, а пока переменная count меньше четырёх, код выполняться не будет
    if (++count < 4) {
      return;
    }
    // Обнуляем переменную скорости
    count = -1;
    // Очищаем игровое поле
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Двигаем змейку с нужной скоростью
    snake.x += snake.dx;
    snake.y += snake.dy;
    // Если змейка достигла края поля по горизонтали — продолжаем её движение с противоположной строны
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      snake.x = 0;
    }
    // Делаем то же самое для движения по вертикали
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      snake.y = 0;
    }
    // Продолжаем двигаться в выбранном направлении. Голова всегда впереди, поэтому добавляем её координаты в начало массива, который отвечает за всю змейку
    snake.cells.unshift({ x: snake.x, y: snake.y });
    // Сразу после этого удаляем последний элемент из массива змейки, потому что она движется и постоянно освобождает клетки после себя
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
    // Рисуем еду — яблоко
    context.fillStyle = localStorage.getItem("appleColor");
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    // Одно движение змейки — один новый нарисованный квадратик 
    context.fillStyle = localStorage.getItem("snakeColor");
    // Обрабатываем каждый элемент змейки
    snake.cells.forEach(function (cell, index) {
      // Чтобы создать эффект клеточек, делаем голубые квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      // Если змейка добралась до яблока...
      if (cell.x === apple.x && cell.y === apple.y) {
        //добавляем очки к общему счету
        score+=1;
        balance+=1;
        localStorage.setItem("balance",balance);    
        drawScore();
        // увеличиваем длину змейки
        snake.maxCells++;
        // Рисуем новое яблоко
        // Помним, что размер холста у нас 400x400, при этом он разбит на ячейки — 25 в каждую сторону
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
      // Проверяем, не столкнулась ли змея сама с собой
      // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами 
      for (var i = index + 1; i < snake.cells.length; i++) {
        // Если такие клетки есть — начинаем игру заново
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          // Задаём стартовые параметры основным переменным
          cancelAnimationFrame(rAF);
          setTimeout(showGameOver,200);
        }
      }
    });
  }

  //отображаем поражение в игре
  function showGameOver() {
    // прекращаем всю анимацию игры
  
    
    // ставим флаг окончания
    gameOver = true;  
    // рисуем чёрный прямоугольник посередине поля
    context.fillStyle = '#253e54';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    // пишем надпись белым моноширинным шрифтом по центру
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
  }
  
  // Смотрим, какие нажимаются клавиши, и реагируем на них нужным образом
  document.addEventListener('keydown', function (e) {
    // Дополнительно проверяем такой момент: если змейка движется, например, влево, то ещё одно нажатие влево или вправо ничего не поменяет — змейка продолжит двигаться в ту же сторону, что и раньше. Это сделано для того, чтобы не разворачивать весь массив со змейкой на лету и не усложнять код игры.
    // Стрелка влево
    // Если нажата стрелка влево, и при этом змейка никуда не движется по горизонтали…
    if (e.which === 37 && snake.dx === 0) {
      // то даём ей движение по горизонтали, влево, а вертикальное — останавливаем
      // Та же самая логика будет и в остальных кнопках
      snake.dx = -grid;
      snake.dy = 0;
    }
    // Стрелка вверх
    else if (e.which === 38 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
    // Стрелка вправо
    else if (e.which === 39 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    // Стрелка вниз
    else if (e.which === 40 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });

   // старт игры
    playBut.onclick = function(){
    requestAnimationFrame(loop);
      this.style.backgroundColor = "hsla(0, 0%, 80%, 0.5)";
      this.style.border = "1px solid #999999";
      this.style.color = "#666666"; 
      this.disabled = true;
    }  

    restartBut.onclick = function(){
      window.location.reload();
    }