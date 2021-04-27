function GetPvLine(depth) {;

	//console.log("GetPvLine");
	
	var move = ProbePvTable();
	var count = 0;
	
	while(move != NOMOVE && count < depth) {
	
		if( MoveExists(move) ) {
			MakeMove(move);
			brd_PvArray[count++] = move;
			//console.log("GetPvLine added " + PrMove(move));	
		} else {
			break;
		}		
		move = ProbePvTable();	
	}
	
	while(brd_ply > 0) {
		TakeMove();
	}
	return count;
	
}

function StorePvMove(move) {

	var index = brd_posKey % PVENTRIES;	
	
	brd_PvTable[index].move = move;
    brd_PvTable[index].posKey = brd_posKey;
}

function ProbePvTable() {

	var index = brd_posKey % PVENTRIES;	
	
	if( brd_PvTable[index].posKey == brd_posKey ) {
		return brd_PvTable[index].move;
	}
	
	return NOMOVE;
}