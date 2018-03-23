#version 100
precision mediump float;

vec3 Position; //VERTICES EN COORDINADAS DE VISTA
vec3 Normal; //NORMAL EN COORDENADAS DE VISTA

uniform vec4 color;

uniform vec4 LightPosition; //POSICIÓN DE LA LUZ EN COORDENADAS DE VISTA
uniform vec3 LightIntensity; //INTENSIDAD DE LA LUZ

uniform vec3 Kd; //COMPONENTE DIFUSA DEL MATERIAL
uniform vec3 Ka; //COMPONENTE AMBIENTAL DEL MATERIAL
uniform vec3 Ks; //COMPONENTE ESPECULAR DEL MATERIAL

uniform float Shininess;

vec4 FragColor;

// FUNCION QUE CALCULA EL MODELO DE PHONG
vec3 Phong () {
	vec3 n = normalize (Normal);
	vec3 s = normalize (vec3 (LightPosition) - Position);
	vec3 v = normalize (vec3 (-Position));
	vec3 r = reflect (-s, n);
<<<<<<< HEAD
	vec3 light = LightIntensity * (Ka + Kd * max (dot (n, s), 0.0) + Ks * pow (max (dot (r,v), 0.0), Shininess));
	//vec3 light = LightIntensity * (Kd * max (dot (n, s), 0.0));
=======
	//vec3 light = LightIntensity * (Ka + Kd * max (dot (s, n), 0.0) + Ks * pow (max (dot (r,v), 0.0), Shininess));
	vec3 light = LightIntensity * (Kd * max (dot (s, n), 0.0));
>>>>>>> 0f48e466076bb728fd12149ee41f8d12152ea8a0
	return light;
}

void main () {
// CALCULAR EL COLOR DEL FRAGMENTO
	FragColor = vec4 (Phong(), 1.0);
	gl_FragColor += FragColor;
	//gl_FragColor = color;
}



/*void main(void) {
 	//gl_FragColor = vec4(0.3, 0.2, 0.7, 1.0);
	gl_FragColor = color;
}*/


/*
precision mediump float;
// ENTRADA, PROVENIENTE DEL VERTEX SHADER
vec3 Position; //VERTICES EN COORDINADAS DE VISTA
vec3 Normal; //NORMAL EN COORDENADAS DE VISTA
// SALIDA PARA COMUNICAR CON EL RESTO DEL PIPELINE
mediump vec4 FragColor; //COLOR DEL FRAGMENTO
// ESTADO DE OPENGL
//Eso nose de donde sacarlo
uniform vec4 LightPosition; //POSICIÓN DE LA LUZ EN COORDENADAS DE VISTA
uniform vec3 LightIntensity; //INTENSIDAD DE LA LUZ
//Esto esta en el recuroMaterial
uniform vec3 Kd; //COMPONENTE DIFUSA DEL MATERIAL
uniform vec3 Ka; //COMPONENTE AMBIENTAL DEL MATERIAL
uniform vec3 Ks; //COMPONENTE ESPECULAR DEL MATERIAL
uniform float Shininess; //FACTOR DE BRILLO DEL MATERIAL
// FUNCION QUE CALCULA EL MODELO DE PHONG
vec3 Phong () {
	vec3 n = normalize (Normal);
	vec3 s = normalize (vec3 (LightPosition) - Position);
	vec3 v = normalize (vec3 (-Position));
	vec3 r = reflect (-s, n);
	vec3 light = LightIntensity * (Ka + Kd * max (dot (s, n), 0.0) + Ks *
	pow (max (dot (r,v), 0.0), Shininess));
	return light;
}

void main () {
// CALCULAR EL COLOR DEL FRAGMENTO
	FragColor = vec4 (Phong (), 1.0);
}
*/
