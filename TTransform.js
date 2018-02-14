class TTransform extends TEntidad{
  constructor(id) {
    super();
    // matriz = new TMatriz4x4;
    // matriz[4][4] = null;
    // var glm = require('./glm');
    this.matrix = mat4.create();
    this.id = id;
    console.log(this.matrix);
    console.log('id=',this.id);
  }

  identidad(){}

  cargar(matriz){}

  trasladar(tx, ty, tz){

  }

  rotar(rx, ry, rz, rw){

  }
  escalar(ex, ey){

  }
  trasponer(){

  }
  invertir(){

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
