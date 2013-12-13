/**
 * The ace editor addon.
 * This object contains functions to create and manipulate the editor addon.
 * You need to add a "div" with an id "editor_addon" to append to the DOM
 * correctly.
 */
function AceAddon(ace) {
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

    /**
     * The cellactive class name.
     * @inner
     */
    ACTIVE: 'editor_addon_cell_active'
  };

  // The main DOM element
  this.mainElement = document.getElementById(this.CONSTANTS.MAIN_ID);

  // The last cursor row
  this.lastCursorRow = 0;

  // Default styling
  this.mainElement.style.display = 'inline';
  this.mainElement.style.float = 'left';
  this.mainElement.style.backgroundColor = '#f6f6f6';
  this.mainElement.style.width = '50px';

  // Set some rules to the stylesheets
  document.write('<style>.editor_addon_cell_active { background-color: #dcdcdc; }</style>');

  // var sheets = document.styleSheets[0];
  // console.log(sheets);

  // Add first time the gutter
  this.addGutter(ace);
  this.setGutterCellClassName(this.lastCursorRow, this.CONSTANTS.ACTIVE);
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

/**
 * Status: Total WIP...
 */
AceAddon.prototype.update = function(ace) {
  var self = this;

  // on change event...
  ace.getSession().on('change', function(e) {
    console.log(e);

    // if a new lin was added
    if (e.data.action === 'insertText' && e.data.text === '\n') {
      self.cleanGutter();
      self.addGutter(ace);
    };
    // if a line was removed
    if (e.data.action === 'removeLines') {
      self.cleanGutter();
      self.addGutter(ace);
    };
  });

  // on change fold event...
  ace.getSession().on('changeFold', function(e) {
    // if something was fold.
    if (e.action === 'add') {
      console.log('fold it', e.data);
      for (var i=e.data.start.row; i<e.data.end.row; i++) {
        self.hideGutterCell(i);
      };
    }
    // if something was unfold.
    if (e.action === 'remove') {
      console.log('unfold it', e.data);
      for (var i=e.data.start.row; i<e.data.end.row; i++) {
        self.showGutterCell(i);
      };
    }
    
    // var start = e.data.start.row;
    // var end = e.data.end.row;
    // console.log(start, end);

    // self.hideGutterCell(10);
  });

  // on change fold event...
  ace.selection.on('changeCursor', function(e) {
    var positionRow = ace.selection.getCursor().row;
    //console.log('changeCursor', positionRow);
    
    // reset the last activ cell class name.
    self.setGutterCellClassName(self.lastCursorRow, self.CONSTANTS.CELL_CLASS);

    // Update the lastCursorRow variable
    self.lastCursorRow = positionRow;
    // Set the new active cell class name.
    self.setGutterCellClassName(positionRow, self.CONSTANTS.ACTIVE);
  });
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
 * Set the class name of a specific gutter cell.
 * This for example we use for the active cursor cell.
 * 
 * @param {String} id   The id of the gutter cell.
 * @param {String} name The new class name.
 */
AceAddon.prototype.setGutterCellClassName = function(id, name) {
  document.getElementById(this.CONSTANTS.CELL_ID+id).className = name;
};

AceAddon.prototype.showGutterCell = function(id) {
  document.getElementById(this.CONSTANTS.CELL_ID+id).style.display = 'block';
};

AceAddon.prototype.hideGutterCell = function(id) {
  document.getElementById(this.CONSTANTS.CELL_ID+id).style.display = 'none';
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
