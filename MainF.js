class MainF{

  constructor(){

    let fachada = new TFachadaMotor();

    let camara1 = fachada.crearCamaraCompleto("camara1");
    let luz1 = fachada.crearLuzCompleto("luz1");
    let vagina = fachada.crearMallaCompleto("Vagina", "cube.json");
    let material = fachada.crearMaterial("materialV", "box.mtl");


    fachada.draw();
  }
}
