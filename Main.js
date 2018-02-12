class Main {
  constructor() {
    //EJEMPLO DIAPOSITIVAS SEMINARIO 2

    //---- Crear la estructura del árbol ----//
    var Escena = new TNodo("Escena");

    var RotaLuz = new TNodo("RotaLuz", Escena);
    var RotaCam = new TNodo("RotaCam", Escena);
    var RotaCoche = new TNodo("RotaCoche", Escena);

    var TranslaLuz = new TNodo("TranslaLuz", RotaLuz);

    //---- Añadir las entidades a los nodos ----//
    var TransfRotaLuz = new TTransform(1);
    var TransfRotaCam = new TTransform(2);
    var TransfRotaCoche = new TTransform(3);

    var TransfTraslaLuz = new TTransform(11);

    RotaLuz.setEntidad(TransfRotaLuz);
    RotaCam.setEntidad(TransfRotaCam);
    RotaCoche.setEntidad(TransfRotaCoche);

    TranslaLuz.setEntidad(TransfTraslaLuz);

    console.log(TransfRotaLuz.trasladar(1, 2, 3));

    //---- Pintamos el árbol ----//
    console.log("**************");
    Escena.draw();

    Escena.removeHijo(RotaLuz);

    console.log("**************");
    Escena.draw();

    Escena.removeHijos();

    console.log("**************");
    Escena.draw();

  }
}
