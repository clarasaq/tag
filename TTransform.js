class TTransform extends TEntidad{

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
  }
  getId(){
    return this.id;
  }
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
  }

  invertir(matrix){
    mat4.invert(this.modelMatrix, matrix);
  }

  beginDraw(){
    //prueba con un numero -> posteriormente sera una matriz
    //console.log(this.nodoMatrix);
    //console.log(this.modelMatrix);

    // this.stack.push(this.modelMatrix);
    this.stack.push(this.id);
  }

  endDraw(){
    //console.log(this.stack[1]);
    // console.log(this.stack[this.stack.length-1]);

    this.stack.pop();
  }
}
