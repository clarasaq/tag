class TShader extends TRecurso {
  constructor(){
    super();
    this.VertexShader;
    this.FragmentShader;
    this.shaderProgram;
  }

  initWebGL(canvas) {
    var gl = null;

    try {
      // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    // Si no tenemos ningun contexto GL, date por vencido ahora
    if (!gl) {
      alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
      gl = null;
    }

    return gl;
  }

  cargarFichero(nombre){
    var canvas = document.getElementById('canvas');
    var gl = this.initWebGL(canvas);
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
          console.log(this.FragmentShader);
        }
      }
    }
  }

loadShaders(){

  var canvas = document.getElementById('canvas');
  var gl = this.initWebGL(canvas);

  //Compilo los dos shaders

  //Vertex Shader
  console.log(this.VertexShader);
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.compileShader(vertShader, this.VertexShader);

  var error = gl.getShaderInfoLog(vertShader);

  if (error.length > 0) {
    console.log(error)
    // throw error;
  }

  //FragmentShader
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.compileShader(fragShader, this.FragmentShader);

  var error = gl.getShaderInfoLog(fragShader);

  if (error.length > 0) {
    throw error;
  }

  this.shaderProgram = gl.createProgram();
  gl.attachShader(this.shaderProgram, vertShader);
  gl.attachShader(this.shaderProgram, fragShader);


  gl.linkProgram(this.shaderProgram);
  console.log(this.shaderProgram);
  gl.useProgram(this.shaderProgram);

}

getShaderProgram(){
  return this.shaderProgram;
}
}
