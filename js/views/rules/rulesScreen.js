import App from '../../app.js';
import RulesView from './rulesView.js';

class RulesScreen {
  init() {
    this._view = new RulesView();
    this._view.onSubmitForm = () => {
      App.showGame();
    };
    this._view.show();
    this._view.onBackButtonClick = () => App.showGreeting();
  }
}

export default RulesScreen;
