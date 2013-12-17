/**
 * The fold information functions.
 */
var foldInfo = {

  /**
   * Add infos about the folded text
   * 
   * @param {Object} foldData ace object
   * @param {Object} addon    AceAddon object
   */
  add: function(foldData, addon) {
    // Calculate the lines we will fold.
    var range = foldData.data.end.row-foldData.data.start.row;

    var width = this.calcBarWidth(editor.getSession().doc.$lines.length, range, 50);
    //console.log(width);

    // add the range to the addon cell
    addon.setGutterCell(foldData.data.end.row, '<div class="sloc_cell" style="background-color:rgba(0, 71, 255, 0.31); width:'+width+'px; height:16px; position:absolute"></div>sloc: '+(range-1));
  },

  /**
   * Remove infos about the folded text
   * 
   * @param {Object} foldData ace object
   * @param {Object} addon    AceAddon object
   */
  remove: function(foldData, addon) {
    addon.setGutterCell(foldData.data.end.row, '');
  },

  calcBarWidth: function(totalLoc, foldedLoc, width) {
    // console.log('totalLoc', totalLoc);
    // console.log('foldedLoc', foldedLoc);
    var tmp = width / totalLoc;
    var result = tmp * (foldedLoc+2);
    return result;
  }
};
