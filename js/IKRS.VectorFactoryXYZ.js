/**
 * A vector factory is an anonymous instance that creates vectors.
 *
 * @author   Ikaros Kappler
 * @date     2015-05-17
 * @modified 2015-05-27 Ikaros Kappler (fixex a bug in the sign params).
 * @version  1.0.1
 **/


IKRS.VectorFactoryXYZ = function( p_signX, p_signY, p_signZ, offset ) {
    
    IKRS.VectorFactory.call( this );
    
    if( typeof p_signX == "undefined" )
	p_signX = 1;
    if( typeof p_signY == "undefined" )
	p_signY = 1;
    if( typeof p_signZ == "undefined" )
	p_signZ = 1;
    if( typeof offset == "undefined" )
	offset = new THREE.Vector3(0,0,0);


    this.signX  = p_signX;
    this.signY  = p_signY;
    this.signZ  = p_signZ;
    this.offset = offset;
};

IKRS.VectorFactoryXYZ.prototype = Object.create( IKRS.VectorFactory.prototype ); // new IKRS.Object();
IKRS.VectorFactoryXYZ.prototype.constructor = IKRS.VectorFactoryXYZ;

IKRS.VectorFactoryXYZ.prototype.createVector2 = function( x, y ) {
    return new THREE.Vector2( this.offset.x + this.signX * x, 
			      this.offset.z + this.signY * z
			    );
};

IKRS.VectorFactoryXYZ.prototype.createVector3 = function( x, y, z ) {
    // console.log( "this.offset=" + JSON.stringify(this.offset) + ", this.signX=" + this.signX + ", this.signY=" + this.signY + ", this.signZ=" + this.signZ + ", x=" + x + ", y=" + y + ", z=" + z );
    return new THREE.Vector3( this.offset.x + this.signX * x, 
			      this.offset.y + this.signY * y,
			      this.offset.z + this.signZ * z			      
			    );
};



