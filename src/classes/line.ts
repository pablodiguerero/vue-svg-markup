import Element from './abstract/element';
import Point from './point';

export default class extends Element {
  /*
   * Simple class for line element
   */
  private readonly STROKE = 2;

  private line;

  constructor (public from_point: Point, public to_point: Point) {
    super();
  }

  public draw () {
    this.line = this.paper
      .path(this.getPath())
      .attr({
        'stroke-width': this.STROKE
      })
      .toBack();

    return this.line;
  }

  public startWith(point: Point) {
    return this.from_point.isEqual(point);
  }

  private getPath() {
    const [x1, y1] = this.from_point.coordinates,
      [x2, y2] = this.to_point.coordinates;

    return `M${x1} ${y1}L${x2} ${y2}`;
  }

  public hide() {
    this.line.remove();
  }

  public remove() {
    this.from_point.remove();
    this.to_point.remove();

    this.line.remove();
  }

}
