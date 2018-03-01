class TMalla extends TEntidad{

  constructor(){
    super();
    this.malla = null;
    this.material = null;

  }

  cargarMalla(m){

    let gestor = new TGestorRecursos();
    this.malla = gestor.getRecurso(m, "malla");
/*
    let mallagestor= new TRecursoMalla();
    mallagestor.cargarFichero(m);
    this.malla  = mallagestor;
*/
    // let mallaRecurso;
    //
    // mallaRecurso = new TRecursoMalla();
    // console.log("Malla de TRecursoMalla creado");
    // mallaRecurso.cargarFichero(m);
    // console.log("mallaRecurso: " + mallaRecurso);
    // this.malla = mallaRecurso;
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
