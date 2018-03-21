
attribute vec4 coordinates;// Lo mismo que VertexPosition
attribute vec4 Normal;

attribute vec4 VertexPosition; //VERTICE EN COORDENADAS GLOBALES
attribute vec3 VertexNormal; //NORMAL EN COORDENADAS GLOBALES

varying vec4 Position;

uniform mat4 ModelViewMatrix; //MATRIZ DE MODELO Y VISTA (YA MULTIPLICADAS
uniform mat3 NormalMatrix; //MATRIZ DE NORMALES
uniform mat4 ProjectionMatrix; //MATRIZ DE PROYECCIÓN
uniform mat4 MVP; //MATRIZ MODELO*VISTA*PROYECCION

void main(void) {
 	//gl_Position = vec4(coordinates, 1.0);
 	Position = vec4( ModelViewMatrix * coordinates);
 	gl_Position = MVP*coordinates;
}


/*
// ATRIBUTOS
attribute vec4 VertexPosition; //VERTICE EN COORDENADAS GLOBALES
attribute vec3 VertexNormal; //NORMAL EN COORDENADAS GLOBALES
// SALIDA PARA COMUNICAR CON EL FRAGMENT
varying vec3 Position; //VERTICES EN COORDINADAS DE VISTA
varying vec3 Normal; //NORMAL EN COORDENADAS DE VISTA
// ESTADO DE OPENGL
uniform mat4 ModelViewMatrix; //MATRIZ DE MODELO Y VISTA (YA MULTIPLICADAS
uniform mat3 NormalMatrix; //MATRIZ DE NORMALES
uniform mat4 ProjectionMatrix; //MATRIZ DE PROYECCIÓN
uniform mat4 MVP; //MATRIZ MODELO*VISTA*PROYECCION

void main () {
	// TRANSFORMAR EL VERTICE Y LA NORMAL A COORDENADAS DE VISTA
	Position = vec3 (ModelViewMatrix * VertexPosition);
	Normal = normalize (NormalMatrix * VertexNormal);
	// TRANSFORMACIÓN COMPLETA DEL VÉRTICE
	gl_Position = MVP * VertexPosition;
}
*/
