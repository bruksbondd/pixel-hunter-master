import lives from './lives.js';

export default (data) => {
  const stats = data ? `
    <h1 class="game__timer">${data.time}</h1>
    ${lives(data)}
  ` : ``;

  const header = `
    <header class="header">
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back"/>
          <img src="img/logo_small.png" width="101" height="44"/>
        </span>
      </div>
      ${stats}
    </header>`;

  return header;
};
