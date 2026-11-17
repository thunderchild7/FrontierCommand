window.gameInterop = {
    canvas: null,
    ctx: null,
    animationId: null,
    dotnetRef: null,

    init: function (canvasId, dotnetReference) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.dotnetRef = dotnetReference;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.startLoop();
    },

    resize: function () {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    },

    startLoop: function () {
        const loop = (timestamp) => {
            if (this.dotnetRef) {
                this.dotnetRef.invokeMethodAsync('GameLoop', timestamp);
            }
            this.animationId = requestAnimationFrame(loop);
        };
        this.animationId = requestAnimationFrame(loop);

        // Keyboard
        window.addEventListener('keydown', (e) => {
            if (this.dotnetRef) {
                this.dotnetRef.invokeMethodAsync('OnKeyDown', e.key);
            }
            e.preventDefault();
        });
        window.addEventListener('keyup', (e) => {
            if (this.dotnetRef) {
                this.dotnetRef.invokeMethodAsync('OnKeyUp', e.key);
            }
        });
    },

    stopLoop: function () {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },

    clear: function () {
        if (this.ctx) {
            this.ctx.fillStyle = '#000011';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    drawCircle: function (x, y, radius, color) {
        if (!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    },

    drawLine: function (x1, y1, x2, y2, color, width = 1) {
        if (!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
    },

    drawRect: function (x, y, w, h, color) {
        if (!this.ctx) return;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    },

    drawText: function (text, x, y, color, size = 16, align = 'left') {
        if (!this.ctx) return;
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px monospace`;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    },

    getSize: function () {
        return { width: this.canvas.width, height: this.canvas.height };
    }
};
