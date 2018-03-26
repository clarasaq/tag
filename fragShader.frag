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

	vec3 light = LightIntensity * (Ka + Kd * max (dot (n, s), 0.0) + Ks * pow (max (dot (r,v), 0.0), Shininess));
	//vec3 light = LightIntensity * (Kd * max (dot (n, s), 0.0));

	return light;
}

void main () {
// CALCULAR EL COLOR DEL FRAGMENTO
	FragColor = vec4 (Phong(), 1.0);
	gl_FragColor += FragColor;
	//gl_FragColor = color;
}
