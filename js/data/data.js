import Points from '../enums/points';
import AnswerType from '../enums/answerType';

export const getInitialState = () => Object.freeze({
  lives: 3,
  time: 30,
  question: 0,
  stats: []
});

export const statsInfo = Object.freeze({
  'title': {
    'win': `Победа!`,
    'loss': `Поражение`
  },
  'ratio': Points[AnswerType.CORRECT],
  'bonuses': [
    {
      'title': `Бонус за скорость:`,
      'type': `fast`,
      'ratio': Points[AnswerType.FAST]
    },
    {
      'title': `Бонус за жизни:`,
      'type': `heart`,
      'ratio': Points.heart
    },
    {
      'title': `Штраф за медлительность:`,
      'type': `slow`,
      'ratio': Points[AnswerType.SLOW]
    }
  ]
});
