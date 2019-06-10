//SF Web Training 2019, Assignment 3 by Rohit

//auto opening when one win and one locked

var a = [0, 0]
var b = [30, 30]
var dice = 0
var playerA = 1
var openA = [0,0]
var openB = [0,0]
var vf1

const showAlert = (msg) => {
    alertBox = document.getElementById('alert-wrapper')
    alertMsg = document.getElementById('alert-msg')
    alertBox.style.display = 'block'
    alertMsg.innerHTML = msg

    setTimeout(closeAlert,2000)
}

const ShowOver = (msg) => {
    goScreen = document.getElementById('game-over')
    goRes = document.getElementById('go-res')
    
    goScreen.style.display = 'block'
    goRes.innerHTML = msg ? 'Player A won ✨' : 'Player B won ✨'
    
}

const GreetKilling = () => {
    killScreen = document.getElementById('kill-greet')
    killMsg = document.getElementById('kill-msg')

    killScreen.style.display = 'block'
    killMsg.innerHTML = `Player ${playerA ? 'A' : 'B'} just killed a token.`
    
    setTimeout(() => {
        killScreen.style.display = 'none'
    },2000)
}

const closeAlert = () => {
    alertBox = document.getElementById('alert-wrapper')
    alertBox.style.display = 'none'
}

const closeWelcome = () => {
    wwrap = document.getElementById('welcome-wrap')
    wwrap.style.display = 'none'
}

const RollDice = () => {

    var playerTurn = document.getElementById('playerTurn')
    var rollInst = document.getElementById('rollInst')
    var btn = document.getElementById('rollBtn')
    var diceVal = document.getElementById('diceVal')
    vf1 = 0
    btn.disabled = true
    btn.innerText = 'Waiting...'

    dice = Math.floor(Math.random()*6) + 1

    //To set value of dice alternatively
    
    diceCustom = document.getElementById('diceCustom').value

    if(diceCustom!== '') dice = Number(diceCustom)

    diceVal.innerHTML = dice
    playerTurn.innerHTML = `Player ${playerA ? 'A' : 'B'}'s turn`
    rollInst.innerHTML = 'Move your token'

    if(dice == 6) {
        if(autoOpening(playerA)) {
            showAlert('Token moved automatically')
            vf1 = 1
            return MoveToken(null)
        }
    }

    if(dice !== 6){
        if(!movable(playerA)){
            showAlert('Not movable')
            updateBoard(null)
            vf1 = 1
            return MoveToken(null)
        }
    }

    if(checkAfterOneWin()){
        return MoveToken(null)
    }

    if(playerA && (a[0] == -1 || a[1] == -1) ){
        if(a[0] == -1){
            MoveToken(String(a[1]))
        }
        if(a[1] == -1){
            MoveToken(String(a[0]))
        }
    }

    if(!playerA && (b[0] == -2 || b[1] == -2) ){
        if(b[0] == -2){
            MoveToken(String(b[1]))
        }
        if(b[1] == -2){
            MoveToken(String(b[0]))
        }
    }

    if(checkStuck()){
        // console.log('Stuck')
        return MoveToken(null)
    }

    if(playerA && dice !== 6){
        if(a[0] == 0 && a[1]>=1 && a[1]<=27){
            return MoveToken(String(a[1]))
        }
        if(a[1] == 0 && a[0]>=1 && a[0]<=27){
            return MoveToken(String(a[0]))
        }
    }else
    if(!playerA && dice !== 6){
        if(b[0] == 30 && b[1]>=1 && b[1]<=27){
            return MoveToken(String(b[1]))
        }
        if(b[1] == 30 && b[0]>=1 && b[0]<=27){
            return MoveToken(String(b[0]))
        }
    }

    updateBoard(null)

}

