class MainF{

  constructor(){
    let fachada = new TFachadaMotor();
    var canvas = document.getElementById('canvas');
    Ggl = this.initWebGL(canvas);

    let shader = fachada.crearShader('fragShader.frag', 'vertShader.vert');

    let camara1 = fachada.crearCamaraCompleto("camara1");
    let luz1 = fachada.crearLuzCompleto("luz1");
    let vagina = fachada.crearMallaCompleto("Vagina", "Vagina.json", "box.mtl", "textura.jpg");

    shader.loadShaders();
    fachada.draw();
  }

<<<<<<< HEAD
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
=======
    let vagina = fachada.crearMallaCompleto("Vagina", "cube-mr.json", "box.mtl", "textura.jpg");
    let shader = fachada.crearShader('fragShader.frag', 'vertShader.vert');

    fachada.draw();
    shader.loadShaders();
>>>>>>> 111eb9eecd25cab5de4608772a791389548f4a5b
  }
}
