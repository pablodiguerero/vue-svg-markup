import Element from './abstract/element';
import Point from './point';
import Line from './line';

class Area extends Element {

  private readonly COLOR_RELATED = '#9F5500';
  private readonly COLOR_UNRELATED = '#000';
  private readonly ACTIVE_RELATED = '#BF7500';
  private readonly ACTIVE_UNRELATED = '#444';

  private readonly OPACITY = 0.5;
  private readonly STROKE = 2;

  private COLOR = this.COLOR_UNRELATED;
  private ACTIVE = this.ACTIVE_UNRELATED;

  private area;

  public static fromLines(lines: Array<Line>) {
    const points = [];

    lines
      .map(function(element: Line, index) {
        return !index ? [element.from_point, element.to_point] :
          [element.to_point];
      }).forEach(x => x.forEach(k => points.push(k)));

    return new Area(points);
  }

  constructor(public points: Array<Point>) {
    super();
  }

  public draw() {
    this.area = this.paper.path(this.getPath())
      .attr({
        'fill': this.COLOR,
        'fill-opacity': this.OPACITY,
        'stroke-width': this.STROKE
      })
      .toBack();
  }

  private getPath () {
    let path = '';

    for (const point of this.points) {
      path += (path === '' ? 'M' : 'L');
      path += point.coordinates[0] + ' ' + point.coordinates[1];
    }

    return path + 'z';
  }

}

export default Area;
