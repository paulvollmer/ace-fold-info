var foldInfo = {
  /**
   * Fold graph visualisation
   */
  graph: function() {
    //console.log('foldGraph');
    aceAddon.resetGutterCellText();

    var div = document.getElementsByClassName('ace_gutter-cell');
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

      aceAddon.setGutterCellText(tmpStart, 'sloc: '+(totalLines-1));
    };
  }
}
