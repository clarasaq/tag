class TGestorRecursos{

  constructor(){
    this.recursos = [];
  }

  getRecurso(nombre, tipo){
    var recurso;
    for(let i=0; i<this.recursos.length; i++){
      if(this.recursos[i].nombre == nombre){
        recurso = this.recursos[i];
        return recurso;
      }
    }
    //creamos el recurso
    if(tipo == "malla"){
      console.log('el fichero de tipo malla ' + nombre + ' no existe por ello lo creamos');
      recurso = new TRecursoMalla();
      //llamamos a cargar el recurso
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
    console.log('devolvemos el array de recursos');
    console.log(this.recursos);

    console.log('devolvemos el TRecursoMalla');
    console.log(recurso);
    return recurso;
  }
}
