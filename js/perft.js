var perft_leafNodes;

function Perft(depth) {
  MakeNullMove();
  if (brd_posKey != GeneratePosKey()) {
    console.log(printGameLine());
    PrintBoard();
    srch_stop = BOOL.TRUE;
    console.log("Hash Error After Make");
  }

  TakeNullMove();
  if (brd_posKey != GeneratePosKey()) {
    console.log(printGameLine());
    PrintBoard();
    srch_stop = BOOL.TRUE;
    console.log("Hash Error After Take");
  }

  if (depth == 0) {
    perft_leafNodes++;
    return;
  }

  GenerateMoves();

  var index;
  var move;
  for (
    index = brd_moveListStart[brd_ply];
    index < brd_moveListStart[brd_ply + 1];
    ++index
  ) {
    move = brd_moveList[index];
    if (MakeMove(move) == BOOL.FALSE) {
      continue;
    }
    Perft(depth - 1);
    TakeMove();
  }

  return;
}

function PerftTest(depth) {
  PrintBoard();
  console.log("Starting Test To Depth:" + depth);
  perft_leafNodes = 0;
  GenerateMoves();
  var index;
  var move;
  var moveNum = 0;
  for (
    index = brd_moveListStart[brd_ply];
    index < brd_moveListStart[brd_ply + 1];
    ++index
  ) {
    move = brd_moveList[index];
    if (MakeMove(move) == BOOL.FALSE) {
      continue;
    }
    moveNum++;
    var cumnodes = perft_leafNodes;
    Perft(depth - 1);
    TakeMove();
    var oldnodes = perft_leafNodes - cumnodes;
    console.log("move:" + moveNum + " " + PrMove(move) + " " + oldnodes);
  }

  console.log("Test Complete : " + perft_leafNodes + " leaf nodes visited");
  $("#FenOutput").text(
    "Test Complete : " + perft_leafNodes + " leaf nodes visited"
  );

  return;
}
