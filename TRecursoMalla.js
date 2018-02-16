class TRecursoMalla extends TRecurso{
  constructor(){
    super();

    this.vertices;
    this.normales;
    this.texturas;

    this.vertTriangulos;
    this.normTriangulos;
    this.textTriangulos;

    this.nTriangulos;
  }

  cargarFichero(nombre){
    /*Parsear el fichero
    require "json"
    lines = File.open("filename.txt").read.split("}\n").join("},")+"}"
    data = JSON.parse([lines].to_s)*/
    console.log('Estamos en TRecursoMalla y cargamos el fichero: ' + nombre);

    return;

    let array = [];
    let file = new File([array], nombre);
    console.log(array);
    console.log(file);
    let lines = file.read.split("}\n").join("},")+"}";
    let data = JSON.parse([lines].to_s);

    console.log(data);
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

  draw(){
    /*Se supone que debemos llamar a esta funcion con un recurso.draw()
    en este caso ese recurso sera un TRecursoMalla
    y al ser un recurso debe anteriormente haber llamado a cargarFichero y
    haber rellenado todas las variables que se estipulan en el
    constructor para cuando llegue a este metodo, pintarlo con WebGL*/

    var canvas = document.getElementById('canvas');

    console.log('Estamos en TRecursoMalla y hacemos draw');
    console.log(canvas);

    var gl = this.initWebGL(canvas);
    /*======== Defining and storing the geometry ===========*/

     var vertices = [
       -0.3, 0.3, 0.0,
       -0.3, -0.3, 0.0,
       0.3, -0.3, 0.0,
       0.3, 0.3, 0.0
     ];

     var indices = [0 ,1 ,2, 3];

     // Create an empty buffer object to store vertex buffer
     var vertex_buffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ARRAY_BUFFER, null); //unbind -> desatar

     // Create an empty buffer object to store Index buffer
     var Index_Buffer = gl.createBuffer();
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

     /*================ Shaders ====================*/
     // Vertex shader source code
     var vertCode =
        'attribute vec3 coordinates;' +

        'void main(void) {' +
           ' gl_Position = vec4(coordinates, 1.0);' +
        '}';

     // Create a vertex shader object
     var vertShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertShader, vertCode); // adjuntar con vertCode
     gl.compileShader(vertShader);  // Compilar vertShader

     var fragCode =
        'void main(void) {' +
           ' gl_FragColor = vec4(0.3, 0.2, 0.7, 1.0);' +
        '}'; //fragment shader source code

     // Create fragment shader object
     var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
     gl.shaderSource(fragShader, fragCode); // adjuntar con fragCode
     gl.compileShader(fragShader);  // Compilar fragShader

     // Objeto de programa para almacenar el programa de sombreado combinado
     var shaderProgram = gl.createProgram();
     gl.attachShader(shaderProgram, vertShader);  // adjuntar con vertShader
     gl.attachShader(shaderProgram, fragShader);  // adjuntar con fragShader

     gl.linkProgram(shaderProgram); // Link both the programs
     gl.useProgram(shaderProgram);  // Use the combined shader program object

     /*======= Associating shaders to buffer objects =======*/
     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind vertex buffer object
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);  // Bind index buffer object

     // Get the attribute location
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(coord);

     /*=========Drawing the triangle===========*/
     gl.viewport(0,0,canvas.width,canvas.height);
     //gl.drawElements(Mode, Count, Type, Offset)
     gl.drawElements(gl.TRIANGLE_FAN, indices.length, gl.UNSIGNED_SHORT,0);
     // gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT,0);

  }
}
