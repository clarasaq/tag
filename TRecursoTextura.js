class TRecursoTextura extends TRecurso{
  constructor(){
    super();
    this.textureCoordinates = [];
    this.textura;
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

  cargarFichero(nombre, coordenadas){
      var self = this;
      var canvas = document.getElementById('canvas');
      var gl = this.initWebGL(canvas);
      var textura;
      textura = gl.createTexture();
      //creamos una imagen para asociarla a la textura
      textura.image = new Image();
      textura.image.onload = function() {
        console.log("Procedo a cargar la textura");
        self.handleLoadedTexture(textura);
      }
      textura.image.src = nombre;
      this.textureCoordinates = coordenadas;
      this.handleLoadedTexture(textura);
  }

  handleLoadedTexture(texture) {
    var canvas = document.getElementById('canvas');
    var gl = this.initWebGL(canvas);
    //asignamos la textura con la que vamos a trabajar
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //ponemos la img de la textura en posicion vertical para poder trabajar con ella
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //cargamos la imagen
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    //escalado de la textura
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    //se pone a null para dejar la variable libre para otras texturas
    gl.bindTexture(gl.TEXTURE_2D, null);
    console.log("Textura cargada");
  }

  draw(){
    var canvas = document.getElementById('canvas');
    console.log('Estamos en TRecursoMalla y hacemos draw');
    var gl = this.initWebGL(canvas);
    var cubeVertexTextureCoordBuffer;
    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
      // Cara frontal
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Cara trasera
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Cara superior
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Cara inferior
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Cara izquierda
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Cara derecha
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
  }
}