const checkStuck = () => {
    if(playerA){
        if( (a[0] >= 22 && a[1] >= 22) && (a[0] + dice > 28) && (a[1] + dice > 28) ){
            return 1
        }else
        if( a[0] >= 22 && a[0] + dice > 28 && a[1] == -1 ){
            return 1
        }else
        if( a[1] >= 22 && (a[1] + dice > 28) && (a[0] == -1) ){
            return 1
        }
    }else
    if(!playerA){
        if( (b[0] >= 8 && b[1] >= 8 && b[0] < 15 && b[1] < 15) && (b[0] + dice > 14) && (b[1] + dice > 14) ){
            return 1
        }else
        if( b[0] >= 8 && b[0] < 15 && b[0] + dice > 14 && (b[1] == -2) ){
            return 1
        }else
        if( b[1] >= 8 && b[1] < 15 && b[1] + dice > 14 && (b[0] == -2) ){
            return 1
        }
    }else return 0
}


const autoOpening = (playerA) => {
    flag = 0
    if(playerA && openA[0] == 0 && openA[1] == 0){
        updateBoard(a[0])
        a[0]=1
        openA[0] = 1
        updateBoard(null)
        flag = 1
        return 1
    }
    if((a[1] == -1) && playerA && (a[0] == 0)){
        updateBoard(a[0])
        a[0] = 1
        openA[0] = 1
        updateBoard(null)
        flag = 1
        return 1
    }
    if((a[0] == -1) && playerA && (a[1] == 0)){
        updateBoard(a[1])
        a[1] = 1
        openA[1] = 1
        updateBoard(null)
        flag = 1
        return 1
    }
    if((b[1] == -2) && !playerA && (b[0] == 30)){
        updateBoard(b[0])
        b[0] = 15
        openB[0] = 1
        updateBoard(null)
        flag = 1
        return 1
    }
    if((b[0] == -2) && !playerA && (b[1] == 30)){
        updateBoard(b[1])
        b[1] = 15
        openB[1] = 1
        updateBoard(null)
        flag = 1
        return 1
    }
    if(!playerA && openB[0] == 0 && openB[1] == 0){
        updateBoard(b[0])
        b[0]=15
        openB[0] = 1
        updateBoard(null)
        flag = 1
        return 1
    }
    if(!flag) return 0
}

const validateToken = (id) => {
    if(playerA && (a[0] == id || a[1] == id)){
        return 1
    }
    if(!playerA && (b[0] == id || b[1] == id)){
        return 1
    }
    return 0
}

const checkOpening = (id) => {
    fl = 0
    if(playerA && id==0 && dice !== 6 ){
        fl = 1
        return 1
    }
    if(!playerA && id==30 && dice !== 6 ){
        fl = 1
        return 1
    }
    if(!fl) return 0
}

const movable = (playerA) => {
    if(playerA && openA[0] == 0 && openA[1] == 0){
        return 0
    }else
    if(!playerA && openB[0] == 0 && openB[1] == 0){
        return 0
    }else
    if(playerA && a[1] == 0 && openA[0] == 1 && (a[0] + dice > 28) && a[0]>=22){
        return 0
    }else
    if(playerA && a[0] == 0 && openA[1] == 1 && (a[1] + dice > 28) && a[1]>=22){
        return 0 
    }else
    if(!playerA && b[0] == 30 && openB[1] == 1 && (b[1] + dice > 14) && ( b[1]>=8 && b[1] < 15 )){

    }else
    if(!playerA && b[1] == 30 && openB[0] == 1 && (b[0] + dice > 14) && ( b[0]>=8 && b[0] < 15 )){
        return 0
    }else
    if(playerA && a[1] == -1 && openA[0] == 1 && (a[0] + dice > 28) && a[0]>=22){
        return 0
    }else
    if(playerA && a[0] == -1 && openA[1] == 1 && (a[1] + dice > 28) && a[1]>=22){
        return 0 
    }else
    if(!playerA && b[0] == -2 && openB[1] == 1 && (b[1] + dice > 14) && ( b[1]>=8 && b[1] < 15 )){

    }else
    if(!playerA && b[1] == -2 && openB[0] == 1 && (b[0] + dice > 14) && ( b[0]>=8 && b[0] < 15 )){
        return 0
    }else return 1
}

