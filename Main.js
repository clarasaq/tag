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
    var NMall = new TNodo("NMall", TraslaCoche);

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

    //---- Pintamos el árbol ----//
    console.log("**************");
    //---- Transformacion ----//
    console.log(" %%%%% Hago una transformación");

    this.modelMatrix = TransfTraslaLuz.trasladar(3, 1, 4);
    Escena.draw();

    console.log("-----------------");
    console.log("START RECURSOS");

    //---- Gestor Recursos ----//
    var gestorRecursos = new TGestorRecursos();

    //---- Recurso ----//
    var recursoMalla = gestorRecursos.getRecurso('cube.json', 'malla');

    //---- Recurso Malla ----//
    recursoMalla.draw();

    console.log("-----------------");
    console.log("END RECURSOS");




    Escena.removeHijo(RotaLuz);

    console.log("************** Borrando hijos");
    Escena.draw();

    Escena.removeHijos();

    console.log("************** Borrando escena");
    Escena.draw();

  }
}
