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

function bubbleSort() {
    if(sorted === true) {
        setTimeout(() => alert("Already Sorted!"), 10);
    }
    let i = 0;
    let intervalId = setInterval(() => {
        for(let j = 0; j < sizeOfArr - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                let firstEle = document.getElementById(`container${j + 1}`);
                let secondEle = document.getElementById(`container${j + 2}`);

                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                
                firstEle.style.height = `${arr[j]}vh`;
                firstEle.innerHTML = `${arr[j]}`;
                secondEle.style.height = `${arr[j + 1]}vh`;
                secondEle.innerHTML = `${arr[j + 1]}`;
            }
        }
        i += 1;
        if(i === sizeOfArr - 1) {
            stopInterval(intervalId, "Bubble");
        }
    }, 150);
    sorted = true;
}

// Merge Sort

function updateEle(ele, index) {
    ele.style.height = `${arr[index]}vh`;
    ele.innerHTML = `${arr[index]}`;
}

function merge(left, mid, right) {
    const sizeOfLeftArr = mid - left + 1;
    const sizeOfRightArr = right - mid;

    const leftArr = [];
    const rightArr = [];

    for(let i = 0; i < sizeOfLeftArr; i++) {
        leftArr.push(arr[left + i]);
    }
    for(let i = 0; i < sizeOfRightArr; i++) {
        rightArr.push(arr[mid + 1 + i]);
    }

    let indexOfLeftArr = 0;
    let indexOfRightArr = 0;
    let indexOfMergedArr = left;

    while(indexOfLeftArr < sizeOfLeftArr && indexOfRightArr < sizeOfRightArr) {
        let currEle = document.getElementById(`container${indexOfMergedArr + 1}`);
        if(leftArr[indexOfLeftArr] <= rightArr[indexOfRightArr]) {
            arr[indexOfMergedArr] = leftArr[indexOfLeftArr];
            indexOfLeftArr += 1;
        } else {
            arr[indexOfMergedArr] = rightArr[indexOfRightArr];
            indexOfRightArr += 1;
        }
        
        updateEle(currEle, indexOfMergedArr);

        indexOfMergedArr += 1;
    }

    while(indexOfLeftArr < sizeOfLeftArr) {
        let currEle = document.getElementById(`container${indexOfMergedArr + 1}`);
        arr[indexOfMergedArr] = leftArr[indexOfLeftArr];

        updateEle(currEle, indexOfMergedArr);

        indexOfLeftArr += 1;
        indexOfMergedArr += 1;
    }

    while(indexOfRightArr < sizeOfRightArr) {
        let currEle = document.getElementById(`container${indexOfMergedArr + 1}`);
        arr[indexOfMergedArr] = rightArr[indexOfRightArr];
        
        updateEle(currEle, indexOfMergedArr);

        indexOfRightArr += 1;
        indexOfMergedArr += 1;
    }

    leftArr.splice(0, leftArr.length);
    rightArr.splice(0, rightArr.length);
}

function mergesort(begin, end) {
    if(begin < end) {
        let mid = begin + Math.floor((end - begin) / 2);

        let str = "";
        for(let i = begin; i <= end; i++) {
            str += arr[i] + " ";
        }
        console.log(str);
        mergesort(begin, mid);
        mergesort(mid + 1, end);
        merge(begin, mid, end);
    }
}

function mergeSortFunc() {
   let curr_size;   // For current size of subarrays to be merged
                    // curr_size varies from 1 to n/2
   let left_start;  // For picking starting index of left subarray
                    // to be merged
    // Merge subarrays in bottom up manner.  First merge subarrays of
    // size 1 to create sorted subarrays of size 2, then merge subarrays
    // of size 2 to create sorted subarrays of size 4, and so on.
    curr_size = 1;
    let intervalId = setInterval(() => {
        // Pick starting point of different subarrays of current size
        for (left_start = 0; left_start < sizeOfArr - 1; left_start += 2 * curr_size) {
            // Find ending point of left subarray. mid+1 is starting
            // point of right
            let mid = Math.min(left_start + curr_size - 1, sizeOfArr - 1);
            let right_end = Math.min(left_start + 2 * curr_size - 1, sizeOfArr - 1);
    
            // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end]
            merge(left_start, mid, right_end);
        }

        curr_size = 2 * curr_size;
        if(curr_size > sizeOfArr - 1) {
            stopInterval(intervalId, "Merge");
        }
    }, 300);
    sorted = true;
}

function mergeSort() {
    if(sorted === true) {
        setTimeout(() => alert("Already Sorted!"), 10);
    }
    mergeSortFunc(0, arr.length - 1);
    sorted = true;
};