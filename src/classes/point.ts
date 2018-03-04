import Element from './abstract/element';

export default class extends Element {
  /*
   * Simple point class
   */
  private readonly GREEN_COLOR = '#0B0';
  private readonly COLOR = '#45D4FF';

  private readonly RADIUS = 6;
  private readonly STROKE = 2;

  private readonly gap = 5;

  private draggable = false;
  private tmp_coordinates: [number, number];

  private circle;
  private circle_set;

  constructor (public coordinates: [number, number]) {
    super();
  }

  public draw (first: boolean = false) {
    /*
     * Display circle on canvas
     */
    this.circle_set = this.paper.set();
    this.circle = this.paper.circle(this.coordinates[0], this.coordinates[1], this.RADIUS)
      .attr({
        'fill': first ? this.GREEN_COLOR : this.COLOR,
        'stroke-width': this.STROKE
      })
      .toFront();

    this.circle_set.push(this.circle);

    this.circle_set.drag(
      (dx, dy) => this.onMove(dx, dy),
      (dx, dy) => this.holdStore(dx, dy),
      ($event) => this.unHoldStore($event),
    );
  }

  public isEqual (point) {
    /*
     * Compare two points by coordinates with gup
     */
    return point.coordinates[0] >= this.coordinates[0] - this.gap &&
      point.coordinates[0] <= this.coordinates[0] + this.gap &&
      point.coordinates[1] >= this.coordinates[1] - this.gap &&
      point.coordinates[1] <= this.coordinates[1] + this.gap;
  }

  private holdStore (...args) {
    /*
     * Hold old coordinates
     */
    this.tmp_coordinates = this.coordinates;
  }

  private unHoldStore (...args) {
    /*
     * Unhold circle's position
     * Update circle's canvas coordinates
     * Flushing drag transform
     */
    this.circle.attr({
      cx: this.coordinates[0],
      cy: this.coordinates[1],
    });

    this.circle.transform('t0,0');

    this.tmp_coordinates = null;
  }

  private onMove (dx, dy) {
    /*
     * Upgrade circle transformation when drug
     */
    if (!this.context || !this.context.draggable) {
      return;
    }

    this.coordinates = [
      this.tmp_coordinates[0] + dx,
      this.tmp_coordinates[1] + dy,
    ];

    this.circle.transform('t' + dx + ',' + dy);

    this.context.redraw();
  }

  public normalize() {
    /*
     * Normalize point
     */
    this.circle.attr({
      'fill': this.COLOR,
    });
  }

  public remove() {
    this.circle_set.remove();
  }

}
