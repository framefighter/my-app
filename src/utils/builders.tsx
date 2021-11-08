interface ITranslate {
  x: number;
  y: number;
  toString(): string;
}

class Translate implements ITranslate {
  x: number;
  y: number;
  constructor(x: number, y?: number) {
    this.x = x;
    this.y = y === undefined ? x : y;
  }
  toString() {
    return `translate(${this.x}px, ${this.y}px)`;
  }
}

interface IRotate {
  a: number;
  unit: "deg" | "rad";
  toString(): string;
}

class Rotate implements IRotate {
  a: number;
  unit: "deg" | "rad";
  constructor(a: number, unit: "deg" | "rad" = "rad") {
    this.a = a;
    this.unit = unit;
  }
  toString() {
    return `rotate(${this.a}${this.unit})`;
  }
}

interface IScale {
  xs: number;
  ys?: number;
  toString(): string;
}

class Scale implements IScale {
  xs: number;
  ys: number;
  constructor(xs: number, ys?: number) {
    this.xs = xs;
    this.ys = ys === undefined ? xs : ys;
  }
  toString() {
    return `scale(${this.xs}, ${this.ys})`;
  }
}

export class TransformBuilder {
  transforms: (ITranslate | IRotate | IScale)[] = [];

  translate(x: number, y?: number): TransformBuilder {
    this.transforms.push(new Translate(x, y));
    return this;
  }
  translateP(p: [number, number]): TransformBuilder {
    this.transforms.push(new Translate(p[0], p[1]));
    return this;
  }
  rotate(a: number, unit?: "deg" | "rad"): TransformBuilder {
    this.transforms.push(new Rotate(a, unit));
    return this;
  }
  scale(xs: number, ys?: number): TransformBuilder {
    this.transforms.push(new Scale(xs, ys));
    return this;
  }
  build(): string {
    return this.transforms.map((transform) => transform.toString()).join(" ");
  }
}

export type TimingFunction =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";
export type PlayState = "running" | "paused";
export type FillMode = "none" | "forwards" | "backwards" | "both";
export type Direction =
  | "normal"
  | "reverse"
  | "alternate"
  | "alternate-reverse";
export type IterationCount = number | "infinite";

export class AnimationBuilder {
  _duration: number = 1;
  _delay: number = 0;
  _iterationCount: IterationCount = 1;
  _direction: Direction = "normal";
  _fillMode: FillMode = "none";
  _playState: PlayState = "running";
  _timingFunction: TimingFunction = "ease";
  _keyframe: string = "";

  duration(duration: number): AnimationBuilder {
    this._duration = duration;
    return this;
  }
  delay(delay: number): AnimationBuilder {
    this._delay = delay;
    return this;
  }
  iterationCount(iterationCount: number): AnimationBuilder {
    this._iterationCount = iterationCount;
    return this;
  }
  infinite(): AnimationBuilder {
    this._iterationCount = "infinite";
    return this;
  }
  once(): AnimationBuilder {
    return this.iterationCount(1);
  }
  direction(direction: Direction): AnimationBuilder {
    this._direction = direction;
    return this;
  }
  alternate(): AnimationBuilder {
    return this.direction("alternate");
  }
  reverse(): AnimationBuilder {
    return this.direction("reverse");
  }
  fillMode(fillMode: FillMode): AnimationBuilder {
    this._fillMode = fillMode;
    return this;
  }
  forwards(): AnimationBuilder {
    return this.fillMode("forwards");
  }
  backwards(): AnimationBuilder {
    return this.fillMode("backwards");
  }
  both(): AnimationBuilder {
    return this.fillMode("both");
  }
  playState(playState: PlayState): AnimationBuilder {
    this._playState = playState;
    return this;
  }
  timingFunction(timingFunction: TimingFunction): AnimationBuilder {
    this._timingFunction = timingFunction;
    return this;
  }
  easeInOut(): AnimationBuilder {
    return this.timingFunction("ease-in-out");
  }
  ease(): AnimationBuilder {
    return this.timingFunction("ease");
  }
  easeIn(): AnimationBuilder {
    return this.timingFunction("ease-in");
  }
  easeOut(): AnimationBuilder {
    return this.timingFunction("ease-out");
  }
  keyframe(keyframe: string): AnimationBuilder {
    this._keyframe = keyframe;
    return this;
  }
  build(): string {
    return `${this._duration}s ${this._timingFunction} ${this._delay}s ${this._iterationCount} ${this._direction} ${this._fillMode} ${this._playState} ${this._keyframe}`;
  }
}
