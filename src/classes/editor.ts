import Point from './point';

export default class {
  /*
   * Common editor class
   */

  private _load = false;

  public get load(): boolean {
    return this._load;
  }

  unmarked_points: Array<Point> = [];

  constructor (public svg = null) { }

  public setSize (size) {
    /*
     * Set canvas size
     */
    const [width, height] = size;

    this.svg.style.width = width;
    this.svg.style.height = height;

    this._load = true;
  }

  public setLayout(url) {
    /*
     * Set layout background
     */
    this.svg.style.backgroundImage = `url('${url}')`;
  }

  public getPaperPosition() {
    const rect = this.svg.getBoundingClientRect(),
      win = this.svg.ownerDocument.defaultView;

    return {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    }
  }

  public addPoint(coordinates) {
    const point = new Point(coordinates);
    point.setContext(this);

    point.draw();
  }

}
