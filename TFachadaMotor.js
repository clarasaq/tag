class TFachadaMotor {

  constructor(){
    this.escena = new TNodo("Escena");
    this.gestor = new TGestorRecursos();
    //Registros objetos
    this.regLuces = new Array();
    this.regCamaras = new Array();
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
  rotar(nodo, rad, axis1, axis2, axis3){
    let nodoRota = nodo.getPadre().getPadre();
    nodoRota.entidad.rotar(rad, axis1, axis2, axis3);
  }
  trasladar(nodo,tx, ty, tz){
    let nodoTrasla = nodo.getPadre();
    nodoTrasla.entidad.trasladar(tx, ty, tz);
  }

  //---- Camara ----//
  crearCamara(nombre, padre){
    let nodo = new TNodo(nombre, padre);
  	let camara = new TCamara();
  	nodo.setEntidad(camara);
    this.regCamaras.push(nodo);
    //fovy, aspect, near, far - angulo en radianes, aspecto, cerca, lejos
    // camara.setPerspectiva(1.5708, 1.0, 1.0, 100)
  	return camara;
  }
  crearCamaraCompleto(nombre){
    let rota = this.crearNodo("RotaCam", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaCam", rota, this.crearTransform());
    let cam = this.crearCamara(nombre, trasla);
    rota.entidad.rotar(0.785398, 0, 0, 1);
    // rota.entidad.rotar(3.141588943012, 0, 1, 0);
    // rota.entidad.rotar(0.785398, 1, 0, 0);
    trasla.entidad.trasladar(0,-20,0);
    GViewMatrix = trasla.entidad.modelMatrix;
    GProjectionMatrix = cam.getProjectionMatrix();
    return cam;
  }
  borrarCamaraCompleto(){
    for(let i=0; i<this.regCamaras.length; i++){
      this.escena.removeHijo(this.regCamaras[i].getPadre().getPadre());
      this.regCamaras[i] = 0;
    }
  }

  //---- luz ----//
  crearLuz(nombre, padre){
    let nodo = new TNodo(nombre, padre);
  	let luz = new TLuz();
  	nodo.setEntidad(luz);
    this.regLuces.push(nodo);
  	return nodo;
  }
  crearLuzCompleto(nombre){
    let rota = this.crearNodo("RotaLuz", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaLuz", rota, this.crearTransform());
    let luz = this.crearLuz(nombre, trasla);
    trasla.entidad.trasladar(0,5,2);
    GPositionLuz = trasla.entidad.modelMatrix;
    return luz;
  }
  borrarLuzCompleto(){
    for(let i=0; i<this.regLuces.length; i++){
      this.escena.removeHijo(this.regLuces[i].getPadre().getPadre());
      this.regLuces[i] = 0;
    }
  }

  //---- Malla ----//
  crearMalla(nombre, ficheroMalla, ficheroMaterial, ficheroTextura, padre){
    let nodo = new TNodo(nombre, padre);
    let entMalla = new TMalla();
    nodo.setEntidad(entMalla);
    entMalla.malla = this.gestor.getRecurso(ficheroMalla, "malla");
    entMalla.material = this.gestor.getRecurso(ficheroMaterial, "material");
    entMalla.textura = this.gestor.getRecurso(ficheroTextura, "textura");
    return entMalla;
  }
  crearMallaCompleto(nombre, ficheroMalla, ficheroMaterial, ficheroTextura){
    let escala = this.crearNodo("EscalaMalla", this.escena, this.crearTransform());
    let rota = this.crearNodo("RotaMalla", escala, this.crearTransform());
    let trasla = this.crearNodo("TraslaMalla", rota, this.crearTransform());
    let malla = this.crearMalla(nombre, ficheroMalla, ficheroMaterial,ficheroTextura, trasla);
    trasla.entidad.escalar(0.03,0.03,0.03);
    // trasla.entidad.trasladar(0,-20,0);
    // rota.entidad.rotar(1.41372, 0, 1, 0);

    //Guaro las matrices de forma global para obtenerlas en el shader
    //GlobalMalla = malla;
    GMaterial = malla.material;
    GModelMatrix=trasla.entidad.modelMatrix;

    //Guardo los valores del material para mandarlos al shader
    GDifuso = malla.material.colorDifuso;
    GAmbiental = malla.material.colorAmbiente;
    GEspecular = malla.material.colorEpecular;
    GBrillo = malla.material.iluminacion;
    GIntensidadLuz = malla.material.intensidad;
    return null;
  }

  crearShader(frag, vert){
    let shader = new TShader();
    shader.cargarFichero(frag);
    shader.cargarFichero(vert);
    return shader;
  }

  getCamaras(){
    return this.regCamaras;
  }
  getLuces(){
    return this.regLuces;
  }
  draw(){
    this.escena.draw();
  }
}
