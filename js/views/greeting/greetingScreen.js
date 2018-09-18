import App from '../../app.js';
import GreetingView from './greetingView';

class GreetingScreen {
  init() {
    this._view = new GreetingView();
    this._view.onNextButtonClick = () => App.showRules();
    this._view.show();
  }
}

export default GreetingScreen;
