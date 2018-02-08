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
    // Matrix x Vertex = TransformedVertex
    console.log(tx + "," + ty + "," + tz)
    let vertex = vec4.create(tx, ty, tz);
    let newMatrix = vec4.create(this.matrix*vertex);

    console.log(this.matrix);
    return newMatrix;
  }

  rotar(rx, ry, rz, rw){
    let myRotationAxis = vec3.create(rx, ry, rz);
    this.rotate(rw, myRotationAxis);
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
