class TTransform extends TEntidad{

<<<<<<< HEAD
  constructor(id) {
    super();
    this.transfMatrix = mat4.create();
    this.id = id;
  }


  getMatrix(){
    return this.transfMatrix;
=======
  //---- construye una matriz identidad ----//
  constructor(id) {
    super();
    this.nodoMatrix = mat4.create();
    this.id = id;
  }

  getMatrix(){
    return this.nodoMatrix;
  }
  cargar(matrix){
    this.nodoMatrix = matrix;
>>>>>>> master
  }
  getId(){
    return this.id;
  }
<<<<<<< HEAD
  cargar(matrix){
    this.transfMatrix = matrix;
  }

  identidad(){
    mat4.identity(this.transfMatrix);
  }
  // matriz de salida, matriz a realizar la transformacion ( es la misma )
  transponer(){
    mat4.transpose(this.transfMatrix, this.transfMatrix);
  }

  invertir(){
    mat4.invert(this.transfMatrix, this.transfMatrix);
  }

  trasladar( tx, ty, tz){
    let v = vec3.fromValues(tx, ty, tz);
    mat4.translate(this.transfMatrix, this.transfMatrix, v);
  }

  escalar(ex, ey, ez){
    let v = vec3.fromValues(ex, ey, ez);
    mat4.scale(this.transfMatrix, this.transfMatrix, v);
  }

//---- Parametros: angulo en radianes y 3 coordenadas del eje ----//
//---- si queréis rotar sobre un eje en especial me lo decís y lo meto :) ----//

//---- 90 grados = 1,5708 radianes ----//
  rotar(rad, axis1, axis2, axis3){
    let axis = vec3.fromValues(axis1, axis2, axis3);
    mat4.rotate(this.transfMatrix, this.transfMatrix, rad, axis);
=======
  identidad(matrix){
    return mat4.identity(matrix);
  }

  //---- Parametros: matriz a rotar, angulo en radianes y 3 coordenadas del eje ----//
  //---- si queréis rotar sobre un eje en especial me lo decís y lo meto :) ----//
  rotar(matrix, rad, axis1, axis2, axis3){
    let axis = vec3.fromValues(axis1, axis2, axis3);
    mat4.rotate(this.modelMatrix, matrix, rad, axis);
  }
  trasladar(matrix, tx, ty, tz){
    let v = vec3.fromValues(tx, ty, tz);
    return mat4.translate(this.modelMatrix, matrix, v);
  }

  escalar(matrix, ex, ey, ez){
    let v = vec3.fromValues(ex, ey, ez);
    mat4.scale(out, matrix, v);
  }

  transponer(matrix){
    mat4.transpose(this.modelMatrix, matrix);
>>>>>>> master
  }

  invertir(matrix){
    mat4.invert(this.modelMatrix, matrix);
  }

  beginDraw(){
<<<<<<< HEAD
    // console.log("Apilamos id: " + this.id);
    // console.log(this.transfMatrix);


    //guardo la matriz en modelMatrix antes de apilarla
    var aux = mat4.create();
    mat4.copy(aux, this.transfMatrix)
    //multiplicar la matriz transformacion por la actual
    this.stack.push(aux); //aux = modelMatrix

    //mat4.multiply(out, a, b);
    mat4.multiply(this.modelMatrix, this.modelMatrix, this.transfMatrix);
=======
    //prueba con un numero -> posteriormente sera una matriz
    //console.log(this.nodoMatrix);
    //console.log(this.modelMatrix);

    // this.stack.push(this.modelMatrix);
    this.stack.push(this.id);
>>>>>>> master
  }

  endDraw(){
    //console.log(this.stack[1]);
    // console.log(this.stack[this.stack.length-1]);

    this.modelMatrix = this.stack.pop();
    console.log(this.modelMatrix);
  }
}
