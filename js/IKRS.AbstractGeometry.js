/**
 * A super class for my geometries.
 *
 * @author   Ikaros Kappler
 * @date     2015-05-27
 * @modified 2015-05-31 Ikaros Kappler (added member function _makeFace3).
 * @modified 2015-06-25 Ikaros Kappler (added static function setGeometryFaceColor).
 * @version  1.0.2
 **/


/**
 * The constructor.
 *
 * @param options:object { * }
 * @param vectorFactory:IKRS.VectorFactory
 **/
IKRS.AbstractGeometry = function( options,				  
				  vectorFactory
				) {

    // Call super 'constructor'
    THREE.Geometry.call( this );
    

    // console.log( "[IKRS.AbstractGeometry.__construct] options=" + JSON.stringify(options) );

    if( vectorFactory == undefined || typeof vectorFactory == "undefined" || vectorFactory == null )
	vectorFactory = new IKRS.VectorFactoryXYZ();

    this.vectorFactory = vectorFactory;
};

/**
 * Inherit attributes from THREE.Geometry.
 **/
IKRS.AbstractGeometry.prototype = Object.create( THREE.Geometry.prototype ); 

/**
 * Make an approximate computation about the geometry's volume.
 *
 * Subclasses should re-implement this function!
 *
 * @return { volume:float, error:float } where
 *                    volume is the approcimated 3D volume,
 *                    error  is the max error factor (error=0.0 means the computed
 *                           volume is 100% accurate, 0.5 means there is an error probabilty
 *                           if max 50%, 1.0 means the deviation can be 100%, and so on ...)
 **/
/*
IKRS.AbstractGeometry.prototype.computeVolume = function() {
    return { volume : undefined,
	     error  : 1.0
	   };
};
*/


IKRS.AbstractGeometry.prototype._addVertex = function( v ) {
    this.vertices.push( v );
    return (this.vertices.length-1);
};

IKRS.AbstractGeometry.prototype._makeFace4 = function( a, b, c, d, options ) {
    var faceA = this._makeFace3(a,b,c,options);
    var faceB = this._makeFace3(a,c,d,options);
    return [ faceA, faceB ];
};

IKRS.AbstractGeometry.prototype._makeFace3 = function( a, b, c, options ) {
    var face;
    if( IKRS.defined(options) ) {
	if( options.invertFaces ) face = new THREE.Face3(a,c,b);
	else                      face = new THREE.Face3(a,b,c);

	face.color.set( options.faceColor );
    } else {
	face = new THREE.Face3(a,b,c);
    }
    this.faces.push( face );
    return face;
};

IKRS.AbstractGeometry.prototype.computeVolume = function() {
    return IKRS.AbstractGeometry.computeVolume( this );
};

/*
IKRS.AbstractGeometry.prototype.invertFaces = function() {
    var a, b, c;
    for( var i in this.faces ) {
	//a = this.faces[i].a;
	b = this.faces[i].b;
	c = this.faces[i].c;
	this.faces[b] = c;
	this.faces[c] = b;
    }
};
*/

IKRS.AbstractGeometry.computeVolume = function( geometry ) {
    // http://stackoverflow.com/questions/20012694/three-js-find-volume-weight-density
    // http://stackoverflow.com/questions/1406029/how-to-calculate-the-volume-of-a-3d-mesh-object-the-surface-of-which-is-made-up/1568551#1568551
    //var vols = from t in mesh.Triangles
    //           select SignedVolumeOfTriangle(t.P1, t.P2, t.P3);
    //return Math.Abs(vols.Sum());
    var volume   = 0.0;
    var tr       = null;
    for( var i in geometry.faces ) {
	tri = geometry.faces[i];
	//console.debug( "tri.a=" +
	volume += IKRS.AbstractGeometry._computeSignedVolumeOfTriangle( geometry.vertices[tri.a], 
									geometry.vertices[tri.b], 
									geometry.vertices[tri.c] 
								      );
    }
    return volume;
};

/**
 * "The trick is to calculate the signed volume of a tetrahedron - based 
 *  on your triangle and topped off at the origin. The sign of the volume 
 *  comes from whether your triangle is pointing in the direction of the
 *  origin. (The normal of the triangle is itself dependent upon the 
 *  order of your vertices, which is why you don't see it explicitly 
 *  referenced below.)
 *  
 *  This all boils down to the following simple function:"
 **/

IKRS.AbstractGeometry._computeSignedVolumeOfTriangle = function( p1, p2, p3 ) {
    var v321 = p3.x*p2.y*p1.z;
    var v231 = p2.x*p3.y*p1.z;
    var v312 = p3.x*p1.y*p2.z;
    var v132 = p1.x*p3.y*p2.z;
    var v213 = p2.x*p1.y*p3.z;
    var v123 = p1.x*p2.y*p3.z;
    return (1.0/6.0)*(-v321 + v231 + v312 - v132 - v213 + v123);
};


IKRS.AbstractGeometry.setGeometryFaceColor = function( geometry, color ) {
    //for ( var i = 0; i < geometry.faces.length; i ++ ) {
    for( var i in geometry.faces ) { 
	geometry.faces[ i ].color.set( color ); // setHex( color );
	//geometry.faces[ i ].ambient.setHex( 0xFFFFFF ); // ( color );
	//child.material.ambient.setHex(0xFF0000);
        //child.material.color.setHex(0x00FF00);
    }
    geometry.colorsNeedUpdate = true; 
    return geometry;
};
