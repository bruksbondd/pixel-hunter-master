import ChooseTypeForEach from './chooseTypeForEachView.js';
import ChooseTypeForOne from './chooseTypeForOneView.js';
import FindType from './findTypeView.js';
import App from '../../app.js';
import {getInitialState} from '../../data/data.js';
import settings from '../../settings';
import questionType from '../../enums/questionType';
import {setLives, setTime, getAnswerType} from '../../utils/utils';

export default class GameScreen {
  constructor(data) {
    this._questions = data;
    this._gameList = {
      [questionType.TWO_OF_TWO]: ChooseTypeForEach,
      [questionType.TINDER_LIKE]: ChooseTypeForOne,
      [questionType.ONE_OF_THREE]: FindType
    };
  }

  init() {
    this._state = getInitialState();
    this._view = this._createView(getInitialState(), this._getQuestion());
    this._view.show();
    this._startTimer();
  }

  _startTimer() {
    this._timer = setInterval(() => {
      this._state = setTime(this._state, this._state.time - 1);
      this._view.updateTimer(this._state.time);

      if (this._state.time <= 0) {
        this._stopTimer();

        this._checkAnswer(false);
      }

    }, 1000);
  }

  _stopTimer() {
    if (!this._timer) {
      return;
    }

    clearInterval(this._timer);
  }

  _createView(state) {
    const view = new this._gameList[this._getQuestion().type](state, this._getQuestion());

    view.onAnswer = (isCorrectAnswer) => {
      this._stopTimer();
      this._checkAnswer(isCorrectAnswer);
    };

    view.onBackButtonClick = () => {
      this._stopTimer();
      App.showGreeting();
    };

    return view;
  }

  _checkAnswer(isCorrectAnswer) {
    if (!isCorrectAnswer) {
      this._state = setLives(this._state, this._state.lives - 1);
    }

    this._state.stats.push(this._getResult(isCorrectAnswer, this._state.time));
    this._state.question++;
    this._changeScreen(this._state);
  }

  _changeScreen(state) {
    if (state.question < settings.MAX_QUESTIONS && state.lives > 0) {
      this._state = Object.assign({}, this._state, {time: getInitialState().time});

      this._view = this._createView(this._state);
      this._view.show();
      this._startTimer();

    } else {
      App.showStats(this._state);
    }
  }

  _getQuestion() {
    return this._questions[this._state.question];
  }

  _getResult(isCorrectAnswer, time) {
    return getAnswerType(isCorrectAnswer, time);
  }
}
