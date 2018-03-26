class TMalla extends TEntidad{

  constructor(){
    super();
    this.malla = null;
    this.material = null;

  }

  getMalla(){
    return this.malla;
  }

  beginDraw(){
    this.malla.draw();
  }

  endDraw(){

  }

}
