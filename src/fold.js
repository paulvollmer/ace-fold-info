/**
 * The fold information functions.
 */
var foldInfo = {

  add: function(foldData, addon) {
    // Calculate the lines we will fold.
    var range = foldData.data.end.row-foldData.data.start.row;
    // add the range to the addon cell
    addon.setGutterCell(foldData.data.end.row, 'sloc: '+(range-1));
  },

  remove: function(foldData, addon) {
    addon.setGutterCell(foldData.data.end.row, '');
  }
  
};
