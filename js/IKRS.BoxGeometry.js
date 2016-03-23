/**
 * A class for creating boxes.
 *
 * @author   Ikaros Kappler
 * @date     2015-05-27
 * @modified 2015-05-31 Ikaros Kappler (added computeFaceNormals and computeVertecNormal in constructor). 
 * @modified 2016-02-23 Ikaros Kappler (added face vertex UV coordinates for faces).
 * @version  1.0.2
 **/


/**
 * The constructor.
 *
 * @param options:object { sizeX:float, sizeY:float, sizeZ:float }
 * @param vectorFactory:IKRS.VectorFactory
 **/
IKRS.BoxGeometry = function( options,				  
			     vectorFactory
			    ) {

    // Call super 'constructor'
    IKRS.AbstractGeometry.call( this, options, vectorFactory );
    //THREE.Geometry.call( this, options );
    

    // console.log( "[IKRS.BoxGeometry.__construct] options=" + JSON.stringify(options) );

    //this.vectorFactory = { createVector3 : function(x,y,z) { return new THREE.Vector3(x,y,z); } };


    this._makeBox( options );
    //this.computeCentroids(); // DEPRECATED!
    this.computeFaceNormals();
    this.computeVertexNormals(); 
};

/**
 * Inherit attributes from THREE.Geometry.
 **/
IKRS.BoxGeometry.prototype = Object.create( IKRS.AbstractGeometry.prototype ); 
//IKRS.BoxGeometry.prototype = Object.create( THREE.Geometry.prototype ); 


/**
 * Make the box: 8 vertices and 2*6 Face3.
 **/
IKRS.BoxGeometry.prototype._makeBox = function( options ) {

    var indices = this._makeBoxVertices( options );
    this._makeBoxFaces( indices );

};

/**
 * Make the cube geometry.
 **/
IKRS.BoxGeometry.prototype._makeBoxVertices = function( options ) {

    var hSizeX    = options.sizeX/2.0;
    var hSizeY    = options.sizeY/2.0;
    var hSizeZ    = options.sizeZ/2.0;
    // console.log( "[BoxGeometry] sizeX=" + options.sizeX + ", sizeY=" + options.sizeY + ", sizeX=" + options.sizeZ + ", hSizeX=" + hSizeX + ", hSizeY=" + hSizeY + ", hSizeZ=" + hSizeZ );
    var indices = [];
    
    indices.push( this._addVertex( this.vectorFactory.createVector3(-hSizeX,-hSizeY,-hSizeZ) ) );
    indices.push( this._addVertex( this.vectorFactory.createVector3( hSizeX,-hSizeY,-hSizeZ) ) );
    indices.push( this._addVertex( this.vectorFactory.createVector3( hSizeX, hSizeY,-hSizeZ) ) );
    indices.push( this._addVertex( this.vectorFactory.createVector3(-hSizeX, hSizeY,-hSizeZ) ) );
    indices.push( this._addVertex( this.vectorFactory.createVector3(-hSizeX,-hSizeY, hSizeZ) ) );
    indices.push( this._addVertex( this.vectorFactory.createVector3( hSizeX,-hSizeY, hSizeZ) ) );
    indices.push( this._addVertex( this.vectorFactory.createVector3( hSizeX, hSizeY, hSizeZ) ) );
    indices.push( this._addVertex( this.vectorFactory.createVector3(-hSizeX, hSizeY, hSizeZ) ) );

    return indices;    
};

/**
 * Make the cube faces.
 **/
IKRS.BoxGeometry.prototype._makeBoxFaces = function( indices ) {

    // console.log( "indices=" + JSON.stringify(indices) );
    
    /*
    this.faces.push( new THREE.Face3(indices[1],indices[0],indices[2]) );
    this.faces.push( new THREE.Face3(indices[0],indices[3],indices[2]) );
    */
    this._addUVFace4( indices[1],indices[0],indices[2],indices[3] );
    
    /*
    this.faces.push( new THREE.Face3(indices[2],indices[3],indices[7]) );
    this.faces.push( new THREE.Face3(indices[2],indices[7],indices[6]) );
    */
    this._addUVFace4( indices[2],indices[3],indices[6],indices[7] );

    /*
    this.faces.push( new THREE.Face3(indices[1],indices[2],indices[5]) );
    this.faces.push( new THREE.Face3(indices[5],indices[2],indices[6]) );
    */
    this._addUVFace4( indices[1],indices[2],indices[5],indices[6] );
    
    /*
    this.faces.push( new THREE.Face3(indices[0],indices[5],indices[4]) );
    this.faces.push( new THREE.Face3(indices[5],indices[0],indices[1]) );
    */
    this._addUVFace4( indices[5],indices[4],indices[1],indices[0] );

    /*
    this.faces.push( new THREE.Face3(indices[0],indices[4],indices[3]) );
    this.faces.push( new THREE.Face3(indices[3],indices[4],indices[7]) );
    */
    this._addUVFace4( indices[0],indices[4],indices[3],indices[7] );

    /*
    this.faces.push( new THREE.Face3(indices[4],indices[5],indices[7]) );
    this.faces.push( new THREE.Face3(indices[5],indices[6],indices[7]) );
    */
    this._addUVFace4( indices[4],indices[5],indices[7],indices[6] );

};

IKRS.BoxGeometry.prototype._addUVFace4 = function ( a, b, c, d ) {
    var faceA, faceB;
    this.faces.push( faceA = new THREE.Face3(a,b,c) );
    this.faces.push( faceB = new THREE.Face3(b,d,c) );

    
    faceA.materialIndex = this.faceVertexUvs[0].length;
    this.faceVertexUvs[0].push(	[
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2( 0, 1 ),
	new THREE.Vector2( 1, 0 ),
    ] );
    faceB.materialIndex = this.faceVertexUvs[0].length;
    this.faceVertexUvs[ 0 ].push( [
	    new THREE.Vector2( 0, 1 ),
	    new THREE.Vector2( 1, 1 ),
	    new THREE.Vector2( 1, 0 ),
	] );			
};
