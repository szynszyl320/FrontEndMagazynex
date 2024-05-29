const apiUrl = 'https://localhost:32770';

var Id = 0;    
var IdMagazyn = 0;
var IdFirma = 0;

function Selected(value) {
    const selects = document.querySelectorAll(".ListaItemAlt");
    selects.forEach(item => {
        item.className = "ListaItem"
    });
    const SelectionObject = document.getElementById(value);
    SelectionObject.className = "ListaItemAlt"
    Id = value;
}

function SelectedMagazyn(value) {
    const selects = document.querySelectorAll(".ListaItemAltMagazyn");
    selects.forEach(item => {
        item.className = "ListaItem"
    });
    const SelectionObject = document.getElementById(value);
    SelectionObject.className = "ListaItemAltMagazyn"
    IdMagazyn = value;
}

function SelectedFirma(value) {
    const selects = document.querySelectorAll(".ListaItemAltFirma");
    selects.forEach(item => {
        item.className = "ListaItem"
    });
    const SelectionObject = document.getElementById(value);
    SelectionObject.className = "ListaItemAltFirma"
    IdFirma = value;
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


document.addEventListener('DOMContentLoaded', () => {
    const TowarList = document.getElementById('List');
    const TowarFormAdd = document.getElementById('AddTowar');
    const TowarFormModify = document.getElementById('ModifyTowar');
    const TowarFormSpecific = document.getElementById("SpecificTowar");
    const TowarFormDelete = document.getElementById("DeleteTowar");
    const TowarFormImport = document.getElementById("ImportSubmit");

    const DisplayMagazynFirmaAdd = document.getElementById('AddTowarForm');
    const DisplayMagazynFirmaModify = document.getElementById('ModifyTowarForm')

    DisplayMagazynFirmaAdd.addEventListener('click', (event) => {
        loadMagazynsFirmas()
    })

    DisplayMagazynFirmaModify.addEventListener('click', (event) => {
        loadMagazynsFirmas()
    });


    TowarFormAdd.addEventListener('submit', async (event) => {
        event.preventDefault();

        const Nazwa_Produktu = document.getElementById('FormNazwa').value;
        const Id_Firmy = IdFirma;
        const Id_Magazynu = IdMagazyn;
        const Opis_Produktu = document.getElementById('FormOpis').value;
        const Klasa_Towaru = parseInt(document.getElementById('FormKlasa').value);
        const Cena_Netto_Za_Sztuke = parseFloat(document.getElementById('FormCena').value);
        const Ilosc = parseInt(document.getElementById('FormIlosc').value);

        const newTowar = {
            Nazwa_Produktu,
            Id_Firmy,
            Id_Magazynu,
            Opis_Produktu,
            Klasa_Towaru,
            Cena_Netto_Za_Sztuke,
            Ilosc
        };
        
        try {
            const response = await fetch(`${apiUrl}/towars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTowar)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadTowars();
        } catch (error) {
            console.error('Error adding Towar:', error);
        }

        TowarFormAdd.reset();
    });

    TowarFormImport.addEventListener('click', async (event) => {
        let fileInput = document.getElementById("file");
        let file = fileInput.files[0]; 
        console.log(file);
        if (file.type !== 'application/vnd.ms-excel') {
            console.log('Please select a CSV file.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await fetch(`${apiUrl}/towars/import`, {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const Duplikaty = await response.json();
            alert(`Ilość duplikatów w tabeli: ${Duplikaty}`)
        } catch (error) {
            console.log("Error loading Firma", error);
        }
    });

    TowarFormSpecific.addEventListener('click', async () => {
        try {
            const response = await fetch(`${apiUrl}/towars/${Id}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const towar = await response.json();
            try {
                const response = await fetch(`${apiUrl}/magazyns/${towar.idMagazynu}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                var magazyn = await response.json();
            }
            catch (error) {
                console.error('Error loading Magazyn', error);
            }
            try {
                const response = await fetch(`${apiUrl}/firmas/${towar.idFirmy}`, {
                    method: 'GET'
                })
                if (!response.ok) {
                    throw new Error('Network respone was not ok');
                }
                var firma = await response.json();
            }
            catch (error) {
                console.error('Error loading Firma', error);
            }
            alert(`Nazwa Towaru: ${towar.name} \nMagazyn: ${magazyn.nazwa} \nPrzynależy do firmy: ${firma.name}`);
        } catch (error) {
            console.error('Error loading Pracownik:', error);
        }
    })
    
    TowarFormModify.addEventListener('submit', async (event) => {
        event.preventDefault();

        const Nazwa_Produktu = document.getElementById('FormNazwaEdit').value;
        const Id_Firmy = IdFirma;
        const Id_Magazynu = IdMagazyn;
        const Opis_Produktu = document.getElementById('FormOpisEdit').value;
        const Klasa_Towaru = parseInt(document.getElementById('FormKlasaEdit').value);
        const Cena_Netto_Za_Sztuke = parseFloat(document.getElementById('FormCenaEdit').value);
        const Ilosc = parseInt(document.getElementById('FormIloscEdit').value);

        const EditTowar = {
            Nazwa_Produktu,
            Id_Firmy,
            Id_Magazynu,
            Opis_Produktu,
            Klasa_Towaru,
            Cena_Netto_Za_Sztuke,
            Ilosc
        };
        
        try {
            const response = await fetch(`${apiUrl}/towars/${Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(EditTowar)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadTowars();
        } catch (error) {
            console.error('Error adding Towar:', error);
        }

        TowarFormModify.reset();
    });

    TowarFormDelete.addEventListener('submit' , async (event) => {
        try {
            const response = await fetch(`${apiUrl}/towars/${Id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadTowars();
        } catch (error) {
            console.error('Error deleting towar:', error);
        }
    });


    async function loadTowars() {
        TowarList.innerHTML = '';
        try {
            const response = await fetch(`${apiUrl}/towars`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const towars = await response.json();
            if (!Array.isArray(towars)) {
                throw new Error('Expected an array in response');
            }
            towars.forEach(towar => {
                const PracownikItem = document.createElement('div');
                PracownikItem.className = 'ListaItem';
                PracownikItem.setAttribute("onclick", `Selected(${towar.id})`);
                PracownikItem.id = towar.id;
                PracownikItem.innerHTML = `
                    <span>${towar.name || 'N/A'}</span>
                `;
                TowarList.appendChild(PracownikItem);
            });
        } catch (error) {
            console.error('Error loading towars:', error);
        }
    }

    async function loadMagazynsFirmas() {
        TowarList.innerHTML = '';
        try {
            const response = await fetch(`${apiUrl}/magazyns`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const magazyns = await response.json();
            if (!Array.isArray(magazyns)) {
                throw new Error('Expected an array in response');
            }
            const Magazyny = document.createElement('div');
            Magazyny.className = 'Divider'
            magazyns.forEach(magazyn => {
                const MagazynItem = document.createElement('div');
                MagazynItem.className = 'ListaItem';
                MagazynItem.setAttribute("onclick", `SelectedMagazyn(${magazyn.id})`);
                MagazynItem.id = magazyn.id;
                MagazynItem.innerHTML = `
                    <span>${magazyn.nazwa || 'N/A'}</span>
                `;
                Magazyny.appendChild(MagazynItem);
            });
            TowarList.appendChild(Magazyny);
            try {
                const response = await fetch(`${apiUrl}/firmas`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const Firmas = await response.json();
                if (!Array.isArray(magazyns)) {
                    throw new Error('Expected an array in response');
                }
                const Firmy = document.createElement('div');
                Firmy.className = 'Divider'
                Firmas.forEach(firma => {
                    const FirmaItem = document.createElement('div');
                    FirmaItem.className = 'ListaItem';
                    FirmaItem.setAttribute("onclick", `SelectedFirma(${firma.id})`);
                    FirmaItem.id = firma.id;
                    FirmaItem.innerHTML = `
                        <span>${firma.name || 'N/A'}</span>
                    `;
                Firmy.appendChild(FirmaItem);
                })
                TowarList.appendChild(Firmy);
            }
            catch (error) {
                console.log('Error loading Firmas: ', error);
            }
        } catch (error) {
            console.error('Error loading magazyns:', error);
        }
    }

    loadTowars();
});