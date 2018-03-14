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
    console.log("Model Matrix:" +this.modelMatrix);
    this.malla.draw();
  }

  endDraw(){

  }

}
