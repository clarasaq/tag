class TLuz extends TEntidad{

  constructor(){
    super();
    //this.intensidad = new TColor();

    this.emitida = [0.0,0.0,0.0,0.0];
  	this.ambiente = [0.0,0.0,0.0,0.0];
  	this.especular = [0.0,0.0,0.0,0.0];
  	this.difusa = [0.0,0.0,0.0,0.0];
  }


  setEmitida(emitida){
    this.emitida = emitida;
  }
  getEmitida(){
    return this.emitida;
  }
  setAmbiente(ambiente){
    this.ambiente = ambiente;
  }
  getAmbiente(){
    return this.ambiente;
  }
  setEspecular(especular){
    this.especular = especular;
  }
  getEspecular(){
    return this.especular;
  }
  setDifusa(difusa){
    this.difusa = difusa;
  }
  getDifusa(){
    return this.difusa;
  }

  beginDraw(){}
  endDraw(){}
}
