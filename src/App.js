const { Random, Console } = require('@woowacourse/mission-utils');

const RANDOMLIST = Object.freeze({
  STARTPOINT: 1,
  ENDPOINT: 9,
});

const BASEBALL = Object.freeze({
  STRIKE: '스트라이크',
  BALL: '볼',
  NOTHING: '낫싱',
  CLOSE: '게임 종료',
});

class App {
  #random;

  constructor() {
    this.#random = this.#makeRandomNumber();
  }

  get3RandomNumbers() {
    return this.#random;
  }

  set3RandomNumbers() {
    this.#random = this.makeRandomNumber();
  }

  #makeRandomNumber() {
    const result = [];

    while (result.length !== 3) {
      const randomNum = Random.pickNumberInRange(RANDOMLIST.STARTPOINT, RANDOMLIST.ENDPOINT);
      !result.includes(randomNum) && result.push(randomNum);
    }

    return result;
  }

  isStrike(randomItem, inputItem) {
    return randomItem === inputItem;
  }

  countStrike(random, input) {
    return input.filter((inputItem, index) => this.isStrike(random[index], inputItem)).length;
  }

  isBall(random, input, numberIndex) {
    const randomItem = random[numberIndex];
    const inputItem = input[numberIndex];

    return !this.isStrike(randomItem, inputItem) && random.includes(inputItem);
  }

  countBall(random, input) {
    return input.filter((_, index) => this.isBall(random, input, index)).length;
  }

  getStrikeToString(strikeCount) {
    return strikeCount > 0 ? `${strikeCount}${BASEBALL.STRIKE}` : '';
  }

  getBallToString(ballCount) {
    return ballCount > 0 ? `${ballCount}${BASEBALL.BALL}` : '';
  }

  getResultToString(random, input) {
    const ball = this.countBall(random, input);
    const strike = this.countStrike(random, input);

    if (ball === 0 && strike === 0) return `${BASEBALL.NOTHING}`;

    return [this.getBallToString(ball), this.getStrikeToString(strike)].join(' ').trim();
  }

  isStrikeOut(random, input) {
    return this.countStrike(random, input) === 3;
  }

  print(message) {
    Console.print(message);
  }

  end() {
    this.print(BASEBALL.CLOSE);
    Console.close();
  }

  play() {}
}

module.exports = App;
