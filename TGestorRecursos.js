class TGestorRecursos{

  constructor(){
    this.recursos = [];
  }

  getRecurso(nombre, tipo){
    var recurso;
    for(i=0; i< this.recursos.length; i++){
      if(this.recursos[i].nombre == nombre){
        recurso = this.recursos[i];
      }else{
        //creamos el recurso
        if(tipo == "malla"){
          recurso = new TRecursoMalla();
          //lamamos a cargar el recurso
          recurso.cargarFichero(nombre);
          //lo añadimos al array de recursos
          this.recursos.push(recurso);

        }else if(tipo == "textura"){
          recurso = new TRecursoTextura();
          recurso.cargarFichero(nombre);
          this.recursos.push(recurso);
        }else if(tipo == "material"){
          recurso = new TRecursoMaterial();
          recurso.cargarFichero(nombre);
          this.recursos.push(recurso);
        }
      }
    }
    return recurso;
  }
}
