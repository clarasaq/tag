class TTransformacion extends TEntidad{

  constructor() {
    super();
    this.transfMatrix = mat4.create();
  }


  getMatrix(){
    return this.transfMatrix;
  }

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

    console.log(this.transfMatrix)
    mat4.translate(this.transfMatrix, this.transfMatrix, v);
    console.log(this.transfMatrix)
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
  }


  beginDraw(){
    this.stack.push(this.modelMatrix);
    //mat4.multiply(out, a, b);
    //mat4.multiply(this.modelMatrix, this.modelMatrix, this.transfMatrix);
    console.log(this.transfMatrix);
    let aux = this.modelMatrix;
    mat4.multiply(this.modelMatrix, aux, this.transfMatrix);
    //GModelMatrix=this.modelMatrix;
    console.log(this.modelMatrix);
    GModelMatrix = this.modelMatrix;
    console.log('--------------------------------------------------');
    console.log(GModelMatrix);
    console.log(this.transfMatrix);
  }

  endDraw(){
    console.log("Desapilamos matriz: " + this.stack[this.stack.length-1]);
    this.modelMatrix = this.stack.pop();
  }
}