const checkFinalWinner = (playerA, id) => {
    if(playerA){
        if(a[0] == -1 && a[1] == -1) return 1
    }else
    if(!playerA){
        if(b[0] == -2 &&  b[1] == -2) return 1
    }else return 0
}

const checkWinner = (playerA, id) => {
    if(playerA){
        if(a[0] == 28 && id == a[0] - dice ){
            updateBoard(a[0])
            a[0] = -1
            return 1
        }else
        if(a[1] == 28 && id == a[1] - dice){
            updateBoard(a[1])
            a[1] = -1
            return 1
        }
    }else
    if(!playerA){
        if(b[0] == 14 && id == b[0] - dice){
            updateBoard(b[0])
            b[0] = -2
            return 1
        }else
        if(b[1] == 14 && id == b[1] - dice){
            updateBoard(b[1])
            b[1] = -2
            return 1
        }
    }else return 0
}

const checkKilling = (id) => {
    if(playerA){
        if( b[0] == id + dice && b[0] !== 30 && b[0] !== 15 && b[0] == b[1]){
            updateBoard(b[0])
            updateBoard(b[1])
            openB[0] = 0
            openB[1] = 0
            b[0] = 30
            b[1] = 30
            return 1
        }else
        if( b[0] == id + dice && b[0] !== 30 && b[0] !== 15){
            updateBoard(b[0])
            openB[0] = 0
            b[0] = 30
            return 1
        }else
        if( b[1] == id + dice && b[1] !== 30 && b[1] !== 15){
            updateBoard(b[1])
            openB[1] = 0
            b[1] = 30
            return 1
        }
    }else if(!playerA){
        if( a[0] == id + dice && a[0] !== 1 && a[0] == a[1]){
            updateBoard(a[0])
            updateBoard(a[1])
            openA[0] = 0
            openA[1] = 0
            a[0] = 0
            a[1] = 0
            return 1
        }else
        if( a[0] == id + dice && a[0] !== 1){
            updateBoard(a[0])
            openA[0] = 0
            a[0] = 0
            return 1
        }else
        if( a[1] == id + dice && a[1] !== 1){
            updateBoard(a[1])
            openA[1] = 0
            a[1] = 0
            return 1
        }
    }else return 0
}

const checkAfterOneWin = () => {
    if(playerA && a[0] == -1 && a[1] == 0 && dice!==6){
        return 1
    }else if(!playerA && b[0] == -2 && b[1] == 30 && dice!==6){
        return 1
    }else
    if(playerA && a[1] == -1 && a[0] == 0 && dice!==6){
        return 1
    }else if(!playerA && b[1] == -2 && b[0] == 30 && dice!==6){
        return 1
    }else return 0
}



//MoveToken(), the heart of the game

