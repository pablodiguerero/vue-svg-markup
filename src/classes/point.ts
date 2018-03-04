import Element from './abstract/element';

export default class extends Element {
  /*
   * Simple point class
   */
  private readonly RADIUS = 6;
  private readonly COLOR = '#45D4FF';
  private readonly STROKE = 2;

  constructor (private coordinates: [number, number]) {
    super();
  }

  public draw () {
    return this.paper
      .circle(this.coordinates[0], this.coordinates[1], this.RADIUS)
      .attr({
        'fill': this.COLOR,
        'stroke-width': this.STROKE
      })
      .toFront();
  }

}
