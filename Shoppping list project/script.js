const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const ListItem = document.querySelector('#item-list')

function AddItem (e) {
  e.preventDefault();
  // const item = document.getElementById('item-input').value;
  // console.log(item);
  //validate the input

 const newItem =  itemInput.value 
  if (newItem === '') {
    alert('Add item');
    return
  }


 const li = document.createElement('li')
 li.appendChild(document.createTextNode(newItem))


 const button = createButton('remove-item btn-link text-red')
li.appendChild(button)
// const li = document.createElement('li')
// li.innerHTML = `   ${newItem}
// <button class="remove-item btn-link text-red">
//   <i class="fa-solid fa-xmark"></i>`

ListItem.appendChild(li)
itemInput.value = '';
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



itemForm.addEventListener('submit', AddItem)

