const statusbar = document.getElementById('statusbar');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const darcula = true;

canvas.style.backgroundColor = darcula ? "#333" : "#aaa";

const gridw = 120;
const gridh = 55;

const dx = 18;
const dy = 18;

const bx = dx * 0.15;
const by = dy * 0.15;

const offset_x = 0;
const offset_y = 0;

const pattern = new Array(gridw * gridh);

const filled_style = darcula ? "#bbb" : "#000";


for (let i = 0; i < pattern.length; i++) {
    pattern[i] = -1;
}

ctx.canvas.width = gridw * dx + 1;
ctx.canvas.height = gridh * dy + 1;

const get_pattern_at = function(pattern, i, j) {
    const idx = i + j * gridw;
    return pattern[idx];
}

const set_pattern_at = function(pattern, i, j, value) {
    const idx = i + j * gridw;
    pattern[idx] = value;
}

const toggle_pattern_at = function(pattern, i, j) {
    const idx = i + j * gridw;
    pattern[idx] = - pattern[idx];
}

canvas.addEventListener('click', function(event) {
    const x = event.offsetX;
    const y = gridh * dy - event.offsetY;
    const i = Math.trunc(x / dx);
    const j = Math.trunc(y / dy);
    toggle_pattern_at(pattern, i, j);
    repaint(ctx, pattern);
    statusbar.innerText = i + ' x ' + j;
});

const draw_grid = function(ctx) {
    ctx.beginPath();
    for (let i = 0; i <= gridw; i++) {
        ctx.moveTo(offset_x + 0.5 + i * dx, offset_y + 0.5);
        ctx.lineTo(offset_x + 0.5 + i * dx, offset_y + 0.5 + gridh * dy);
    }
    for (let j = 0; j <= gridh; j++) {
        ctx.moveTo(offset_x + 0.5, offset_y + 0.5 + j * dy);
        ctx.lineTo(offset_x + 0.5 + gridw * dx, offset_y + 0.5 + j * dy);
    }
    ctx.closePath();
    ctx.strokeStyle = darcula ? "#aaa" : "#000";
    ctx.stroke();
};

const draw_cell = function(ctx, i, j, state) {
    if (state > 0) {
        ctx.fillStyle = filled_style;
        ctx.fillRect(offset_x + 0.5 + i * dx + bx, offset_y + 0.5 + j * dy + by, dx - 2 * bx, dy - 2 * by);
    }
};

const draw_pattern = function(ctx, pattern) {
    for (let i = 0; i < gridw; i++) {
        for (let j = 0; j < gridh; j++) {
            draw_cell(ctx, i, gridh - j - 1, get_pattern_at(pattern, i, j));
        }
    }
}

const clear_canvas = function(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const repaint = function(ctx, pattern) {
    clear_canvas(ctx);
    draw_grid(ctx);
    draw_pattern(ctx, pattern);
}

const init_example_pattern = function(pattern) {
    for (let i = 0; i < 10; i++) {
        toggle_pattern_at(pattern, i, i);
        toggle_pattern_at(pattern, i, i - 1);
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((i % 2) === (j % 2)) {
                toggle_pattern_at(pattern, i, j + 13);
            }
        }
    }
};

init_example_pattern(pattern);

repaint(ctx, pattern);
