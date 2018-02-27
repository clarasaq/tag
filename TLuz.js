class TLuz extends TEntidad{

  constructor(nombre){
    super();
    this.nombre = nombre;
    this.intensidad = new TColor();
  }


  setIntensidad (color){ //TColor
    this.intensidad = color;
  }

  getIntensidad (){
    return this.intensidad;
  }


  beginDraw(){}
  endDraw(){}
}
