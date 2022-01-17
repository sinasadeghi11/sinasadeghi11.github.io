//      [count, years, yield$]    //
var avocado = [0, 5, 10]
var balsa = [0,3,200]
var banana = [0,1,3]
var breadfruit = [0,4,5]
var orange = [0,3,10]
var cacao = [0,5,5]
var dragonfruit = [0,3,3]
var jackfruit = [0,5,80]
var cedar = [0,5,300]
var mahogany = [0,15,525]
var graviola = [0,4,15]
var yuca = [0,1,2]
var database = [avocado, balsa, banana, breadfruit, orange, cacao, dragonfruit, jackfruit, cedar, mahogany, graviola, yuca]
var yield = []
var maxYears = 0;

//find longest plant life
function getMaxYears() {
    maxYears = 0
    for (var i = 0; i <database.length; i++) {
        tempYears = database[i][1]
        tempCount = database[i][0]
        if ((tempYears > maxYears) && (tempCount > 0)) {
            maxYears = tempYears;
        }
    }
    console.log("Total Years: " + maxYears)
}

//find yield value for each year
function getYield(year) {
    var yield = 0
    for (var d = 0; d < database.length; d++) {
        if ((database[d][1] == year) || (year%database[d][1]==0)) {
            yield += database[d][0]*database[d][2];
        }
    }
    return yield
}

function getTotalYield() {
    yield = []
    for (var i = 0; i <maxYears+1; i++) {
        yield[i] = getYield(i);
    }
    yield[0] = 0
}

//get tree count from user input fields
function getUserInput() {
    for (var i = 0; i <12; i++) {
        database[i][0] = document.getElementById("" + i + "").value
    }
}

function update() {
    getUserInput();
    getMaxYears();
    getTotalYield();
    drawYieldGraph();
    myChart.update()
    console.log(yield)
}

