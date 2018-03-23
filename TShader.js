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
        // console.log(this.VertexShader);
      }else{
        if(ext == 'frag'){
          //Fragment shader
          this.FragmentShader = req.response;
          // console.log(this.FragmentShader);
        }
      }
    }
  }

  //TODO => Pasarle los datos al Shader



loadShaders(vertices, indices, normales){

  var canvas = document.getElementById('canvas');
  var gl = this.initWebGL(canvas);
  //Compilo los dos shaders

  //Vertex Shader
  // console.log(this.VertexShader);
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, this.VertexShader);
  // console.log(this.VertexShader);
  gl.compileShader(vertShader);

  var error = gl.getShaderInfoLog(vertShader);

  if (error.length > 0) {
    console.log(error)
//     throw error;
  }

  //FragmentShader
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, this.FragmentShader);
  gl.compileShader(fragShader);

  var error = gl.getShaderInfoLog(fragShader);

 if (error.length > 0) {
    throw error;
  }

  programa = gl.createProgram();
  gl.attachShader(programa,vertShader);
  gl.attachShader(programa, fragShader);
  gl.linkProgram(programa);

//Creo los buffers

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null); //unbind -> desatar

// Create an empty buffer object to store Index buffer
var Index_Buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

var Normal_Buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, Normal_Buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normales), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

console.log(Normal_Buffer);


gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind vertex buffer object
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);  // Bind index buffer object

gl.useProgram(programa);
// Get the attribute location
var coord = gl.getAttribLocation(programa, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, gl.FALSE, 0, 0);
gl.enableVertexAttribArray(coord);

gl.bindBuffer(gl.ARRAY_BUFFER, Normal_Buffer);
//NORMAL
var sNormal = gl.getAttribLocation(programa, "VertexNormal");
gl.vertexAttribPointer(sNormal, 3, gl.FLOAT, gl.FALSE, 0, 0);
gl.enableVertexAttribArray(sNormal);


//Le paso las matrices al shader

//VERTEX SHADER

//Obtengo la ModelViewMatrix con la libreria GLMATRIX
GModelViewMatrix = mat4.create();
console.log(GViewMatrix);
console.log(GModelMatrix);
mat4.multiply(GModelViewMatrix, GModelMatrix, GViewMatrix );
console.log(GModelViewMatrix);
//ModelViewMatrix
var SModelViewMatrix = gl.getUniformLocation(programa, "ModelViewMatrix");
gl.uniformMatrix4fv(SModelViewMatrix,gl.FALSE,GModelViewMatrix);

//NormalMatrix
GNormalMatrix = mat4.create();
mat4.invert(GNormalMatrix, GModelViewMatrix);
mat4.transpose(GNormalMatrix, GNormalMatrix);
//console.log(GNormalMatrix);
var SNormalMatrix = gl.getUniformLocation(programa, "NormalMatrix");
gl.uniformMatrix4fv(SNormalMatrix,gl.FALSE,GNormalMatrix);
//ProjectionMatrix
console.log(GProjectionMatrix);


var SProjectionMatrix = gl.getUniformLocation(programa, "ProjectionMatrix");
gl.uniformMatrix4fv(SProjectionMatrix,gl.FALSE,GProjectionMatrix);


//MVP
//console.log(gMVP);
gMVP = mat4.create();
mat4.multiply(gMVP, GModelViewMatrix, GProjectionMatrix);
var sMVP = gl.getUniformLocation(programa, "MVP");
gl.uniformMatrix4fv(sMVP, gl.FALSE,gMVP);

//Normal Matrix



//FRAGMENT SHADER

//Paso las componentes del material
//COMPONENTE DIFUSA
//console.log(GDifuso);
var SDifusa = gl.getUniformLocation(programa, "Kd");
gl.uniform3fv(SDifusa, GDifuso);

//COMPONENTE AMBIENTAL
//console.log(GAmbiental);
var SAmbiental = gl.getUniformLocation(programa, "Ka");
gl.uniform3fv(SAmbiental, GAmbiental);

//COMPONENTE ESPECULAR
//console.log(GEspecular);
var SEspecular = gl.getUniformLocation(programa, "Ks");
gl.uniform3fv(SEspecular, GEspecular);

//COMPONENTE DE BRILLO
var SBrillo = gl.getUniformLocation(programa, "Shininess");
gl.uniform1f(SBrillo, GBrillo);



//LIGTHPOSITION
//console.log(auxPosition);
console.log(GPositionLuz);
 var SPosicionLuz = gl.getUniformLocation(programa, "LightPosition");
 //var auxPos = []
gl.uniform4fv(SPosicionLuz, GPositionLuz);


 //LIGTHINTENSITY
 var auxLuz = [0.9,0.9,0.9];
var SIntensidad = gl.getUniformLocation(programa, "LightIntensity");
//gl.uniform3fv = gl.uniform3fv(SIntensidad, GIntensidadLuz);
gl.uniform3fv = gl.uniform3fv(SIntensidad, auxLuz);

/*=========Drawing the triangle===========*/

gl.viewport(0,0,canvas.width,canvas.height);
//gl.drawElements(Mode, Count, Type, Offset)
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
// gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT,0);

}

getShaderProgram(){
  return this.shaderProgram;
}
}
