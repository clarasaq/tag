//Guardar todas las variables que me hagan falta para el shader
var programa = null;// ShaderProgram con los dos shaders compilados

var GlobalMalla;

var GModelMatrix=null;
var GViewMatrix=null;
var GNormalMatrix=null;
var GProjectionMatrix=null;

var GNormales;

//VARIABLES PARA EL MATERIAL
var GMaterial;
var GDifuso;
var GAmbiental;
var GEspecular;
var GFragColor;
var GBrillo;

var GPositionLuz;
var GIntensidadLuz;

var GModelViewMatrix=null;//Matrz de modelo y vista multiplicadas

var gMVP =null;
