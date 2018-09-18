import settings from '../settings';
import ResultType from '../enums/resultType';
import Points from '../enums/points';

export function setLives(state, lives) {
  if (isNaN(lives) || lives < 0 || lives > settings.MAX_LIVES) {
    throw new RangeError(`Lives must be between 0...${settings.MAX_LIVES}.`);
  }

  return Object.assign({}, state, {lives});
}

export function setTime(state, time) {
  if (isNaN(time) || time < 0 || time > settings.TIME_FOR_QUESTION) {
    throw new RangeError(`Time should be between 0 – ${settings.TIME_FOR_QUESTION}.`);
  }

  return Object.assign({}, state, {time});
}

export function getAnswerType(isCorrectAnswer, time) {
  if (!isCorrectAnswer) {
    return ResultType.WRONG;
  } else if (settings.TIME_FOR_QUESTION - time < settings.QUICK_ANSWER_TIME) {
    return ResultType.FAST;
  } else if (settings.TIME_FOR_QUESTION - time > settings.LATE_ANSWER_TIME) {
    return ResultType.SLOW;
  }

  return ResultType.CORRECT;
}

export const getPointCount = (stats, type) => stats.filter((s) => {
  return s === type;
}).length;

export const getPointsByAnswerType = (type, stats) => {
  const countStatType = getPointCount(stats, type);

  return countStatType * Points[type];
};

export const getPointByLives = (lives) => {
  return lives * Points.heart;
};

export const getRightPoints = (stats) => {
  return stats.filter((stat) => stat !== ResultType.WRONG).length * Points[ResultType.CORRECT];
};

export const getTotalPoints = ({lives, stats}) => {
  const sumFastAnswerPoints = getPointsByAnswerType(ResultType.FAST, stats);
  const sumSlowAnswerPoints = getPointsByAnswerType(ResultType.SLOW, stats);
  const sumLivesPoints = getPointByLives(lives);
  const sumRightPoints = getRightPoints(stats);

  return sumFastAnswerPoints + sumSlowAnswerPoints + sumLivesPoints + sumRightPoints;
};

export function createElement(string) {
  const template = document.createElement(`div`);
  template.innerHTML = string;
  return template;
}

export function renderScreen(view) {
  const mainScreen = document.getElementById(`main`);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(view.element);
}

export function calculateAspectRatioFit(img) {
  const parentWidth = img.parentNode.clientWidth;
  const parentHeight = img.parentNode.clientHeight;

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  if (imgWidth / imgHeight > parentWidth / parentHeight) {
    img.width = parentWidth;
  } else {
    img.height = parentHeight;
  }
}

export function changeAspectRatioOnLoad(images) {
  for (const image of images) {
    image.addEventListener(`load`, (event) => {
      calculateAspectRatioFit(image);
    });
  }
}
