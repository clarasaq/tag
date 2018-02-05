// foo instanceof TNodo -> para saber de que tipo es foo
class TNodo {
  // constructor() {
  //   // this.entidad = new TEntidad;
  //   this.entidad = new TEntidad;
  //   this.hijos = new Array;
  //   this.padre = new TNodo;
  //   this.padre = null;
  // }

  constructor(padre) {
    this.entidad = new TEntidad;
    this.hijos = new Array;
    if(padre !== undefined){
      this.padre = new TNodo;
      this.padre = padre;
      this.padre.addHijo(this);
    }
  }

  addHijo(hijo){
    this.hijos.push(hijo);
    //tenemos que apuntar al padre
  }

  remHijos(){
    for(let i=0; i<this.hijos.length; i++){
      this.hijos[i].remHijos();
      this.hijos[i] = 0;
    }
    delete this.hijos;
  }

  remHijo(hijo){
    //buscar la posicion del hijo que queremos borrar y luego:
    //this.hijo.splice(pos, cantidad);
    let pos;

    for(let i=0; i<this.hijos.length; i++){
      if(this.hijos[i] === hijo){
        pos = i;
      }
    }
    
    //borrar tmb hijos del hijo
    // this.padre.remHijos();
    this.hijos.splice(pos, 1);
  }

  setEntidad(entidad){
    //bool
  }

  getEntidad(){
    return this.entidad;
  }

  getPadre(){
    return this.padre;
  }

  draw(){
    this.entidad.beginDraw();
    for(let i = 0; i<this.hijos; i++){
      this.hijos[i].draw();
    }
    this.entidad.endDraw();
  }
}
