class TRecursoMaterial extends TRecurso{

  constructor(){
    super();
    this.colorDifuso;
    this.colorEpecular;
    this.colorAmbiente;
    this.iluminacion;
    //this.transparencia;
    //this.coefEspecular;
    this.vertexColor;
  }
  //buscar estructura archivos .mtl leerlo y cargarlo como hacemos con la TRecursoMalla
  //almacenar color difuso, color especular, etc
  cargarFichero(nombre){
    /*Parsear el fichero
    require "json"*/
    console.log("Entramos en la carga de fichero MATERIAL caca");

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
      let colorAmbiente = vec3.fromValues(valoresKa[1], valoresKa[2], valoresKa[3]);
      this.colorAmbiente = colorAmbiente;
      //console.log(this.colorAmbiente);

      //color difuso kd
      let colorDifuso = vec3.fromValues(valoresKd[1], valoresKd[2], valoresKd[3]);

      this.colorDifuso = colorDifuso;
      //console.log(this.colorDifuso);

      //color especular ks
      let colorEpecular = vec3.fromValues(valoresKs[1], valoresKs[2], valoresKs[3]);
      this.colorEpecular = colorEpecular;
      //console.log(this.colorEpecular);

      //el frag_color es la suma de a, d, s y otr cosa que no se que es jeje
      let color = vec3.fromValues(valoresKa[1]+valoresKd[1]+valoresKs[1], valoresKa[2]+valoresKd[2]+valoresKs[2], valoresKa[3]+valoresKd[3]+valoresKs[3]);
      this.vertexColor = color;
      console.log(this.vertexColor);
    }
  }

}
