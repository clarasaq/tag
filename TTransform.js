class TTransform extends TEntidad{
  constructor(id) {
    super();
    // matriz = new TMatriz4x4;
    // matriz[4][4] = null;
    this.matrix = mat4.create();
    this.id = id;
  }

  identidad(){}

  cargar(matriz){}

  trasladar(tx, ty, tz){

  }

  rotar(rx, ry, rz, rw){
    
  }

  beginDraw(){
    //prueba con un numero -> posteriormente sera una matriz
    console.log("Apilamos id: " + this.id);

    this.stack.push(this.id);
  }

  endDraw(){
    console.log("Desapilamos id: " + this.stack[this.stack.length-1]);

    this.stack.pop();
  }
}
