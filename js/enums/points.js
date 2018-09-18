import AnswerType from './answerType';

export default {
  [AnswerType.CORRECT]: 100,
  [AnswerType.FAST]: 50,
  [AnswerType.SLOW]: -50,
  [AnswerType.WRONG]: 0,
  heart: 50
};
