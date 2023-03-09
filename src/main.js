//  Fetch the items from the JSON file
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);

}

// Update the list with the given items
function displayItems(items){
    const container = document.querySelector('.items');
    // const html = items.map(item => creatHTMLString(item)).join('');
    // console.log(html);
    container.innerHTML = items.map(item => creatHTMLString(item)).join('');
}
// Create HTML list item from the given data item
function creatHTMLString(item){
    return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
    `;

}

// Handle button click
function onButtonCLick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if(key == null || value == null){
        return;
    }

    const filtered = items.filter(item => item[key] === value);
    console.log(filtered);
    displayItems(filtered);

}

//Make the items matching {key: value} invisibele.
// function updateItems(items, key, value){
//     items.forEach(item => {
//         if (item.dataset[key] === value){
//             item.classList.remove('invisible');
//         } else{
//             item.classList.add('invisible');
//         }
//     });
// }

function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click',() => displayItems(items));
    buttons.addEventListener('click',event => onButtonCLick(event, items));
}

// main
loadItems()
    .then(items => {
        console.log(items);
        displayItems(items);
        setEventListeners(items);
    })
.catch(console.log);