class TShader extends TRecurso {
  constructor(){
    super();
    this.VertexShader;
    this.FragmentShader;
    this.shaderProgram;
  }

  cargarFichero(nombre){
    let req = new XMLHttpRequest();
    let aux = nombre.split('.');
    let ext = aux[aux.length-1];

    req.open('GET', nombre, false);
    req.send();

    if(req.status == 200){
      if(ext == 'vert'){
        //Vertex Shader
        this.VertexShader = req.response;
      }else{
        if(ext == 'frag'){
          //Fragment shader
          this.FragmentShader = req.response;
        }
      }
    }
  }

loadShaders(){
  //Compilo los dos shaders

  //Vertex Shader
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.compileShader(vertShader, this.VertexShader);
  var error = gl.getShaderInfoLog(vertShader);

  if (error.length > 0) {
    throw error;
  }

  //FragmentShader
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.compileShader(fragShader, this.FragmentShader);
  var error2 = gl.getShaderInfoLog(fragShader);

  if(error2.length > 0){
    throw error2;
  }


  this.shaderProgram = gl.createProgram();
  gl.attachShader(this.shaderProgram, vertShader);
  gl.attachShader(this.shaderProgram, fragShader);

  gl.linkProgram(this.shaderProgram);
  gl.useProgram(this.shaderProgram);

}

getShaderProgram(){
  return this.shaderProgram;
}
