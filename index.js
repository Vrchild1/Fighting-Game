const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576



c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.5
class Sprite {
    constructor({position, velocity, color}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackbox = {
            position: this.position,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.canAttack = true
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        //attackbox
        c.fillStyle = 'green'
        c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)
    }

    update() {
        this.draw()
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
    if(player.attackbox.position.x + player.attackbox.width >= enemy.position.x && player.attackbox.position.x <= enemy.position.x + enemy.width && player.attackbox.position.y + player.attackbox.height >= enemy.position.y && player.attackbox.position.y <= enemy.position.y + enemy.height && player.isAttacking) {
        console.log("hit")
        player.isAttacking = false
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
    }
})