document.addEventListener('DOMContentLoaded', () => {
    let currentFloor = 0;
    let elevatorCapacity = 5;
    let currentLoad = 0;
    let calls = [];
    
    const floors = ['0', '1', '2', '3', '4', '5'];
    const modal = document.getElementById('floorSelectionModal');
    const floorButtonsContainer = document.getElementById('floorButtonsContainer');
    const countdownElement = document.getElementById('countdown');
    const cancelButton = document.getElementById('cancelButton');
    
    let countdownInterval;
    
    floors.forEach(floor => {
        document.getElementById(`callElevator${floor}`).addEventListener('click', () => {
            showModal(parseInt(floor));
        });
    });
    
    cancelButton.addEventListener('click', () => {
        closeModal();
    });
    
    function showModal(callingFloor) {
        floorButtonsContainer.innerHTML = '';
        floors.forEach(floor => {
            if (parseInt(floor) !== callingFloor) {
                const button = document.createElement('button');
                button.classList.add('floorButton');
                button.setAttribute('data-floor', floor);
                button.textContent = `Roof ${floor}`;
                button.addEventListener('click', (event) => {
                    let destinationFloor = event.target.getAttribute('data-floor');
                    calls.push(parseInt(destinationFloor));
                    processCalls();
                    closeModal();
                });
                floorButtonsContainer.appendChild(button);
            }
        });
        modal.style.display = 'block';
        startCountdown();
    }
    
    function closeModal() {
        modal.style.display = 'none';
        clearInterval(countdownInterval);
    }
    
    function startCountdown() {
        let countdown = 10;
        countdownElement.textContent = `(${countdown})`;
        
        countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = `(${countdown})`;
            
            if (countdown <= 0) {
                closeModal();
            }
        }, 1000);
    }
    
    function processCalls() {
        if (calls.length === 0 || currentLoad === elevatorCapacity) return;
        
        let targetFloor = calls.shift();
        moveToFloor(targetFloor);
    }
    
    function moveToFloor(targetFloor) {
        if (targetFloor === currentFloor) {
            currentLoad++;
            console.log(`Elevator is at floor ${currentFloor}. Current load: ${currentLoad}`);
            showElevator(currentFloor);
        } else {
            console.log(`Elevator moving from floor ${currentFloor} to floor ${targetFloor}`);
            hideElevator(currentFloor);
            currentFloor = targetFloor;
            showElevator(currentFloor);
            setTimeout(() => {
                processCalls();
            }, 1000);
        }
    }
    
    function showElevator(floor) {
        document.querySelector(`.elevatorOfRoof${floor}`).style.display = 'block';
    }
    
    function hideElevator(floor) {
        document.querySelector(`.elevatorOfRoof${floor}`).style.display = 'none';
    }
    
    function getMostDemandedFloor() {
        if (calls.length === 0) return currentFloor;
        let floorCounts = {};
        calls.forEach(floor => {
            floorCounts[floor] = (floorCounts[floor] || 0) + 1;
        });
        let mostDemandedFloor = Object.keys(floorCounts).reduce((a, b) => floorCounts[a] > floorCounts[b] ? a : b);
        calls = calls.filter(floor => floor !== parseInt(mostDemandedFloor));
        return parseInt(mostDemandedFloor);
    }
    
    // Initially show the elevator on the ground floor
    showElevator(currentFloor);
});
