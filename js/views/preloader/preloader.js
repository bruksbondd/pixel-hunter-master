import PreloaderView from './preloaderView';

export default class {
  init() {
    this._view = new PreloaderView();
    this._view.show();
  }
}
