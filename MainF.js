class MainF{

  constructor(){

    let fachada = new TFachadaMotor();

    let camara1 = fachada.crearCamaraCompleto("camara1");
    let luz1 = fachada.crearLuzCompleto("luz1");

    let vagina = fachada.crearMallaCompleto("Vagina", "cube-mr.json", "box.mtl");

    fachada.draw();

    console.log(">>>>>>> BORRANDO VOYYYY BORRANDO VENGO <<<<<<<<<");


    let borrando = fachada.borrarLuzCompleto();

    fachada.draw();

  }
}
