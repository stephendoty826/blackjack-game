

function shuffleArray(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}


// arr.length = 5

// i = 4

array = [1, 2, 3, 4, 5]

for (var i = array.length - 1; i > 0; i--) { // i = 4 
    var j = Math.floor(Math.random() * (i + 1)) // j = some random number (Math.floor(Math.random() * (4 + 1))) let's assume j = 2
    var temp = array[i] // temp = 5
    array[i] = array[j] // array[4] = 3 (array[2])
    array[j] = temp // array[2] = 5
}
