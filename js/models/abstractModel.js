import DefaultAdapter from '../adapters/defaultAdapter';

const defaultAdapter = new class extends DefaultAdapter {}();

export default class AbstractModel {
  get urlRead() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  load() {
    return fetch(this.urlRead)
      .then((response) => response.json())
      .then(defaultAdapter.preprocess);
  }

  send(data) {
    const requestSettings = {
      body: defaultAdapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(this.urlWrite, requestSettings);
  }
}
