class MainF{

  constructor(){
    let fachada = new TFachadaMotor();

    let shader = fachada.crearShader('fragShader.frag', 'vertShader.vert');

    let camara1 = fachada.crearCamaraCompleto("camara1");
    let luz1 = fachada.crearLuzCompleto("luz1");

    // let camara = fachada.getCamaras()[0];
    // let rotacion = fachada.rotar(camara, 1.4, 1, 0, 0);
    //
    let vagina = fachada.crearMallaCompleto("Vagina", "Vagina.json", "box.mtl", "textura.jpg");

    shader.loadShaders();
    fachada.draw();
  }
}
