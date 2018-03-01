class TRecursoMaterial extends TRecurso{

  constructor(){
    super();

    this.colorDifuso;
    this.colorEpecular;
    this.colorAmbiente;
    this.transparencia;
    this.coefEspecular;
    this.vertexColor;
  }
  //buscar estructura archivos .mtl leerlo y cargarlo como hacemos con la TRecursoMalla
  //almacenar color difuso, color especular, etc
  cargarFichero(nombre){
    /*Parsear el fichero
    require "json"*/
    console.log("Entramos en la carga de fichero MATERIAL");

    let req = new XMLHttpRequest();
    req.open('GET', nombre, false);
    req.send();

    if(req.status == 200){
      console.log(this.req);
    }
  }

}
