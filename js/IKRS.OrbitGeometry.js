/**
 * An orbit line geometry. Very simple.
 *
 * @author  Ikaros Kappler
 * @date    2016-03-18
 * @version 1.0.0
 **/

IKRS.OrbitGeometry = function( radius, segmentCount ) {

    IKRS.AbstractGeometry.call( this );

    if( !radius )       radius = 50;
    if( !segmentCount ) segmentCount = 100;

    var angle = 2 * Math.PI / segmentCount;
    for (var i = 0; i <= segmentCount; i++) {
	var x = radius * Math.cos(angle * i);
	var y = radius * Math.sin(angle * i);
	this.vertices.push(new THREE.Vector3(x, 0, y));
    }
    this.computeLineDistances();
};

IKRS.OrbitGeometry.prototype = Object.create( IKRS.AbstractGeometry.prototype );
IKRS.OrbitGeometry.prototype.constructor = IKRS.OrbitGeometry;
