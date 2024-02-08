	/* all of the code here is probably really bad i'm sorry lmao */
// ALRIGHT NERDS. its time to put together the level file

//Its time to update the colors but be WAY COOLER
//COLOR IDS will be in this format: [group][number]. 
//COLOR GROUPS: gui, bg, players, objs, bgs (aka the groups in the uh... uh the )

// ------- KEY FUNCTIONS -------
function download(filename, text) { // Download (self explanatory) 
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download',filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function saveLevel(level) {
    // var finalLevel = JSON.stringify(level)
    download("level"+ ".vgd", JSON.stringify(level));
}

//make the level! woohoo!    
//document.getElementById("EditorStuff").style.display = "block";
//const inputThings = document.getElementsByClassName("hideOnLoad");
//for (let i = 0; i < inputThings.length; i++) {
//  inputThings[i].style.display = "none";
//}
let theRealLevel = null
let levelJSON = null

function storeLevel(){
    input = document.getElementById('levelupload');


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
    inputLevel = theRealLevel;
    if (!inputLevel){
        console.log("oops don't do that")
        window.alert("Please submit a level file!")
        return;
    } else {
        console.log("doing it...");
        levelJSON = JSON.parse(inputLevel);
        console.log("good job you did it");
        console.log("now its time to change! the! text!");
        for (i = 0; i < levelJSON.objects.length; i++)
        {
            if(levelJSON.objects[i].s == 4)
            {
                levelJSON.objects[i].text = `<font="Inconsolata">${levelJSON.objects[i].text}`;
            }
        }
        console.log("All text has been changed! dwonloading olevel");
        saveLevel(levelJSON);
        //levelstats
        /*
        console.log("LOADING THE LEVEL STATS YIPPIE!!!!!!!!!")
        statOutput = document.getElementById("infotest")
        statOutput.innerHTML += `<br>PREFABS: ${Object.keys(levelJSON.prefabs).length}`
        statOutput.innerHTML += `<br>THEMES: ${Object.keys(levelJSON.themes).length}`
        statOutput.innerHTML += `<br>CHECKPOINTS: ${Object.keys(levelJSON.checkpoints).length}`
        statOutput.innerHTML += `<br>OBJECTS: ${Object.keys(levelJSON.beatmap_objects).length}`
        statOutput.innerHTML += `<br>EVENTS`
        // please make this iterable for the love of fuck
        statOutput.innerHTML += `<br>POS: ${Object.keys(levelJSON.events.pos).length}`
        statOutput.innerHTML += `<br>ZOOM: ${Object.keys(levelJSON.events.zoom).length}`
        statOutput.innerHTML += `<br>ROT: ${Object.keys(levelJSON.events.rot).length}`
        statOutput.innerHTML += `<br>shake: ${Object.keys(levelJSON.events.shake).length}`
        statOutput.innerHTML += `<br>theme: ${Object.keys(levelJSON.events.theme).length}`
        statOutput.innerHTML += `<br>chroma: ${Object.keys(levelJSON.events.chroma).length}`
        statOutput.innerHTML += `<br>bloom: ${Object.keys(levelJSON.events.bloom).length}`
        statOutput.innerHTML += `<br>vignette: ${Object.keys(levelJSON.events.vignette).length}`
        statOutput.innerHTML += `<br>lens: ${Object.keys(levelJSON.events.lens).length}`
        statOutput.innerHTML += `<br>grain: ${Object.keys(levelJSON.events.grain).length}`
        statOutput.innerHTML += `<br>ACTUAL COOL SHIT`
        statOutput.innerHTML += `<br>MOST USED EASING`
        // console.log("Theme count:" + Object.keys(levelJSON.themes).length)*/
    }
}




// ------- LEVEL STATS -------
//  Form Chart
const xValues = [0];
const yValues = [0];

objsChart = new Chart("chartObjs", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: true,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {display: true},
    scales: {
      yAxes: [{ticks: {min: 0, max:5}}],
    },
    elements: {
        point:{
            radius: 0
        }
    },
    title: {
        text : "Object Counts Over Time",
        display: true,
    }
  }
});

// Create level chart



