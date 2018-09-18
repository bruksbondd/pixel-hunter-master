import AbstractView from '../abstractView.js';

export default class IntroView extends AbstractView {
  get template() {
    return `
      <div class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>`;
  }

  bind() {
    const button = this.element.querySelector(`.intro__asterisk`);
    button.addEventListener(`click`, () => this.onNextButtonClick());
  }

  onNextButtonClick() {
    throw new Error(`Not implemented`);
  }
}
