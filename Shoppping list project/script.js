const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const ListItem = document.querySelector('#item-list')
const clearBtn = document.querySelector('#clear')
const itemFilter = document.querySelector('#filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false;

function displayItem() {
  const Itemfromstorage = getItemfromstorage()
  Itemfromstorage.forEach((item)=> addItemToDOM(item))
  checkUI()
}

function onAddItemsubmit(e) {
  e.preventDefault();
  // const item = document.getElementById('item-input').value;
  // console.log(item);
  //validate the input

 const newItem =  itemInput.value
  if (newItem === '') {
    alert('Add item');  
    return
  }

  if (isEditMode) {
    const itemToEdit = ListItem.querySelector('.edit-mode')
    removeItemfromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove('edit-mode')
    itemToEdit.remove()
    isEditMode = false;
  } else {
     if (checkIfItemExist(newItem)) {
          alert ('THIS ITEM HAS BEEN INPUT!!!')
          return;
     }
  }


addItemToDOM(newItem)

addItemToStorage(newItem)
checkUI()

itemInput.value = '';
}


function addItemToDOM (item) {
  const li = document.createElement('li')
 li.appendChild(document.createTextNode(item))


 const button = createButton('remove-item btn-link text-red')
li.appendChild(button)
// const li = document.createElement('li')
// li.innerHTML = `   ${newItem}
// <button class="remove-item btn-link text-red">
//   <i class="fa-solid fa-xmark"></i>`

//add li to the DOM
ListItem.appendChild(li)
}

function addItemToStorage (item){
 let itemstorage = getItemfromstorage()
 itemstorage.push(item)
 localStorage.setItem('items',JSON.stringify(itemstorage))
}


function getItemfromstorage () {
  let itemstorage;
  if (localStorage.getItem('items') === null ) {
    itemstorage = []
   } else {
    itemstorage = JSON.parse(localStorage.getItem('items'))
   }

  return itemstorage;
}






function createButton (classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

function createIcon (classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

function onClickItem (e) {
  if(e.target.parentElement.classList.contains('remove-item')) {
    removeitem(e.target.parentElement.parentElement)
  } else {
    setItemToEdit(e.target)
  }
}



function checkIfItemExist (item){
     Itemfromstorage = getItemfromstorage()
     if (Itemfromstorage.includes(item)) {
          return true;
     } else {
          return false;
     }
}

function setItemToEdit(item) {
  isEditMode = true;
  ListItem
  .querySelectorAll('li')
  .forEach((i)=>i.classList.remove('edit-mode'))
  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>update item'
  formBtn.style.backgroundColor = '#228B22'
  itemInput.value = item.textContent;
}

function removeitem (item) {
if (window.confirm('are you sure')) {
 item.remove()


 removeItemfromStorage(item.textContent)
 checkUI()
}
}
 
function removeItemfromStorage (item) {
  let Itemfromstorage = getItemfromstorage()
  Itemfromstorage = Itemfromstorage.filter((i)=> i !== item)
  localStorage.setItem('items',JSON.stringify(Itemfromstorage))
}




// function claerItem (e) {
//   ListItem.remove()

// }

function clearItem () {
  while (ListItem.firstChild) {
    ListItem.removeChild(ListItem.firstChild)
  }

  localStorage.removeItem('items')
  checkUI()
}



function checkUI() {

     itemInput.value = '';
  const items = ListItem.querySelectorAll('li')
  // console.log(items);
  if (items.length === 0) {
    clearBtn.style.display = 'none'
    itemFilter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    itemFilter.style.display = 'block'
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
  formBtn.style.backgroundColor = '#333'

  isEditMode = false;
}

function FilterItem (e) {
  const items = ListItem.querySelectorAll('li')
  const text = e.target.value.toLowerCase()
  items.forEach((item)=> {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1 )  {
      item.style.display = 'flex'
    }  else { 
      item.style.display = 'none'
      }
  })
}




function init () {
  itemForm.addEventListener('submit', onAddItemsubmit)
ListItem.addEventListener('click',onClickItem)
clearBtn.addEventListener('click',clearItem)
itemFilter.addEventListener('input',FilterItem)
window.addEventListener('DOMContentLoaded',displayItem)
checkUI()
}

init()

