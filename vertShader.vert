
attribute vec4 coordinates;// Lo mismo que VertexPosition
//attribute vec3 Normal;

attribute vec4 VertexPosition; //VERTICE EN COORDENADAS GLOBALES
attribute vec3 VertexNormal; //NORMAL EN COORDENADAS GLOBALES

varying vec4 Position;
varying vec3 Normal;

uniform mat4 ModelViewMatrix; //MATRIZ DE MODELO Y VISTA (YA MULTIPLICADAS
uniform mat3 NormalMatrix; //MATRIZ DE NORMALES
uniform mat4 ProjectionMatrix; //MATRIZ DE PROYECCIÓN
uniform mat4 MVP; //MATRIZ MODELO*VISTA*PROYECCION

void main(void) {
 	//gl_Position = vec4(coordinates, 1.0);
 	Position = vec4( ModelViewMatrix * coordinates);
  Normal = normalize (NormalMatrix * VertexNormal);
 	gl_Position = MVP*coordinates;
}
