import Point from './point';
import Line from './line';
import Area from './area';

import Raphael from 'raphael';

export default class {
  /*
   * Common editor class
   */

  private _load = false;
  private _paper = null;

  public get load(): boolean {
    return this._load;
  }

  public get paper(): any {
    return this._paper;
  }

  last_point: Point = null;
  areas: Map<Area, Array<Line>> = new Map();

  constructor (public svg = null) { }

  public setSize (size) {
    /*
     * Set canvas size
     */
    const [width, height] = size;

    this.svg.style.width = width;
    this.svg.style.height = height;

    this._paper = new Raphael(this.svg, width, height);

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
    /*
     * Create a new point
     */
    const point = new Point(coordinates),
      lines = this.getEmptyAreaPoints();

    point.setPaper(this.paper);
    point.draw();

    if (this.last_point !== null) {
      const line = new Line(this.last_point, point);

      line.setPaper(this.paper);
      line.draw();

      lines.push(line);
    }

    this.last_point = point;
  }

  private getEmptyAreaPoints() {
    /*
     * Return empty area points
     */

    if (!this.areas.has(null)) {
      this.areas.set(null, []);
    }

    return this.areas.get(null);
  }

}
