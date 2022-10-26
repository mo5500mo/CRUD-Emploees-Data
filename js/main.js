let myRow = document.getElementById('myRow');
let addBtn = document.getElementById('add');
let addForm = document.querySelector('.dark-box3');
let closeBtn = document.querySelector('.add-box-header button');
let closeBtn2 = document.getElementById('cancel');
let addBtnReal = document.getElementById('add-real');
let updateBtnReal = document.getElementById('update-real');
let searchBox = document.getElementById('search-box');

////////////////////////////////emploeeData//////////////////////////////////
let emploeeName = document.getElementById('emploee-name');
let emploeeEmail = document.getElementById('emploee-email');
let emploeeAddress = document.getElementById('emploee-address');
let emploeePhone = document.getElementById('emploee-phone');
/////////////////////////////////////////////////////////////////////////////

let emploees;
if (localStorage.getItem('emploeesToday') != null) {
    emploees = JSON.parse(localStorage.getItem('emploeesToday'));
    displayItem(emploees);
}
else {
    emploees = [];

}


function addItem() {
    let emploeeData = {
        emploeeName: emploeeName.value,
        emploeeEmail: emploeeEmail.value,
        emploeeAddress: emploeeAddress.value,
        emploeePhone: emploeePhone.value
    }
    emploees.push(emploeeData);
    console.log(emploees);
    displayItem(emploees);
    localStorage.setItem('emploeesToday', JSON.stringify(emploees));
    clearForm();
}

function displayItem(list) {
    temp = ``;

    for (let i = 0; i < list.length; i++) {
        temp +=
            `
                <tr>
                    <td class="text-white">${list[i].emploeeName}</td>
                    <td class="text-white">${list[i].emploeeEmail}</td>
                    <td class="text-white">${list[i].emploeeAddress}</td>
                    <td class="text-white">${list[i].emploeePhone}</td>
                    <td class="text-white actions">
                        <a href="#update" onclick = "updateItem(${i})" ><i class="fa-solid fa-pen"></i></a>
                        <a href="#delete" onclick = "deleteItem(${i})"><i class="fa-solid fa-trash"></i></a>
                    </td>
                </tr>
            `
    }
    myRow.innerHTML = temp;


}

function deleteItem(index) {
    emploees.splice(index, 1);
    localStorage.setItem('emploeesToday', JSON.stringify(emploees));
    displayItem(emploees);
}

function searchItem(index) {
    temp = ``;

    for (let i = 0; i < emploees.length; i++) {
        if (emploees[i].emploeeName.toLowerCase().includes(index.toLowerCase())) {


            temp +=
                `
                <tr>
                    <td class="text-white">${emploees[i].emploeeName}</td>
                    <td class="text-white">${emploees[i].emploeeEmail}</td>
                    <td class="text-white">${emploees[i].emploeeAddress}</td>
                    <td class="text-white">${emploees[i].emploeePhone}</td>
                    <td class="text-white actions">
                        <a href="#update" onclick = "updateItem(${i})" ><i class="fa-solid fa-pen"></i></a>
                        <a href="#delete" onclick = "deleteItem(${i})"><i class="fa-solid fa-trash"></i></a>
                    </td>
                </tr>
        
      `
        }
    }
    myRow.innerHTML = temp;

}
function updateItem(e) {
    addForm.classList.remove('d-none');
    updateBtnReal.classList.remove('d-none');
    addBtnReal.classList.add('d-none');


    emploees = JSON.parse(localStorage.getItem('emploeesToday'));
    emploeeName.value = emploees[e].emploeeName;
    emploeeEmail.value = emploees[e].emploeeEmail;
    emploeeAddress.value = emploees[e].emploeeAddress;
    emploeePhone.value = emploees[e].emploeePhone;

    updateBtnReal.addEventListener('click', function () {
        let emploeeData = {
            emploeeName: emploeeName.value,
            emploeeEmail: emploeeEmail.value,
            emploeeAddress: emploeeAddress.value,
            emploeePhone: emploeePhone.value
        }
        emploees.splice(e, 1, emploeeData);
        console.log(emploees.splice(e, 1, emploeeData));
        displayItem(emploees);
        localStorage.setItem('emploeesToday', JSON.stringify(emploees));
        location.reload();
    })
}
function clearForm() {
    emploeeName.value = '';
    emploeeEmail.value = '';
    emploeeAddress.value = '';
    emploeePhone.value = '';
}
addBtn.addEventListener('click', function () {
    clearForm();
    addForm.classList.remove('d-none');
    updateBtnReal.classList.add('d-none');
    addBtnReal.classList.remove('d-none');
});
closeBtn.addEventListener('click', function () {
    addForm.classList.add('d-none');
});
closeBtn2.addEventListener('click', function () {
    addForm.classList.add('d-none');
})
addBtnReal.addEventListener('click', addItem);
searchBox.addEventListener('input', function () {
    searchItem(searchBox.value)
});


