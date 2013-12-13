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
    // add the range to the addon cell
    addon.setGutterCell(foldData.data.end.row, 'sloc: '+(range-1));
  },

  /**
   * Remove infos about the folded text
   * 
   * @param {Object} foldData ace object
   * @param {Object} addon    AceAddon object
   */
  remove: function(foldData, addon) {
    addon.setGutterCell(foldData.data.end.row, '');
  }

};