const MoveToken = (e) => {
    
    if(e !== null) id = Number(e)

    var playerTurn = document.getElementById('playerTurn')
    var rollInst = document.getElementById('rollInst')
    var btn = document.getElementById('rollBtn')
    var opened = 0
    var vkill = 0

    if(e == null) {
        btn.disabled = false
        btn.innerText = 'ROLL'
        playerA = !playerA
    
        rollInst.innerHTML = 'Roll the die'
        playerTurn.innerHTML = `Player ${playerA ? 'A' : 'B'}'s turn`
    
        if(playerA) {
            document.getElementById('playerTurn').style.color = '#67e'
        }
        if(!playerA) {
            document.getElementById('playerTurn').style.color = '#e56'
        }   
        return
    }

    if(vf1 == 1){
        showAlert('Warning: Roll the dice again.')
        return
    }

    if(dice == 0) {
        showAlert('Error: Invalid Dice Entry')
        return
    }

    if(!validateToken(id)) {
        showAlert('Error: Token not validated. Only move your tokens')
        return
    }

    if(checkOpening(id)){
        showAlert('Warning: Token can only be opened at 6!')
        return
    }

    if(checkKilling(id)){
        GreetKilling()
        vkill = 1
    }

    if( (playerA && (a[0] + dice > 28 && a[0] == id) || (a[1] + dice > 28 && a[1] == id) ) || (( (b[0] + dice > 14 && b[0] == id) || (b[1] + dice > 14 && b[1] == id) ) && id<14 && id> 1 && !playerA )){
        showAlert('Error: Cannot move that token')
        return
    }else
    if(playerA && a[1] == 0 && openA[1] == 0 && id==0){
        updateBoard(a[1])
        a[1] = 1
        openA[1] = 1
        opened = 1
    }else
    if(!playerA && b[1] == 30 && openB[1] == 0 && id==30){
        updateBoard(b[1])
        b[1] = 15
        openB[1] = 1
        opened = 1
    }else
    if((playerA && (id == a[0] || id==a[1])) || (!playerA && (id == b[0] || id==b[1])) ){
        
        if(id == a[0]){
            updateBoard(a[0])
            a[0]+=dice
        }else
        if(id == a[1]){
            updateBoard(a[1])
            a[1]+=dice
        }else
        if(id == b[0]){
            updateBoard(b[0])
            b[0]+=dice
            if(b[0]>28) b[0] = b[0]%28
        }else
        if(id == b[1]){
            updateBoard(b[1])
            b[1]+=dice
            if(b[1]>28) b[1] = b[1]%28
        }
    }

    //main logic ends here

    if(checkWinner(playerA, id)){
        showAlert('Token completed!')
    }

    if(checkFinalWinner(playerA, id)){
        // console.log('Game Over')
        ShowOver(playerA)
    }

    btn.disabled = false
    btn.innerText = 'ROLL'

    vf1 = 1
    if(dice == 6 && opened!==1){
        return RollDice()
    }

    playerA = !playerA

    rollInst.innerHTML = 'Roll the die'
    playerTurn.innerHTML = `Player ${playerA ? 'A' : 'B'}'s turn`

    if(playerA) {
        document.getElementById('playerTurn').style.color = '#67e'
    }
    if(!playerA) {
        document.getElementById('playerTurn').style.color = '#e56'
    }

    updateBoard(null)
}

const updateBoard = (e) => {

    if(a[1] == a[0]){
        document.getElementById(String(a[0])).innerHTML = '2A'
        if(a[0] !==0){
            document.getElementById(String(a[0])).classList.add('a-active')
        }
    }
    else {
    document.getElementById(String(a[0])).innerHTML = '1A'
    document.getElementById(String(a[1])).innerHTML = '1A'

    if(a[0] !==0){
        document.getElementById(String(a[0])).classList.add('a-active')
    }
    if(a[1] !== 0){
        document.getElementById(String(a[1])).classList.add('a-active')
    }
    }
    if(b[1] == b[0]){
        document.getElementById(String(b[0])).innerHTML = '2B'
        if(b[0] !== 30){
            document.getElementById(String(b[0])).classList.add('b-active')
        }
    }
    else {
    document.getElementById(String(b[0])).innerHTML = '1B'
    document.getElementById(String(b[1])).innerHTML = '1B'

    if(b[0]!==30){
        document.getElementById(String(b[0])).classList.add('b-active')
    }
    if(b[1] !== 30){
        document.getElementById(String(b[1])).classList.add('b-active')
    }
}

    if(e!== null){
        // console.log("value of e = "+e)
        document.getElementById(String(e)).innerHTML = ''
        document.getElementById(String(e)).classList.remove('a-active')
        document.getElementById(String(e)).classList.remove('b-active')
    }

}