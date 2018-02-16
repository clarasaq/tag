class TLuz extends TEntidad{

  constructor(nombre/*, color*/){
    super();
    this.nombre = nombre;
    //this.intensidad = new TColor(color);
  }


  setIntensidad (color){ //TColor
    this.intensidad = color;
  }


  TColor getIntensidad (){
    return this.intensidad;
  }


}
beginDraw();
endDraw();
