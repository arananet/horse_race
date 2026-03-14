export const horseFrames = [
    // Frame 0: Extended
    [
        "             bb     ",
        "            bbbb    ",
        "            bbbbbb  ",
        "          bbbbwbbb  ",
        "         bbbbbbbbb  ",
        "    bbbbbbbbbbb     ",
        "  bbbbbbbbbbbbb     ",
        "  bbbbbbbbbbbb      ",
        "  bbbbbbbbbbbb      ",
        " bbbbbbbbbbbb       ",
        " bb    bb  bb       ",
        " bb    bb   bb      ",
        "  bb    b   bb      ",
        "  b         bb      ",
        " bb          bb     "
    ],
    // Frame 1: Contracted
    [
        "             bb     ",
        "            bbbb    ",
        "            bbbbbb  ",
        "          bbbbwbbb  ",
        "         bbbbbbbbb  ",
        "    bbbbbbbbbbb     ",
        "  bbbbbbbbbbbbb     ",
        "  bbbbbbbbbbbb      ",
        "  bbbbbbbbbbbb      ",
        " bbbbbbbbbbbb       ",
        "  bb   bb  bb       ",
        "  bb   bb  bb       ",
        "   bb   b   bb      ",
        "   bb   bb  bb      ",
        "   bb   bb  bb      "
    ],
    // Frame 2: Gallop
    [
        "             bb     ",
        "            bbbb    ",
        "            bbbbbb  ",
        "          bbbbwbbb  ",
        "         bbbbbbbbb  ",
        "    bbbbbbbbbbb     ",
        "  bbbbbbbbbbbbb     ",
        "  bbbbbbbbbbbb      ",
        "  bbbbbbbbbbbb      ",
        " bbbbbbbbbbbb       ",
        " bbb   bb  bbb      ",
        "  bb   bb   bb      ",
        "  bb    b    bb     ",
        "  bb    bb    bb    ",
        "  bb    bb    bb    "
    ]
];

export function drawSprite(ctx, frame, x, y, scale = 4) {
    const pixels = horseFrames[frame];
    for (let r = 0; r < pixels.length; r++) {
        for (let c = 0; c < pixels[r].length; c++) {
            const char = pixels[r][c];
            if (char === 'b') {
                ctx.fillStyle = '#8B4513'; // SaddleBrown
                ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
            } else if (char === 'w') {
                ctx.fillStyle = 'white'; // Eye white
                ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
                ctx.fillStyle = 'black'; // Pupil
                ctx.fillRect(x + c * scale + scale/2, y + r * scale, scale/2, scale/2);
            } else if (char === 'd') {
                ctx.fillStyle = '#5C4033'; // DarkBrown (Legs in bg)
                ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
            }
        }
    }
}
