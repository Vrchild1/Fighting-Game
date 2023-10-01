function detectCollision({rectangle1, rectangle2}){
    return (
        rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y && rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

function detectWin() {
    if (player.heath === enemy.heath) {
        document.querySelector('#Result').innerHTML = 'Tie'
    }
    else if(player.heath > enemy.heath) {
        document.querySelector('#Result').innerHTML = 'Player 1 Wins'   
    }
    else{
        document.querySelector('#Result').innerHTML = 'Player 2 Wins'
    }
     document.querySelector('#Result').style.display = 'flex'
}

let gameover = false

let timer = 60
let timerId
function decreaseTimer() {
    if(gameover === false){
        timerId = setTimeout(decreaseTimer, 1000)
        console.log(gameover)
    }
    if(timer > 0 && gameover === false) {
        timer--
        document.querySelector('#Timer').innerHTML = timer
    }
    if(timer === 0 && gameover === false){
        detectWin()
        gameover = true
    }
    
}