import Element from './abstract/element';

export default class extends Element {
  /*
   * Simple point class
   */
  private readonly RADIUS = 6;
  private readonly COLOR = '#45D4FF';
  private readonly STROKE = 2;

  private draggable = false;

  private circle;
  private circle_set;

  constructor (public coordinates: [number, number]) {
    super();
  }

  public draw () {
    this.circle_set = this.paper.set();
    this.circle = this.paper.circle(this.coordinates[0], this.coordinates[1], this.RADIUS)
      .attr({
        'fill': this.COLOR,
        'stroke-width': this.STROKE
      })
      .toFront();

    this.circle_set.push(this.circle);

    this.circle_set.drag(
      (dx, dy) => this.onMove(dx, dy)
    );
  }

  public isEqual(point) {

  }

  private onMove (dx, dy) {
    if (!this.draggable) {
      return;
    }

    this.circle.transform('t' + dx + ',' + dy);
  }

}
