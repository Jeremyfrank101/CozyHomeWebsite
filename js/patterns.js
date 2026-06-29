// patterns.js — Canvas-drawn theme pattern overlays

const PatternEngine = {
    canvas: null,
    ctx: null,

    init() {
        this.canvas = document.getElementById('pattern-canvas');
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.draw());
        this.draw();
    },

    draw() {
        if (!this.canvas || !ThemeEngine.current) return;
        const c = this.canvas;
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, c.width, c.height);

        const t = ThemeEngine.current;
        ctx.globalAlpha = t.patternOpacity;
        ctx.strokeStyle = `rgb(${t.accent})`;

        switch (t.pattern) {
            case 'waves': this._waves(ctx, c.width, c.height); break;
            case 'ripples': this._ripples(ctx, c.width, c.height); break;
            case 'diamonds': this._diamonds(ctx, c.width, c.height); break;
            case 'crosshatch': this._crosshatch(ctx, c.width, c.height); break;
            case 'knit': this._knit(ctx, c.width, c.height); break;
        }
        ctx.globalAlpha = 1;
    },

    _waves(ctx, w, h) {
        const sp = 28;
        ctx.lineWidth = 1.2;
        for (let y = 0; y < h + sp; y += sp) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            for (let x = 0; x <= w; x += sp) {
                const cy = y + (Math.floor(y / sp) % 2 === 0 ? -8 : 8);
                ctx.quadraticCurveTo(x + sp / 2, cy, x + sp, y);
            }
            ctx.stroke();
        }
    },

    _ripples(ctx, w, h) {
        const cx = w / 2, cy = h / 3;
        ctx.lineWidth = 0.8;
        for (let r = 30; r < Math.max(w, h); r += 35) {
            ctx.beginPath();
            ctx.ellipse(cx, cy, r, r * 0.6, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
    },

    _diamonds(ctx, w, h) {
        const sp = 32;
        ctx.lineWidth = 0.9;
        let row = 0;
        for (let y = 0; y < h + sp; y += sp, row++) {
            let startX = row % 2 === 0 ? 0 : sp / 2;
            for (let x = startX; x < w + sp; x += sp) {
                const half = sp / 2 * 0.7;
                ctx.beginPath();
                ctx.moveTo(x, y - half);
                ctx.lineTo(x + half, y);
                ctx.lineTo(x, y + half);
                ctx.lineTo(x - half, y);
                ctx.closePath();
                ctx.stroke();
            }
        }
    },

    _crosshatch(ctx, w, h) {
        const sp = 24;
        ctx.lineWidth = 0.6;
        for (let i = -h; i < w + h; i += sp) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(i, h); ctx.lineTo(i + h, 0); ctx.stroke();
        }
    },

    _knit(ctx, w, h) {
        const sp = 20;
        ctx.lineWidth = 0.8;
        let row = 0;
        for (let y = 0; y < h + sp; y += sp * 0.8, row++) {
            let startX = row % 2 === 0 ? 0 : sp / 2;
            for (let x = startX; x < w + sp; x += sp) {
                ctx.beginPath();
                ctx.moveTo(x - 5, y - 5);
                ctx.lineTo(x, y + 3);
                ctx.lineTo(x + 5, y - 5);
                ctx.stroke();
            }
        }
    }
};
