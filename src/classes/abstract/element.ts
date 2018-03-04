export default class {
  /*
   * Base element class
   */
  public context;
  public paper;

  public setContext (context) {
    this.context = context;
  }

  public setPaper (paper) {
    this.paper = paper;
  }

  public redraw () {
    throw new Error('Non implement error');
  }

  public remove() {
    throw new Error('Non implement error');
  }

}
