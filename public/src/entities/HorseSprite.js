export const horseFrames = [
    // Frame 0: Gallop 1 (Legs out)
    [
        "             bbb        ",
        "            bbbbb       ",
        "            bbbbbb      ",
        "           bbbwbbb      ",
        "          bbbbbbbb      ",
        "     bbbbbbbbbbbbb      ",
        "   bbbbbbbbbbbbbbb      ",
        "   bbbbbbbbbbbbbbbb     ",
        "   bbbbbbbbbbbbbbb      ",
        "  bbbbbbbbbbbbbbb       ",
        "  bbb   bbb   bbb       ",
        "  bbb   bbb    bbb      ",
        "   bb    bb    bbb      ",
        "   bb          bbb      ",
        "  bbb           bbb     "
    ],
    // Frame 1: Gallop 2 (Legs tucked)
    [
        "             bbb        ",
        "            bbbbb       ",
        "            bbbbbb      ",
        "           bbbwbbb      ",
        "          bbbbbbbb      ",
        "     bbbbbbbbbbbbb      ",
        "   bbbbbbbbbbbbbbb      ",
        "   bbbbbbbbbbbbbbbb     ",
        "   bbbbbbbbbbbbbbb      ",
        "  bbbbbbbbbbbbbbb       ",
        "   bbb  bbb   bbb       ",
        "   bbb  bbb   bbb       ",
        "    bb   bb   bbb       ",
        "    bbb  bb   bbb       ",
        "    bbb  bb   bbb       "
    ],
    // Frame 2: Gallop 3 (Legs crossing)
    [
        "             bbb        ",
        "            bbbbb       ",
        "            bbbbbb      ",
        "           bbbwbbb      ",
        "          bbbbbbbb      ",
        "     bbbbbbbbbbbbb      ",
        "   bbbbbbbbbbbbbbb      ",
        "   bbbbbbbbbbbbbbbb     ",
        "   bbbbbbbbbbbbbbb      ",
        "  bbbbbbbbbbbbbbb       ",
        "  bbb   bbb   bbb       ",
        "   bb   bbb    bbb      ",
        "   bb    bb    bbb      ",
        "   bbb   bb     bb      ",
        "   bbb   bb     bb      "
    ]
];

export function drawSprite(ctx, frame, x, y, scale = 3) {
    const pixels = horseFrames[frame];
    for (let r = 0; r < pixels.length; r++) {
        for (let c = 0; c < pixels[r].length; c++) {
            const char = pixels[r][c];
            if (char === 'b') {
                ctx.fillStyle = '#1A1A1A'; // Very dark gray/black to match screenshot silhouette
                ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
            } else if (char === 'w') {
                ctx.fillStyle = '#FFF'; // Eye white
                ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
                ctx.fillStyle = '#F00'; // Red glowing eye for style
                ctx.fillRect(x + c * scale + scale/2, y + r * scale, scale/2, scale/2);
            }
        }
    }
}
