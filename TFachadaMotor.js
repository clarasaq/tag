class TFachadaMotor {

  constructor(){
    this.escena = new TNodo("Escena");
    this.gestor = new TGestorRecursos();
    //Registros
    this.RegLuces = [];
    this.RegCamaras= [];
    //atributos para mantenimiento de las camaras, luces, viewports...
  }

  crearNodo(nombre, padre, entidad){
    let nodo = new TNodo(nombre, padre);
    if (entidad != null){
      nodo.setEntidad(entidad);
    }
    return nodo;
  }

  crearTransform(){
    let trans = new TTransform();
    return trans;
  }

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
    return cam;
  }

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
    return luz;
  }

  crearMalla(nombre, fichero, padre){
    let nodo = new TNodo(nombre, padre);
    let entMalla = new TMalla();
    nodo.setEntidad(entMalla);
    entMalla.malla = this.gestor.getRecurso(fichero, "malla");
    return entMalla;
  }
  crearMallaCompleto(nombre, fichero){
    let rota = this.crearNodo("RotaMalla", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaMalla", rota, this.crearTransform());
    let malla = this.crearMalla(nombre, fichero, trasla);
    return malla;
  }

  crearMaterial(nombre, fichero){
    console.log("Crear material");
    let nodo = new TNodo(nombre, this.escena);
    let entMaterial = new TMalla();
    nodo.setEntidad(entMaterial);
    entMaterial.malla = this.gestor.getRecurso(fichero, "material");
    return entMaterial;
  }

  draw(){
    this.escena.draw();
  }
}
