class TMalla extends TEntidad{

  constructor(nombre){
    super();
    this.nombre = nombre;
    this.malla = null;
    this.material = new TColor;
    console.log("caca");
  }

  cargarMalla(m){

    let gestor = new TGestorRecursos();
    this.malla = gestor.getRecurso(m, "malla");
    this.material = gestor.getRecurso(m)

    //
    // let mallaRecurso;
    //
    // mallaRecurso = new TRecursoMalla();
    // console.log("Malla de TRecursoMalla creado");
    // mallaRecurso.cargarFichero(m);
    // console.log("mallaRecurso: " + mallaRecurso);
    // this.malla = mallaRecurso;
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
