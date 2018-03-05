class TRecursoMaterial extends TRecurso{

  constructor(){
    super();
    this.colorDifuso;
    this.colorEpecular;
    this.colorAmbiente;
    this.iluminacion;
    //this.transparencia;
    //this.coefEspecular;
    //this.vertexColor;
  }
  //buscar estructura archivos .mtl leerlo y cargarlo como hacemos con la TRecursoMalla
  //almacenar color difuso, color especular, etc
  cargarFichero(nombre){
    /*Parsear el fichero
    require "json"*/
    console.log("Entramos en la carga de fichero MATERIAL");

    let req = new XMLHttpRequest();
    req.open('GET', nombre, false);
    req.send();

    if(req.status == 200){
      let datos = req.response;
      let partes = req.response.split('\n');
      //console.log(partes);

      let iluminacion = partes[8].split(' ');
      let valoresKa = partes[9].split(' ');
      let valoresKd = partes[10].split(' ');
      let valoresKs = partes[11].split(' ');

      this.iluminacion = iluminacion[1];
      //colorAmbiente ka
      let colorAmbiente = new Array();
      for(let i = 1; i<valoresKa.length; i++){
        colorAmbiente.push(valoresKa[i]);
      }
      this.colorAmbiente = colorAmbiente;
      //console.log(this.colorAmbiente);

      //color difuso kd
      let colorDifuso = new Array();
      for(let i = 1; i<valoresKd.length; i++){
        colorDifuso.push(valoresKd[i]);
      }
      this.colorDifuso = colorDifuso;
      //console.log(this.colorDifuso);

      //color especular ks
      let colorEpecular = new Array();
      for(let i = 1; i<valoresKs.length; i++){
        colorEpecular.push(valoresKs[i]);
      }
      this.colorEpecular = colorEpecular;
      //console.log(this.colorEpecular);

    }


  }

}
