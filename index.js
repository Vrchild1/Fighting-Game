const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576



c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.5
class Sprite {
    constructor({position, velocity, color, offset}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.canAttack = true
        this.heath = 100
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        //attackbox
        if(this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)
        }
    }

    update() {
        this.draw()
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0            
        }
        else {
            this.velocity.y += gravity
        }
    }
    attack() {
        if(this.canAttack){
            this.isAttacking = true
            setTimeout(() => {
                this.isAttacking = false
            }, 100)
        }
    }
}



const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    color: 'red'
})



const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'blue'
})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

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




decreaseTimer()


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle ='black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    enemy.velocity.x = 0
    player.velocity.x = 0

    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    }
    else if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
    else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }

    //collision
    if(detectCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking) {
        enemy.heath -= 20
        document.querySelector('#EnemyHealth').style.width = enemy.heath + '%'
        player.isAttacking = false
    }
    if(detectCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking) {
        player.heath -= 20
        document.querySelector('#PlayerHealth').style.width = player.heath + '%'
        enemy.isAttacking = false
    }

    if(enemy.heath <=0 || player.heath <= 0){
        detectWin(timerId)
        gameover = true
    }  
}

animate()

window.addEventListener('keydown', (keyinfo) => {
    switch (keyinfo.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case 'w':
            if(player.velocity.y === 0){
                player.velocity.y = -15
            }
            break;
        case ' ':
            player.attack()
            player.canAttack = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            if(enemy.velocity.y === 0){
                enemy.velocity.y = -15
            }
            break;
        case 'ArrowDown':
            enemy.attack()
            enemy.canAttack = false
            break;

    }
})
     
window.addEventListener('keyup', (keyinfo) => {
    switch (keyinfo.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case ' ':
            player.canAttack = true
            break;
    }
    switch (keyinfo.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowDown':
            enemy.canAttack = true
            break;
    }
})
