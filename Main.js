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

    //---- Añadir las entidades a los nodos ----//
    var TransfRotaLuz = new TTransform("Rotaluz_matrix", 1, 2, 3, 4, 15, 6, 7, 8, 19, 10, 11, 12, 16, 14, 15, 16);
    var TransfRotaCam = new TTransform("Rotacam_matrix", 1, 2, 3, 14, 5, 6, 7, 18, 9, 10, 11, 12, 13, 14, 8, 16);
    var TransfRotaCoche = new TTransform("Rotacoche_matrix", 1, 2, 3, 11, 5, 6, 7, 10, 9, 10, 11, 22, 13, 14, 25, 16);

    var TransfTraslaLuz = new TTransform("Traslaluz_matrix", 1, 2, 5, 4, 5, 6, 7, 18, 9, 10, 11, 12, 23, 14, 15, 16);

    var EntLuz = new TLuz("NLuz");

    RotaLuz.setEntidad(TransfRotaLuz);
    RotaCam.setEntidad(TransfRotaCam);
    RotaCoche.setEntidad(TransfRotaCoche);

    TraslaLuz.setEntidad(TransfTraslaLuz);
    NLuz.setEntidad(EntLuz);


    //---- Pintamos el árbol ----//
    console.log("**************");
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

    //---- Ejmplo de uso de las Transformaciones ----//
    //TransfRotaCam.identidad(TransfRotaCam.getMatrix());


    Escena.removeHijo(RotaLuz);

    console.log("************** Borrando hijos");
    Escena.draw();

    Escena.removeHijos();

    console.log("************** Borrando escena");
    Escena.draw();

  }
}
