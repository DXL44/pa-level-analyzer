	/* all of the code here is probably really bad i'm sorry lmao */
// ALRIGHT NERDS. its time to put together the level file

//Its time to update the colors but be WAY COOLER
//COLOR IDS will be in this format: [group][number]. 
//COLOR GROUPS: gui, bg, players, objs, bgs (aka the groups in the uh... uh the )


//make the level! woohoo!    
//document.getElementById("EditorStuff").style.display = "block";
//const inputThings = document.getElementsByClassName("hideOnLoad");
//for (let i = 0; i < inputThings.length; i++) {
//  inputThings[i].style.display = "none";
//}
let inputLevel  = null
function storeLevel(){
    inputLevel = document.getElementById('levelupload');
    let file = input.files[0]; 
    let fileReader = new FileReader(); 
    fileReader.readAsText(file); 
    fileReader.onload = function() {
        theRealLevel = fileReader.result
        }; 
    fileReader.onerror = function() {
          alert(fileReader.error);
    }
}
function loadLevel() {
    inputLevel = document.getElementById('storage').innerHTML 
    if (inputLevel == null){
        console.log("oops don't do that")
        return
    } else {
        console.log("doing it...");
        levelJSON = JSON.parse(JSON.stringify(inputLevel));
        console.log("good job you did it");
    }
}