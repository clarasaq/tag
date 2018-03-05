class TLuz extends TEntidad{

  constructor(){
    super();
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
