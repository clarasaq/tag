class MainF{

  constructor(){
    let fachada = new TFachadaMotor();

    let camara1 = fachada.crearCamaraCompleto("camara1");
    let luz1 = fachada.crearLuzCompleto("luz1");

    // let camara = fachada.getCamaras()[0];
    // let rotacion = fachada.rotar(camara, 1.4, 1, 0, 0);

    let vagina = fachada.crearMallaCompleto("Vagina", "tetera.obj", "material.mtl", "textura.jpg");
    let shader = fachada.crearShader('fragShader.frag', 'vertShader.vert');

    fachada.draw();
    shader.loadShaders();
  }
}
