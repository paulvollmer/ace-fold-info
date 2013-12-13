/**
 * Some constant variables we use over and over.
 *
 * @type {Object}
 */
var ACE_ADDON_CONSTANTS = {
  MAIN: 'editor_addon',
  CELL: 'editor_addon_cell',
  CELL_ID: 'cell_',
  CELL_FONT_SIZE: '12.2px'
};

/**
 * The ace editor addon.
 * This object contains functions to create and manipulate the editor addon.
 * You need to add a "div" with an id "editor_addon" to append to
 * the DOM correctly.
 *
 * @type {Object}
 */
var aceAddon = {

  /**
   * Set the height of the editor addon.
   * 
   * @param {Number} height The height of the addon in pixels.
   */
  setHeight: function(height) {
    document.getElementById(ACE_ADDON_CONSTANTS.MAIN).style.height = height+'px';
  },

  /**
   * Functions for a single gutter.
   * 
   * @type {Object}
   */
  gutter: {
    /**
     * Add a gutter cell div with a specific id.
     * 
     * @param {String} id   The id of the gutter cell.
     * @param {String} html The html inner content of the gutter cell.
     */
    addCell: function(id, html) {
      var tmpGutterCell = document.createElement('div');
      tmpGutterCell.className = ACE_ADDON_CONSTANTS.CELL;
      tmpGutterCell.id = id;
      tmpGutterCell.innerHTML = html;
      tmpGutterCell.style.height = editor.renderer.lineHeight+'px';
      tmpGutterCell.style.fontSize = ACE_ADDON_CONSTANTS.CELL_FONT_SIZE;
      document.getElementById(ACE_ADDON_CONSTANTS.MAIN).appendChild(tmpGutterCell);
    },
    
    /**
     * Set the text content of the gutter cell.
     * 
     * @param {String} id   The id of the gutter cell.
     * @param {String} html The html inner content of the gutter cell.
     */
    setCellText: function(id, html) {
      var tmp = document.getElementById(ACE_ADDON_CONSTANTS.CELL_ID+id);
      tmp.innerHTML = html;
      
      // TODO: Draw the graph here...
      //tmp.innerHTML = content+'<hr class="cell_'+id+'_bar" style="border-top: 2px solid black; margin-top:0px; width:50%" />';
      //console.log(tmp, content);
    }
  },


  /**
   * Add 'n' gutters to the addon.
   * 
   * @param {Number} totalGutters The number of gutters we want to add.
   */
  addGutters: function(totalGutters) {
    for (var i=0; i<totalGutters; i++) {
      this.gutter.addCell(ACE_ADDON_CONSTANTS.CELL_ID+i, '');
    };
  },

  /**
   * Delete text content from each gutter cell.
   */
  resetCellText: function(totalGutters) {
    for (var i=0; i<editor.getSession().getDocument().getLength(); i++) {
      this.gutter.setCellText(i, '');
    };
  }

};
