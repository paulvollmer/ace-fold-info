/**
 * The editor addon functions.
 */
var editorAddon = {
  /**
   * Set the height of the editor addon.
   */
  setHeight: function(height) {
    document.getElementById('editor_addon').style.height = height+'px';
  },

  /**
   * Add a gutter cell div with a specific id.
   */
  gutterCell: function(id) {
    var tmpGutterCell = document.createElement('div');
    tmpGutterCell.className = 'editor_addon_cell';
    tmpGutterCell.id = id;
    tmpGutterCell.innerText = '';
    tmpGutterCell.style.height = editor.renderer.lineHeight+'px';
    tmpGutterCell.style.fontSize = '12.2px';
    document.getElementById('editor_addon').appendChild(tmpGutterCell);
  },

  /**
   * Set the text content of the gutter cell.
   */
  setGutterCellText: function(id, content) {
    var tmp = document.getElementById('cell_'+id);
    tmp.innerText = content;
    
    // TODO: Draw the graph here...
    //tmp.innerHTML = content+'<hr class="cell_'+id+'_bar" style="border-top: 2px solid black; margin-top:0px; width:50%" />';
    //console.log(tmp, content);
  },

  /**
   * Delete text content from each gutter cell.
   */
  resetGutterCellText: function() {
    for (var i=0; i<editor.getSession().getDocument().getLength(); i++) {
      this.setGutterCellText(i, '');
    };
  },

  /**
   * Add all gutters.
   */
  gutters: function() {
    var totalGutter = editor.getSession().getDocument().getLength();
    //console.log('totalGutter', totalGutter);

    for (var i = 0; i < totalGutter; i++) {
      this.gutterCell('cell_'+i);
    };
  },

  /**
   * Fold graph visualisation
   */
  foldGraph: function() {
    //console.log('foldGraph');
    this.resetGutterCellText();

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

      this.setGutterCellText(tmpStart, 'sloc: '+(totalLines-1));
    };
  }

};


/**
 * Some ace editor helper functions we need.
 */
var editorHelper = {
  /**
   * Set the height of the editor.
   * Note: ace get slow if too many lines.
   */
  setHeight: function(height) {
    document.getElementById('editor').style.height = height+'px';
  }
};


/**
 * ace editor settings...
 */
var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow");
editor.getSession().setMode("ace/mode/javascript", function() {
  // Fold the content
  editor.session.foldAll();

  editorAddon.foldGraph();
});


/**
 * Update function
 */
function update() {
  if (editor.getSession().getDocument().getLength() < 20) {
    var tmpHeight = editor.renderer.lineHeight*20;
    //editorSetHeight(tmpHeight);
    editorHelper.setHeight(tmpHeight);

    editorAddon.setHeight(tmpHeight);
    editorAddon.gutters();
    editorAddon.foldGraph();
  } else {
    var tmpHeight = editor.getSession().getDocument().getLength() * editor.renderer.lineHeight;
    //editorSetHeight(tmpHeight);
    editorHelper.setHeight(tmpHeight);

    editorAddon.setHeight(tmpHeight);
    editorAddon.gutters();
    editorAddon.foldGraph();
  }
}

update();


/**
 * input functions on change event...
 */
editor.getSession().on('change',function(){
  update();
});

editor.getSession().on('changeFold',function(){
  //console.log('-> changeFold');
  editorAddon.foldGraph();
});
