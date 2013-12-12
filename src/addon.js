/**
 * The ace editor addon functions.
 */
var aceAddon = {
  /**
   * Some constant variables we use over and over.
   */
  CONSTANTS: {
    MAIN: 'editor_addon',
    CELL: 'editor_addon_cell',
    CELL_ID: 'cell_'
  },

  /**
   * Set the height of the editor addon.
   */
  setHeight: function(height) {
    document.getElementById(this.CONSTANTS.MAIN).style.height = height+'px';
  },

  /**
   * Add a gutter cell div with a specific id.
   */
  gutterCell: function(id) {
    var tmpGutterCell = document.createElement('div');
    tmpGutterCell.className = this.CONSTANTS.CELL;
    tmpGutterCell.id = id;
    tmpGutterCell.innerText = '';
    tmpGutterCell.style.height = editor.renderer.lineHeight+'px';
    tmpGutterCell.style.fontSize = '12.2px';
    document.getElementById(this.CONSTANTS.MAIN).appendChild(tmpGutterCell);
  },

  /**
   * Set the text content of the gutter cell.
   */
  setGutterCellText: function(id, content) {
    var tmp = document.getElementById(this.CONSTANTS.CELL_ID+id);
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
      this.gutterCell(this.CONSTANTS.CELL_ID+i);
    };
  }
};
