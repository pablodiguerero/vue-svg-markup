import Element from './abstract/element';
import Point from './point';

export default class extends Element {
  /*
   * Simple class for line element
   */
  constructor (private from_point: Point, to_point: Point) {
    super();
  }

}
