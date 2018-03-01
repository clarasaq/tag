class Main {
  constructor() {
    //EJEMPLO DIAPOSITIVAS SEMINARIO 2

    //---- Crear la estructura del árbol ----//
    var Escena = new TNodo("Escena");

    var RotaLuz = new TNodo("RotaLuz", Escena);
    var RotaCam = new TNodo("RotaCam", Escena);
    var RotaCoche = new TNodo("RotaCoche", Escena);

    var TraslaLuz = new TNodo("TraslaLuz", RotaLuz);
    var NLuz = new TNodo("NLuz", TraslaLuz);

    var TraslaCoche = new TNodo("TraslaCoche", RotaCoche);

    var RotaMalla = new TNodo("RotaMalla", Escena);
    var TraslaMalla = new TNodo("TraslaMalla", RotaMalla);
    var NMall = new TNodo("NMall", TraslaMalla);


    //---- Añadir las entidades a los nodos ----//
    var TransfRotaLuz = new TTransform("Rotaluz_matrix");
    var TransfRotaCam = new TTransform("Rotacam_matrix");
    var TransfRotaCoche = new TTransform("Rotacoche_matrix");

    var TransfTraslaLuz = new TTransform("Traslaluz_matrix");

    var EntLuz = new TLuz("NLuz");

    RotaLuz.setEntidad(TransfRotaLuz);
    RotaCam.setEntidad(TransfRotaCam);
    RotaCoche.setEntidad(TransfRotaCoche);

    TraslaLuz.setEntidad(TransfTraslaLuz);
    NLuz.setEntidad(EntLuz);

    var EntMalla = new TMalla("EntMalla");
    NMall.setEntidad(EntMalla);

    NMall.entidad.cargarMalla("cube-mini.json");
    NMall.entidad.beginDraw();



    //---- Pintamos el árbol ----//
    console.log("**************");
    Escena.draw();

    console.log("-----------------");
    console.log("START RECURSOS");
    //---- Gestor Recursos ----//
    var gestorRecursos = new TGestorRecursos();

    console.log("-----------------");
    console.log("END RECURSOS");

    //---- Transformacion ----//
     //TransfRotaCam.trasladar(TransfRotaCam.getMatrix(), 4, 3, 2);
     // console.log(TransfRotaCam.trasladar(TransfRotaCam.getMatrix(), 4, 3, 2));
    // TransfRotaLuz.getMatrix();
    //console.log("STACK");
    //this.stack.draw();


    Escena.removeHijo(RotaLuz);

    console.log("************** Borrando hijos");
    Escena.draw();

    Escena.removeHijos();

    console.log("************** Borrando escena");
    Escena.draw();

  }
}
