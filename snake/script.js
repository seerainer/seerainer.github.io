class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game settings
        this.gridSize = 20;
        this.tileCount = {
            x: this.canvas.width / this.gridSize,
            y: this.canvas.height / this.gridSize
        };
        
        // Game state
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameLoop = null;
        
        // Initialize game objects
        this.initializeGame();
        this.setupEventListeners();
        this.setupKeyboardControls();
        
        // Draw initial state
        this.draw();
    }
    
    initializeGame() {
        // Player 1 Snake (Green) - starts moving right
        this.snake1 = {
            x: 10,
            y: 15,
            dx: 1,  // Start moving right
            dy: 0,
            tail: [],
            maxTail: 5,
            color: '#4CAF50',
            length: 5
        };
        
        // Player 2 Snake (Blue) - starts moving left
        this.snake2 = {
            x: 30,
            y: 15,
            dx: -1,  // Start moving left
            dy: 0,
            tail: [],
            maxTail: 5,
            color: '#2196F3',
            length: 5
        };
        
        // Add initial tail segments
        for (let i = 0; i < 4; i++) {
            this.snake1.tail.push({ x: this.snake1.x - i - 1, y: this.snake1.y });
            this.snake2.tail.push({ x: this.snake2.x + i + 1, y: this.snake2.y });
        }
        
        // Food
        this.food = {
            x: 20,
            y: 20,
            color: '#FF6B6B'
        };
        
        this.generateFood();
        this.updateLengthDisplay();
    }
    
    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.restartGame());
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning || this.gamePaused) return;
            
            // Player 1 controls (WASD)
            switch(e.key.toLowerCase()) {
                case 'w':
                    if (this.snake1.dy !== 1) {
                        this.snake1.dx = 0;
                        this.snake1.dy = -1;
                    }
                    break;
                case 's':
                    if (this.snake1.dy !== -1) {
                        this.snake1.dx = 0;
                        this.snake1.dy = 1;
                    }
                    break;
                case 'a':
                    if (this.snake1.dx !== 1) {
                        this.snake1.dx = -1;
                        this.snake1.dy = 0;
                    }
                    break;
                case 'd':
                    if (this.snake1.dx !== -1) {
                        this.snake1.dx = 1;
                        this.snake1.dy = 0;
                    }
                    break;
            }
            
            // Player 2 controls (Arrow keys)
            switch(e.key) {
                case 'ArrowUp':
                    if (this.snake2.dy !== 1) {
                        this.snake2.dx = 0;
                        this.snake2.dy = -1;
                    }
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    if (this.snake2.dy !== -1) {
                        this.snake2.dx = 0;
                        this.snake2.dy = 1;
                    }
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    if (this.snake2.dx !== 1) {
                        this.snake2.dx = -1;
                        this.snake2.dy = 0;
                    }
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    if (this.snake2.dx !== -1) {
                        this.snake2.dx = 1;
                        this.snake2.dy = 0;
                    }
                    e.preventDefault();
                    break;
            }
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('restartBtn').disabled = false;
        document.getElementById('gameOverScreen').classList.add('hidden');
        
        this.gameLoop = setInterval(() => {
            this.update();
            this.draw();
        }, 150);
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            clearInterval(this.gameLoop);
            document.getElementById('pauseBtn').textContent = 'Resume';
        } else {
            this.gameLoop = setInterval(() => {
                this.update();
                this.draw();
            }, 150);
            document.getElementById('pauseBtn').textContent = 'Pause';
        }
    }
    
    restartGame() {
        clearInterval(this.gameLoop);
        this.gameRunning = false;
        this.gamePaused = false;
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('restartBtn').disabled = true;
        document.getElementById('pauseBtn').textContent = 'Pause';
        document.getElementById('gameOverScreen').classList.add('hidden');
        
        this.initializeGame();
        this.draw();
    }
    
    wrapPosition(x, y) {
        // Handle wrap-around for positions
        if (x < 0) {
            x = this.tileCount.x - 1;
        } else if (x >= this.tileCount.x) {
            x = 0;
        }
        
        if (y < 0) {
            y = this.tileCount.y - 1;
        } else if (y >= this.tileCount.y) {
            y = 0;
        }
        
        return { x, y };
    }
    
    update() {
        if (!this.gameRunning || this.gamePaused) return;
        
        // Calculate next positions for both snakes
        const nextPos1 = this.wrapPosition(this.snake1.x + this.snake1.dx, this.snake1.y + this.snake1.dy);
        const nextPos2 = this.wrapPosition(this.snake2.x + this.snake2.dx, this.snake2.y + this.snake2.dy);
        
        // Check for head-to-head collision BEFORE moving
        if (nextPos1.x === nextPos2.x && nextPos1.y === nextPos2.y) {
            this.gameOver('tie');
            return;
        }
        
        // Move snakes
        this.moveSnake(this.snake1);
        this.moveSnake(this.snake2);
        
        // Check food collision
        this.checkFoodCollision(this.snake1);
        this.checkFoodCollision(this.snake2);
        
        // Check head-to-body collisions AFTER moving
        const collisionResult = this.checkBodyCollisions();
        if (collisionResult.collision) {
            this.gameOver(collisionResult.type);
        }
    }
    
    moveSnake(snake) {
        // Only move if the snake has a direction
        if (snake.dx === 0 && snake.dy === 0) return;
        
        // Add current position to tail
        snake.tail.push({ x: snake.x, y: snake.y });
        
        // Move snake head
        snake.x += snake.dx;
        snake.y += snake.dy;
        
        // Wrap around walls
        const wrappedPos = this.wrapPosition(snake.x, snake.y);
        snake.x = wrappedPos.x;
        snake.y = wrappedPos.y;
        
        // Remove tail segments beyond max length
        if (snake.tail.length > snake.maxTail) {
            snake.tail.shift();
        }
    }
    
    checkFoodCollision(snake) {
        if (snake.x === this.food.x && snake.y === this.food.y) {
            snake.maxTail++;
            snake.length++;
            this.generateFood();
            this.updateLengthDisplay();
        }
    }
    
    checkBodyCollisions() {
        // Only check collisions if snakes are moving
        if ((this.snake1.dx === 0 && this.snake1.dy === 0) || 
            (this.snake2.dx === 0 && this.snake2.dy === 0)) {
            return { collision: false };
        }
        
        // Check if snake1 hits snake2's body (snake1 loses)
        for (let segment of this.snake2.tail) {
            if (this.snake1.x === segment.x && this.snake1.y === segment.y) {
                return { collision: true, type: 'snake1_loses' };
            }
        }
        
        // Check if snake2 hits snake1's body (snake2 loses)
        for (let segment of this.snake1.tail) {
            if (this.snake2.x === segment.x && this.snake2.y === segment.y) {
                return { collision: true, type: 'snake2_loses' };
            }
        }
        
        return { collision: false };
    }
    
    generateFood() {
        this.food.x = Math.floor(Math.random() * this.tileCount.x);
        this.food.y = Math.floor(Math.random() * this.tileCount.y);
        
        // Make sure food doesn't spawn on snakes
        let foodOnSnake = false;
        
        // Check snake1 head
        if (this.food.x === this.snake1.x && this.food.y === this.snake1.y) {
            foodOnSnake = true;
        }
        
        // Check snake1 tail
        for (let segment of this.snake1.tail) {
            if (this.food.x === segment.x && this.food.y === segment.y) {
                foodOnSnake = true;
                break;
            }
        }
        
        // Check snake2 head
        if (this.food.x === this.snake2.x && this.food.y === this.snake2.y) {
            foodOnSnake = true;
        }
        
        // Check snake2 tail
        for (let segment of this.snake2.tail) {
            if (this.food.x === segment.x && this.food.y === segment.y) {
                foodOnSnake = true;
                break;
            }
        }
        
        // If food spawned on snake, generate new position
        if (foodOnSnake) {
            this.generateFood();
        }
    }
    
    updateLengthDisplay() {
        document.getElementById('length1').textContent = this.snake1.length;
        document.getElementById('length2').textContent = this.snake2.length;
    }
    
    gameOver(collisionType) {
        clearInterval(this.gameLoop);
        this.gameRunning = false;
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('restartBtn').disabled = true;
        
        // Show game over screen
        document.getElementById('finalLength1').textContent = this.snake1.length;
        document.getElementById('finalLength2').textContent = this.snake2.length;
        
        // Determine winner based on collision type
        let message = '';
        switch(collisionType) {
            case 'tie':
                message = "It's a Tie! Head-to-Head Collision!";
                break;
            case 'snake1_loses':
                message = "Player 2 Wins! Player 1 Collided!";
                break;
            case 'snake2_loses':
                message = "Player 1 Wins! Player 2 Collided!";
                break;
            default:
                message = "Game Over!";
        }
        
        document.getElementById('gameOverMessage').textContent = message;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid lines (optional)
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.tileCount.x; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
        }
        for (let i = 0; i <= this.tileCount.y; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
        
        // Draw food
        this.ctx.fillStyle = this.food.color;
        this.ctx.shadowColor = this.food.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(
            this.food.x * this.gridSize + 2,
            this.food.y * this.gridSize + 2,
            this.gridSize - 4,
            this.gridSize - 4
        );
        this.ctx.shadowBlur = 0;
        
        // Draw snakes
        this.drawSnake(this.snake1);
        this.drawSnake(this.snake2);
    }
    
    drawSnake(snake) {
        this.ctx.fillStyle = snake.color;
        
        // Draw tail
        for (let segment of snake.tail) {
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        }
        
        // Draw head with glow effect
        this.ctx.shadowColor = snake.color;
        this.ctx.shadowBlur = 15;
        this.ctx.fillRect(
            snake.x * this.gridSize + 1,
            snake.y * this.gridSize + 1,
            this.gridSize - 2,
            this.gridSize - 2
        );
        this.ctx.shadowBlur = 0;
        
        // Draw eyes on head
        this.ctx.fillStyle = '#fff';
        const eyeSize = 3;
        const eyeOffset = 5;
        this.ctx.fillRect(
            snake.x * this.gridSize + eyeOffset,
            snake.y * this.gridSize + eyeOffset,
            eyeSize,
            eyeSize
        );
        this.ctx.fillRect(
            snake.x * this.gridSize + this.gridSize - eyeOffset - eyeSize,
            snake.y * this.gridSize + eyeOffset,
            eyeSize,
            eyeSize
        );
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});