import AbstractView from '../abstractView';

export default class extends AbstractView {
  get template() {
    return `<div id="intro" class="intro">      
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>`;
  }
}
