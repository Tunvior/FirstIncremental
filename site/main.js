var clicks = 0;
var cursors = 0;

function manualClick(value){
  clicks = clicks + value;
  //console.log("Clicks: " + clicks);
  updateClicks();
};

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(clicks >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	  clicks = clicks - cursorCost;                          //removes the clicks spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        updateClicks();                                         //updates the number of clicks for the user
    }else{
        document.getElementById('log').value += "You dont have enough cursors\n";
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

function updateClicks(){
  document.getElementById("clicks").innerHTML = clicks.toFixed(2);
  //console.log("updated");
};

function doSave(){
  var save = {
    clicks: clicks,
    cursors: cursors
  };
  localStorage.setItem("save",JSON.stringify(save));
};

function doLoad(){
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.clicks !== "undefined") clicks = savegame.clicks;
  if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
  updateClicks();
  document.getElementById('cursors').innerHTML = cursors;
  var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
  document.getElementById('cursorCost').innerHTML = cursorCost;
};

function deleteSave(){
  localStorage.removeItem("save");
}

window.setInterval(function(){
  manualClick(cursors);
  //doSave();
}, 1000);
