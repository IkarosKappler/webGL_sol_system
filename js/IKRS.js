
/**
 * @author Ikaros Kappler
 * @date 2013-08-13
 * @version 1.0.0
 **/

var IKRS = IKRS || { CREATOR   : "Ikaros Kappler",
		     DATE      : "2013-08-14"
		   };

IKRS.debug = function( msg ) {
    console.debug( "[IKRS.debug] " + msg );
};

IKRS.error = function( msg ) {
    console.error( "[IKRS.error] " + msg );
};

IKRS.defined = function( v ) {
    return (typeof v != "undefined" && v != undefined && v != null);
};
