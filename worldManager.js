var WorldManager = function(){
	this.scene;
	this.width=$(window).width();
	this.height=$(window).height();
	this.canvas=document.getElementById("renderCanvas");
	this.camera;
	this.light;	
}
WorldManager.prototype.init = function(){
	this.scene = new Scene();
	this.scene.init();	
	this.light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene._self);
    this.light.intensity = 0.7;	
}
