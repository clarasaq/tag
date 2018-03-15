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
    console.log('Cargar el fichero');
    var canvas = document.getElementById('canvas');
    var gl = this.initWebGL(canvas);
    let req = new XMLHttpRequest();
    let aux = nombre.split('.');
    let ext = aux[aux.length-1];

    req.open('GET', nombre, false);
    req.send();
    console.log(ext);
    console.log(req.status);
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
  console.log(programa)

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


gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind vertex buffer object
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);  // Bind index buffer object

gl.useProgram(programa);
// Get the attribute location
var coord = gl.getAttribLocation(programa, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);


//Le paso las matrices al shader
console.log(GModelViewMatrix);
//ModelViewMatrix
var SModelViewMatrix = gl.getUniformLocation(programa, "ModelViewMatrix");
gl.uniformMatrix4fv(SModelViewMatrix,gl.False,GModelViewMatrix);

//ProjectionMatrix
var SProjectionMatrix = gl.getUniformLocation(programa, "ProjectionMatrix");
gl.uniformMatrix4fv(SProjectionMatrix,gl.FALSE,GModelMatrix);

//MVP
var sMVP = gl.getUniformLocation(programa, "MVP");
gl.uniformMatrix4fv(sMVP, gl.FALSE,gMVP);

//Normal Matrix





//Fragment Shader
var color = gl.getUniformLocation(programa, "color");
var aux= [0.7,0.2,0.7,1.0];
gl.uniform4fv(color,aux);


/*=========Drawing the triangle===========*/

gl.viewport(0,0,canvas.width,canvas.height);
//gl.drawElements(Mode, Count, Type, Offset)
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
// gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT,0);
/*
//Crear buffers para Vertices, indicies, normales

  // Create an empty buffer object to store vertex buffer
  var vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //gl.bindBuffer(gl.ARRAY_BUFFER, null); //unbind -> desatar
  // Create an empty buffer object to store Index buffer
  var Index_Buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  var Normal_Buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, Normal_Buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normales), gl.STATIC_DRAW);

//AÑADO valores a los parameteros de los shaders

//VertexPosition

//El de vertices => Asognar los vertices al shader
  //gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
  	var vertexPosition = gl.getAttribLocation(programa, 'VertexPosition');
  	gl.vertexAttribPointer(
  		vertexPosition, // Attribute location
  		3, // Number of elements per attribute
  		gl.FLOAT, // Type of elements
  		gl.FALSE,
  		3 , // Size of an individual vertex
  		0 // Offset from the beginning of a single vertex to this attribute
  	);
  	gl.enableVertexAttribArray(vertexPosition);

//VertexNormal
//El de normales
var vertexNormal = gl.getAttribLocation(programa, 'VertexNormal');
gl.vertexAttribPointer(vertexNormal, 3, gl.FLOAT, gl.TRUE,indices.length, 0);
gl.enableVertexAttribArray(vertexNormal);


//Matrices del VertexShader
var SModelViewMatrix = gl.getUniformLocation(programa, 'ModelViewMatrix');
var SProjectionMatrix = gl.getUniformLocation(programa, 'ProjectionMatrix');
var Smvp = gl.getUniformLocation(programa, 'MVP');

gl.uniformMatrix4fv(SModelViewMatrix,gl.FALSE, GModelViewMatrix);
gl.uniformMatrix4fv(SProjectionMatrix, gl.FALSE, GProjectionMatrix);
gl.uniformMatrix4fv(gMVP, gl.FALSE, projMatrix);




  //gl.useProgram(this.shaderProgram);
  gl.useProgram(programa);

  //Tipo uniform
  //this.shaderProgram.FragColor = gl.getUniformLocation(this.shaderProgram, 'FragColor');
  //programa = gl.getUniformLocation(programa, 'FragColor');
  //gl.uniform4fv(this.shaderProgram.FragColor, [0,1,0,1.0]);
  //gl.uniform4fv(programa, [0,1,0,1.0]);
  //Tipo attribute
  // this.shaderProgram.VertexPosition = gl.getAttribLocation(this.shaderProgram, 'VertexPosition');
  // gl.enableVertexAttribArray(this.shaderProgram.VertexPosition);
  // gl.vertexAttribPointer(this.shaderProgram.VertexPosition, 3, gl.FLOAT, false, 0,0);


  /*======= Associating shaders to buffer objects =======*/

//  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind vertex buffer object
  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);  // Bind index buffer object

  // Get the attribute location
 //var coord = gl.getAttribLocation(shaderProgram, "coordinates");
 //var coord = gl.getAttribLocation(this.getShaderProgram(), "VertexNormal");
 //  console.log(prueba.getShaderProgram());
 //  var aux = prueba.getShaderProgram();
 //  var coord = gl.getAttribLocation(aux, "coordinates");


//  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  //gl.enableVertexAttribArray(coord);*/



}

getShaderProgram(){
  return this.shaderProgram;
}
}
