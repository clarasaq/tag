class TRecursoMalla extends TRecurso{
  constructor(){
    super();

    this.vertices;
    this.normales;  //Float32Array
    this.texturas;

    this.indices;   //Uint16Array

    this.vertTriangulos;
    this.normTriangulos;
    this.textTriangulos;

    this.nTriangulos;
  }

  cargarFichero(nombre){
    /*Parsear el fichero
    require "json"*/
    let req = new XMLHttpRequest();
    req.open('GET', nombre, false);
    req.send();

    if(req.status == 200){
      let json = JSON.parse(req.response);
      console.log(json);

<<<<<<< HEAD
      // let vertices = json.data.attributes.position.array;
      // this.vertices = vertices;
      //
      // let normales = json.data.attributes.normal.array;
      // this.normales = normales;
      //
      // let indices = json.data.index.array;
      // this.indices = indices;

      let vertices = json.model.meshes[0].verts;
      this.vertices = vertices;

      let normales = json.model.meshes[0].vertElement.normals;
      this.normales = normales;

      let indices = json.model.meshes[0].vertElement.vertIndices;
      this.indices = indices;
    }
    GVertices = this.vertices;
    GIndices = this.indices;
    GNormales = this.normales;
  }

  draw(){

=======
      let vertices = json.data.attributes.position.array;
      this.vertices = vertices;

      let normales = json.data.attributes.normal.array;
      this.normales = normales;

      let indices = json.data.index.array;
      this.indices = indices;

      // let vertices = json.model.meshes[0].verts;
      // this.vertices = vertices;
      //
      // let normales = json.model.meshes[0].vertElement.normals;
      // this.normales = normales;
      //
      // let indices = json.model.meshes[0].vertElement.vertIndices;
      // this.indices = indices;
    }
  }

  draw(){
    GVertices = this.vertices;
    GIndices = this.indices;
    GNormales = this.normales;
>>>>>>> 111eb9eecd25cab5de4608772a791389548f4a5b
  }
}
