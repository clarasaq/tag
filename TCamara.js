class TCamara extends TEntidad {

	constructor(){
		super();
		this.esPrespectiva = false;//Boolean
		this.cercano = null;//Float
		this.lejano = null;//Float
	}

	//fovy => Angulo de vision en radianes
	//aspect => Relacion de aspecto
	setPerspectiva (fovy, aspect, near, far){
		this.esPrespectiva = true;
		let out = mat4.create();
		mat4.perspective(out, fovy, aspect, near, far)
		this.projectionMatrix = out;
		this.cercano = near;
		this.lejano = far;
	}

	//left, right y top ?????
	setParalela (near, far, left, right, top){
		this.esPrespectiva = false;
		let out = mat4.create();
		mat4.ortho(out, left, right, bottom, top, near, far);
		this.projectionMatrix = out;
		this.cercano = near;
		this.lejano = far;
	}

	//Para obtener la matriz de proyeccion
	getProjectionMatrix(){
		return this.projectionMatrix;
	}
	getTipo(){
		return this.esPrespectiva;
	}


	beginDraw(){}
	endDraw(){}

}
