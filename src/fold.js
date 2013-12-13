/**
 * The fold information functions.
 */
var foldInfo = {
  /**
   * Fold graph visualisation
   */
  graph: function() {
    //console.log('foldGraph');
    aceAddon.resetCellText();

    var div = document.getElementsByClassName(ACE_ADDON_CONSTANTS.CELL);
    var foldData = editor.getSession().$foldData;
    //console.log(foldData);
    
    var tmpStart = 0;
    var tmpEnd = 0;
    var hiddenLinesCount = 0; // The total lines we're hide.

    for (var i = 0; i < foldData.length; i++) {
      // Berechne wo die gefaltene zeile beginnt
      tmpStart = foldData[i].range.start.row - hiddenLinesCount;

      // Die menge der zeilen welche gefalten werden
      var totalLines = foldData[i].range.end.row - foldData[i].range.start.row;
      // update den hidden counter
      hiddenLinesCount += totalLines;

      // Das ende des gefaltenen inhalts berechnen
      tmpEnd = tmpStart+totalLines;

      //console.log(i, 'tmpStart:', tmpStart, 'tmpEnd:', tmpEnd, 'hiddenLinesCount', hiddenLinesCount);

      // TODO: mark the line numbers
      //div[tmpStart].style.color = '#007fff';
      //div[tmpStart].textContent = (totalLines-1);

      aceAddon.gutter.setCellText(tmpStart, 'sloc: '+(totalLines-1));
    };
  }
}
