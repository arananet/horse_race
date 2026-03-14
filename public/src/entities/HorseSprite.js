export const horseFrames = [
    // Frame 0: Extended (Legs spread out)
    [
        "            bbb         ",
        "           bbbbb        ",
        "           bbbbbb       ",
        "          bbbwbbb       ",
        "         bbbbbbbb       ",
        "    bbbbbbbbbbbb        ",
        "  bbbbbbbbbbbbbb        ",
        "  bbbbbbbbbbbbbbb       ",
        "  bbbbbbbbbbbbbb        ",
        " bbbbbbbbbbbbbb         ",
        " bbb   bb   bbb         ",
        " bbb   bb    bbb        ",
        "  bb    b    bbb        ",
        "  bb         bb         ",
        " bbb          bbb       "
    ],
    // Frame 1: Contracted (Legs tucked under)
    [
        "            bbb         ",
        "           bbbbb        ",
        "           bbbbbb       ",
        "          bbbwbbb       ",
        "         bbbbbbbb       ",
        "    bbbbbbbbbbbb        ",
        "  bbbbbbbbbbbbbb        ",
        "  bbbbbbbbbbbbbbb       ",
        "  bbbbbbbbbbbbbb        ",
        " bbbbbbbbbbbbbb         ",
        "  bbb  bbb  bbb         ",
        "  bbb  bbb  bbb         ",
        "   bb   b   bbb         ",
        "   bbb  bb  bbb         ",
        "   bbb  bb  bbb         "
    ],
    // Frame 2: Gallop (Legs mid-stride)
    [
        "            bbb         ",
        "           bbbbb        ",
        "           bbbbbb       ",
        "          bbbwbbb       ",
        "         bbbbbbbb       ",
        "    bbbbbbbbbbbb        ",
        "  bbbbbbbbbbbbbb        ",
        "  bbbbbbbbbbbbbbb       ",
        "  bbbbbbbbbbbbbb        ",
        " bbbbbbbbbbbbbb         ",
        " bbb   bbb  bbb         ",
        "  bb   bbb   bbb        ",
        "  bb    b    bbb        ",
        "  bbb   bb    bb        ",
        "  bbb   bb    bb        "
    ]
];

export function drawSprite(ctx, frame, x, y, scale = 3) {
    const pixels = horseFrames[frame];
    for (let r = 0; r < pixels.length; r++) {
        for (let c = 0; c < pixels[r].length; c++) {
            const char = pixels[r][c];
            if (char === 'b') {
                ctx.fillStyle = '#654321'; // Darker brown matching the reference
                ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
            } else if (char === 'w') {
                ctx.fillStyle = 'white'; // Eye white
                ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
                ctx.fillStyle = 'black'; // Pupil
                ctx.fillRect(x + c * scale + scale/2, y + r * scale, scale/2, scale/2);
            }
        }
    }
}
