function SqFromAlg(moveAlg) {

	//console.log('SqFromAlg' + moveAlg);
	if(moveAlg.length != 2) return SQUARES.NO_SQ;
	
	if(moveAlg[0] > 'h' || moveAlg[0] < 'a' ) return SQUARES.NO_SQ;
	if(moveAlg[1] > '8' || moveAlg[1] < '1' ) return SQUARES.NO_SQ;
	
	file = moveAlg[0].charCodeAt() - 'a'.charCodeAt();
	rank = moveAlg[1].charCodeAt() - '1'.charCodeAt();	
	
	return FR2SQ(file,rank);		
}

function PrintMoveList() {
	var index;
	var move;
	console.log("MoveList:");
	
	for(index = brd_moveListStart[brd_ply]; index < brd_moveListStart[brd_ply + 1]; ++index) {
	
		move = brd_moveList[index];	
		console.log("Move:" + (index+1) + " > " + PrMove(move));
		
	}
}

function PrSq(sq) {
	var file = FilesBrd[sq];
	var rank = RanksBrd[sq];
	
	var sqStr = String.fromCharCode('a'.charCodeAt() + file) + String.fromCharCode('1'.charCodeAt() + rank);
	return sqStr;
}

function PrMove(move) {

	var MvStr;
	
	var ff = FilesBrd[FROMSQ(move)];
	var rf = RanksBrd[FROMSQ(move)];
	var ft = FilesBrd[TOSQ(move)];
	var rt = RanksBrd[TOSQ(move)];
	
	MvStr = String.fromCharCode('a'.charCodeAt() + ff) + String.fromCharCode('1'.charCodeAt() + rf) + 
				String.fromCharCode('a'.charCodeAt() + ft) + String.fromCharCode('1'.charCodeAt() + rt)
				
	var promoted = PROMOTED(move);
	
	if(promoted != PIECES.EMPTY) {
		var pchar = 'q';
		if(PieceKnight[promoted] == BOOL.TRUE) {
			pchar = 'n';
		} else if(PieceRookQueen[promoted] == BOOL.TRUE && PieceBishopQueen[promoted] == BOOL.FALSE)  {
			pchar = 'r';
		} else if(PieceRookQueen[promoted] == BOOL.FALSE && PieceBishopQueen[promoted] == BOOL.TRUE)   {
			pchar = 'b';
		}
		 MvStr += pchar;		
	} 	
	return MvStr;
}

function ParseMove(from, to) {
	
    GenerateMoves();     
   
	var Move = NOMOVE;
	var PromPce = PIECES.EMPTY;
	var found = BOOL.FALSE;
	for(index = brd_moveListStart[brd_ply]; index < brd_moveListStart[brd_ply + 1]; ++index) {	
		Move = brd_moveList[index];	
		if(FROMSQ(Move)==from && TOSQ(Move)==to) {
			PromPce = PROMOTED(Move);
			if(PromPce!=PIECES.EMPTY) {
				if( (PromPce==PIECES.wQ && brd_side==COLOURS.WHITE) || (PromPce==PIECES.bQ && brd_side==COLOURS.BLACK) ) {
					found = BOOL.TRUE;
					break;
				}
				continue;
			}
			found = BOOL.TRUE;
			break;
		}
    }
	
	if(found != BOOL.FALSE) {
		if(MakeMove(Move) == BOOL.FALSE) {
			return NOMOVE;
		}
		TakeMove();
		return Move;
	}
	
    return NOMOVE;	
}