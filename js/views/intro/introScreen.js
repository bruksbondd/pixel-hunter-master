import App from '../../app.js';
import IntroView from './introView.js';

class IntroScreen {
  init() {
    this._view = new IntroView();
    this._view.onNextButtonClick = () => App.showGreeting();
    this._view.show();
  }
}

export default IntroScreen;
