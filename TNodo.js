// foo instanceof TNodo -> para saber de que tipo es foo
class TNodo {

  constructor(nombre, padre) {
    this.entidad = null;
    this.hijos = new Array();
    this.nombre = nombre;
    if(padre !== undefined){
      this.padre = padre;
      this.padre.addHijo(this);
    }
  }

  addHijo(hijo){
    this.hijos.push(hijo);
  }

  removeHijos(){
    for(let i=0; i<this.hijos.length; i++){
      this.hijos[i].removeHijos();
      this.hijos[i] = 0;
    }
    this.hijos.length = 0;
  }

  removeHijo(hijo){
    for(let i=0; i<this.hijos.length; i++){
      if(this.hijos[i] === hijo){
        this.hijos[i].removeHijos();
        this.hijos.splice(i, 1);

        return;
      }
    }
  }

  setEntidad(entidad){
    this.entidad = entidad;
  }

  getEntidad(){
    return this.entidad;
  }

  getPadre(){
    return this.padre;
  }

  draw(){
    if(this.entidad != null){
      this.entidad.beginDraw();
    }

    for(let i = 0; i<this.hijos.length; i++){
      this.hijos[i].draw();
    }

    if(this.entidad != null){
      this.entidad.endDraw();
    }
  }
}
