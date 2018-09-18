export default function lives(data) {
  const node = `
    <div class="game__lives">
      ${
          new Array(3 - data.lives)
            .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32"/>`)
            .join(``)
        }
        ${
          new Array(data.lives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32"/>`)
            .join(``)
        }
    </div>
  `;

  return node;
}
