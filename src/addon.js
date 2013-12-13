/**
 * The ace editor addon.
 * This object contains functions to create and manipulate the editor addon.
 * You need to add a "div" with an id "editor_addon" to append to the DOM
 * correctly.
 */
function AceAddon() {
  /**
   * Some constant variables we use over and over.
   * 
   * @namespace ACE_ADDON_CONSTANTS
   */
  this.CONSTANTS = {
    /**
     * The addon main id name.
     * @inner
     */
    MAIN_ID: 'editor_addon',
    
    /**
     * The addon cell class name.
     * @inner
     */
    CELL_CLASS: 'editor_addon_cell',

    /**
     * The addon cell id name.
     * @inner
     */
    CELL_ID: 'cell_',

    /**
     * The addon cell font size.
     * @inner
     */
    CELL_FONT_SIZE: '12.2px',
  };

  // The main DOM element
  this.mainElement = document.getElementById(this.CONSTANTS.MAIN_ID);

  // default styling
  this.mainElement.style.display = 'inline';
  this.mainElement.style.float = 'left';
  this.mainElement.style.backgroundColor = '#f6f6f6';
  this.mainElement.style.width = '50px';
}

/**
 * Set the background color of the ace editor addon.
 *
 * @param {String} color The color as hex value.
 */
AceAddon.prototype.setBackgroundColor = function(color) {
  this.mainElement.style.backgroundColor = color;
};

/**
 * Set the width of the ace editor addon.
 *
 * @param {Number} width The width of the addon in pixels.
 */
AceAddon.prototype.setWidth = function(width) {
  this.mainElement.style.width = width+'px';
};

// adjust the height to the amount of lines of text.
// AceAddon.prototype.setHeightToEditorLength = function(ace) {
//   var height = ace.getSession().getDocument().getLength() * ace.renderer.lineHeight;
//   this.setHeight(height);
// };

/**
 * Status: Total WIP...
 */
AceAddon.prototype.update = function(ace) {
  this.cleanGutter();
  this.addGutter(ace);
};

/**
 * Add a gutter cell div with a specific id.
 * 
 * @param {String} id   The id of the gutter cell.
 * @param {String} html The html inner content of the gutter cell.
 */
AceAddon.prototype.addGutterCell = function(id, html) {
  var tmpGutterCell = document.createElement('div');
  tmpGutterCell.className = this.CONSTANTS.CELL_CLASS;
  tmpGutterCell.id = id;
  tmpGutterCell.innerHTML = html;
  tmpGutterCell.style.height = editor.renderer.lineHeight+'px';
  tmpGutterCell.style.fontSize = this.CONSTANTS.CELL_FONT_SIZE;

  this.mainElement.appendChild(tmpGutterCell);
};

/**
 * Set the html content of a specific gutter cell.
 * 
 * @param {String} id   The id of the gutter cell.
 * @param {String} html The inner html content of the gutter cell.
 */
AceAddon.prototype.setGutterCell = function(id, html) {
  var tmp = document.getElementById(this.CONSTANTS.CELL_ID+id);
  tmp.innerHTML = html;
};

/**
 * Add 'n' gutters to the addon.
 * 
 * @param {Object} ace The ace editor instance.
 */
AceAddon.prototype.addGutter = function(ace) {
  // The number of gutters we want to add.
  var totalGutter = ace.getSession().getDocument().getLength();

  for (var i=0; i<totalGutter; i++) {
    this.addGutterCell(this.CONSTANTS.CELL_ID+i, '');
  };
};

/**
 * Remove all gutter cells.
 */
AceAddon.prototype.cleanGutter = function() {
  this.mainElement.innerHTML = '';
};

// /**
//  * Delete text content from each gutter cell.
//  */
// AceAddon.prototype.resetCellText = function(totalGutters) {
//   for (var i=0; i<editor.getSession().getDocument().getLength(); i++) {
//     this.gutter.setCellText(i, '');
//   };
// };
