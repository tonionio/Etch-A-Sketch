let colorCells = false;

function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }  

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function darkenColor(color, darkenPercent) {
  color = color.slice(4, -1).split(',');
  const r = Math.floor(color[0] * (1 - darkenPercent / 100));
  const g = Math.floor(color[1] * (1 - darkenPercent / 100));
  const b = Math.floor(color[2] * (1 - darkenPercent / 100));
  return `rgb(${r},${g},${b})`;
}

function createGrid(gridSize) {
  const container = document.getElementById('container');
  container.style.width = '100%';
  container.style.height = '100%';
  container.innerHTML = '';
  const cellSize = container.clientWidth / gridSize;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.classList.add('cell');
    cell.addEventListener('mouseover', () => {
      if (colorCells) {
        if (!cell.style.backgroundColor || cell.style.backgroundColor === 'rgb(255, 255, 255)') {
          cell.style.backgroundColor = getRandomColor();
        } else {
          let darkenPercent = cell.getAttribute('data-darken');
          darkenPercent = darkenPercent ? parseInt(darkenPercent) + 10 : 10;
          cell.style.backgroundColor = darkenColor(cell.style.backgroundColor, darkenPercent);
          cell.setAttribute('data-darken', darkenPercent);
        }
      }
    });
    container.appendChild(cell);
  }
}

function updateGridSize() {
  const container = document.getElementById('container');
  const gridSize = Math.floor(
    Math.min(container.clientWidth, container.clientHeight) / 20
  );
  createGrid(gridSize);
}

window.addEventListener('resize', debounce(updateGridSize, 250));

document.getElementById('start').addEventListener('click', () => {
  const timerElement = document.getElementById('timer');
  timerElement.style.color = 'lime';

  const gridSize = Math.floor(
    Math.min(document.getElementById('container').clientWidth, document.getElementById('container').clientHeight) / 20
  );
  createGrid(gridSize);
  colorCells = true;
  let time = 30;
  const timer = setInterval(() => {
    time--;
    document.getElementById('time').textContent = time;

    if (time === 10) {
      document.getElementById('timer').style.color = 'red';
    }

    if (time === 0) {
      colorCells = false;
      clearInterval(timer);
      alert(
        "Time's up! Your score is " +
          document.querySelectorAll('[style]').length +
          "! Refresh the page to play again."
      );
    }
  }, 1000);
});

createGrid(50);
