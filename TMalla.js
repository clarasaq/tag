class TMalla extends TEntidad{

  constructor(){
    super();
    this.malla = null;
    this.material = null;

  }

  cargarMaterial(mtl){
    console.log("Entro a cargarMaterial");
    let gestormat = new TGestorRecursos();
    this.material = gestormat.getRecurso(mtl, "material");
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
