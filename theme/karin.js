// 4. The JavaScript to duplicate items
const list = document.querySelector('.scrolling-list');
const listItems = Array.from(list.children);

// Clone each list item and append it to the end of the list
listItems.forEach(item => {
    const duplicate = item.cloneNode(true);
    list.appendChild(duplicate);
});