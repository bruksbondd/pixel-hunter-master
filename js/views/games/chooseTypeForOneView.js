import AbstractView from '../abstractView.js';
import header from '../../blocks/header.js';
import levelStats from '../../blocks/levelStats.js';
import {changeAspectRatioOnLoad} from '../../utils/utils.js';

export default class ChooseTypeForOne extends AbstractView {
  constructor(state, question) {
    super();
    this._question = question;

    this._state = state;
  }
  get template() {
    return `
      ${header(this._state)}
        <div class="game">
          <p class="game__task">${this._question.question}</p>
          <form class="game__content game__content--wide">
            ${this._question.answers.map((answer, i) =>
              `<div class="game__option">
                <img src="${answer.image.url}" alt="Option ${i + 1}"/>
                <label class="game__answer game__answer--photo">
                  <input name="question1" type="radio" value="photo"/>
                  <span>Фото</span>
                </label>
                <label class="game__answer game__answer--paint">
                  <input name="question1" type="radio" value="painting"/>
                  <span>Рисунок</span>
                </label>
                </div>`).join(``)
            }
          </form>
          <div class="stats">
            ${levelStats(this._state.stats)}
          </div>
        </div>
      `.trim();
  }

  bind() {
    this.timerNode = this.element.querySelector(`.game__timer`);

    const backButton = this.element.querySelector(`.header__back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

    const gameContentForm = this.element.querySelector(`.game__content`);
    const radioInputs = gameContentForm.querySelectorAll(`input[type='radio']`);

    const changeRadioHandler = () => {
      const radioInput = gameContentForm.querySelector(`input[name="question1"]:checked`);
      this.onAnswer(radioInput.value === this._question.answers[0].type);
    };

    Array.from(radioInputs).forEach((item) => {
      item.addEventListener(`click`, changeRadioHandler);
    });

    const images = this.element.querySelectorAll(`.game__option > img`);
    changeAspectRatioOnLoad(images);
  }

  updateTimer(time) {
    this.timerNode.innerHTML = time;
  }

  onBackButtonClick() {
    throw new Error(`Not implemented`);
  }

  onAnswer() {
    throw new Error(`Not implemented`);
  }
}
