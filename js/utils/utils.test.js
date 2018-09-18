import assert from 'assert';
import {setLives, setTime, getPointByLives, getPointsByAnswerType, getAnswerType} from './utils.js';
import AnswerType from '../enums/answerType';
import settings from '../settings';

const state = {
  time: 30,
  lives: 3,
  totalRounds: 10,
  currentRound: 0,
  gameStat: []
};

describe(`Change game state`, () => {
  describe(`Change lives count`, () => {
    it(`The number of lives decreases by one if an incorrect answer is given`, function () {
      assert.equal(setLives(state, state.lives - 1).lives, state.lives - 1);
    });

    it(`The number of lives doesn't decreases if an correct answer is given`, function () {
      assert.equal(setLives(state, state.lives).lives, state.lives);
    });

    it(`The number of lives shouldn't be negative`, function () {
      const newState = Object.assign({}, state, {lives: -1});
      const setNegativeLives = () => setLives(newState, newState.lives).lives;
      assert.throws(setNegativeLives);
    });

    it(`The life value should has correct type`, function () {
      const newState = Object.assign({}, state, {lives: `three`});
      const setIncorrectValueType = () => setLives(newState, newState.lives).lives;
      assert.throws(setIncorrectValueType);
    });
  });

  describe(`Change timer count`, () => {
    it(`The timer should update`, function () {
      assert.equal(setTime(state, 20).time, 20);
    });

    it(`The timer for each question should be ${settings.TIME_FOR_QUESTION} sec`, function () {
      assert.equal(setTime(state, state.time).time, settings.TIME_FOR_QUESTION);
    });

    it(`The timer value shouldn't be negative`, function () {
      const newState = Object.assign({}, state, {time: -1});
      const setNegativeTimer = () => setLives(newState, newState.time).time;
      assert.throws(setNegativeTimer);
    });

    it(`The timer value should has correct type`, function () {
      const newState = Object.assign({}, state, {time: `twenty two`});
      const setIncorrectValueType = () => setTime(newState, newState.time).time;
      assert.throws(setIncorrectValueType);
    });
  });

  describe(`Every life gives 50 points`, () => {
    it(`Should return 0 If there are no more lives left`, () => {
      const lives = 0;
      assert.equal(getPointByLives(lives), 0);
    });

    it(`Should return 50 for 1 life`, () => {
      const lives = 1;
      assert.equal(getPointByLives(lives), 50);
    });

    it(`Should return 100 for 2 lives`, () => {
      const lives = 2;
      assert.equal(getPointByLives(lives), 100);
    });

    it(`Should return 150 for 3 lives`, () => {
      const lives = 3;
      assert.equal(getPointByLives(lives), 150);
    });
  });

  describe(`Get points depends on answers type`, () => {
    it(`Should return 100 points if type of answer is '${AnswerType.CORRECT}'`, () => {
      const newState = Object.assign({}, state, {gameStat: [AnswerType.CORRECT]});
      assert.equal(getPointsByAnswerType(AnswerType.CORRECT, newState.gameStat), 100);
    });

    it(`Should return 50 points if type of answer is '${AnswerType.FAST}'`, () => {
      const newState = Object.assign({}, state, {gameStat: [AnswerType.FAST]});
      assert.equal(getPointsByAnswerType(AnswerType.FAST, newState.gameStat), 50);
    });

    it(`Should return 0 points if type of answer is '${AnswerType.WRONG}'`, () => {
      const newState = Object.assign({}, state, {gameStat: [AnswerType.WRONG]});
      assert.equal(getPointsByAnswerType(AnswerType.WRONG, newState.gameStat), 0);
    });

    it(`Should return -50 points if type of answer is '${AnswerType.SLOW}'`, () => {
      const newState = Object.assign({}, state, {gameStat: [AnswerType.SLOW]});
      assert.equal(getPointsByAnswerType(AnswerType.SLOW, newState.gameStat), -50);
    });
  });

  describe(`Set game stats`, () => {
    it(`The correct answer is marked`, function () {
      const currentType = getAnswerType(true, 15);
      state.gameStat.push(currentType);
      assert.equal(state.gameStat[state.gameStat.length - 1], `correct`);
    });

    it(`The wrong answer is marked or user didn't answer`, function () {
      const currentType = getAnswerType(false, -1);
      state.gameStat.push(currentType);
      assert.equal(state.gameStat[state.gameStat.length - 1], `wrong`);
    });

    it(`The correct answer is marked and it's fast`, function () {
      const currentType = getAnswerType(true, 22);
      state.gameStat.push(currentType);
      assert.equal(state.gameStat[state.gameStat.length - 1], `fast`);
    });

    it(`The correct answer is marked and it's slow`, function () {
      const currentType = getAnswerType(true, 9);
      state.gameStat.push(currentType);
      assert.equal(state.gameStat[state.gameStat.length - 1], `slow`);
    });
  });
});
