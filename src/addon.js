/**
 * The ace editor addon functions.
 */
var aceAddon = {
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
  }
};
