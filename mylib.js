export const passGen = (bloc, char, num, wcase, sep) => {

    var alpha = "abcdefghijklmnopqrstuwxyz",
        sepChar = ['-', '.', '_', '@', ''],
        pass = []

    for (var i = 0; i < char * bloc; i++) {
        if (wcase === '0') {
            pass[i] = alpha[Math.floor(25 * Math.random())]
        } else if (wcase === '1') {
            pass[i] = (alpha[Math.floor(25 * Math.random())]).toUpperCase()
        } else {
            Math.floor(2 * Math.random()) ?
                pass[i] = alpha[Math.floor(25 * Math.random())] :
                pass[i] = (alpha[Math.floor(25 * Math.random())]).toUpperCase()
        }
    }

    if (num > 0) {
        var i = 0
        while (i < num & i < (char * bloc)) {
            var aux = Math.floor((char * bloc) * Math.random())
            if (isNaN(pass[aux])) {
                pass[aux] = Math.floor(10 * Math.random())
                i++
            }
        }
    }

    if (bloc > 1) {
        for (var i = 1, j = 0; i < bloc; i++, j++) {
            pass.splice((char * i) + j, 0, sepChar[sep])
        }
    }

    return pass.join('')

}
