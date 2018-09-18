import App from '../../app.js';
import StatsView from './statsView.js';
import StatsModel from '../../models/statsModel';

class StatsScreen {
  constructor() {
    this._model = new StatsModel();
  }
  init(state) {
    this._state = state;

    this._model.load()
      .then((data) => {
        this._view = new StatsView(this._state, data);
        this._view.onBackButtonClick = () => App.showGreeting();
        this._view.show();
      });
  }
}

export default StatsScreen;
