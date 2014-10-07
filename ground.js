var Ground = function(){
	this.name = 'ground';
	this.size = 10;
	this.mesh;
}
Ground.prototype.init = function(){
	this.mesh = BABYLON.Mesh.CreateBox(this.name, this.size, worldManager.scene._self, false);	
	/*this.mesh.material = new BABYLON.StandardMaterial(this.name+"Material", worldManager.scene._self);
	this.mesh.material.backFaceCulling = false;
	this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);*/
	this.mesh.position = new BABYLON.Vector3(0, 0, 0);	
	//this.mesh.scaling.y = 0.5
	//this.mesh.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
	//this.mesh.setEnabled(false);
	this.mesh.showBoundingBox = true;
	this.mesh.checkCollisions = true;
	this.mesh.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
	//this.mesh.updateBodyPosition();
	//this.mesh.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
//	this.mesh.showBoundingBox = true;
}