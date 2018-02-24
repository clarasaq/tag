class TMalla extends TEntidad{

  constructor(nombre){
    super();
    this.nombre = nombre;
    this.malla = null;
  }

  cargarMalla(m){
    mallaRecurso = new TRecursoMalla();
    console.log("Malla de TRecursoMalla creado");
    mallaRecurso.cargarFichero(m);
    console.log("mallaRecurso: " + mallaRecurso);
    this.malla = mallaRecurso;
  }

  getMalla(){
    return malla;
  }

  beginDraw(){
    malla.draw;
  }

  endDraw(){

  }

}
