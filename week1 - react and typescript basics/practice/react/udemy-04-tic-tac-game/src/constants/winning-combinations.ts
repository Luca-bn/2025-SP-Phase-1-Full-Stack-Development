export type Cell = { row: number, col: number };

const WINNING_COMBINATIONS: [Cell, Cell, Cell][] = [
    // three rows
    [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
    ],
    [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
    ],
    [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
    ],

    // three columns
    [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
    ],
    [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
    ],

    // diags
    [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
    ]

];

export default WINNING_COMBINATIONS;