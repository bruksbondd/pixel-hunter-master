import AbstractView from '../abstractView.js';
import header from '../../blocks/header.js';
import Points from '../../enums/points';
import AnswerType from '../../enums/answerType';
import {getTotalPoints, getRightPoints, getPointCount} from '../../utils/utils';
import {statsInfo} from '../../data/data';
import levelStats from '../../blocks/levelStats';

const createBonus = (bonusCount, {title, type}) => {
  return `
    <tr>
      <td></td>
      <td class="result__extra">${title}</td>
      <td class="result__extra">${bonusCount}&nbsp;<span class="stats__result stats__result--${type}"></span></td>
      <td class="result__points">×&nbsp;${Points[type]}</td>
      <td class="result__total">${bonusCount * Points[type]}</td>
    </tr>`;
};

const countPoints = ({lives, stats}) => {
  const result = new Map();
  result.set(`heart`, lives);
  for (const type of Object.keys(AnswerType)) {
    result.set(type, getPointCount(stats, type));
  }

  return result;
};

const createBonuses = (points) => {
  return statsInfo.bonuses.reduce((content, bonus) => {
    const bonusCount = points.get(bonus.type);
    const html = bonusCount ? createBonus(bonusCount, bonus) : ``;
    return content + html;
  }, ``);
};

const createStatsResult = (stats, isNotFail) => {
  const failResult = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
  const statsResultHtml = `
    <td class="result__points">×&nbsp;${Points[AnswerType.CORRECT]}</td>
    <td class="result__total">${getRightPoints(stats)}</td>`;

  return isNotFail ? statsResultHtml : failResult;
};

const createTableResult = (game, index) => {
  const points = countPoints(game);
  const isNotFail = game.lives > 0;
  return ` 
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${levelStats(game.stats)}
        </td>
        ${createStatsResult(game.stats, isNotFail)}
      </tr>
      ${isNotFail ? createBonuses(points) : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${isNotFail ? getTotalPoints(game) : ``}</td>
      </tr>
    </table>`;
};

export default class StatsView extends AbstractView {
  constructor(state, data) {
    super();
    this._state = state;
    this._data = data;
  }
  get template() {
    return `
    ${header()}
    <div class="result">
      <h1>${this._state.lives > 0 ? statsInfo.title.win : statsInfo.title.loss}</h1>
      ${this._data.reduce((content, game, index) => {
        return content + createTableResult(game, index + 1);
      }, ``)}
    </div>`;
  }

  bind() {
    const backButton = this.element.querySelector(`.header__back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });
  }

  onBackButtonClick() {

  }
}
