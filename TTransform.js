class TTransform extends TEntidad{

  //---- construye una matriz identidad ----//
  // constructor(id) {
  //   super();
  //   this.matrix_id = mat4.create();
  //   //Matriz 4x4 resultante:
  //   // 1 0 0 0
  //   // 0 1 0 0
  //   // 0 0 1 0
  //   // 0 0 0 1
  //   this.id = id;
  // }

//---- construye una matriz con los valores dados ----//
  constructor(id, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    super();

    this.matrix = mat4.fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    this.id = id;
  }

  getMatrix(){
    return this.matrix;
  }

  getId(){
    return this.id;
  }

  identidad(matrix){
    this.matrix = mat4.identity(matrix);
  }

  transponer(matrix){
    let out = mat4.create();
    this.matrix = mat4.transpose(out, matrix);
  }

  invertir(matrix){
    let out = mat4.create();
    this.matrix = mat4.invert(out, matrix);
  }

  trasladar(matrix, tx, ty, tz){
    let out = mat4.create();
    let v = vec3.fromValues(tx, ty, tz);
    this.matrix = mat4.translate(out, matrix, v);
  }

  escalar(matrix, ex, ey, ez){
    let out = mat4.create();
    let v = vec3.fromValues(ex, ey, ez);
    this.matrix = mat4.scale(out, matrix, v);
  }

//---- Parametros: matriz a rotar, angulo en radianes y 3 coordenadas del eje ----//
//---- si queréis rotar sobre un eje en especial me lo decís y lo anyao :) ----//
  rotar(matrix, rad, axis1, axis2, axis3){
    let out = mat4.create();
    let axis = vec3.fromValues(axis1, axis2, axis3);
    this.matrix = mat4.rotate(out, matrix, rad, axis);
  }





  beginDraw(){
    //prueba con un numero -> posteriormente sera una matriz
    console.log("Apilamos id: " + this.id);
    console.log(this.matrix);

    this.stack.push(this.id);
  }

  endDraw(){
    console.log("Desapilamos id: " + this.stack[this.stack.length-1]);

    this.stack.pop();
  }
}
