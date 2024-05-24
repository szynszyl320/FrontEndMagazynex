const apiUrl = 'https://localhost:32770';

var Id = 0;    

function Selected(value) {
    const selects = document.querySelectorAll(".ListaItemAlt");
    selects.forEach(item => {
        item.className = "ListaItem"
    });
    const SelectionObject = document.getElementById(value);
    SelectionObject.className = "ListaItemAlt"
    Id = value;
}

function choose(value) {
    const selects = document.querySelectorAll(".Choosables");
    selects.forEach(item => {
        item.style.marginLeft = "-2000px"
    });
    const SelectionObject = document.getElementById(value);
    if (SelectionObject.style.marginLeft === "-2000px") {
        SelectionObject.style.marginLeft = "0px"
    }
    else {
        SelectionObject.style.marginLeft = "-2000px"
    }
}