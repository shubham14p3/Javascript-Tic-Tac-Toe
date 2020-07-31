import game from '../assets/js/index';

const {
  Board, gameUtils, boardUtils, Player,
} = game;

test('boardUtils should return a array of winning combinations', () => {
  expect(boardUtils.WINNING_COMBINATIONS).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);
});

describe('Board', () => {
  document.body.innerHTML = '<div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + '</div>';

  const mockDraw = (board) => {
    board.cells[0].innerText = 'X';
    board.cells[1].innerText = 'O';
    board.cells[2].innerText = 'X';
    board.cells[3].innerText = 'X';
    board.cells[4].innerText = 'X';
    board.cells[5].innerText = 'O';
    board.cells[6].innerText = 'X';
    board.cells[7].innerText = 'O';
    board.cells[8].innerText = 'O';
    return board;
  };

  it('Board cells property should return a an array of div.block element', () => {
    document.body.innerHTML = [
      ' <span class="sm"></span>',
      ' <span class="sm"></span>',
      ' <span class="sm"></span>',
      ' <span class="sm"></span>',
      ' <span class="sm"></span>',
      ' <span class="sm"></span>',
      ' <span class="sm"></span>',
      ' <span class="sm"></span>',
    ];
    const expected = Array.from(document.querySelectorAll('span.sm'));
    // set up the html structure
    document.body.innerHTML = '<div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + '</div>';
    const board = new Board();
    expect(board.cells).toHaveLength(9);
    expect(board.cells).not.toEqual(expect.arrayContaining(expected));
  });
  it('Boards isWinner method should return a false value indicating the non-existence of a winnert', () => {
    const board = new Board();
    expect(board.isWinner()).toBe(false);
  });
  it('Boards isWinner method should return true when there is a winning combination', () => {
    const board = new Board();
    board.cells[0].innerText = 'X';
    board.cells[1].innerText = 'X';
    board.cells[2].innerText = 'X';
    expect(board.isWinner()).toBe(true);
  });
  it('should return true if all the cells are occupied and there is not winner', () => {
    const board = new Board();
    mockDraw(board);
    expect(board.isDraw()).toBe(true);
  });

  it('board reset should clear all the innertext of the board cells', () => {
    const board = new Board();
    mockDraw(board);

    board.reset();
    board.cells.forEach((cell) => {
      expect(cell.innerText).toBe('');
    });
  });
});

describe('gameUtils', () => {
  test('winningMessage', () => {
    document.body.innerHTML = '<div id="container">'
      + ' <div id="container"></div>'
      + ' <div id="hide">'
      + '</div>';
    expect(gameUtils.winningMessage('Hektor')).toBeInstanceOf(HTMLElement);
  });
  test('drawMessage', () => {
    document.body.innerHTML = '<div>'
      + ' <div id="container"></div>'
      + ' <div id="hide"></div>'
      + '</div>';
    expect(gameUtils.drawMessage()).toBeInstanceOf(HTMLElement);
  });
});

describe('form', () => {
  document.body.innerHTML = '<div> <div id="welcome-form"></div>  </div>';
  const form = document.getElementById('welcome-form');
  it('It should return an instace of HTMLelement', () => {
    expect(form).toBeInstanceOf(HTMLElement);
  });
});

// player testing

describe('Player', () => {
  // mock the Dom
  document.body.innerHTML = '<div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + ' <div class="block"></div>'
    + '</div>';

  const board = new Board();

  const p1 = new Player('Raj', board, 'X');
  const p2 = new Player('Kip', board, 'O');

  it('Should return the player Name', () => {
    expect(p1.name).toBe('Raj');
    expect(p2.name).toBe('Kip');
  });

  test('getName', () => {
    expect(p1.getName()).toBe('Raj');
    expect(p2.getName()).toBe('Kip');
  });

  test('myTurn', () => {
    document.body.innerHTML = '<div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + ' <div class="block"></div>'
      + '</div>';

    const board = new Board();
    const p3 = new Player('Raj', board, 'X');

    p3.myTurn();

    board.cells.forEach((cell) => {
      expect(cell.getAttribute('data-clickable')).toBe('true');
    });
  });
});
