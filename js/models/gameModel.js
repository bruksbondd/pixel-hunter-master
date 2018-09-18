import AbstractModel from './abstractModel';

export default class GameModel extends AbstractModel {
  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
  }
}
