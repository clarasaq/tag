class TCamara extends TEntidad {

	constructor(n,p){
		super();
		this.nombre=n;
		this.esPrespectiva=p;//Bolean
		this.cercano=null;//Float
		this.lejano=null;//Float
	}
	//TODO
	setPerspectiva (float, float2){
		this.esPrespectiva=true;

	}
	//TODO
	setParalela (float, float2){
		this.esPrespectiva=false;
	}
	beginDraw(){
    	console.log("Apilamos nombre: " + this.nombre);
    	this.stack.push(this.nombre);
	}
	endDraw(){
		console.log("Desapilamos nombre: " + this.stack[this.stack.length-1]);
	    this.stack.pop();
	}

}
