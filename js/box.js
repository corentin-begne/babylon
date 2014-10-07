var Box = function(){
	this.size = 1;
	this.name = 'floor'
	this.floors = [];
	this.mesh;
}
Box.prototype.spawn = function(){
	this.floors.push(BABYLON.Mesh.CreateBox(this.name, this.size, worldManager.scene._self));
	this.floors[(this.floors.length-1)].position = new BABYLON.Vector3(2,2,-2);
	this.floors[(this.floors.length-1)].checkCollisions = true;
	this.floors[(this.floors.length-1)].scaling.y = 0.5;
	this.floors[(this.floors.length-1)].setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor,friction:0.7, restitution: 0.5, move: false, mass:0 });	
	//this.floors[(this.floors.length-1)].updateBodyPosition();
}