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

    // angle 0 points right. Negative half-pi points up, which is the player's fixed nose.
    drawShip: function (x, y, angle, radius, color, shielded, outlineOnly) {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const nose = radius;
        const wing = radius * 0.62;
        const back = radius * 0.78;
        const notch = radius * 0.22;
        const local = [
            [nose, 0],
            [-back, wing],
            [-notch, 0],
            [-back, -wing]
        ];
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const point = (lx, ly) => [x + lx * cos - ly * sin, y + lx * sin + ly * cos];

        ctx.beginPath();
        local.forEach(([lx, ly], i) => {
            const [px, py] = point(lx, ly);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.lineJoin = 'round';
        ctx.lineWidth = 1.5;
        if (outlineOnly) {
            ctx.strokeStyle = color;
            ctx.stroke();
        } else {
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        }

        const [ex, ey] = point(-back - radius * 0.18, 0);
        ctx.beginPath();
        ctx.arc(ex, ey, Math.max(1.5, radius * 0.16), 0, Math.PI * 2);
        ctx.fillStyle = outlineOnly ? '#665522' : '#ffaa22';
        ctx.fill();

        if (shielded) {
            ctx.beginPath();
            ctx.arc(x, y, radius + 8, 0, Math.PI * 2);
            ctx.strokeStyle = '#4488ff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
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
