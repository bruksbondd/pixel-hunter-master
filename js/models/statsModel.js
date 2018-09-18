import AbstractModel from './abstractModel';
import settings from '../settings';

class StatsModel extends AbstractModel {
  constructor() {
    super();
    this.name = settings.USER_NAME;
  }

  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${this.name}`;
  }

  get urlWrite() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${this.name}`;
  }
}

export default StatsModel;
