var Navigation = function(){
	this.type;
	this.gamepads;
	this.player = worldManager.scene.player;
	this.precision=0.2;
	this.passJump = true;
	this.keypress=[];
	this.initKeyboardEvent();
}
Navigation.prototype.async = function(fn,cb){
	setTimeout(function(){
		fn();
		if(cb !== undefined)
			cb();
	},0);
}
Navigation.prototype.detect = function(){
	this.gamepads = navigator.getGamepads();	
	if(this.gamepads[0] !== undefined)
		this.type = 'gamepad';
	else
		this.type = 'keyboard';
	this.async(this.checkMove.bind(this));
	this.async(this.checkAction.bind(this));
	this.async(this.checkCamera.bind(this));
}
Navigation.prototype.initKeyboardEvent = function(){
	var object = this;
	$(document).unbind('keydown');
	$(document).keydown(function(event){
		object.keypress[event.keyCode] = true;
	});
	$(document).unbind('keyup');
	$(document).keyup(function(event){
		object.keypress[event.keyCode] = false;
	});
}
Navigation.prototype.move =function(){
	var stepMove = 0.1;
	var z = -stepMove*Math.cos(this.player.mesh.rotation.y);
	var x = -stepMove*Math.sin(this.player.mesh.rotation.y);
	var	newPosition = new BABYLON.Vector3(x,0,z);					
	this.player.mesh.moveWithCollisions(newPosition);
	//this.player.mesh.updateBodyPosition();
}
Navigation.prototype.checkMove = function(){
	var passMove = false;
	switch(this.type)
	{
		case 'keyboard':
			var up = (this.keypress[38] === true) ? 1 : 0 ;
			var down = (this.keypress[40] === true) ? 1 : 0 ;
			var left = (this.keypress[37] === true) ? 1 : 0 ;
			var right = (this.keypress[39] === true) ? 1 : 0 ;
			var x = right-left;
			var y = down-up;
			break;
		case 'gamepad':
			var y = this.gamepads[0].axes[1];
			var x = this.gamepads[0].axes[0];
			break;
	}
	if(y<this.precision && y>-this.precision && x<this.precision && x > -this.precision)	// center
	{
		if(!this.player.passAnim)
		{
			this.player.animation('stand');
			this.player.passAnim = true;
		}	
	}
	else	// move
	{
		if(this.player.passAnim)
		{
			this.player.animation('walk');
			this.player.passAnim = false;					
		}	
		var fixY = 1.5 ;
		if(x < 0)
			fixY = -1.5;
	//	this.player.mesh.rotation.y = Math.atan(y/x)+fixY-worldManager.camera.alpha+1.5;
		this.player.mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(Math.atan(y/x)+fixY-worldManager.camera.alpha+1.5, 0, 0);
		passMove = true;
	}	
	if(passMove)
		this.move();
}
Navigation.prototype.checkAction = function(){
	switch(this.type)
	{
		case 'keyboard':
			var jump = (this.keypress[32] === true) ? true : false ;
			break;
		case 'gamepad':
			var jump = this.gamepads[0].buttons[0].pressed;
			break;
	}
	if(jump && this.passJump)
	{
		if(worldManager.scene.player.mesh.animations[0]._stopped)
		{
			worldManager.scene.player.basicAnimation('jump');
			this.passJump = false;	
		}
	}
	else if(!jump)	 // disable autofire		
	{
		this.passJump = true;
	}	
}
Navigation.prototype.checkCamera = function(){
	switch(this.type)
	{
		case 'keyboard':
			var up = (this.keypress[104] === true) ? 1 : 0 ;
			var down = (this.keypress[98] === true) ? 1 : 0 ;
			var left = (this.keypress[100] === true) ? 1 : 0 ;
			var right = (this.keypress[102] === true) ? 1 : 0 ;
			var x = right-left;
			var y = down-up;		
			break;
		case 'gamepad':
			var y = this.gamepads[0].axes[3];
			var x = this.gamepads[0].axes[2];
			break;
	}
	if(y>=this.precision || y<=-this.precision || x>=this.precision || x <= -this.precision)
	{
		worldManager.camera.alpha += x*1.5/50;
		worldManager.camera.beta += y*1.5/50;
	}	
}