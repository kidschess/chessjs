function ThreeFoldRep() {
  var i = 0,
    r = 0;
  for (i = 0; i < brd_hisPly; ++i) {
    if (brd_history[i].posKey == brd_posKey) {
      r++;
    }
  }
  return r;
}

function DrawMaterial() {
  if (brd_pceNum[PIECES.wP] != 0 || brd_pceNum[PIECES.bP] != 0)
    return BOOL.FALSE;
  if (
    brd_pceNum[PIECES.wQ] != 0 ||
    brd_pceNum[PIECES.bQ] != 0 ||
    brd_pceNum[PIECES.wR] != 0 ||
    brd_pceNum[PIECES.bR] != 0
  )
    return BOOL.FALSE;
  if (brd_pceNum[PIECES.wB] > 1 || brd_pceNum[PIECES.bB] > 1) {
    return BOOL.FALSE;
  }
  if (brd_pceNum[PIECES.wN] > 1 || brd_pceNum[PIECES.bN] > 1) {
    return BOOL.FALSE;
  }
  if (brd_pceNum[PIECES.wN] != 0 && brd_pceNum[PIECES.wB] != 0) {
    return BOOL.FALSE;
  }
  if (brd_pceNum[PIECES.bN] != 0 && brd_pceNum[PIECES.bB] != 0) {
    return BOOL.FALSE;
  }

  return BOOL.TRUE;
}
