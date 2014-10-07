var Player = function(){
	this.name = 'player';
	this._init = true;
	this.passAnim = false;
	this._loaded = false;
	this.animations = {
		'stand':{start:0,end:20,speed:0.5,loop:true},
		'walk':{start:20,end:45,speed:1,loop:true},
		'mini':{start:0,end:20,speed:1,loop:false},
		'big':{start:20,end:40,speed:1,loop:false},
		'jump':{start:0,end:40,speed:2,loop:false}
	};
	this.mesh;
	this.skeleton;
}
Player.prototype.addAnimation = function(type){
	this.mesh.animations = [];
	switch(type)
	{
		case 'big':
		case 'mini':
			var anime = new BABYLON.Animation(
			"scale",
			"scaling",
			30,
			BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
			BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
			var keys = [];  
			keys.push({
				frame: 0,
				value: new BABYLON.Vector3(1,1,1)
			});
			keys.push({
				frame: 20,
				value: new BABYLON.Vector3(0.1,0.1,0.1)
			});
			keys.push({
				frame: 40,
				value: new BABYLON.Vector3(1,1,1)
			});
			anime.setKeys(keys);
			this.mesh.animations.push(anime);
			break;
		case 'jump':
			var anime = new BABYLON.Animation(
			"jump",
			"position.y",
			30,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var keys = [];  
			keys.push({
				frame: 0,
				value: this.mesh.position.y
			});
			keys.push({
				frame: 20,
				value: this.mesh.position.y+3
			});
			keys.push({
				frame: 40,
				value: this.mesh.position.y
			});
			anime.setKeys(keys);
			this.mesh.animations.push(anime);
			break;
	}
}
Player.prototype.init = function(){
	var object = this;
	BABYLON.SceneLoader.ImportMesh("", "assets/meshes/mario/", "mario.babylon", worldManager.scene._self, function (meshes, particleSystems, skeletons) {
		object._loaded = true;
		object.skeleton = skeletons[0];
		object.mesh = meshes[0];	
		object.mesh.position = new BABYLON.Vector3(-2, 0, 2);
	//	object.mesh.ellipsoid = new BABYLON.Vector3(1, 1, 1);	
	//	object.mesh.setEnabled(false);
		object.basicAnimation('mini');
		object.animation('stand');
		worldManager.scene._self.activeCamera.target = object.mesh;
		object.mesh.checkCollisions = true;
		object.mesh.showBoundingBox = true;
		object.mesh.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor,mass: 1, move: true});		
	});
}
Player.prototype.basicAnimation = function(type){
	var object = this;
	this.addAnimation(type);
	worldManager.scene._self.beginAnimation(
		this.mesh, 
		this.animations[type]['start'], 
		this.animations[type]['end'], 
		this.animations[type]['loop'], 
		this.animations[type]['speed']
	);
}
Player.prototype.animation = function(type){
	worldManager.scene._self.beginAnimation(
		this.skeleton, 
		this.animations[type]['start'], 
		this.animations[type]['end'], 
		this.animations[type]['loop'], 
		this.animations[type]['speed']
	);
}