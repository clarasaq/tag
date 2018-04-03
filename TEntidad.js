class TEntidad {

  //clase virtual
  constructor(){
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
  }

  beginDraw(){}
  endDraw(){}
}
