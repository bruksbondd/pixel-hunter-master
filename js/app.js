import IntroScreen from './views/intro/introScreen';
import GreetingScreen from './views/greeting/greetingScreen';
import RulesScreen from './views/rules/rulesScreen';
import NewGameScreen from './views/games/gameScreen';
import StatsScreen from './views/stats/statsScreen';
import Preloader from './views/preloader/preloader';
import StatsModel from './models/statsModel';
import GameModel from './models/gameModel';
import controllerId from './enums/controllerId';


const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class App {
  constructor() {
    this._gameModel = new GameModel();
    this._statsModel = new StatsModel();
  }

  init() {
    this.showPreloader();
    this._gameModel.load()
      .then((data) => this._setup(data))
      .then((data) => {
        const {controller, state} = this._parseHashFromUrl();
        this.changeController(controller, state, data);
      })
      .catch(window.console.error);
  }

  changeController(route, state, data) {
    const Controller = this._routes[route];
    if (Controller) {
      new Controller(data).init(state);
    } else {
      throw new Error(`This route ${route} is not defined.`);
    }
  }

  showPreloader() {
    new Preloader().init();
  }

  showGreeting() {
    location.hash = controllerId.GREETING;
  }

  showRules() {
    location.hash = controllerId.RULES;
  }

  showGame() {
    location.hash = controllerId.GAME;
  }

  showStats(state) {
    this._statsModel.send(state)
      .then(() => {
        const encodeState = btoa(JSON.stringify(state));
        location.hash = `${controllerId.STATS}=${encodeState}`;
      })
      .catch(window.console.error);
  }

  _parseHashFromUrl() {
    const hash = location.hash.split(`=`);
    const [controller, hashValue] = hash;
    return {
      controller: getControllerIdFromHash(controller),
      state: hashValue ? JSON.parse(atob(hashValue)) : null
    };
  }

  _setup(data) {
    this._routes = {
      [controllerId.INTRO]: IntroScreen,
      [controllerId.GREETING]: GreetingScreen,
      [controllerId.RULES]: RulesScreen,
      [controllerId.GAME]: NewGameScreen,
      [controllerId.STATS]: StatsScreen
    };

    window.onhashchange = () => {
      const {controller, state} = this._parseHashFromUrl();
      this.changeController(controller, state, data);
    };

    return data;
  }
}

const app = new App();

export default app;
