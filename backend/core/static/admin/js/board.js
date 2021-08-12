const Popup = function(button, popup) {
    const handler = {
        button: button,
        popup: popup,
        documentClick: function(e) {
            const modal = e.target.closest('.popup');
            if (modal !== null && modal !== undefined) {
                return;
            }
            document.removeEventListener('click', this.documentClick);
            this.popup.style.display = 'none';
        },
        show: function(e) {
            this.popup.style.display = 'block';
            setTimeout(function(){
                document.addEventListener('click', this.documentClick);
            }.bind(this), 200);
        },
        init: function() {
            this.documentClick = this.documentClick.bind(this);
            this.show = this.show.bind(this);
            this.button.addEventListener('click', this.show);
        }
    }
    handler.init();
    return handler;
}

const Board = function() {

    const WriterHandler = {
        location: { x: 30, y: 30, },
        boardDraggerElement: document.getElementById('board-dragger'),
        nextColor: '#FFF',
        nextStrokeWidth: 2,

        begin: function () {
            this.svg = null;
            this.currentSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.currentPathInSvg = false;
            this.currentPoints = [];
            this.currentSvgPathData = '';
            this.minX = Number.MAX_SAFE_INTEGER;
            this.minY = Number.MAX_SAFE_INTEGER;
            this.maxX = Number.MIN_SAFE_INTEGER;
            this.maxY = Number.MIN_SAFE_INTEGER;
        },

        buildPathData(x, y) {
            x -= this.location.x;
            y -= this.location.y + 64; // toolbar
            this.minX = Math.min(x, this.minX);
            this.minY = Math.min(y, this.minY);
            this.maxX = Math.max(x, this.maxX);
            this.maxY = Math.max(y, this.maxY);
            this.currentPoints.push({ x: x,  y: y, });
            if (this.currentSvgPathData === '') {
                this.currentSvgPathData = 'M ' + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
            } else {
                this.currentSvgPathData += 'L ' + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
            }
        },
        appendPoint(x, y) {
            if (!this.currentPathInSvg || this.svg == null || this.svg == undefined) {
                this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                this.boardDraggerElement.appendChild(this.svg);
                this.svg.appendChild(this.currentSvgPath);
            }
            this.buildPathData(x, y);
            this.currentSvgPath.setAttribute('d', this.currentSvgPathData);
            this.svg.setAttributeNS('http://www.w3.org/2000/svg', 'viewBox', this.minX + ' ' + this.minY + ' ' + this.maxX + ' ' + this.maxY);
            this.svg.style.left = this.minX + 'px';
            this.svg.style.top = this.minY + 'px';
            this.svg.setAttribute('width', this.maxX - this.minX);
            this.svg.setAttribute('height', this.maxY - this.minY);
            this.currentSvgPath.style.transform = 'translate(' + (-this.minX).toString() + 'px, ' + (-this.minY).toString() + 'px)';
            this.currentSvgPath.style.stroke = this.nextColor;
            this.currentSvgPath.style.strokeWidth = this.nextStrokeWidth;
        },
        clearAll: function () {
            const svgs = Array.from(this.boardDraggerElement.querySelectorAll('svg'));
            Array.prototype.forEach.call(svgs, function(el) {
                el.parentElement.removeChild(el);
            });
        }
    };

    const ToolBarHandler = {
        toolbarElement: document.getElementById('toolbar'),
        handleChangeActive: null,
        lineWidthPopup: null,
        clearActiveItems: function() {
            const elements = this.toolbarElement.querySelectorAll('.toolbar-btn');
            Array.prototype.forEach.call(elements, function(el){
                el.classList.remove('active');
            });
        },
        setActiveItem: function(tool) {
            this.clearActiveItems();
            const el = this.toolbarElement.querySelector('[data-item=' + tool + ']');
            if (el !== undefined && el !== null) {
                el.classList.add('active');
            }
        },
        itemClick: function(e) {
            const button = e.target.closest('[data-item]');
            if (button === null || button === undefined) {
                return;
            }
            const item = button.getAttribute('data-item');
            if (this.handleChangeActive !== null && this.handleChangeActive !== undefined) {
                this.handleChangeActive(item);
            }
        },
        lineWeightItemClick: function(e) {
            const width = parseInt(e.target.closest('.line').getAttribute('data-width'), 10);
            WriterHandler.nextStrokeWidth = width;
        },
        init: function() {
            this.itemClick = this.itemClick.bind(this);
            this.lineWeightItemClick = this.lineWeightItemClick.bind(this);
            const elements = this.toolbarElement.querySelectorAll('[data-item]');
            Array.prototype.forEach.call(elements, function(el){
                el.addEventListener('click', this.itemClick);
            }.bind(this));
            this.lineColorPicker = new Picker(this.toolbarElement.querySelector('.btn-line-color'));
            this.lineColorPicker.setOptions({
                popup: 'left',
                color: '#FFF',
            });
            this.lineColorPicker.onChange = function(color) {
                WriterHandler.nextColor = color.hex;
            };
            const lineWeightItems = this.toolbarElement.querySelectorAll('.btn-line-weight .popup .line');
            Array.prototype.forEach.call(lineWeightItems, function(el){
                el.addEventListener('click', this.lineWeightItemClick);
            }.bind(this));
            this.lineWidthPopup = Popup(this.toolbarElement.querySelector('.btn-line-weight'), this.toolbarElement.querySelector('.btn-line-weight .popup'));
        }
    };

    const AppHandler = {
        boardElement: document.getElementById('board'),
        boardDraggerElement: document.getElementById('board-dragger'),
        boardPoint: function (x, y) {
            const rc = this.boardElement.getBoundingClientRect();
            return {
                x: x - rc.left,
                y: y - rc.top,
            };
        },
        tool: 'drag',
        boardStart: { x: 0, y: 0, },
        boardLocation: { x: 30, y: 30 },
        updateBoardLocation: function() {
            this.boardDraggerElement.style.left = this.boardLocation.x + 'px';
            this.boardDraggerElement.style.top = this.boardLocation.y + 'px';
        },
        boardMouseDown: function(e) {
            if (this.tool === 'drag' || this.tool === 'pen') {
                if (this.tool === 'pen') {
                    WriterHandler.begin();
                }
                this.boardStart = this.boardPoint(e.pageX, e.pageY);
                document.addEventListener('mouseup', this.documentMouseUp);
                document.addEventListener('mousemove', this.documentMouseMove);
            }
        },
        documentMouseMove: function(e) {
            if (this.tool === 'drag') {
                const point = this.boardPoint(e.pageX, e.pageY);
                const dx = point.x - this.boardStart.x;
                const dy = point.y - this.boardStart.y;
                this.boardStart = this.boardPoint(e.pageX, e.pageY);
                this.boardLocation = {
                    x: this.boardLocation.x + dx,
                    y: this.boardLocation.y + dy,
                };
                WriterHandler.location = this.boardLocation;
                this.updateBoardLocation();
            } else if (this.tool === 'pen') {
                WriterHandler.appendPoint(e.pageX, e.pageY);
            }
        },
        documentMouseUp: function() {
            document.removeEventListener('mouseup', this.documentMouseUp);
            document.removeEventListener('mousemove', this.documentMouseMove);
        },
        toolbarChangeItem: function(item) {
            if (item === 'clear') {
                WriterHandler.clearAll();
                return;
            }
            this.tool = item;
            ToolBarHandler.setActiveItem(this.tool);
        },
        init: function() {
            this.toolbarChangeItem = this.toolbarChangeItem.bind(this);
            this.documentMouseUp = this.documentMouseUp.bind(this);
            this.documentMouseMove = this.documentMouseMove.bind(this);
            this.boardMouseDown = this.boardMouseDown.bind(this);
            this.boardElement.addEventListener('mousedown', this.boardMouseDown);
            ToolBarHandler.setActiveItem(this.tool);
            ToolBarHandler.handleChangeActive = this.toolbarChangeItem;
        }
    };
    ToolBarHandler.init();
    AppHandler.init();
};

document.addEventListener('DOMContentLoaded', function(){
    Board();
});