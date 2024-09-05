/**
 * @brief This script is used to create a moving box that can be pushed by the cursor.
 *
 * 
 * @todo Make the makeVerteciesOfBox to implement box to box collision.
 */


/*global varables for the cursor position*/
let cursorX = 0;
let cursorY = 0;

/*Global constants to save on performance*/
const range = 500;
const smoothing = 0.3;
const maxForce = 50;



/**
 * @brief Event listener to update the cursor position.
 * 
 */
document.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
});



/**
 * @brief retrive the container elements from index.html.
 * @type {HTMLElement}
 */
const container = document.getElementById('container');
const container_testing = document.getElementById('container_testing');



function makeVerteciesOfBox(newBox) {

}


/**
 * @brief Function to create a new moving box with all the required properties.
 * 
 * @details This function creates a new div element with the class 'movingBox' and appends it to the container element.
 * making sure to randomize all the starting conditions such as position, scale, and direction.
 * 
 * @note This function also creates a recursive loop to render the next frame of the box that runs until the box has reached the end of its life.
 */
function makeBox() {
    /*make the element*/
    const newBox = document.createElement('div');
    newBox.classList.add('movingBox');
    

    /*randomize the starting position*/
    newBox.style.left = `${Math.random() * window.innerWidth}px`;
    newBox.style.top = `${Math.random() * window.innerHeight}px`;

    /*randomize the scale of the box with a bias*/
    const scale = Math.min(Math.max(Math.random() * 3+1, 1), 3);


    container.appendChild(newBox);

    /*makes a vector pointing to the endpoint for the box*/
    var endY = Math.random()*-100;
    var endX = Math.random(-1,1)*100;

    const dir1 = Math.random() < 0.5 ? -1 : 1;
    const dir2 = Math.random() < 0.5 ? -1 : 1;

    endY = endY * dir1;
    endX = endX * dir2;

    newBox.direction = {x: endX, y:endY};
    
    const duration = Math.min(Math.random()*45,)*1000;

    /*get the start time of the box to give it a refernce for end of life*/
    const startTime = performance.now();





    /**
     * @brief Function to render the next fram of the box.
     * 
     * @param {number} currentTime The current time in milliseconds.
     * @details This function calculates the distance between the box and the cursor and applies a proportional force to the box relatice to the distance. 
     * pointing in the opposite direction of the cursor. Which changes the path of the box. It then renders the next frame of the box and checks if the box has reached the end of its life.
     * If the box has reached it's end of life it removes the box from the container, freeing up the memory.
    */    
    function animateBox(currentTime) {

        /*Calculate the time elapsed since the box was created*/
        const elapsedTime = currentTime - startTime;
        const progress = elapsedTime / duration;


        /*variable to store the rotation of the box*/
        var rotataion = 0;
        
        /*Calculate position of the center of the box*/
        const rect = newBox.getBoundingClientRect();
        const itemX = rect.left + rect.width / 2;
        const itemY = rect.top + rect.height / 2;

        /*Calculate the distance between the cursor and the center of the box*/
        const distanceX = cursorX - itemX;
        const distanceY = cursorY - itemY;

        /*Calculate the total distance between the cursor and the center of the box*/
        const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        

        /**
         * @brief Checks if a force should be applied to the box (if the box is within the cursors filed of effect).
         * 
         * @details Checks if a force should be applied to the box (if the box is within the cursors filed of effect). 
         * If the statement returns true, it will calculate the force to be applied to the box and apply it to the box. 
         * Saving of performance by not calculating a force if the box is out of range
         */
        if (totalDistance < range) {

            const Xforce = distanceX / totalDistance;
            const Yforce = distanceY / totalDistance;
            
            /*Apply the X and Y forces to the box*/
            newBox.direction.x += -Math.min((Xforce * smoothing),maxForce);
            newBox.direction.y += -Math.min((Yforce * smoothing),maxForce);
           
        }
        /*get the next frame of the box*/
        newBox.style.transform = `translateX(${(newBox.direction.x* progress)}vw) translateY(${(newBox.direction.y * progress)}vh) rotate(${360 * progress}deg) scale(${scale + 0.5 * progress})`;
        rotataion += 360 * progress;
        console.log(rotataion);
        /*Fade the box in and out*/
        if (elapsedTime < 2000) {
            newBox.style.opacity = `${elapsedTime / 2000}`;
        } else {
            newBox.style.opacity = `${1 - progress}`;
        }

        /*remove box if it has reached the end of its life*/
        if (progress < 1) {
            /*animate the next frame of the box*/
            requestAnimationFrame(animateBox);
        } else {   
            newBox.remove();
        }
    }
    /*start a recursive loop to render the next frame of the box*/
    requestAnimationFrame(animateBox);
}


/*Create a new box at interval*/
setInterval(makeBox, 1000);
//makeBox();