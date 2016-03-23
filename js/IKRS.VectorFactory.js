/**
 * A vector factory is an anonymous instance that creates vectors.
 *
 * @author   Ikaros Kappler
 * @date     2013-10-29
 * @modified 2015-05-27 Ikaros Kappler (fixed a bug in the sign params).
 * @modified 2015-06-22 Ikaros Kappler (added getDefaultVectorFactory).
 * @version  1.0.2
 **/


IKRS.VectorFactory = function( p_signX, p_signY, p_signZ, offset ) {
    
    IKRS.Object.call( this );
    
    if( typeof p_signX == "undefined" )
	p_signX = 1;
    if( typeof p_signY == "undefined" )
	p_signY = 1;
    if( typeof p_signZ == "undefined" )
	p_signZ = 1;
    if( typeof offset == "undefined" )
	offset = new THREE.Vector3(0,0,0);


    this.signX = p_signX;
    this.signY = p_signY;
    this.signZ = p_signZ;
    this.offset = offset;
};

IKRS.VectorFactory.prototype = Object.create( IKRS.Object.prototype ); // new IKRS.Object();
IKRS.VectorFactory.prototype.constructor = IKRS.VectorFactory;


IKRS.VectorFactory.prototype.createVector2 = function( x, y ) {
    return new THREE.Vector2( this.offset.x + this.signX * x, 
			      this.offset.y + this.signY * y 
			    );
};

IKRS.VectorFactory.prototype.createVector3 = function( x, y, z ) {
    return new THREE.Vector3( this.offset.x + this.signX * x, 
			      this.offset.y + this.signY * y, 
			      this.offset.z + this.signZ * z 
			    );
};

IKRS.VectorFactory.getDefaultVectorFactory = function() {
    return new IKRS.VectorFactoryXYZ(1,1,1);
};
