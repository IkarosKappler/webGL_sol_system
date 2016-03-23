/**
 * Planetary ring geometry. This is a two-sided disk with simple UV mapping.
 *
 * @author  Ikaros Kappler
 * @date    2016-03-21
 * @version 1.0.0
 **/

IKRS.RingGeometry = function( innerRadius, outerRadius, segmentCount ) {

    IKRS.AbstractGeometry.call( this );

    if( !innerRadius )  rinnerRadius = 50;
    if( !outerRadius )  outerRadius  = 100;
    if( !segmentCount ) segmentCount = 100;

    var angle = 2 * Math.PI / segmentCount;
    var innerPoint0 = null;
    var outerPoint0 = null;
    var innerPoint1 = null;
    var outerPoint1 = null;
    var innerPointIndex0 = -1, outerPointIndex0 = -1, innerPointIndex1, outerPointIndex1;
    for (var i = 0; i <= segmentCount; i++) {
	innerPoint1 = new THREE.Vector3( innerRadius * Math.cos(angle * i),
					 0,
					 innerRadius * Math.sin(angle * i)					
				       );
	outerPoint1 = new THREE.Vector3( outerRadius * Math.cos(angle * i),
					 0,
					 outerRadius * Math.sin(angle * i)					
				       );
	var innerPointIndex1 = this.vertices.length;
	this.vertices.push( innerPoint1 );
	var outerPointIndex1 = this.vertices.length;
	this.vertices.push( outerPoint1 );

	// Make face?
	if( i > 0 ) {
	    // Downside
	    this.__addUVFace4( innerPointIndex0, outerPointIndex0, outerPointIndex1, innerPointIndex1, i, segmentCount );
	    // Upside
	    this.__addUVFace4( innerPointIndex1, outerPointIndex1, outerPointIndex0, innerPointIndex0, i, segmentCount );
	}
	innerPointIndex0 = innerPointIndex1;
	outerPointIndex0 = outerPointIndex1;
    }
    //this.computeLineDistances();
    this.computeFaceNormals();
    this.computeVertexNormals(); 
};

IKRS.RingGeometry.prototype = Object.create( IKRS.AbstractGeometry.prototype );
IKRS.RingGeometry.prototype.constructor = IKRS.RingGeometry;

IKRS.RingGeometry.prototype.__addUVFace4 = function( a, b, c, d, i, segmentCount ) {

    //this.faces.push( new THREE.Face3(a,b,c) );
    //this.faces.push( new THREE.Face3(c,d,a) );
    var faceA = new THREE.Face3(a,b,c);
    var faceB = new THREE.Face3(c,d,a);
    this.faces.push( faceA );
    this.faces.push( faceB );

    /*
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
    */
    
    var step = 1.0/segmentCount;
    faceA.materialIndex = this.faceVertexUvs[0].length;
    this.faceVertexUvs[0].push(	[
	new THREE.Vector2( i*step    , 1 ),
	new THREE.Vector2( i*step    , 0 ),
	new THREE.Vector2( (i+1)*step, 0 ),
    ] );
    faceB.materialIndex = this.faceVertexUvs[0].length;
    this.faceVertexUvs[ 0 ].push( [
	    new THREE.Vector2( (i+1)*step, 0 ),
	    new THREE.Vector2( (i+1)*step, 1 ),
	    new THREE.Vector2( (i)*step, 1 ),
	] );
    
    /*
    var step = 1.0/(segmentCount+1);
    faceA.materialIndex = this.faceVertexUvs[0].length;
    this.faceVertexUvs[0].push(	[
	new THREE.Vector2( 0, i*step ),
	new THREE.Vector2( 0, (i+1)*step ),
	new THREE.Vector2( 1, i*step ),
    ] );
    faceB.materialIndex = this.faceVertexUvs[0].length;
    this.faceVertexUvs[ 0 ].push( [
	    new THREE.Vector2( 0, (i+1)*step ),
	    new THREE.Vector2( 1, (i+1)*step ),
	    new THREE.Vector2( 1, i*step ),
    ] );
    */
};
