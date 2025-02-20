$(document).ajaxComplete(function () {});

$(function () {
  init();
  $("#fenIn").val(START_FEN);
  NewGame();
  newGameAjax();

  // $.ajax({
  // 	url : "bookXml.xml",
  // 	cache : false,
  // 	dataType: "xml",
  // 	success: function (xml) {
  // 		console.log("Read success");
  // 		$(xml).find('line').each(function() {
  // 			var trimmed = $(this).text();
  // 			trimmed = $.trim(trimmed);
  // 			brd_bookLines.push(trimmed);
  // 		});
  // 		GameController.BookLoaded = BOOL.TRUE;
  // 		$('#LoadingBook').remove();
  // 		console.log("Book length: " + brd_bookLines.length + " entries");

  // 		for(var i = 0; i <brd_bookLines.length; ++i) {
  // 		//	console.log('Array: ' + brd_bookLines[i]);
  // 		}
  // 	}
  // });
});

function InitBoardVars() {
  var index = 0;
  for (index = 0; index < MAXGAMEMOVES; index++) {
    brd_history.push({
      move: NOMOVE,
      castlePerm: 0,
      enPas: 0,
      fiftyMove: 0,
      posKey: 0,
    });
  }

  for (index = 0; index < PVENTRIES; index++) {
    brd_PvTable.push({
      move: NOMOVE,
      posKey: 0,
    });
  }
}

function EvalInit() {
  var index = 0;

  for (index = 0; index < 10; ++index) {
    PawnRanksWhite[index] = 0;
    PawnRanksBlack[index] = 0;
  }
}

function InitHashKeys() {
  var index = 0;

  for (index = 0; index < 13 * 120; ++index) {
    PieceKeys[index] = RAND_32();
  }

  SideKey = RAND_32();

  for (index = 0; index < 16; ++index) {
    CastleKeys[index] = RAND_32();
  }
}

function InitSq120To64() {
  var index = 0;
  var file = FILES.FILE_A;
  var rank = RANKS.RANK_1;
  var sq = SQUARES.A1;
  var sq64 = 0;
  for (index = 0; index < BRD_SQ_NUM; ++index) {
    Sq120ToSq64[index] = 65;
  }

  for (index = 0; index < 64; ++index) {
    Sq64ToSq120[index] = 120;
  }

  for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
    for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
      sq = FR2SQ(file, rank);
      Sq64ToSq120[sq64] = sq;
      Sq120ToSq64[sq] = sq64;
      sq64++;
    }
  }
}

function InitFilesRanksBrd() {
  var index = 0;
  var file = FILES.FILE_A;
  var rank = RANKS.RANK_1;
  var sq = SQUARES.A1;
  var sq64 = 0;

  for (index = 0; index < BRD_SQ_NUM; ++index) {
    FilesBrd[index] = SQUARES.OFFBOARD;
    RanksBrd[index] = SQUARES.OFFBOARD;
  }

  for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
    for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
      sq = FR2SQ(file, rank);
      FilesBrd[sq] = file;
      RanksBrd[sq] = rank;
    }
  }
}

function init() {
  InitFilesRanksBrd();
  InitSq120To64();
  InitHashKeys();
  InitBoardVars();
  InitMvvLva();
  initBoardSquares();
  EvalInit();
  srch_thinking = BOOL.FALSE;
}
