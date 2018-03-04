export default class {
  /*
   * Simple point class
   */
  private readonly RADIUS = 6;
  private readonly COLOR = '#45D4FF';
  private readonly STROKE = 2;

  private context;

  constructor (private coordinates: [number, number]) { }

  public setContext (context) {
    this.context = context
  }

  public draw() {
    console.log(this.context);
  }

}
