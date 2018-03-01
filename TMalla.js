class TMalla extends TEntidad{

  constructor(nombre){
    super();
    this.nombre = nombre;
    this.malla = null;
    this.material = null;
    console.log("caca");
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
    let gestormat = new TGestorRecursos();
    this.material = gestormat.getRecurso(mtl, "material");
  }

  getMalla(){
    return this.malla;
  }

  beginDraw(){
    console.log("a ver si entrasS");
    this.malla.draw();
  }

  endDraw(){

  }

}
