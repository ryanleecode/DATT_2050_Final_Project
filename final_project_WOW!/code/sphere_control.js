include("include.js");

outlets = 3;
autowatch = 1;
reset.immediate = 1;
checkBounds.immediate = 1;

var util = Util.getInstance(); //Utility class

var scale = new Vector( 0.05, 0.05, 0.05 );
var origin = new Vector( util.getRandom(2., -1), (-(Math.abs(jsarguments[1]) * ( 0.36 + this.getScale().y) ) )
	- (this.getScale().y * 1.1), jsarguments[1] );
this.position = new Vector( origin );

function bang() {
	/*this.setPosition(this.getPosition().x + util.getRandom( 0.02 * Math.abs(jsarguments[1]), -0.01 * Math.abs(jsarguments[1]) ), 
		this.getPosition().y, 
		this.getPosition().z );
	*/
	checkBounds( this.getPosition());
}

function reset() {
	origin = new Vector( util.getRandom(2., -1), (-(Math.abs(jsarguments[1]) * ( 0.36 + this.getScale().y) ) )
		- (this.getScale().y * 1.1), jsarguments[1] );
	this.setPosition(origin);
	outlet( 0, new Array( "position", origin.x, origin.y, origin.z ) );
	outlet( 0, new Array( "scale", this.getScale().x, this.getScale().y, this.getScale().z ) );
	outlet( 1, new Array( "move", 0., 0., 0. ) );
	outlet( 2, new Array( "draw_mode", jsarguments[2] ) );
}

function getPosition() {
	return this.position;
}

function setPosition( x, y, z ) {		 
	if (arguments.length === 1) {
		this.getPosition().set( x );
		this.outPosition();
	} else {
		this.getPosition().set( x, y, z );
		this.outPosition();
	}
}

function outPosition() {
	outlet( 0, new Array( "position", this.getPosition().x, this.getPosition().y, this.getPosition().z ) );
}

function getScale() {
	return this.scale;
}

// Check if the object has exceeded the screen on the positive Y-axis or exceed some arbitary value on the negative Y-axis
function checkBounds() {
	var YLimit = (Math.abs(this.getPosition().z) * ( 0.36 + this.getScale().y) ); //The upper limit of the screen, changes as the object moves back
	var YLimitLower = -YLimit - (this.getScale().y * 1.1); //The upper limit of the screen, changes as the object moves back
	if ( this.getPosition().y > YLimit ) {
		this.setPosition( this.getPosition().x, YLimitLower, this.getPosition().z );
		this.outPosition();
		outlet( 1, new Array( "move", 0., 0., 0. ) );
	}
	if ( this.getPosition().y < YLimitLower * 1.01) {
		this.setPosition( this.getPosition().x, YLimitLower, this.getPosition().z );
		this.outPosition();
		outlet( 1, new Array( "move", 0., 0., 0. ) );
	}
}	

function randomX() {
	this.setPosition(util.getRandom(2., -1), 
		this.getPosition().y, 
		this.getPosition().z );	
}