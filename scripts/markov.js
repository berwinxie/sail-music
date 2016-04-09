var lengths = [125, 250, 500];
var playedNotes = [];

var genSong = function() {
  notestats = {}
  var notes = playedNotes;
  for (var j = 0; j < notes.length - 1; j++) {
    if (notestats.hasOwnProperty(notes[j])) {
      notestats[notes[j]].push(notes[j+1]);
    } else {
      notestats[notes[j]] = [notes[j+1]];
    }
  }

}

var choice = function (a) {
  var i = Math.floor(a.length * Math.random());
  return a[i];
};

var make_song = function (min_length) {
  genSong();
  note = choice([playedNotes[0]]);
  var song = [note];

  // what does this do?
  while (notestats.hasOwnProperty(note)) {
    var next_notes = notestats[note];
    note = choice(next_notes);
    song.push(note);
    if (song.length > min_length) break;
  }
  return song;
};


/*------------------------------------------------------------------------------------------- */



var test = function(len) {
  var markovsong = make_song(len);
  // ternary operator to choose how long we want our len to be
  var len = (markovsong.length < len)? markovsong.length : len;
  var play_song = (function soundLoop (i) {          
    setTimeout(function () {   
      if (i > 0){
        synth.triggerRelease(markovsong[i-1]);
      }

      synth.triggerAttack(markovsong[i]);                     

      if (++i < len) {
        soundLoop(i);      //  increment i and call myLoop again if i < how many notes we want
      }
      else {
        // edge case
        // end the prev sound if we are at the end
        synth.triggerRelease(markovsong[i-1]);
      }
    }, choice(lengths))
 })(0); 
}