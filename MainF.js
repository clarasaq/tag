class MainF{

  constructor(){
    let fachada = new TFachadaMotor();

    let shader = fachada.crearShader('fragShader.frag', 'vertShader.vert');

    let camara1 = fachada.crearCamaraCompleto("camara1");
    let luz1 = fachada.crearLuzCompleto("luz1");
    let vagina = fachada.crearMallaCompleto("Vagina", "Vagina.json", "box.mtl", "textura.jpg");

    shader.loadShaders();
    fachada.draw();
  }
}
