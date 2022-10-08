const sizeOfArr = 40;
const arr = [];
let sorted = false;

function createArr() {
    if(arr.length) {
        arr.splice(0, arr.length);
    }
    for(let i = 0; i < sizeOfArr; i++) {
        let tmp = Math.floor(Math.random() * 70) + 3;
        arr.push(tmp);
    }
}

function createBars() { // function = randomized the array!
    createArr();
    // Now assign the random height to each bar!
    for(let i = 0; i < sizeOfArr; i++) {
        let element = document.getElementById(`container${i + 1}`);
        element.style.height = `${arr[i]}vh`;
        element.innerHTML = `${arr[i]}`;
    }
    sorted = false;
}
createBars();

function stopInterval(id, message) {
    clearInterval(id);
    setTimeout(() => alert(`${message} Sorting Completed!`), 100);
}

function selectionSort() {
    if(sorted === true) {
        setTimeout(() => alert("Already Sorted!"), 10);
    }
    let i = 0;
    let intervalId = setInterval( () => {
        let minIndex = i;
        for(let j = i + 1; j < sizeOfArr; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        let eleA = document.getElementById(`container${i + 1}`);
        let eleB = document.getElementById(`container${minIndex + 1}`);

        if(minIndex !== i) {
            // swap the height value of both the bars!
            let tmp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = tmp;
            eleA.style.height = `${arr[i]}vh`;
            eleA.innerHTML = `${arr[i]}`;
            eleB.style.height = `${arr[minIndex]}vh`;
            eleB.innerHTML = `${arr[minIndex]}`;
        }

        i += 1;
        if(i === sizeOfArr - 1) {
            stopInterval(intervalId, "Selection");
        }
    }, 100);
    sorted = true;
};

function insertionSort() {
    if(sorted === true) {
        setTimeout(() => alert("Already Sorted!"), 10);
    }
    let i = 1;
    let intervalId = setInterval(() => {
        let currEle = arr[i];
        let j = i - 1;
        while(j >= 0 && arr[j] > currEle) {
            arr[j + 1] = arr[j];
            let ele = document.getElementById(`container${j + 2}`);
            ele.style.height = `${arr[j + 1]}vh`;
            ele.innerHTML = `${arr[j + 1]}`;
            j = j - 1;
        }

        arr[j + 1] = currEle;
        let ele = document.getElementById(`container${j + 2}`);
        ele.style.height = `${arr[j + 1]}vh`;
        ele.innerHTML = `${arr[j + 1]}`;

        i += 1;
        if(i === sizeOfArr) {
            stopInterval(intervalId, "Insertion");
        }
    }, 150);
    sorted = true;
};