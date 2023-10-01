class Sprite {
    constructor({position, ImgScr, scale = 1, Frames = 1}) {
        this.position = position
        this.height = 150
        this.width = 50
        this.Image = new Image()
        this.scale = scale
        this.Image.src = ImgScr
        this.Frames = Frames
        this.FramesCurrent = 0
        this.FramesElapsed = 0
        this.FramesHold = 5
    }
    draw() {
        c.drawImage(
            this.Image,
            this.FramesCurrent * this.Image.width/ this.Frames,
            0,
            this.Image.width / this.Frames,
            this.Image.height,
            this.position.x,
            this.position.y,
            (this.Image.width / this.Frames) * this.scale,
            this.Image.height  * this.scale)
    }

    update() {
        this.draw()
        this.FramesElapsed++
        if(this.FramesElapsed % this.FramesHold === 0){
            if(this.FramesCurrent < this.Frames - 1) {
               this.FramesCurrent++
            }
            else{
                this.FramesCurrent = 0
            }
        }
    }

}

class Fighter {
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
        this.canjump = false
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
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 91) {
            this.velocity.y = 0    
            this.canjump = true    
            console.log("true")    
        }
        else {
            this.velocity.y += gravity
            this.canjump = false
            console.log("false")
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