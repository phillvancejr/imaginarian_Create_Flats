/** Copyright Phill Vance 'The Imaginarian' 2017 **
*** imaginarian_Create_Flats **/

#target photoshop

var doc = app.activeDocument;
var selection = doc.selection;

//IF THERE IS A FLATS GROUP
if(doc.activeLayer.name == 'FLATS' && doc.activeLayer.typename == 'LayerSet') {
  //STORE FLATS GROUP
  var flatGroup = doc.activeLayer

  //FOR EACH LAYER IN FLATS GROUP
  for(var i = 0; i < flatGroup.artLayers.length; i ++) {
    //STORE CURRENT LAYER AS OLDLAYER
    var oldLayer = flatGroup.artLayers[i]
    //ADD NEW LAYER TO GROUP
    var newLayer = flatGroup.artLayers.add()
    //NAME NEWLAYER SAME AS OLDLAYER
    newLayer.name = oldLayer.name
    //MOVE NEWLAYER ABOVE OLDLAYER
    newLayer.move(oldLayer, ElementPlacement.PLACEBEFORE)
    //SELECT OLDLAYER
    doc.activeLayer = oldLayer
    //MAGIC WAND SELECT
    magicSelect()
    //SELECT NEW LAYER
    doc.activeLayer = newLayer
    //FILL WITH RANDOM COLOR
    fillFlat()
    //REMOVE OLD LAYER
    oldLayer.remove()
  }

doc.activeLayer = flatGroup
//IF THERE IS NO FLATS GROUP
} else {alert("No \"FLATS\" group could be found, you should place your layers in a group named \"FLATS\" and select it before running the script")}


//FUNCTIONS

function newGray(perc) {
    var gray = 100 - perc;
    var rgbDivisor = 100/gray;
    var rgbVal = Math.round(255/rgbDivisor);

    var newColor = new SolidColor();
    newColor.rgb.red = rgbVal;
    newColor.rgb.green = rgbVal;
    newColor.rgb.blue = rgbVal;
    return newColor;
    }

function randomColor() {
    function randNum() {return Math.round(Math.random() * 255);}
    var r = randNum();
    var g = randNum();
    var b = randNum();

    var newColor = new SolidColor();
    newColor.rgb.red = r;
    newColor.rgb.green = g;
    newColor.rgb.blue = b;
    return newColor;
    }

function magicSelect() {
  selection.select([[0, 0], [1, 0], [1, 1], [0, 1]], SelectionType.REPLACE);
  selection.grow(0, true);
  selection.invert();
}

function fillFlat(color, gray) {
  if(selection != null) {
    if (color == "gray") {
        selection.fill(newGray(gray));
        selection.deselect();
        return;
        }

    var fillColor = randomColor();
    selection.fill(fillColor);
    selection.deselect();

  } else {alert('There is no selection active')}
}
