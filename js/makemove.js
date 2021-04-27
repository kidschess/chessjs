function ClearPiece(sq) {	
	
    var pce = brd_pieces[sq];	
	var col = PieceCol[pce];
	var index = 0;
	var t_pceNum = -1;
	
    HASH_PCE(pce,sq);
	
	brd_pieces[sq] = PIECES.EMPTY;
    brd_material[col] -= PieceVal[pce];
	
	for(index = 0; index < brd_pceNum[pce]; ++index) {
		if(brd_pList[PCEINDEX(pce,index)] == sq) {
			t_pceNum = index;
			break;
		}
	}
	
	brd_pceNum[pce]--;		
	brd_pList[PCEINDEX(pce,t_pceNum)] = brd_pList[PCEINDEX(pce,brd_pceNum[pce])];
  
}

function AddPiece(sq, pce) {   
	
	var col = PieceCol[pce];

    HASH_PCE(pce,sq);
	
	brd_pieces[sq] = pce;  	
	brd_material[col] += PieceVal[pce];
	brd_pList[PCEINDEX(pce,brd_pceNum[pce])] = sq;
	brd_pceNum[pce]++;
}

function MovePiece(from, to) {   
	
	var index = 0;
	var pce = brd_pieces[from];	
	var col = PieceCol[pce];	

	HASH_PCE(pce,from);
	brd_pieces[from] = PIECES.EMPTY;
	
	HASH_PCE(pce,to);
	brd_pieces[to] = pce;	
	
	for(index = 0; index < brd_pceNum[pce]; ++index) {
		if(brd_pList[PCEINDEX(pce,index)] == from) {
			brd_pList[PCEINDEX(pce,index)] = to;
			break;
		}
	}
	
}

function MakeMove(move) {
	
	var from = FROMSQ(move);
    var to = TOSQ(move);
    var side = brd_side;	
	
	brd_history[brd_hisPly].posKey = brd_posKey;
	
	if( (move & MFLAGEP) != 0) {
        if(side == COLOURS.WHITE) {
            ClearPiece(to-10);
        } else {
            ClearPiece(to+10);
        }
    } else if ( (move & MFLAGCA) != 0) {
        switch(to) {
            case SQUARES.C1:
                MovePiece(SQUARES.A1, SQUARES.D1);
			break;
            case SQUARES.C8:
                MovePiece(SQUARES.A8, SQUARES.D8);
			break;
            case SQUARES.G1:
                MovePiece(SQUARES.H1, SQUARES.F1);
			break;
            case SQUARES.G8:
                MovePiece(SQUARES.H8, SQUARES.F8);
			break;
            default: break;
        }
    }	
	
	if(brd_enPas != SQUARES.NO_SQ) HASH_EP();
    HASH_CA();
	
	brd_history[brd_hisPly].move = move;
    brd_history[brd_hisPly].fiftyMove = brd_fiftyMove;
    brd_history[brd_hisPly].enPas = brd_enPas;
    brd_history[brd_hisPly].castlePerm = brd_castlePerm;

    brd_castlePerm &= CastlePerm[from];
    brd_castlePerm &= CastlePerm[to];
    brd_enPas = SQUARES.NO_SQ;

	HASH_CA();
	
	var captured = CAPTURED(move);
    brd_fiftyMove++;
	
	if(captured != PIECES.EMPTY) {
        ClearPiece(to);
        brd_fiftyMove = 0;
    }
	
	brd_hisPly++;
	brd_ply++;
	
	if(PiecePawn[brd_pieces[from]] == BOOL.TRUE) {
        brd_fiftyMove = 0;
        if( (move & MFLAGPS) != 0) {
            if(side==COLOURS.WHITE) {
                brd_enPas=from+10;
            } else {
                brd_enPas=from-10;
            }
            HASH_EP();
        }
    }
	
	MovePiece(from, to);
	
	var prPce = PROMOTED(move);
    if(prPce != PIECES.EMPTY)   {       
        ClearPiece(to);
        AddPiece(to, prPce);
    }
		
	brd_side ^= 1;
    HASH_SIDE();
	
	
	if(SqAttacked(brd_pList[PCEINDEX(Kings[side],0)], brd_side))  {
        TakeMove();
        return BOOL.FALSE;
    }
	
	return BOOL.TRUE;	
}


function TakeMove() {		
	
	brd_hisPly--;
    brd_ply--;
	
    var move = brd_history[brd_hisPly].move;
    var from = FROMSQ(move);
    var to = TOSQ(move);	
	
	if(brd_enPas != SQUARES.NO_SQ) HASH_EP();
    HASH_CA();

    brd_castlePerm = brd_history[brd_hisPly].castlePerm;
    brd_fiftyMove = brd_history[brd_hisPly].fiftyMove;
    brd_enPas = brd_history[brd_hisPly].enPas;

    if(brd_enPas != SQUARES.NO_SQ) HASH_EP();
    HASH_CA();

    brd_side ^= 1;
    HASH_SIDE();
	
	if( (MFLAGEP & move) != 0) {
        if(brd_side == COLOURS.WHITE) {
            AddPiece(to-10, PIECES.bP);
        } else {
            AddPiece(to+10, PIECES.wP);
        }
    } else if( (MFLAGCA & move) != 0) {
        switch(to) {
            case SQUARES.C1: MovePiece(SQUARES.D1, SQUARES.A1); break;
            case SQUARES.C8: MovePiece(SQUARES.D8, SQUARES.A8); break;
            case SQUARES.G1: MovePiece(SQUARES.F1, SQUARES.H1); break;
            case SQUARES.G8: MovePiece(SQUARES.F8, SQUARES.H8); break;
            default: break;
        }
    }
	
	MovePiece(to, from);
	
	var captured = CAPTURED(move);
    if(captured != PIECES.EMPTY) {      
        AddPiece(to, captured);
    }
	
	if(PROMOTED(move) != PIECES.EMPTY)   {        
        ClearPiece(from);
        AddPiece(from, (PieceCol[PROMOTED(move)] == COLOURS.WHITE ? PIECES.wP : PIECES.bP));
    }
}

