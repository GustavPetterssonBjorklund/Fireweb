let cursorX = 0;
let cursorY = 0;
let UpdateCursorAt = 0;

const range = 500;
const smoothing = 0.3;
const maxForce = 50;

document.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    UpdateCursorAt = performance.now();
});

function getAllItemsInContainer() {
    return Array.from(container.children);
}


const container = document.getElementById('container');

function makeBox() {
    const newBox = document.createElement('div');
    newBox.classList.add('movingBox');
    


    newBox.style.left = `${Math.random() * window.innerWidth}px`;
    newBox.style.top = `${Math.random() * window.innerHeight}px`;


    const scale = Math.min(Math.max(Math.random() * 3+1, 1), 3);

    container.appendChild(newBox);

    var endY = Math.random()*-100;
    var endX = Math.random(-1,1)*100;

    const dir1 = Math.random() < 0.5 ? -1 : 1;
    const dir2 = Math.random() < 0.5 ? -1 : 1;

    endY = endY * dir1;
    endX = endX * dir2;

    newBox.direction = {x: endX, y:endY};
    


    const duration = Math.min(Math.random()*45,)*1000;
    const startTime = performance.now();


    
    function animateBox(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = elapsedTime / duration;

        const rect = newBox.getBoundingClientRect();
        const itemX = rect.left + rect.width / 2;
        const itemY = rect.top + rect.height / 2;

        const distanceX = cursorX - itemX;
        const distanceY = cursorY - itemY;

        const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        


        if (totalDistance < range) {
    
            const force = (range / totalDistance);

            const Xforce = distanceX / totalDistance;
            const Yforce = distanceY / totalDistance;
            

            newBox.direction.x += -Math.min((Xforce * smoothing),maxForce);
            newBox.direction.y += -Math.min((Yforce * smoothing),maxForce);
           
        }
        
        newBox.style.transform = `translateX(${(newBox.direction.x* progress)}vw) translateY(${(newBox.direction.y * progress)}vh) rotate(${360 * progress}deg) scale(${scale + 0.5 * progress})`;
        
        if (elapsedTime < 2000) {
            newBox.style.opacity = `${elapsedTime / 2000}`;
        } else {
            newBox.style.opacity = `${1 - progress}`;
        }


        if (progress < 1) {
            requestAnimationFrame(animateBox);
        } else {   
            newBox.remove();
        }
    }

    requestAnimationFrame(animateBox);
}


//makeBox();
setInterval(makeBox, 1000);
