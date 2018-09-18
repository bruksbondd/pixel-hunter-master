import AbstractView from '../abstractView.js';
import header from '../../blocks/header.js';

export default class RulesView extends AbstractView {
  get template() {
    return `
      ${header()}
        <div class="rules">
          <h1 class="rules__title">Правила</h1>
          <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt=""/>.<br/>
          Фотографиями или рисунками могут быть оба изображения.<br/>
          На каждую попытку отводится 30 секунд.<br/>
          Ошибиться можно не более 3 раз.<br/>
          <br/>
          Готовы?
          </p>
          <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя"/>
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
          </form>
        </div>
    `.trim();
  }

  bind() {
    const nameUserInput = this.element.querySelector(`.rules__input`);
    const button = this.element.querySelector(`.rules__button`);
    const form = this.element.querySelector(`.rules__form`);
    const backButton = this.element.querySelector(`.header__back`);
    nameUserInput.addEventListener(`input`, () => {
      this.changeDisabled(button, nameUserInput);
    });
    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onSubmitForm();
    });
    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });
  }

  onBackButtonClick() {
    throw new Error(`Not implemented.`);
  }

  changeDisabled(button, input) {
    if (input.value === ``) {
      button.setAttribute(`disabled`, `disabled`);
    } else {
      button.removeAttribute(`disabled`);
    }
  }

  onSubmitForm() {
    throw new Error(`Not implemented.`);
  }
}
