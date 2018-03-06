class TFachadaMotor {

  constructor(){
    this.escena = new TNodo("Escena");
    this.gestor = new TGestorRecursos();
    //Registros objetos
    this.regLuces = [];
    this.regCamaras= [];
    this.regLucesActivas = [];
    this.regCamarasActivas = [];
  }

  crearNodo(nombre, padre, entidad){
    let nodo = new TNodo(nombre, padre);
    if (entidad != null){
      nodo.setEntidad(entidad);
    }
    return nodo;
  }
  borrarNodo(nodo){
    let padre = nodo.getPadre();
    padre.removeHijo(nodo);
  }

  crearTransform(){
    let trans = new TTransformacion();
    return trans;
  }

//---- Camara ----//
  crearCamara(nombre, padre){
    let nodo = new TNodo(nombre, padre);
  	let camara = new TCamara();
  	nodo.setEntidad(camara);
  	return nodo;
  }
  crearCamaraCompleto(nombre){
    let rota = this.crearNodo("RotaCam", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaCam", rota, this.crearTransform());
    let cam = this.crearCamara(nombre, trasla);
    this.regCamaras.push(cam);
    this.regCamarasActivas.push(0); //la apilo a la vez indicando que esta desactivada
    return cam;
  }
  activarCamara(camara){
    for(let i=0; i<this.regCamaras.length; i++){
      if (this.regCamaras[i] == camara){
        this.regCamarasActivas[i] = 1;
      }
    }
  }
  desactivarCamara(camara){
    for(let i=0; i<this.regCamaras.length; i++){
      if (this.regCamaras[i] == camara){
        this.regCamarasActivas[i] = 0;
      }
    }
  }
  borrarCamaraCompleto(){
    for(let i=0; i<this.regCamaras.length; i++){
      this.escena.removeHijo(this.regCamaras[i].getPadre().getPadre());
      this.regCamaras[i] = 0; // -1??
      this.regCamarasActivas[i] = -1;
    }
  }

//---- luz ----//
  crearLuz(nombre, padre){
    let nodo = new TNodo(nombre, padre);
  	let luz = new TLuz();
  	nodo.setEntidad(luz);
  	return nodo;
  }
  crearLuzCompleto(nombre){
    let rota = this.crearNodo("RotaLuz", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaLuz", rota, this.crearTransform());
    let luz = this.crearLuz(nombre, trasla);
    this.regLuces.push(luz);
    this.regLucesActivas.push(0);
    return luz;
  }
  activarLuz(luz){
    for(let i=0; i<this.regLuces.length; i++){
      if (this.regLuces[i] == luz){
        this.regLucesActivas[i] = 1;
      }
    }
  }
  desactivarLuz(luz){
    for(let i=0; i<this.regLuces.length; i++){
      if (this.regLuces[i] == luz){
        this.regLucesActivas[i] = 0;
      }
    }
  }
  borrarLuzCompleto(){
    for(let i=0; i<this.regLuces.length; i++){
      this.escena.removeHijo(this.regLuces[i].getPadre().getPadre());
      this.regLuces[i] = 0; //-1??
      this.regLucesActivas[i] = -1;
    }
  }

//---- Malla ----//
  crearMalla(nombre, ficheroMalla, ficheroMaterial, padre){
    let nodo = new TNodo(nombre, padre);
    let entMalla = new TMalla();
    nodo.setEntidad(entMalla);
    entMalla.malla = this.gestor.getRecurso(ficheroMalla, "malla");
    entMalla.material = this.gestor.getRecurso(ficheroMaterial, "material");
    return entMalla;
  }
  crearMallaCompleto(nombre, ficheroMalla, ficheroMaterial){
    let rota = this.crearNodo("RotaMalla", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaMalla", rota, this.crearTransform());
    let malla = this.crearMalla(nombre, ficheroMalla, ficheroMaterial, trasla);
    console.log(malla);
    return malla;
  }

  draw(){
    this.escena.draw();
  }
}
