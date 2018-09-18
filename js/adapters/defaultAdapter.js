export default class {
  preprocess(data) {
    return data;
  }

  toServer(data) {
    return JSON.stringify(data);
  }
}
