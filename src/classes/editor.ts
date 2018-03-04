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

    if (lines.length && lines[0].startWith(point)) {
      /*
       * If we have closed figure - convert it to area
       */
      this.convertLinesToArea();
    }
    else {
      /*
       * Else handle inline-click
       */
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
  }

  private getEmptyAreaPoints(): Array<Line> {
    /*
     * Return empty area points
     */

    if (!this.areas.has(null)) {
      this.areas.set(null, []);
    }

    return this.areas.get(null);
  }

  private convertLinesToArea() {
    const lines = this.areas.get(null),
      area = Area.fromLines(lines);

    area.setPaper(this.paper);
    area.draw();

    /*
     * Clear temporary data
     */
    this.areas.delete(null);
    this.last_point = null;

    this.areas.set(area, lines);
  }

  public emptyCache () {
    /*
     * Empty temporary variables
     */
    if (this.areas.has(null)) {
      this.areas.get(null).forEach(area => area.remove());
      this.areas.delete(null);
    }

    if (this.last_point) {
      this.last_point.remove();
      this.last_point = null;
    }
  }

}
