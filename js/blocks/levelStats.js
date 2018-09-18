import ResultType from '../enums/resultType';
import settings from '../settings';

const createStatsResult = (stats) => {
  return stats.reduce((prev, current) => {
    return prev + ` <li class="stats__result stats__result--${current}"></li>`;
  }, ``);
};

export default (stats) => {
  return ` 
    <ul class="stats">
    ${createStatsResult(stats)}
    ${createStatsResult(Array(settings.MAX_QUESTIONS - stats.length).fill(ResultType.UNKNOWN))}
    </ul>`;
};
