

/*
    http://www.JSON.org/json2.js
    2009-06-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON = JSON || {};

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
//Declare the variables to be used in the REST URL as parameters.

document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');

document.write('<script type="text/javascript">djConfig = { parseOnLoad: true }</script>');





var oneMapGif = "http://www.onemap.sg/plugin/images/Red_glow.gif";

var host = "http://www.onemap.sg/";

var _baseMapHost = "http://www.onemap.sg/ArcGIS/rest/services/";

var _baseMapURL = _baseMapHost + "basemap/MapServer";

var tileHost1 = "http://t1.onemap.sg/ArcGIS/rest/services/"

var tileHost2 = "http://t2.onemap.sg/ArcGIS/rest/services/"

var _baseMapURL1;

var _baseMapURL2;

var host1 = "http://119.73.244.163/";

//var _OneMapGlobalToken="";

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







var restResponse;

var parsedJSON;

var url;

var XYGraphicsLayer;



var restURL = "";



var OneMap;

var NewOneMap;

var _OneMapDiv;



//Added by Rabindar

var _Map, _ArcGISDynamicMapServiceLayer, _TiledMapServiceLayer, _SpatialReference, _Extent, _TileInfo, _GraphicsLayer, _ArcGISTiledMapServiceLayer, _PictureMarkerSymbol,

    _Point, _Graphic, _SimpleLineSymbol, _SimpleFillSymbol, _SimpleMarkerSymbol, _Polyline, _Polygon, _GeometryService, _InfoTemplate, _QueryTask, _Query, _Draw, _Navigation, _esriConfig, _Ready, _Multipoint, _BufferParameters;





//Modified by Rabindar for Extending the support for 3.10 ArcGis API

function GetOneMap(divName, baseMap, optionalProps) {

    init();

    var i = 1;

    try { var center = optionalProps.center; } catch (err) { }

    try { var level = optionalProps.level; } catch (err) { }

    try { var layer = optionalProps.layer; } catch (err) { }



    if (baseMap.toUpperCase() == "SM") {

        _baseMapURL = _baseMapHost + "basemap" + "/MapServer";

        _baseMapURL1 = tileHost1 + "basemap" + "/MapServer";

        _baseMapURL2 = tileHost2 + "basemap" + "/MapServer";

    }

    else if (baseMap.toUpperCase() == "LL") {

        _baseMapURL = _baseMapHost + "LOT_VIEW" + "/MapServer";

        _baseMapURL1 = tileHost1 + "LOT_VIEW" + "/MapServer";

        _baseMapURL2 = tileHost2 + "LOT_VIEW" + "/MapServer";

    }

    else if (baseMap.toUpperCase() == "MND") {

        _baseMapURL = _baseMapHost + "MND_Towncouncil" + "/MapServer";

        _baseMapURL1 = tileHost1 + "MND_Towncouncil" + "/MapServer";

        _baseMapURL2 = tileHost2 + "MND_Towncouncil" + "/MapServer";

    }

    else {

        _baseMapURL = _baseMapHost + baseMap + "/MapServer";

        _baseMapURL1 = tileHost1 + baseMap + "/MapServer";

        _baseMapURL2 = tileHost2 + baseMap + "/MapServer";

    }



    NewOneMap = this;

    _OneMapDiv = divName;

	var tileFormat="JPEG";

	var imageFormat="jpg";

	

		if (baseMap.toUpperCase() == "MND") {

		  tileFormat="PNG32";

		  imageFormat="png";

		  }







    NewOneMap.Ready = _Ready;

        

    dojo.addOnLoad(function () {

        

        var OneMap3;

        var startExtent = getExtentForLevelnCenter(center, level)

        var OneMap3 = new _Map(_OneMapDiv, { extent: startExtent, logo: false, 

            sliderStyle: "large"

        });





        ////////////////added to get tiles from AWS//////////////////



        dojo.declare("OM.CustomTileServiceLayer", _TiledMapServiceLayer, {

            constructor: function () {

                this.spatialReference = new _SpatialReference({ wkid: 3414 });

                this.initialExtent = (this.fullExtent = new _Extent(-4589.0529981345, 8065.64251572593, 96370.1129604966, 57234.9694430107, this.spatialReference));

                this.tileInfo = new _TileInfo({

                    "rows": 256,

                    "cols": 256,

                    "dpi": 96,

                    "format": tileFormat,

                    "origin": {

                        "x": -5878011.89743302,

                        "y": 10172511.897433

                    },

                    "spatialReference": {

                        "wkid": 3414

                    },

                    "lods": [

                          { "level": 0, "resolution": 76.4372195411057, "scale": 288896 },

                          { "level": 1, "resolution": 38.2186097705529, "scale": 144448 },

                          { "level": 2, "resolution": 19.1093048852764, "scale": 72224 },

                          { "level": 3, "resolution": 9.55465244263822, "scale": 36112 },

                          { "level": 4, "resolution": 4.77732622131911, "scale": 18056 },

                          { "level": 5, "resolution": 2.38866311065955, "scale": 9028 },

                          { "level": 6, "resolution": 1.19433155532978, "scale": 4514 },

                          { "level": 7, "resolution": 0.597165777664889, "scale": 2257 },

                          { "level": 8, "resolution": 0.298450596901194, "scale": 1128 }

                        ]

                });



                this.loaded = true;

                this.onLoad(this);

            },



            getTileUrl: function (level, row, col) {

                //var URL = "";

                if (baseMap.toUpperCase() == "SM") {

                    var URL = "http://e1.onemap.sg/basemap/Layers/_alllayers/";

                }

                else if (baseMap.toUpperCase() == "MND") {

                    var URL = "http://e1.onemap.sg/MND_Towncouncil/Layers/_alllayers/";

                }



                return URL +

                            "L" + dojo.string.pad(level, 2, '0') + "/" +

                            "R" + dojo.string.pad(row.toString(16), 8, '0') + "/" +

                            "C" + dojo.string.pad(col.toString(16), 8, '0') + "." +

                            imageFormat;

            }

        });

        ////////////////added to get tiles from AWS/////////////////////////////



        if (baseMap.toUpperCase() == "SM" || baseMap.toUpperCase() == "MND"  ) {

            OneMap3.addLayer(new OM.CustomTileServiceLayer());

        }

        else {

			var tiledMapServiceLayer = new _ArcGISTiledMapServiceLayer(_baseMapURL, { tileServers: [_baseMapURL1, _baseMapURL2] });

            OneMap3.addLayer(tiledMapServiceLayer);

            //TiledMapServiceLayer

        }

        ////////////////added to get tiles from AWS/////////////////////////////



        //OneMap3.addLayer(tiledMapServiceLayer);



        XYGraphicsLayer = new _GraphicsLayer();



        if ((layer != undefined) || (layer != null))

            OneMap3.addLayer(layer);

        NewOneMap.map = OneMap3;



        //custom methods

        NewOneMap.showLocation = showLocation;

        NewOneMap.mashupTheme = mashupTheme;

        NewOneMap.overlayKML = overlayKML;

        NewOneMap.clearGraphics = clearGraphics;

        NewOneMap.GetMultipleInfo = GetMultipleInfo;

        NewOneMap.onOneMapExtentChange = extentChangeAction;





        //Added by Rabindar

        //Exposing ESRI modules to onemap object

        NewOneMap.GraphicsLayer = _GraphicsLayer;

        NewOneMap.TiledMapServiceLayer = _TiledMapServiceLayer;

        NewOneMap.SpatialReference = _SpatialReference;

        NewOneMap.Extent = _Extent;

        NewOneMap.TileInfo = _TileInfo;

        NewOneMap.GraphicsLayer = _GraphicsLayer;

        NewOneMap.ArcGISTiledMapServiceLayer = _ArcGISTiledMapServiceLayer;

        NewOneMap.PictureMarkerSymbol = _PictureMarkerSymbol;

        NewOneMap.Point = _Point;

        NewOneMap.Graphic = _Graphic;

        NewOneMap.SimpleLineSymbol = _SimpleLineSymbol;

        NewOneMap.SimpleFillSymbol = _SimpleFillSymbol;

        NewOneMap.Polyline = _Polyline;

        NewOneMap.Polygon = _Polygon;

        NewOneMap.GeometryService = _GeometryService;

        NewOneMap.InfoTemplate = _InfoTemplate;

        NewOneMap.QueryTask = _QueryTask;

        NewOneMap.Query = _Query;

        NewOneMap.SimpleMarkerSymbol = _SimpleMarkerSymbol;

        NewOneMap.ArcGISDynamicMapServiceLayer = _ArcGISDynamicMapServiceLayer;

        NewOneMap.Draw = _Draw;

        NewOneMap.Navigation = _Navigation;

        NewOneMap.BufferParameters = _BufferParameters



        //dojo.connect(OneMap3, "onLoad", function() {



        var newdiv = document.createElement('div');



        var divIdName = 'OneMapLogo';

        newdiv.setAttribute('id', divIdName);

        //newdiv.setAttribute('onclick', function() { window.open('http://www.onemap.sg/home') });

        newdiv.setAttribute('onclick', "window.open('http://www.onemap.sg/home')");

        newdiv.setAttribute('style', "cursor:hand");

        newdiv.setAttribute('style', "cursor:pointer");



        document.getElementById(OneMap3.id + '_root').appendChild(newdiv);

        document.getElementById('OneMapLogo').innerHTML = "<img src='http://t1.onemap.sg/api/js/imap_small_logo.gif'  style='vertical-align:bottom' />  <font style='font-family:Arial; font-size:0.7em; color:black;'><strong>&copy; 2015 OneMap</strong></font>";



        var t = $('#' + OneMap3.id + '_root').position().top;

        var l = $('#' + OneMap3.id + '_root').position().left;

        var ht = parseInt(document.getElementById(OneMap3.id).style.height.replace('px', ''))

        document.getElementById("OneMapLogo").style.top = (ht - 35) + 'px';

        //document.getElementById("OneMapLogo").style.left =  l + 'px';

        document.getElementById("OneMapLogo").style.position = "absolute";

        document.getElementById("OneMapLogo").style.zIndex = 100;



        // });

    }); //Dojo onLoad





}



function init() {

    ////esri/tasks/QueryTask

    require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/TiledMapServiceLayer",

        "esri/SpatialReference", "esri/geometry/Extent", "esri/layers/TileInfo", "esri/layers/GraphicsLayer",

        "esri/layers/ArcGISTiledMapServiceLayer", "esri/symbols/PictureMarkerSymbol", "esri/geometry/Point",

        "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",

        "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/tasks/GeometryService", "esri/InfoTemplate",

        "esri/tasks/QueryTask", "esri/tasks/query", "esri/toolbars/draw", "esri/toolbars/navigation", "esri/config", "esri/geometry/Multipoint", "esri/tasks/BufferParameters", "dojo/domReady!"],

        function (Map, ArcGISDynamicMapServiceLayer, TiledMapServiceLayer, SpatialReference, Extent, TileInfo, GraphicsLayer, ArcGISTiledMapServiceLayer,

            PictureMarkerSymbol, Point, Graphic, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, Polyline, Polygon,

            GeometryService, InfoTemplate, QueryTask, Query, Draw, Navigation, esriConfig, Multipoint, BufferParameters, Ready) {

            //Added by Rabindar

            _Map = Map;

            _ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;

            _TiledMapServiceLayer = TiledMapServiceLayer;

            _SpatialReference = SpatialReference;

            _Extent = Extent;

            _TileInfo = TileInfo;

            _GraphicsLayer = GraphicsLayer;

            _ArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;

            _PictureMarkerSymbol = PictureMarkerSymbol;

            _Point = Point;

            _Graphic = Graphic;

            _SimpleLineSymbol = SimpleLineSymbol;

            _SimpleFillSymbol = SimpleFillSymbol;

            _SimpleMarkerSymbol = SimpleMarkerSymbol;

            _Polyline = Polyline;

            _Polygon = Polygon;

            _GeometryService = GeometryService;

            _InfoTemplate = InfoTemplate;

            _QueryTask = QueryTask;

            _Query = Query;

            _Draw = Draw;

            _Ready = Ready;

            _Navigation = Navigation;

            _Multipoint = Multipoint;

            _BufferParameters = BufferParameters;

        });     // End requires

}





function initWMTS() {

    require([

"esri/map", "esri/layers/WMTSLayer", "esri/layers/WMTSLayerInfo",

"esri/geometry/Extent", "esri/layers/TileInfo", "esri/SpatialReference",

"dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"

], function (

Map, _WMTSLayer, _WMTSLayerInfo,

Extent, TileInfo, SpatialReference,

parser

) {

    WMTSMap = Map;

    WMTSLayer = _WMTSLayer;

    WMTSLayerInfo = _WMTSLayerInfo;

    WMTSExtent = Extent;

    WMTSTileInfo = TileInfo;

    WMTSSpatialReference = SpatialReference;

    WMTSParser = parser;

});

}



function GetWMTSOneMap(divName) {



    initWMTS();

    NewOneMap = this;



    dojo.addOnLoad(function () {



        var bounds = new WMTSExtent({

            "xmin": 0,

            "ymin": 15830.506124999374,

            "xmax": 65000,

            "ymax": 55000,

            "spatialReference": { "wkid": 3414 }

        });

        var map, wmtsLayer;

        map = new WMTSMap(divName, {

            extent: bounds, logo: false, sliderStyle: "large"

        });





        var tileInfo1 = new WMTSTileInfo({

            "dpi": 96,

            "format": "image/JPEG",

            "compressionQuality": 80,

            "spatialReference": new WMTSSpatialReference({

                "wkid": 3414

            }),

            "rows": 256,

            "cols": 256,

            "origin": {

                "x": -5878011.89743302,

                "y": 10172500

            },

            "lods": [{

                "level": 0,

                "resolution": 76.43721954110575,

                "scale": 288896

            },

            {

                "level": 1,

                "resolution": 38.218609770552874,

                "scale": 144448

            },

            {

                "level": 2,

                "resolution": 19.109304885276437,

                "scale": 72224

            },

            {

                "level": 3,

                "resolution": 9.554652442638218,

                "scale": 36112

            },

            {

                "level": 4,

                "resolution": 4.777326221319109,

                "scale": 18056

            },

            {

                "level": 5,

                "resolution": 2.3886631106595546,

                "scale": 9028

            },

            {

                "level": 6,

                "resolution": 1.1943315553297773,

                "scale": 4514

            },

            {

                "level": 7,

                "resolution": 0.5971657776648887,

                "scale": 2257

            },

            {

                "level": 8,

                "resolution": 0.2984505969011938,

                "scale": 1128

            }]

        });

        var tileExtent1 = bounds;

        var layerInfo1 = new WMTSLayerInfo({

            tileInfo: tileInfo1,

            fullExtent: tileExtent1,

            initialExtent: tileExtent1,

            identifier: "WMTS",

            tileMatrixSet: "default028mm",

            format: "JPEG",

            style: "default"

        });



        var resourceInfo = {

            version: "1.0.0",

            layerInfos: [layerInfo1]

            //copyright: "open layer"

        };



        var options = {

            serviceMode: "KVP",

            resourceInfo: resourceInfo,

            layerInfo: layerInfo1

        };



        //var wmtsURL = "54.254.158.141:6080/" + "arcgis/rest/services/BaseMapWMTS/MapServer/WMTS";

		var wmtsURL = host +"arcgis/rest/services/Basemap/MapServer/WMTS";

        wmtsLayer = new WMTSLayer(wmtsURL, options);

        map.addLayer(wmtsLayer);



        //Add onemap icon below

        var newdiv = document.createElement('div');



        var divIdName = 'OneMapLogo';

        newdiv.setAttribute('id', divIdName);

        //newdiv.setAttribute('onclick', function() { window.open('http://www.onemap.sg/home') });

        newdiv.setAttribute('onclick', "window.open('http://www.onemap.sg/home')");

        newdiv.setAttribute('style', "cursor:hand");

        newdiv.setAttribute('style', "cursor:pointer");



        document.getElementById(map.id + '_root').appendChild(newdiv);

        document.getElementById('OneMapLogo').innerHTML = "<img src='http://t1.onemap.sg/api/js/imap_small_logo.gif'  style='vertical-align:bottom' />  <font style='font-family:Arial; font-size:0.7em; color:black;'><strong>&copy; 2015 OneMap</strong></font>";



        var t = $('#' + map.id + '_root').position().top;

        var l = $('#' + map.id + '_root').position().left;

        var ht = parseInt(document.getElementById(map.id).style.height.replace('px', ''))

        document.getElementById("OneMapLogo").style.top = (ht - 35) + 'px';

        //document.getElementById("OneMapLogo").style.left =  l + 'px';

        document.getElementById("OneMapLogo").style.position = "absolute";

        document.getElementById("OneMapLogo").style.zIndex = 100;

        NewOneMap.map = map;



    });   //Dojo on Load

}











function getMultipleFactor(level) {



    var zoomLevel1 = 76.4372195411057

    var zoomLevel2 = 38.2186097705529

    var zoomLevel3 = 19.1093048852764

    var zoomLevel4 = 9.55465244263822

    var zoomLevel5 = 4.77732622131911

    var zoomLevel6 = 2.38866311065955

    var zoomLevel7 = 1.19433155532978

    var zoomLevel8 = 0.597165777664889

    var zoomLevel9 = 0.298450596901194

    var factor;

    factor = 200 * eval("zoomLevel" + level)

    return factor

}





function getExtentForPoint(x, y, buffer) {

    var xLocation1 = parseFloat(x) - buffer

    var yLocation1 = parseFloat(y) - buffer

    var xLocation2 = parseFloat(x) + buffer

    var yLocation2 = parseFloat(y) + buffer

    var startExtent = new _Extent({ xmin: xLocation1, ymin: yLocation1, xmax: xLocation2, ymax: yLocation2, spatialReference: { wkid: 3414} });

    return startExtent

}



function getExtentForLevelnCenter(center, level) {

    var buffer = 200;

    var xLocation

    var yLocation

    if ((center == null) || (center == undefined)) {

        center = "28968.103,33560.969";

        xLocation = center.split(",")[0]

        yLocation = center.split(",")[1]



        if ((level != null) || (level != undefined))

            buffer = getMultipleFactor(level);

        else

            buffer = getMultipleFactor(1);

    }

    else {

        //            var xLocation=center.split(",")[0]

        //            var yLocation=center.split(",")[1]



        if ((level != null) || (level != undefined))

            buffer = getMultipleFactor(level);

        else

            buffer = getMultipleFactor(1);

    }

    xLocation = center.split(",")[0]

    yLocation = center.split(",")[1]

    var extent = getExtentForPoint(xLocation, yLocation, buffer)

    return extent

}



function showLocation(xVal, yVal) {



    var OneMap2 = this.map;

    OneMap2.addLayer(XYGraphicsLayer);

    XYGraphicsLayer.clear();

    var xval = xVal;

    var yval = yVal;

    if (isNaN(xval) && isNaN(yval)) {

    }

    else {

        var XYsymbol = new _PictureMarkerSymbol(oneMapGif, 20, 20)

        var XYLocation = new _Point(xval, yval, new _SpatialReference({ wkid: 3414 }))

        var XYGraphic = new _Graphic(XYLocation, XYsymbol);

        XYGraphicsLayer.add(XYGraphic);



        //Commented by Rabindar

        //Old implementation

        //var Srchpoint = new _Extent(XYLocation.x - 150, XYLocation.y - 150, XYLocation.x + 150, XYLocation.y + 150, new _SpatialReference({ wkid: 4326 }));

        //OneMap2.setExtent(Srchpoint);



        //Add by Rabindar

        OneMap2.centerAndZoom(XYLocation, 7);



    }



}





//----------------extentChangeAction



function extentChangeAction(functionName) {



    var OneMap = this.map

    dojo.connect(OneMap, "onExtentChange", functionName)

}



//-------------- init xmlhttp -------------------------------------------------

var xmlhttp;

var xmlhttp2;

function GetXmlHttpObject() {

    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari

        return new XMLHttpRequest();

    }

    if (window.ActiveXObject) {  // code for IE6, IE5

        return new ActiveXObject("Microsoft.XMLHTTP");

    } return null;

}





//-------------- Basic Search -------------------------------------------------



function BasicSearch() {



    this.token = "";

    this.searchVal = "";

    this.whereClause = "";

    this.otptFlds = "";

    this.returnGeom = "";

    this.rset = "";

    this.GetSearchResults = GetSearchResults;

}





function GetSearchResults(callback) {

    //debugger;

    var obj = this;



    var token = obj.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }

    var searchval = obj.searchVal;

    var whereclause = obj.whereClause;

    var otptFlds = obj.otptFlds;

    var returngeom = obj.returnGeom;

    var rset = obj.rset;



    url = host + "API/services.svc/basicSearch?token=" + token



    if (searchval != "") {

        url = url + "&searchVal=" + searchval;

    }

    if (whereclause != "") {



        url = url + "&wc=" + whereclause;

    }

    if (otptFlds != "") {



        url = url + "&otptFlds=" + otptFlds;

    }

    if (returngeom != "") {



        url = url + "&returnGeom=" + returngeom;

    }

    if (rset != "") {



        url = url + "&rset=" + rset;

    }



    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;

        outPutResults.nop = parsedJSON.SearchResults[0].PageCount;

        outPutResults.results = parsedJSON.SearchResults.splice(1, parsedJSON.SearchResults.length);

        if (outPutResults.results.length == 0) { outPutResults.results = "No results"; }

        callback(outPutResults);

    });

}

//BizQuery ---------------------------------------------------------------



function BizQuery() {

    this.token = "";

    this.dist = "";

    this.status = "";

    this.code = "";

    this.coord = "";

    this.GetNextResults = GetNextResults;

}



function GetNextResults(callback) {

    //debugger;

    var obj = this;

    var token = obj.token;

    var dist = obj.dist;

    var status = obj.status;

    var code = obj.code;

    var coord = obj.coord;

    // var rset = obj.rset;



    url = host + "bizQuery/Service1.svc/getlist?token=" + token;

    url = url + "&dist=" + dist;

    url = url + "&status=" + status;

    url = url + "&code=" + code;

    url = url + "&coord=" + coord;

    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;

        outPutResults.nop = parsedJSON.SearchResults[0].PageCount;

        outPutResults.results = parsedJSON.SearchResults.splice(1, parsedJSON.SearchResults.length);

        if (outPutResults.results.length == 0) { outPutResults.results = "No results"; }

        callback(outPutResults);

    });

}

//end for BizQuery



//-------------- Event Details -------------------------------------------------

function EventData() {

    this.token = "";

    this.extent = "";

    this.rset = "";

    this.GetEventData = GetEventData;

}



var htmlString;



function GetEventData(callback) {

    var obj = this;

    var token = obj.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }



    var extent = obj.extent;

    var rset = obj.rset;



    url = host + "API/services.svc/getevents?token=" + token + "&extents=" + extent



    restURL = url;



    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;

        outPutResults.nop = parsedJSON.SearchResults[0].PageCount;

        outPutResults.results = parsedJSON.SearchResults.splice(1, parsedJSON.SearchResults.length);

        if (outPutResults.results.length == 0) { outPutResults.results = "No results"; }

        callback(outPutResults);

    });



}





//-------------- Reverse Geocode -------------------------------------------------

function GetAddressInfo() {

    this.token = "";

    this.Postalcode = "";

    this.XY = "";

    this.GetAddress = GetAddress;

}



function GetAddress(callback) {

    var obj = this;

    var token = obj.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }



    var Postalcode = obj.Postalcode;

    var XY = obj.XY;

    url = host + "API/services.svc/revgeocode?token=" + token

    //url = host + "API/services.svc/revgeocode?token=Hfc6cEp4qybVIw4sagxi1yQbFIEzPUiN+yRkAV6/pODByLmmDo878pYNVSTE6ABE0YReToPoj2VOmM7btBdxP9DOuAzJs/Ip"

    if ((Postalcode == "") && (XY == "")) {

        var outPutResults = new Object;

        outPutResults.results = "No results";

        callback(outPutResults);

        return

    }



    if (XY != "") {

        url = url + "&location=" + XY;

    }

    else if (Postalcode != "") {

        url = url + "&Postalcode=" + Postalcode;

    }



    restURL = url;



    $.getJSON(url + "&callback=?", function (parsedJSON) {

        //debugger;

        var outPutResults = new Object;

        outPutResults.results = parsedJSON.GeocodeInfo;

        if (outPutResults.results.length == 0) { outPutResults.results = "No results"; }

        callback(outPutResults);

    });

}

//-------------- Static Map -------------------------------------------------

function StaticMap() {

    this.token = "";

    this.bmap = "";

    this.center = "";

    this.lyrIds = "";

    this.size = "";

    this.level = "";

    this.points = "";

    this.lines = "";

    this.polys = "";

    this.weight = "";

    this.color = "";

    this.fillColor = "";

    this.GetStaticMap = GetStaticMap

}



function GetStaticMap() {

    var obj = this;

    var token = obj.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }

    var bmap = obj.bmap;

    var center = obj.center;

    var lyrids = obj.lyrIds;

    var size = obj.size;

    var level = obj.level;

    var points = obj.points;

    var lines = obj.lines;

    var polys = obj.polys;



    var weight = obj.weight;

    var color = obj.color;

    var fillcolor = obj.fillcolor;



    if (points == "" && lines == "" && polys == "") {



        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids;

    }

    else if (points != "" && lines == "" && polys == "") {

        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids + "&points=" + points;

    }

    else if (points == "" && lines != "" && polys == "") {

        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids + "&lines=" + lines;

    }

    else if (points == "" && lines == "" && polys != "") {

        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids + "&polys=" + polys;

    }

    else if (points != "" && lines != "" && polys != "") {

        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids + "&points=" + points + "&polys=" + polys + "&lines=" + lines;

    }

    else if (points != "" && lines != "" && polys == "") {

        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids + "&points=" + points + "&lines=" + lines;

    }

    else if (points != "" && lines == "" && polys != "") {

        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids + "&points=" + points + "&polys=" + polys;

    }

    else if (points == "" && lines != "" && polys != "") {

        url = host + "API/services.svc/getMap?token=" + token + "&bmap=" + bmap + "&size=" + size + "&level=" + level + "&center=" + center + "&lyrIds=" + lyrids + "&polys=" + polys + "&lines=" + lines;

    }





    //For the weight, color and fill Color.

    if (lines != "" && polys != "") {

        if (weight != "")

        { url = url + "&weight=" + weight; }

        if (color != "")

        { url = url + "&color=" + color; }

        if (fillcolor != "")

        { url = url + "&fillColor=" + fillcolor; }

    }



    restURL = url;



    return url;





}





//--------------- Map Route --------------------------------------



function Route() {

    this.token = "";

    this.routeStops = "";

    this.routeMode = "";

    this.avoidERP = "";

    this.routeOption = "";

    this.barriers = "";

    this.GetRoute = GetRoute;

}



function GetRoute(callback) {



    var token = this.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }

    var routestops = this.routeStops;

    var routemode = this.routeMode;

    var avoiderp = this.avoidERP;

    var routeOption = this.routeOption;

    var barriers = this.barriers;



	if(routeOption==""){

	routeOption="SHORTEST";

	}

	

	

    url = host + "API/services.svc/route/solve?token=" + token + "&routeStops=" + routestops + "&routeMode=" + routemode + "&avoidERP=" + avoiderp + "&routeOption=" + routeOption + "&barriers=" + barriers;



    restURL = url;





    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;

        outPutResults.results = parsedJSON



        try {

            if (outPutResults.results.error.message != null) {

                if (outPutResults.results.error.message == "Error solving route") {

                    outPutResults.results = "No results";

                }

                else if (outPutResults.results.error.message == "") {

                    outPutResults.results = "No results";

                }

                else if (outPutResults.results.error.message == "stops exceed") {

                    outPutResults.results = "Stops more than nine";

                }

            }



        }

        catch (err) {

            callback(outPutResults);

        }





        //if (outPutResults.results.length == 0) { outPutResults.results = "No results"; }

        callback(outPutResults);

    });

}







//-------------- Theme Search -------------------------------------------------



function ThemeSearch() {



    this.token = "";

    this.searchVal = "";

    this.returnGeom = "";

    this.otptFlds = "";

    this.rset = "";

    this.GetThemeSearchResults = GetThemeSearchResults;

}



function GetThemeSearchResults(callback) {





    var obj = this;

    var token = obj.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }

    var searchval = obj.searchVal;

    var otptFlds = obj.otptFlds;

    var returnGeom = obj.returnGeom;

    var rset = obj.rset;

    url = host;

    if (searchval != "") {

        url = url + "API/services.svc/themeSearch?token=" + token + "&searchVal=" + searchval;

    }

    //Search Value and page numnber

    if (otptFlds != "") {



        url = url + "&otptFlds=" + otptFlds;

    }



    if (returnGeom != "") {



        url = url + "&returnGeom=" + returnGeom;

    }



    if (rset != "") {



        url = url + "&rset=" + rset;

    }



    restURL = url;



    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;



        outPutResults.nop = parsedJSON.SearchResults[0].PageCount;

        outPutResults.results = parsedJSON.SearchResults.splice(1, parsedJSON.SearchResults.length);



        if (outPutResults.results.length == 0) { outPutResults.results = "No results"; }

        callback(outPutResults);

    });



}







//-------------- Mashup API  -- WIth all params -------------------------------------------------

var layerData = "-";





function GetLayerInfoClass() {

    this.themeName = "";

    this.ExtracLayerInfo = ExtracLayerInfo;



}



function ExtracLayerInfo(callback) {

    layerName = this.themeName

    var url = host + "API/services.svc/layerinfoDM?layername=" + layerName;



    restURL = url;



    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;

        var firstRecord = parsedJSON.LayerInfo[0]

        outPutResults.RelatedTabName = firstRecord.ADD_TABLE_NAM



        if (firstRecord.ADD_TABLE_NAM != "") {

            var callOutURL = host + "API/services.svc/" + firstRecord.ADD_TABLE_NAM + "/" + firstRecord.CALLOUTFIELDNAME + "/"



            outPutResults.calloutURL = callOutURL;

        }

        else {

            outPutResults.calloutURL = firstRecord.CALLOUTURL;

        }



        outPutResults.calloutFieldName = firstRecord.CALLOUTFIELDNAME

        outPutResults.Category = firstRecord.CATEGORY

        outPutResults.FeatureType = firstRecord.FEATTYPE;

        outPutResults.MinLevel = firstRecord.MINLEVEL

        outPutResults.MaxLevel = firstRecord.MAXLEVEL

        outPutResults.IconPath = firstRecord.IconPath

        outPutResults.AgencyName = firstRecord.AGENCY

        outPutResults.FieldNames = firstRecord.FIELD_NAM_T

        outPutResults.Icon = firstRecord.ICON_NAM_T

        outPutResults.MapTipFieldName = firstRecord.FIELD_NAM_T.split(",")[0];

        outPutResults.visibleFields = firstRecord.SHOWNATTRIBS;

        outPutResults.pointColour = firstRecord.COLOR_T;

        outPutResults.color = firstRecord.COLOR

        outPutResults.outlineColor = firstRecord.OUTLINECOLOR

        outPutResults.lineThickness = firstRecord.LINETHICKNESS



        callback(outPutResults)

    });

}





function MashupData(oneMap) {

    this.token = "";

    this.themeName = "";

    this.outputFields = "";

    this.whereClause = "";

    this.extendedWhereClause = "";

    this.extent = "";

    this.map = "";

    this.graphicLayer = "";

    this.GetMashupData = GetMashupData;

    this.layerData = "";

    this.GetDataForCallout = GetDataForCallout;

    this.formatResultsEnhanced = formatResultsEnhanced;

}





function GetDataForCallout(graphic, wc, callback) {

    var mashupObj = this;

    var layerInfo = mashupObj.layerData;

    var calloutURL = layerInfo.calloutURL;



    if (calloutURL != "") {



        calloutURL = calloutURL + graphic.attributes[layerInfo.calloutFieldName];

        calloutURL = calloutURL + "?token=" + _OneMapGlobalToken

        if (wc != "") { calloutURL = calloutURL + "?wc=" + wc }



        $.getJSON(calloutURL + "&callback=?", function (parsedJSON) {

            var outPutResults = new Object;

            outPutResults = parsedJSON.SearchResults;

            callback(outPutResults);

        })

    }

    else {

        var outPutResults = new Array;



        outPutResults[0] = graphic.attributes;

        callback(outPutResults);

    }

}



function formatResultsEnhanced(resultObject) {

    //debugger;

    var nameVal = ""

    nameVal = nameVal + "<br/>"

    // to add Name on top

    for (var key in resultObject[0]) {

        switch (key) {

            case 'NAME':

                if (resultObject[0]["NAME"] != "") {

                    nameVal += "<strong>" + resultObject[0][key] + "</strong>" + "<br/>"

                    break;

                }

                else { break; }

        }

    }

    for (var key in resultObject[0]) {

        switch (key) {

            case 'NAME':

                if (resultObject[0]["NAME"] != "") {

                    break;

                }

                else { break; }

            case "PHOTOURL":

                if (resultObject[0]["PHOTOURL"] != "") {

                    break;

                }

                else { break; }

            case "ICON_NAME":

                if (resultObject[0]["ICON_NAME"] != "") {

                    break;

                }

                else { break; }

            case "XY":

                if (resultObject[0]["XY"] != "") {

                    break;

                }

                else { break; }

            case 'DESCRIPTION':

                if (resultObject[0]["DESCRIPTION"] != "") {

                    nameVal += resultObject[0]["DESCRIPTION"] + " "

                    break;

                }

                else { break; }

            case "HYPERLINK":

                if (resultObject[0]["HYPERLINK"] != "") {

                    nameVal += "<br/><a href=" + resultObject[0]["HYPERLINK"] + " target='_blank'>More Info</a>" + "<br/>"

                    break;

                }

                else { break; }

            case "ADDRESSSTREETNAME":

                if (resultObject[0]["ADDRESSSTREETNAME"] != "") {

                    nameVal += resultObject[0]["ADDRESSSTREETNAME"] + " "

                    break;

                }

                else { break; }

            case "ADDRESSFLOORNUMBER":

                if (resultObject[0]["ADDRESSFLOORNUMBER"] != "") {

                    nameVal += resultObject[0]["ADDRESSFLOORNUMBER"] + " "

                    break;

                }

                else { break; }

            case "ADDRESSBLOCKHOUSENUMBER":

                if (resultObject[0]["ADDRESSBLOCKHOUSENUMBER"] != "") {

                    nameVal += resultObject[0]["ADDRESSBLOCKHOUSENUMBER"] + " "

                    break;

                }

                else { break; }

            case "ADDRESSBUILDINGNAME":

                if (resultObject[0]["ADDRESSBUILDINGNAME"] != "") {

                    nameVal += resultObject[0]["ADDRESSBUILDINGNAME"] + " "

                    break;

                }

                else { break; }

            case "ADDRESSFLOORNUMBER":

                if (resultObject[0]["ADDRESSFLOORNUMBER"] != "") {

                    nameVal += resultObject[0]["ADDRESSFLOORNUMBER"] + " "

                    break;

                }

                else { break; }

            case "ADDRESSUNITNUMBER":

                if (resultObject[0]["ADDRESSUNITNUMBER"] != "") {

                    nameVal += resultObject[0]["ADDRESSUNITNUMBER"] + " "

                    break;

                }

                else { break; }

            case "ADDRESSPOSTALCODE":

                if (resultObject[0]["ADDRESSPOSTALCODE"] != "") {

                    nameVal += resultObject[0]["ADDRESSPOSTALCODE"] + " "

                    break;

                }

                else { break; }

            case "SYMBOLCOLOR":

                if (resultObject[0]["SYMBOLCOLOR"] != "") {

                    break;

                }

                else { break; }

            case "MAPTIP":

                if (resultObject[0]["MAPTIP"] != "") {

                    break;

                }

                else { break; }

            case "OBJECTID":

                if (resultObject[0]["OBJECTID"] != "") {

                    break;

                }

                else { break; }

            default:

                nameVal += resultObject[0][key] + "<br/>"

        }

    }

    // for photo to be on bottom 

    for (var key in resultObject[0]) {

        switch (key) {

            case "PHOTOURL":

                if (resultObject[0]["PHOTOURL"] != "") {

                    nameVal += "<img src=" + resultObject[0]["PHOTOURL"] + "></img>" + "<br/>"

                    break;

                }

                else { break; }

        }

    }

    return nameVal



}





function GetMashupData(callback) {

    var obj = this;

    var token = obj.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } else { _OneMapGlobalToken = token } } catch (err) { }

    var themename = obj.themeName;

    var otptFlds = obj.outputFields;

    var whereclause = obj.whereClause;

    var extent = obj.extent;

    var extendedWhereClause = obj.extendedWhereClause;

    var graphicLayer = obj.graphicLayer;

    var OneMap = obj.map



    url = host + "API/services.svc/mashupData";



    if (themename != "")

        url = url + "?token=" + token + "&themeName=" + themename;



    if (otptFlds != "")

        url = url + "&otptFlds=" + otptFlds;



    if (whereclause != "")

        url = url + "&wc=" + whereclause;



    if (extent != "")

        url = url + "&extents=" + extent;



    if (extendedWhereClause != "")

        url = url + "&exwc=" + extendedWhereClause;

    restURL = url;



    if ((obj.layerData == undefined) || (obj.layerData == "")) {

        var extractData = new GetLayerInfoClass()

        extractData.themeName = themename



        var extractedLayerData = extractData.ExtracLayerInfo(function (results) {

            layerData = results

        })

    }



    $.getJSON(url + "&callback=?", function (parsedJSON) {



        var outPutResults = new Object;

        if (parsedJSON.SrchResults.length == 1) {

            outPutResults.results = "No results";

            callback(outPutResults);

            return

        }



        outPutResults.count = parsedJSON.SrchResults[0].FeatCount;

        outPutResults.results = parsedJSON.SrchResults.splice(1, parsedJSON.SrchResults.length - 1);

        outPutResults.theme = themename;



        if ((obj.layerData == undefined) || (obj.layerData == "")) {

            obj.layerData = layerData;

        }

        else {

            layerData = obj.layerData;

        }



        var calloutFieldName = layerData.calloutFieldName

        var calloutFields = layerData.calloutFields;

        var calloutURL = layerData.calloutURL;

        var calloutUniqueFld = layerData.calloutUniqueFld;

        var iconPath = layerData.IconPath

        var featType = layerData.FeatureType

        var color = layerData.color



        outPutResults.calloutFieldName = calloutFieldName

        outPutResults.calloutURL = calloutURL

        outPutResults.calloutUniqueFld = calloutUniqueFld

        outPutResults.iconPath = iconPath

        outPutResults.featType = featType

        outPutResults.graphicLayer = graphicLayer;



        if ((layerData.color != undefined) && (layerData.color != undefined)) {

            outPutResults.color = hexToRGB(layerData.color);

        }

        else {

            outPutResults.color = '255,255,255';

        }



        if ((layerData.outlineColor != undefined) && (layerData.outlineColor != undefined)) {

            outPutResults.outlineColor = hexToRGB(layerData.outlineColor);

        }

        else {

            outPutResults.outlineColor = '255,255,255';

        }



        if ((layerData.lineThickness != undefined) && (layerData.lineThickness != undefined)) {

            outPutResults.lineThickness = layerData.lineThickness;

        }

        else {

            outPutResults.lineThickness = '1';

        }

        callback(outPutResults);

    });



}



function GetMultipleInfo(url, results) {



    $.getJSON(url + "?token=" + _OneMapGlobalToken + "&callback=?", function (parsedJSON) {



        var outPutResults = new Object;

        outPutResults = parsedJSON.SearchResults;

        results(outPutResults);



    })



}



function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }



function hexToRGB(hexValue) {

    var h = hexValue;

    var r = parseInt((cutHex(h)).substring(0, 2), 16);

    var g = parseInt((cutHex(h)).substring(2, 4), 16);

    var b = parseInt((cutHex(h)).substring(4, 6), 16);

    return (r + ',' + g + ',' + b)

}





//---------------------------------------KML ------------------------------- 



















//-------------------------------------- Overlay KML End here------------------------------- 

var OneMapKML;

function overlayKML(kmlFilePath) {

	esri.config.defaults.io.alwaysUseProxy = false;

    esri.config.defaults.io.corsEnabledServers.push(host);

    OneMapKML = this.map;

    var pointcoordinates = new String();

    var linecoordinates = new String();

    var isFirefox = false;

    var url = kmlFilePath;

    var xmlDoc;



    //if (url.indexOf('160.96.187.80') > 0) { url = host + "api/Services.svc/overlayKML?path=" + url }

    if (url.indexOf('www.onemap.sg') > 0) { url = host + "api/Services.svc/overlayKML?path=" + url }



    if (xmlDoc != null) return;

    if (document.implementation && document.implementation.createDocument) {



        var request = new XMLHttpRequest();

        request.open("GET", url, false);

        request.send(null);

        xmlDoc = (new DOMParser()).parseFromString(request.responseText, "text/xml");



        GetStringFromKML(xmlDoc);



    }

    else if (window.ActiveXObject) {

        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");

        xmlDoc.onreadystatechange = function () {

            if (xmlDoc.readyState == 4) { isFirefox = false; GetStringFromKML(xmlDoc); }

        };

    }

    else {

        var request = new XMLHttpRequest();

        request.open("GET", url, false);

        request.send(null);

        xmlDoc = (new DOMParser()).parseFromString(request.responseText, "text/xml");

        GetStringFromKML(xmlDoc);

    }

    xmlDoc.load(url);



}





function verify() {

    if (xmlDoc.readyState != 4) {

        return false;

    }

}

var RootNode;

function GetStringFromKML(xmlDoc) {





    var nodeList = xmlDoc.XmlNodeList;



    var strng = new String();

    var str = String;

    str = "";

    var linestr = String;

    linestr = "";

    var nameValue = String;

    nameValue = ""

    RootNode = xmlDoc.documentElement;

    var nodelist1 = xmlDoc.getElementsByTagName("Placemark")



    if (nodelist1.length == 0) {

        alert("Sorry.No feature found in KML file.")

        return

    }



    for (var i = 0; i < nodelist1.length; i++) {

        linestr = "";

        str = "";

        nameValue = "";



        var nodelist2 = nodelist1[i].getElementsByTagName("Point")

        var nodelist3 = nodelist1[i].getElementsByTagName("LinearRing")

        var nodelist4 = nodelist1[i].getElementsByTagName("LineString")



        if (nodelist2.length != 0) {

            var PointNode = nodelist1[i].getElementsByTagName("Point")[0].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;



            var infoWindowContent = GetInfoWindowContent(nodelist1[i]);



            var iconName = GetIconNameFromKMLNode(nodelist1[i]);



            addPointToMap(PointNode, infoWindowContent, iconName)

            str = ""



        }



        if (nodelist3.length != 0) {

            var LineNode = nodelist1[i].getElementsByTagName("LinearRing")[0].getElementsByTagName("coordinates")[0].textContent;



            try {

                var description = nodelist1[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;

                var checkforname = nodelist1[i].xml;

                if (checkforname.indexOf("<name>") >= 0) {

                    var name = nodelist1[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;

                    if (name != null && name != "" && name != undefined) {

                        nameValue = name + "<br/>"

                    }

                    if (description != null && description != "" && description != undefined) {

                        nameValue += description + "<br/>";

                    }

                }

                else {

                    nameValue = description;

                }

            }

            catch (err) {



            }



            linestr += LineNode + "~"

            splitDataandAddPoint(str, linestr, nameValue);



        }



        if (nodelist4.length != 0) {

            var LineNode = nodelist1[i].getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].textContent;

            //var nameValue = nodelist1[i].getElementsByTagName("description")[0].childNodes[0].nodeValue

            try {

                var description = nodelist1[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;

                var checkforname = nodelist1[i].xml;

                if (checkforname.indexOf("<name>") >= 0) {

                    var name = nodelist1[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;

                    if (name != null && name != "" && name != undefined) {

                        nameValue = name + "<br/>"

                    }

                    if (description != null && description != "" && description != undefined) {

                        nameValue += description + "<br/>";

                    }

                }

                else {

                    if (description != null && description != "" && description != undefined) {

                        nameValue = description;

                    }

                }

            }

            catch (err) {



            }

            linestr += LineNode + "~"

            splitDataandAddLines(linestr, nameValue);



        }

    }



}



function GetIconNameFromKMLNode(inputNode) {

    var iconName = ""

    try {



        try {

            var stylelist = RootNode.getElementsByTagName("Style");



            for (var i = 0; i < stylelist.length; i++) {

                var styleurl = inputNode.getElementsByTagName("styleUrl")[0].textContent;

                styleurl = styleurl.replace('#', '');

                var styleid = RootNode.getElementsByTagName("Style")[i].attributes.getNamedItem("id").nodeValue;

                if (styleurl == styleid) {

                    iconName = RootNode.getElementsByTagName("Style")[i].getElementsByTagName("IconStyle")[0].getElementsByTagName("Icon")[0].getElementsByTagName("href")[0].childNodes[0].nodeValue;

                    try {

                        iconName += "," + RootNode.getElementsByTagName("Style")[i].getElementsByTagName("IconStyle")[0].getElementsByTagName("Icon")[0].getElementsByTagName("width")[0].childNodes[0].nodeValue;

                        iconName += "," + RootNode.getElementsByTagName("Style")[i].getElementsByTagName("IconStyle")[0].getElementsByTagName("Icon")[0].getElementsByTagName("height")[0].childNodes[0].nodeValue;

                    }

                    catch (err) {

                        iconName += ",20,20";

                    }

                    break;

                }



            }



        }

        catch (err) {

            iconName = inputNode.getElementsByTagName("Style")[0].getElementsByTagName("IconStyle")[0].getElementsByTagName("Icon")[0].getElementsByTagName("href")[0].childNodes[0].nodeValue;

            try {

                iconName += "," + RootNode.getElementsByTagName("Style")[i].getElementsByTagName("IconStyle")[0].getElementsByTagName("Icon")[0].getElementsByTagName("width")[0].childNodes[0].nodeValue;

                iconName += "," + RootNode.getElementsByTagName("Style")[i].getElementsByTagName("IconStyle")[0].getElementsByTagName("Icon")[0].getElementsByTagName("height")[0].childNodes[0].nodeValue;

            }

            catch (err) {

                iconName += ",20,20";

            }

        }









    }

    catch (err) {

        iconName = ""

    }

    return iconName



}



function GetInfoWindowContent(inputNode) {



	var infoTitle="KML Info";

    var nValue = "";

    var nameValue = "";

	var infoArray=new Array();



    try {



        nValue = inputNode.getElementsByTagName("name")[0].childNodes[0].nodeValue;

        if (nValue != null && nValue != "" && nValue != undefined) {

            infoTitle= nValue;

        }

        else {

            nValue = inputNode.getElementsByTagName("name")[0].childNodes[0].text;

            if (nValue != null && nValue != "" && nValue != undefined) {

                infoTitle= nValue;

            }



        }

    }

    catch (err) {



    }



    try {



        nValue = inputNode.getElementsByTagName("description")[0].textContent;



        if (nValue != null && nValue != "" && nValue != undefined) {

            nameValue += nValue + "</BR>";



        }

        else {

            nValue = inputNode.getElementsByTagName("description")[0].textContent;



            if (nValue != null && nValue != "" && nValue != undefined) {

                nameValue += nValue + "</BR>";

            }



        }



    }

    catch (err) {



    }

	infoArray[0]=infoTitle;

	infoArray[1]=nameValue;

    return infoArray;



}





function splitDataandAddLines(lineCord, nameValue) {





    if (lineCord.length != 0) {



        addPolylineToMap(lineCord.split(' '), nameValue)

    }



}





function splitDataandAddPoint(xyCord, lineCord, nameValue) {







    if (xyCord.length != 0) {

        inputXY = xyCord;

        var strLen = inputXY.length;

        inputXY = inputXY.slice(0, strLen - 1);

        var coords = new Array();

        coords = inputXY.split("~")

        for (var i = 0; i < coords.length; i++) {

            var coords1 = coords[i]

            var crds = new Array();

            crds = coords1.split("|")

            var crd = crds[0]

            var crd1 = crds[1]

            var nV = crd1.slice(0, crd1.length - 1)

            var fnV = new Array();

            fnV = nV.split("^@")

            var fnVfinal = fnV[i]

            var xCord = crd.split(",")[0]

            var yCord = crd.split(",")[1]

            addPointToMap(xCord, yCord, fnVfinal)

        }

    }



    if (lineCord.length != 0) {



        addPolygonToMap(lineCord.split(' '), nameValue)

    }



}





function addPointToMap(XY, infoWindowContent, iconURL) {





    var lon, lat;

    lon = XY.split(",")[0]

    lat = XY.split(",")[1]

    var pointSymbol;

    if (iconURL == "") {

        pointSymbol = new _SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([255, 0, 0]));

    }

    else {

        try {

            pointSymbol = new _PictureMarkerSymbol(iconURL.split(",")[0], iconURL.split(",")[1], iconURL.split(",")[2]);

        }

        catch (err) {

            pointSymbol = new _PictureMarkerSymbol(iconURL, 20, 20);

        }



    }



    gsvc = new _GeometryService(host + "ArcGIS/rest/services/Utilities/Geometry/GeometryServer");

    var geomPoint = new _Point(lon, lat, new _SpatialReference({ wkid: 4326 }));



    var graphic = new _Graphic(geomPoint, pointSymbol);

    var npr = new _SpatialReference({ wkid: 3414 });





    var infoTemplate1 = new _InfoTemplate();

    infoTemplate1.setTitle(infoWindowContent[0]);

    infoTemplate1.setContent("<div style='overflow-x:scroll;height:112px; width:200px'>" + infoWindowContent[1] + "</div>");



    if (lon.split(".")[0] > 999) {



        var graphic1 = new _Graphic(geomPoint, pointSymbol);



        graphic1.setInfoTemplate(infoTemplate1);

        OneMapKML.graphics.add(graphic1);

    }

    else {

        gsvc.project([geomPoint], npr, function (featres) {

            var geomPoint1 = featres[0].geometry;

            var XYLocation = new _Point(featres[0].x, featres[0].y, new _SpatialReference({ wkid: 3414 }));



            var graphic1 = new _Graphic(XYLocation, pointSymbol);

            graphic1.setInfoTemplate(infoTemplate1);

            OneMapKML.graphics.add(graphic1);

        });

    }





}



var tempPoint;



function addPolygonToMap(polyPath, nameValue) {





    var color = "255,0,0";

    var lineThickness = "1.2";

    var outlineColor = "0,0,255";



    gsvc = new _GeometryService(host + "ArcGIS/rest/services/Utilities/Geometry/GeometryServer");

	

    var npr = new _SpatialReference({ wkid: 3414 });

    var poly;



    var coordType = 0

    var lngraphic = new _Graphic();



    var point1;

    var pointSymbol = new _SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([255, 0, 0]));



    var symbol = new _SimpleFillSymbol(_SimpleFillSymbol.STYLE_SOLID, new _SimpleLineSymbol(_SimpleLineSymbol.STYLE_SOLID, new dojo.Color(outlineColor.split(",")), lineThickness), new dojo.Color((color + ",0.5").split(",")));

    var pntArr = new Array;



    var factor = 1;

    //Added for other KML

    if (polyPath[0].split(",")[0] > 200) {

        coordType = 1

    }

    if (polyPath.length > 30) { factor = 2 }

    for (var l = 0; l < polyPath.length; l = l + factor) {



        point1 = new _Point(polyPath[l].split(",")[0].replace('~', ''), polyPath[l].split(",")[1].replace('~', ''), new _SpatialReference({ wkid: 4326 }))

        pntArr.push(point1)



    }



    var polygon = new _Polygon(new _SpatialReference({ wkid: 4326 }));

    polygon.addRing(pntArr);

    lngraphic.geometry = polygon;

    var infoTemplate1 = new _InfoTemplate();

    infoTemplate1.setTitle("KML Info");

	

	if (nameValue == "" || nameValue == undefined)

	nameValue = "N/A";



    infoTemplate1.setContent("<div style='overflow-x:scroll;height:112px; width:242px'>" + nameValue + "</div>");



    //coordType = 0

    if (coordType == 1) {

        lngraphic.setSymbol(symbol)



        lngraphic.setInfoTemplate(infoTemplate1);

        OneMapKML.graphics.add(lngraphic);

    }

    else {



        gsvc.project([polygon], npr, function (features) {

             for (var i = 0; i < features.length; i++) {

                var geomPoint1 = features[i];

                var graphic1 = new _Graphic(geomPoint1, symbol);

                graphic1.setInfoTemplate(infoTemplate1);

                OneMapKML.graphics.add(graphic1);

            }           

        });

    }



}





function addPolylineToMap(polyPath, nameValue) {

    //debugger;





    var color = "255,0,0";

    var lineThickness = "1.2";

    var outlineColor = "0,0,255";



    gsvc = new _GeometryService(host + "ArcGIS/rest/services/Utilities/Geometry/GeometryServer");

    var npr = new _SpatialReference({ wkid: 3414 });

    var poly;



    var coordType = 0

    var lngraphic = new _Graphic();



    var point1;

    //var pointSymbol = new _SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([255, 0, 0]));



    var symbol = new _SimpleLineSymbol(_SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 3); //new _SimpleLineSymbol(_SimpleLineSymbol.STYLE_SOLID, new dojo.Color(color.split(",")), 1.1);



    var pntArr = new Array;



    var factor = 1;

    if (polyPath[0].split(",")[0] > 200) {

        coordType = 1

    }

    if (polyPath.length > 30) { factor = 2 }

    for (var l = 0; l < polyPath.length; l = l + factor) {

        point1 = new _Point(polyPath[l].split(",")[0].replace('~', ''), polyPath[l].split(",")[1].replace('~', ''), new _SpatialReference({ wkid: 4326 }))



        pntArr.push(point1)



    }



    var polygon = new _Polyline(new _SpatialReference({ wkid: 4326 }));

    polygon.addPath(pntArr);

    lngraphic.geometry = polygon;

    var infoTemplate1 = new _InfoTemplate();

    infoTemplate1.setTitle("KML Info");



    infoTemplate1.setContent("<div style='overflow-x:scroll;height:112px; width:242px'>" + nameValue + "</div>");



    //coordType = 0

    if (coordType == 1) {

        lngraphic.setSymbol(symbol)



        lngraphic.setInfoTemplate(infoTemplate1);

        OneMapKML.graphics.add(lngraphic);

    }

    else {



        gsvc.project([lngraphic], npr, function (features) {

            var geomPoint1 = features[0].geometry;

            var graphic1 = new _Graphic(geomPoint1, symbol);

            graphic1.setInfoTemplate(infoTemplate1);

            OneMapKML.graphics.add(graphic1);

        });

    }



}







function clearGraphics() {

    var OneMap = this.map;

    try {

        OneMap.graphics.clear();

    }

    catch (Error) {

    }



}





//-------------- mashupTheme-------------------------------------------------

var _OneMapCurrExtents = "";



function mashupDataOnExtentChnage(extent) {

    _OneMapCurrExtents = extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax;



    var mashupOneMap = this

    for (var i = 0; i < mashupOneMap.graphicsLayerIds.length; i++) {

        var mashupObject = new MashupData();

        var themeName = mashupOneMap.graphicsLayerIds[i]

        mashupObject.token = _OneMapGlobalToken

        mashupObject.themeName = themeName;

        mashupObject.extent = _OneMapCurrExtents;

        var _OneMapThemeGraphicsLayer = mashupOneMap._layers[themeName];

        mashupObject.graphicLayer = _OneMapThemeGraphicsLayer;

        mashupObject.GetMashupData(function (mashupResults) {

            var results = mashupResults.results;

            if (results == "No results") {

                return

            }



            var featcount = mashupResults.count;

            var themeName = mashupResults.theme

            var calloutFields = mashupResults.calloutFields;

            var calloutURL = mashupResults.calloutURL;

            var calloutUniqueFld = mashupResults.calloutUniqueFld;

            var iconPath = mashupResults.iconPath

            var featType = mashupResults.featType;

            var color = mashupResults.color

            var outlineColor = mashupResults.outlineColor

            var lineThickness = mashupResults.lineThickness

            var themeGraphicsLayer_1 = mashupResults.graphicLayer



            themeGraphicsLayer_1.clear();



            if (results.length == 0) { return }



            for (var i = 0; i < results.length; i++) {

                if (calloutURL != "") {

                    calloutURL = calloutURL.replace("intranet.onemap.gov.sg", "www.onemap.sg")



                    var multipleDataURL = calloutURL + results[i][calloutUniqueFld.toUpperCase()]

                    var nameVal = "";

                    nameVal = "<iFrame src='" + multipleDataURL + "'></iFrame>"

                    infoTemplate1.setContent(nameVal);

                }

                else {

                    var infoTemplate1 = new _InfoTemplate();

                    infoTemplate1.setTitle(themeName);

                    var nameVal = "";

                    nameVal += "<strong>" + results[i]["NAME"] + "</strong>" + "<br/>"

                    nameVal += results[i]["DESCRIPTION"] + "<br/>"

                    nameVal += "<a href=" + results[i]["HYPERLINK"] + " target='_blank'>More Info</a>"

                    nameVal += "<img src=" + results[i]["PHOTOURL"] + "></img>" + "<br/>"

                    nameVal += results[i]["ADDRESSBLOCKHOUSENUMBER"] + " " + results[i]["ADDRESSSTREETNAME"] + " " + results[i]["ADDRESSBUILDINGNAME"] + " " + results[i]["ADDRESSFLOORNUMBER"] + " " + results[i]["ADDRESSUNITNUMBER"] + "<br/>"

                    nameVal += "Singapore " + results[i]["ADDRESSPOSTALCODE"] + "<br/>"

                    infoTemplate1.setContent(nameVal);

                }

                var graphic;

                if (featType.toUpperCase() == "LINE") {

                    graphic = generateLineGraphic(results[i].XY, color, lineThickness)

                }

                else if (featType.toUpperCase() == "POLYGON") {

                    graphic = generatePolygonGraphic(results[i].XY, color, outlineColor, lineThickness)

                }

                else if (featType.toUpperCase() == "POINT") {

                    graphic = generatePointGraphic(results[i].XY, results[i].ICON_NAME, iconPath)

                }



                graphic.setInfoTemplate(infoTemplate1);

                themeGraphicsLayer_1.add(graphic);

            }

        }

        );



    }

}



function mashupTheme(themeName, token) {

    if (themeName == "") { return }



    var mashupOneMap = this;

    var mashupObject = new MashupData();



    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }

    mashupObject.token = token;



    mashupObject.themeName = themeName;

    mashupObject.extent = mashupOneMap.map.extent.xmin + "," + mashupOneMap.map.extent.ymin + "," + mashupOneMap.map.extent.xmax + "," + mashupOneMap.map.extent.ymax;



    var _OneMapThemeGraphicsLayer = new _GraphicsLayer();



    _OneMapThemeGraphicsLayer.id = themeName



    mashupOneMap.map.addLayer(_OneMapThemeGraphicsLayer);



    mashupObject.graphicLayer = _OneMapThemeGraphicsLayer;

    mashupObject.GetMashupData(overlayData_1)



    mashupOneMap.onOneMapExtentChange(mashupDataOnExtentChnage)

    return _OneMapThemeGraphicsLayer

}





function overlayData_1(mashupResults) {



    var results = mashupResults.results;



    if (results == "No results") {

        return

    }



    var featcount = mashupResults.count;

    var themeName = mashupResults.theme

    var calloutFields = mashupResults.calloutFields;

    var calloutURL = mashupResults.calloutURL;

    var calloutUniqueFld = mashupResults.calloutUniqueFld;

    var iconPath = mashupResults.iconPath

    var featType = mashupResults.featType;

    var color = mashupResults.color

    var outlineColor = mashupResults.outlineColor

    var lineThickness = mashupResults.lineThickness

    var themeGraphicsLayer_1 = mashupResults.graphicLayer



    themeGraphicsLayer_1.clear();



    if (results.length == 0) {

        return

    }





    for (var i = 0; i < results.length; i++) {

        if (calloutURL != "") {

            calloutURL = calloutURL.replace("intranet.onemap.gov.sg", "www.onemap.sg")



            var multipleDataURL = calloutURL + results[i][calloutUniqueFld.toUpperCase()]

            var nameVal = "";

            nameVal = "<iFrame src='" + multipleDataURL + "'></iFrame>"

            infoTemplate1.setContent(nameVal);

        }

        else {

            var infoTemplate1 = new _InfoTemplate();

            infoTemplate1.setTitle(themeName);

            var nameVal = "";

            nameVal += "<strong>" + results[i]["NAME"] + "</strong>" + "<br/>"

            nameVal += results[i]["DESCRIPTION"] + "<br/>"

            nameVal += "<a href=" + results[i]["HYPERLINK"] + " target='_blank'>More Info</a>"

            nameVal += "<img src=" + results[i]["PHOTOURL"] + "></img>" + "<br/>"

            nameVal += results[i]["ADDRESSBLOCKHOUSENUMBER"] + " " + results[i]["ADDRESSSTREETNAME"] + " " + results[i]["ADDRESSBUILDINGNAME"] + " " + results[i]["ADDRESSFLOORNUMBER"] + " " + results[i]["ADDRESSUNITNUMBER"] + "<br/>"

            nameVal += "Singapore " + results[i]["ADDRESSPOSTALCODE"] + "<br/>"

            infoTemplate1.setContent(nameVal);

        }

        var graphic;

        if (featType.toUpperCase() == "LINE") {

            graphic = generateLineGraphic(results[i].XY, color, lineThickness)

        }

        else if (featType.toUpperCase() == "POLYGON") {

            graphic = generatePolygonGraphic(results[i].XY, color, outlineColor, lineThickness)

        }

        else if (featType.toUpperCase() == "POINT") {

            graphic = generatePointGraphic(results[i].XY, results[i].ICON_NAME, iconPath)

        }



        graphic.setInfoTemplate(infoTemplate1);

        themeGraphicsLayer_1.add(graphic);

    }

}





function generatePointGraphic(XY, iconNam, iconPath) {

    var coords = new Array();

    coords = XY.split(",")

    var xCord = coords[0]

    var yCord = coords[1]

    //var iconNam = singleRecord.ICON_NAME

    var iconURL = iconPath + iconNam//singleRecord.ICON_NAME

    if (iconURL != "") {

        iconURL = iconURL.replace("www.onemap.sg", "www.onemap.sg")

        var thmSymbol = new _PictureMarkerSymbol(iconURL, 20, 20)

    }

    var PointLocation = new _Point(xCord, yCord, new _SpatialReference({ wkid: 3414 }))

    var PointGraphic = new _Graphic(PointLocation, thmSymbol);

    return PointGraphic

}





function generateLineGraphic(linePath, color, lineThickness) {



    var splitLine = linePath.toString().split("|");

    var point1;

    var lineSymbol = new _SimpleLineSymbol(_SimpleLineSymbol.STYLE_SOLID, new dojo.Color(color.split(",")), lineThickness);



    var points = new Array(splitLine.length);

    var LineArr = new Array;

    for (var l = 0; l < splitLine.length; l++) {

        point1 = new _Point(splitLine[l].split(",")[0], splitLine[l].split(",")[1], new _SpatialReference({ wkid: 3414 }))

        LineArr.push(point1)

    }

    var polyline = new _Polyline(new _SpatialReference({ wkid: 3414 }))

    polyline.addPath(LineArr)



    var lngraphic = new _Graphic(polyline, lineSymbol);

    return lngraphic//ln

}





function generatePolygonGraphic(polyPath, color, outlineColor, lineThickness) {



    var pntArr = new Array;

    var poly;

    var polysymbol = new _SimpleFillSymbol(_SimpleFillSymbol.STYLE_SOLID, new _SimpleLineSymbol(_SimpleLineSymbol.STYLE_SOLID, new dojo.Color(outlineColor.split(",")), lineThickness), new dojo.Color((color + ",0.5").split(",")));



    xyArr = polyPath.toString().split("|");

    for (j = 0; j < xyArr.length; j++) {

        poly = new _Point(xyArr[j].split(",")[0], xyArr[j].split(",")[1], new _SpatialReference({ wkid: 3414 }))

        pntArr.push(poly)

    }

    var polygon = new _Polygon(new _SpatialReference({ wkid: 3414 }));

    polygon.addRing(pntArr);

    var polygraphic1 = new _Graphic(polygon, polysymbol);

    return polygraphic1

}









function OneMapLayerInfo(layerName) {



    this.themeName = layerName;

    this.GetLayerInfo = GetLayerInfo;

}



function GetLayerInfo(callback) {



    layerName = this.themeName

    var url = host + "API/services.svc/layerinfo?token=" + token + "layername=" + layerName;



    xmlhttp = GetXmlHttpObject();

    if (xmlhttp == null) {

        return;

    }



    restURL = url;



    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;

        var firstRecord = parsedJSON.LayerInfo[0]

        outPutResults.Category = firstRecord.CATEGORY

        outPutResults.FeatureType = firstRecord.FEATTYPE;

        outPutResults.MinLevel = firstRecord.MINLEVEL

        outPutResults.MaxLevel = firstRecord.MAXLEVEL

        outPutResults.IconPath = firstRecord.IconPath

        outPutResults.AgencyName = firstRecord.AGENCY

        outPutResults.FieldNames = firstRecord.FIELD_NAM_T

        outPutResults.Icon = firstRecord.ICON_NAM_T

        outPutResults.MapTipFieldName = firstRecord.FIELD_NAM_T.split(",")[0];

        outPutResults.calloutURL = firstRecord.CALLOUTURL;

        outPutResults.calloutUniqueFld = firstRecord.CALLOUTFIELDNAME;

        outPutResults.visibleFields = firstRecord.SHOWNATTRIBS;

        outPutResults.pointColour = firstRecord.COLOR_T;



        if (outPutResults.results.length == 0) { outPutResults.results = "No results"; }

        callback(outPutResults);

    });





}





//-------------- mashupTheme end -------------------------------------------------



function nullCheck(input) {

    if (input == undefined)

        return '-'

    if (input == "")

        return '-'

    return input

}







function CoordConvertor() {

    this.ConvertCoordinate = ConvertCoordinate

}



function ConvertCoordinate(inputXYList, inputSR, outputSR, callback) {

    require(["esri/SpatialReference", "esri/geometry/Point", "esri/graphic", "esri/symbols/SimpleMarkerSymbol",

    "esri/tasks/GeometryService","esri/geometry/Polyline","esri/symbols/SimpleLineSymbol", "dojo/domReady!"],

        function (_SpatialReference, _Point, _Graphic, _SimpleMarkerSymbol, _GeometryService,_Polyline,_SimpleLineSymbol, Ready) {

            var host2 = "http://tasks.arcgisonline.com/";

            var gsvc = new _GeometryService(host + "arcgis/rest/services/Utilities/Geometry/GeometryServer");

            var graphic

            var nsr = new _SpatialReference({ wkid: outputSR });



			

            if (inputXYList.split(",").length == 2) {

                var pointSymbol = new _SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([255, 0, 0]));

                var geomPoint = new _Point(inputXYList.split(",")[0], inputXYList.split(",")[1], new _SpatialReference({ wkid: inputSR }));

                graphic = new _Graphic(geomPoint, pointSymbol);



                gsvc.project([geomPoint], nsr, function (outXY) {



                    var xy = outXY[0].x + "," + outXY[0].y;

                    callback(outXY[0].x + "," + outXY[0].y)

                    //callback(outXY[0].geometry.x + "," + outXY[0].geometry.y)

                    //added for lat - long

                    //callback(outXY[0].geometry.y + "," + outXY[0].geometry.x)

                })

            }

            else {

                graphic = getLineGraphic(inputXYList, new _SpatialReference({ wkid: inputSR }),_Point,_Polyline,_Graphic,_SimpleLineSymbol)

                gsvc.project([graphic], nsr, function (outXY) {



                    var geometry = outXY[0].paths[0];

                    var outputGeoms = "";



                    for (var l = 0; l < geometry.length; l++) {

                        outputGeoms = outputGeoms + "," + geometry[l][0] + "," + geometry[l][1]

                    }

                    if (outputGeoms != "") { outputGeoms = outputGeoms.substring(1) }

                    callback(outputGeoms)

                })

            }

        }); //End requires

}





function getLineGraphic(linePath, inputSR,_Point,_Polyline,_Graphic,_SimpleLineSymbol) {

    //var linePath = singleRecord.XY;

    var splitLine = linePath.toString().split(",");

    var point1;



    var points = new Array(splitLine.length);

    var LineArr = new Array;

    for (var l = 0; l < splitLine.length; l = l + 2) {

        point1 = new _Point(splitLine[l], splitLine[l + 1], inputSR)

        LineArr.push(point1)

    }

    var polyline = new _Polyline(inputSR)

    polyline.addPath(LineArr)

    return polyline

};





//Get Url Response for REST Samples only



function GetURLResponse(url, callback) {





    $.getJSON(url + "&callback=?", function (parsedJSON) {



        var outPutResults = "";

        outPutResults = parsedJSON.toString();



        results(outPutResults);



    })

}



function RegisterAPI() {



    this.token = "";

    this.name = "";

    this.email = "";

    this.phone = "";

    this.url = "";

    this.authkey = "";

    this.commUse = "";

    this.GetRegisterAPIResults = GetRegisterAPIResults;

}





function GetRegisterAPIResults(callback) {



    var obj = this;



    var token = obj.token;

    try { if (_OneMapGlobalToken != '') { token = _OneMapGlobalToken; } } catch (err) { }

    var token = obj.token;

    var nam = obj.name;

    var email = obj.email;

    var phone = obj.phone;

    var url = obj.url;

    var authKey = obj.authkey;

    var commercialUse = obj.commUse;





    url = host + "RegisterAPI/services.svc/registerApi?url=" + url + "&usrname=" + nam + "&email=" + email + "&phone=" + phone + "&commercialuse=" + commercialUse + "&authkey=" + authKey;



    $.getJSON(url + "&callback=?", function (parsedJSON) {

        var outPutResults = new Object;

        outPutResults.results = parsedJSON.Results[0].Message;

        callback(outPutResults);

    });

}



/// Don't write anything below this



var _OneMapGlobalToken = '';

document.write('<link rel="stylesheet" type="text/css" href="http://t1.onemap.sg/arcgis_js_api/library/3.10/arcgis/js/dojo/dijit/themes/tundra/tundra.css"/>');document.write('<link rel="stylesheet" type="text/css" href="http://t1.onemap.sg/arcgis_js_api/library/3.10/arcgis/js/esri/css/esri.css"/>');document.write('<script type="text/javascript" src="http://t1.onemap.sg/arcgis_js_api/library/3.10/arcgis/init.js"></script>');var _OneMapGlobalToken='h75zG1KUqysd0pS3qAZIS8zC6Ty3GTlOXaOuYSC86nJ8o72u8iHgk8QLOGonJeuTC2iJq0YIN/8WKBySzsY0f50zlidQ8otcH2dF+Pmpc71+H1KJZXRaLA==';var projSys='';

