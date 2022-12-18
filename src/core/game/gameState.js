export const GameState = {

    STARTING:0,
    PLAYING:1,
    ENDING:2
};

export const BoardOptions = {

    RADUIS:60,
    BORDER_WIDTH:10,
    CELL_WIDTH:0,
    CELL_CENTER:0,
    CELL_PADDING:0,
    OFFSET:0
};

export const GameOptions = {

    EMPTY_SIGN:0,
    PLAYER_SIGN:1,
    AI_SIGN:2
};

export const GameCombo = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [1,4,7],
    [2,5,8],
    [6,7,8],
    [2,4,6]
];