var Scene = function(){
	this._self;
	this.engine;
	this.navigation;
	this.ground;
	this._init = true;
	this.player;
	this.box = new Box();
}
Scene.prototype.init = function(){
	var object = this;
	this.engine = new BABYLON.Engine(worldManager.canvas, true);
	this._self = new BABYLON.Scene(this.engine);
	this._self.enablePhysics();
	this._self.setGravity(new BABYLON.Vector3(0,-10,0));
	this._self.collisionsEnabled = true;
	worldManager.camera = new BABYLON.ArcRotateCamera("camera",1,0.8,10, new BABYLON.Vector3.Zero(), this._self);
	//this._self.activeCamera.attachControl(worldManager.canvas);
	this.ground = new Ground();
	this.ground.init();	
	this.player = new Player();
	this.player.init();
	this.navigation = new Navigation();	
	//this.box.spawn();
	this._self.registerBeforeRender(function () {
		if(object.player._loaded)
		{
			object.navigation.detect();
			if(object._init)
			{				
				this._init = false;
			}
			//object.player.mesh.updateBodyPosition();
		}		
		//object.ground.mesh.updateBodyPosition();
	});
	this.engine.runRenderLoop(function() {
		object._self.render();
	});
}