
"use client";
import { useEffect } from 'react';

const FlappyBird = () => {
    useEffect(() => {
        
        let board;
        let boardWidth = 360;
        let boardHeight = 640;
        let context;

        //bird
        let birdWidth = 34;
        let birdHeight = 34;
        let birdX = boardWidth / 8;
        let birdY = boardHeight / 2;
        let birdImg;

        let bird = {
            x: birdX,
            y: birdY,
            width: birdWidth,
            height: birdHeight
        };

        //pipes
        let pipeArray = [];
        let pipeWidth = 64;
        let pipeHeight = 512;
        let pipeX = boardWidth;
        let pipeY = 0;

        let topPipeImg;
        let bottomPipeImg;

        //physics
        let velocityX = -2;
        let velocityY = 0;
        let gravity = 0.4;

        let gameOver = false;
        let score = 0;

        const loadImage = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
            });
        };

        const loadImages = async () => {
            birdImg = await loadImage('/pixel-rocket.png');
            topPipeImg = await loadImage('/toppipe.png');
            bottomPipeImg = await loadImage('/bottompipe.png');

            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

            requestAnimationFrame(update);
            setInterval(placePipes, 2500);//separation of tubes
            document.addEventListener('click', moveBird);
        };

        const update = () => {
            requestAnimationFrame(update);
            if (gameOver) {
                return;
            }
            context.clearRect(0, 0, board.width, board.height);

            //bird
            velocityY += gravity;
            bird.y = Math.max(bird.y + velocityY, 0);
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

            if (bird.y > board.height) {
                gameOver = true;
            }

            //pipes
            for (let i = 0; i < pipeArray.length; i++) {
                let pipe = pipeArray[i];
                pipe.x += velocityX;
                context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

                if (!pipe.passed && bird.x > pipe.x + pipe.width) {
                    score += 0.5;
                    pipe.passed = true;
                }

                if (detectCollision(bird, pipe)) {
                    gameOver = true;
                }
            }

            //clear pipes
            while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
                pipeArray.shift();
            }
            // Calcula la posición x para centrar el texto en el canvas
            const centerX = (boardWidth - context.measureText(score).width) / 2;
            //score
            context.fillStyle = 'white';
            context.font = 'bold 45px sans-serif';
            context.shadowColor = 'black'; // Color de la sombra en negro
            context.shadowOffsetX = 2; // Desplazamiento horizontal de la sombra
            context.shadowOffsetY = 2; // Desplazamiento vertical de la sombra
            context.shadowBlur = 4; // Difuminado de la sombra
            context.fillText(score, centerX, 45);

            // Calcula la posición x para centrar el texto "GAME OVER" en el canvas
            const centerXGameOver = (boardWidth - context.measureText('GAME OVER').width) / 2;
            // Calcula la posición y para centrar verticalmente el texto "GAME OVER" en el canvas
            const centerYGameOver = (boardHeight - 45) / 2; // 45 es el tamaño de la fuente
            if (gameOver) {
                context.fillText('GAME OVER', centerXGameOver, centerYGameOver);
                context.fillText(score, centerX, 45);
            }
        };

        const placePipes = () => {
            if (gameOver) {
                return;
            }

            let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
            let openingSpace = board.height / 3; // Increase the separation here

            let topPipe = {
                img: topPipeImg,
                x: pipeX,
                y: randomPipeY,
                width: pipeWidth,
                height: pipeHeight,
                passed: false
            };
            pipeArray.push(topPipe);

            let bottomPipe = {
                img: bottomPipeImg,
                x: pipeX,
                y: randomPipeY + pipeHeight + openingSpace,
                width: pipeWidth,
                height: pipeHeight,
                passed: false
            };
            pipeArray.push(bottomPipe);
        };

        const moveBird = () => {
            velocityY = -6;

            if (gameOver) {
                bird.y = birdY;
                pipeArray = [];
                score = 0;
                gameOver = false;
            }
        };

        const detectCollision = (a, b) => {
            return a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y;
        };

        board = document.getElementById('board');
        board.height = boardHeight;
        board.width = boardWidth;
        context = board.getContext('2d');

        loadImages();
    }, []);

    return <canvas id="board" className="board"></canvas>;
};

export default FlappyBird;