function makeChartObjs(inputLevel)
{
    // Make the chart visible
    document.getElementById("chartObjs").style.display = "block";
    // NOTE: Because floating point numbers are stupid, all time values represent tenths of a second until the very end

    // --- PART 1: Analyze the objects
    
    console.log("Preparing graph - PHASE 1: Object Analysis")
    timedObjects = []    
    for (i = 0; i < inputLevel.beatmap_objects.length; i++) 
    {
        
        // lifespan
        switch (inputLevel.beatmap_objects[i].akt) 
        { 
            case 0: // No autokill
            {
                console.log("wtf thats a no autokill object!!! things might get funky!")
                newLifespan = Infinity;
                break;
            }
            case 1: // Last keyframe - find the time of the last keyframe of the object
            {   // use the maximum time out of all four keyframe types
                newLifespan = 5;
                //newLifespan = Math.max(levelJSON.beatmap_objects[i].events.pos[Object.keys(levelJSON.beatmap_objects[i].events.pos).length-1].t, levelJSON.beatmap_objects[i].events.rot[Object.keys(levelJSON.beatmap_objects[i].events.rot).length-1].t, levelJSON.beatmap_objects[i].events.sca[Object.keys(levelJSON.beatmap_objects[i].events.sca).length-1].t, levelJSON.beatmap_objects[i].events.col[Object.keys(levelJSON.beatmap_objects[i].events.col).length-1].t)
                break;
            }
            case 2: // Last KF offset (same as above, but add some time)
            {
                //newLifespan = (inputLevel.beatmap_objects[i].ako + Math.max(levelJSON.beatmap_objects[i].events.pos[Object.keys(levelJSON.beatmap_objects[i].events.pos).length-1].t, levelJSON.beatmap_objects[i].events.rot[Object.keys(levelJSON.beatmap_objects[i].events.rot).length-1].t, levelJSON.beatmap_objects[i].events.sca[Object.keys(levelJSON.beatmap_objects[i].events.sca).length-1].t, levelJSON.beatmap_objects[i].events.col[Object.keys(levelJSON.beatmap_objects[i].events.col).length-1].t))                
                newLifespan = 3;
                break;
            }
            case 3: // Fixed time - pretty straightforward, just use AKO
            {
                //newLifespan = inputLevel.beatmap_objects.ako;
                newLifespan = 2;
                break;
            }
            case 4: // Song time - subtract the start time from this to get object lifespan  
            {
                newLifespan = 1;
                //newLifespan = inputLevel.beatmap_objects[i].ako - inputLevel.beatmap_objects[i].st;
                break;
            }
        }
        newObject = {
            "time": Math.round(inputLevel.beatmap_objects[i].st * 10), 
            "lifespan": newLifespan   
        }
        console.log(`Pushing object ${i} | Adjusted start time: ${newObject.time} | Dies after: ${newLifespan}`)
        timedObjects.push(newObject)
    }
    // Sort timed objects
    timedObjects.sort(function(a, b) { 
        return a.time+a.lifespan - b.time+b.lifespan;
    })

    // --- PART 2: Create the graph 
    finalTime = timedObjects[timedObjects.length-1].time + timedObjects[timedObjects.length-1].lifespan;
    trackedObjects = [];
    for(j = 0; j < finalTime ||  trackedObjects.length != 0; j +=1)
    {   
        // EXCEPTION: No objects at this time
        if ((timedObjects.length > 0) && (timedObjects[0].time != j) && (trackedObjects.length == 0))
        {
            console.log(`No objects at time ${j}!`)
            xValues.push(xValues[xValues.length-1]+1);
            yValues.push(0);
            continue;
        }
        // Check for new objects at this start time
        while (timedObjects.length > 0 && timedObjects[0].time == j)
            {
                // keeps infinite looping here.
                console.log(`Pushed an object at time ${j}!`);
                trackedObjects.push(timedObjects[0].lifespan);
                // invalid array length at 32 above
                timedObjects.shift();
            }

        console.log(`TRACKED OBJECTS RN: ${trackedObjects}`)
            
        for (i =0; i < trackedObjects.length; i++)
        {
            trackedObjects[i] = trackedObjects[i] - 0.1;  
        if (trackedObjects[i] < 0)
            {
            trackedObjects.splice(i, 1)
            }
            console.log(`Pushing value ${trackedObjects.length} at ${xValues[xValues.length-1]+1}`)
            xValues.push(xValues[xValues.length-1]+1);
            yValues.push(trackedObjects.length);
            /*if (trackedObjects.length > objsChart.scales.yAxes[0].max)
            {
                objsChart.scales.yAxes[0].max = trackedObjects.length;
            }*/
        }
    }

    
        
    console.log("mmm, refreshing!")
    // adjust the chart height here somewhere    
    objsChart.update() // refresh!
}