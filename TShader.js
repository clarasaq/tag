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
    let vertices = GVertices;
    let indices = GIndices;
    let normales = GNormales;
    let gl = Ggl;
    //Compilo los dos shaders

    //Vertex Shader
    // console.log(this.VertexShader);
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, this.VertexShader);
    // console.log(this.VertexShader);
    gl.compileShader(vertShader);

    var error = gl.getShaderInfoLog(vertShader);

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
    gl.attachShader(programa, vertShader);
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

    console.log('Buffers ****');
    console.log('vertices: ' + vertices);
    console.log('indices: ' + indices);
    console.log('normales: ' + normales);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);  // Bind index buffer object

    gl.useProgram(programa);
    // Get the attribute location
    var coord = gl.getAttribLocation(programa, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, Normal_Buffer);
    //NORMAL
    var sNormal = gl.getAttribLocation(programa, "VertexNormal");
    gl.vertexAttribPointer(sNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(sNormal);

    console.log('coordinates: ????');
    console.log('VertexNormal: ????');
    //Le paso las matrices al shader

    //Obtengo la ModelViewMatrix con la libreria GLMATRIX
    GModelViewMatrix = mat4.create();
    mat4.multiply(GModelViewMatrix, GModelMatrix, GViewMatrix );
    var SModelViewMatrix = gl.getUniformLocation(programa, "ModelViewMatrix");
    gl.uniformMatrix4fv(SModelViewMatrix, false, GModelViewMatrix);

    //NormalMatrix
    GNormalMatrix = mat4.create();
    mat4.invert(GNormalMatrix, GModelViewMatrix);
    mat4.transpose(GNormalMatrix, GNormalMatrix);
    var SNormalMatrix = gl.getUniformLocation(programa, "NormalMatrix");
    gl.uniformMatrix4fv(SNormalMatrix, false, GNormalMatrix);

    //ProjectionMatrix
    var SProjectionMatrix = gl.getUniformLocation(programa, "ProjectionMatrix");
    gl.uniformMatrix4fv(SProjectionMatrix, false, GProjectionMatrix);

    console.log('GModelMatrix: ' + GModelMatrix);
    console.log('GViewMatrix: ' + GViewMatrix);
    console.log('ModelViewMatrix: ' + GModelViewMatrix);
    console.log('GNormalMatrix: ' + GNormalMatrix);
    console.log('GProjectionMatrix: ' + GProjectionMatrix);

    //MVP
    gMVP = mat4.create();
    mat4.multiply(gMVP, GModelViewMatrix, GProjectionMatrix);
    var sMVP = gl.getUniformLocation(programa, "MVP");
    gl.uniformMatrix4fv(sMVP, false, gMVP);

    console.log('gMVP: ' + gMVP);


    //Paso las componentes del material
    var SDifusa = gl.getUniformLocation(programa, "Kd");
    gl.uniform3fv(SDifusa, GDifuso);

    var SAmbiental = gl.getUniformLocation(programa, "Ka");
    gl.uniform3fv(SAmbiental, GAmbiental);

    var SEspecular = gl.getUniformLocation(programa, "Ks");
    gl.uniform3fv(SEspecular, GEspecular);

    var SBrillo = gl.getUniformLocation(programa, "Shininess");
    gl.uniform1f(SBrillo, GBrillo);

    console.log('Materiales **** ');
    console.log('GDifuso: ' + GDifuso);
    console.log('GAmbiental: ' + GAmbiental);
    console.log('GEspecular: ' + GEspecular);
    console.log('GBrillo: ' + GBrillo);

    //LIGTHPOSITION
    let luz = vec4.create();
    mat4.multiply(luz, GPositionLuz, [1,1,1,1]);
    var SPosicionLuz = gl.getUniformLocation(programa, "LightPosition");
    gl.uniform4fv(SPosicionLuz, luz);
    console.log('GPositionLuz: ' + GPositionLuz);
    console.log('luz: ' + luz);

    //LIGTHINTENSITY
    var SIntensidad = gl.getUniformLocation(programa, "LightIntensity");
    gl.uniform3fv(SIntensidad, GIntensidadLuz);
    console.log('GIntensidadLuz: ' + GIntensidadLuz);

    //Drawing
    gl.viewport(0,0,canvas.width,canvas.height);

    //gl.drawElements(Mode, Count, Type, Offset)
    gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT, 0);
    // gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);

  }

  getShaderProgram(){
    return this.shaderProgram;
  }
}
