const apiUrl = 'https://localhost:32770';

var Id = 0;    
var Id_magazyn = 0;

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
    Id_magazyn = value;
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
    const PracownikList = document.getElementById('List');
    const PracownikFormAdd = document.getElementById('AddPracownik');
    const PracownikFormEdit = document.getElementById('ModifyPracownik');
    const PracownikFormSpecific = document.getElementById("SpecificPracownik");
    const PracownikFormDelete = document.getElementById("DeletePracownik");
    const PracownikFormImport = document.getElementById("ImportSubmit");

    const DisplayMagazynAdd = document.getElementById('AddPracownikForm');
    const DisplayMagazynModify = document.getElementById('ModifyPracownikForm')

    DisplayMagazynAdd.addEventListener('click', (event) => {
        loadMagazyns()
    })

    DisplayMagazynModify.addEventListener('click', (event) => {
        loadMagazyns()
    });


    PracownikFormAdd.addEventListener('submit', async (event) => {
        event.preventDefault();

        const Imie = document.getElementById('FormImie').value;
        const Nazwisko = document.getElementById('FormNazwisko').value;
        const Stanowisko = document.getElementById('FormStanowisko').value;
        const Numer_Telefonu = document.getElementById('FormNumerTelefonu').value;
        const Id_Magazynu = Id_magazyn;

        const newPracownik = {
           Imie,
           Nazwisko,
           Stanowisko,
           Numer_Telefonu,
           Id_Magazynu
        };
        
        try {
            const response = await fetch(`${apiUrl}/pracowniks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPracownik)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadPracowniks();
        } catch (error) {
            console.error('Error adding pracownik:', error);
        }

        PracownikFormAdd.reset();
    });

    PracownikFormImport.addEventListener('click', async (event) => {
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
            const response = await fetch(`${apiUrl}/pracowniks/import`, {
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

    PracownikFormSpecific.addEventListener('click', async () => {
        try {
            const response = await fetch(`${apiUrl}/pracowniks/${Id}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const pracownik = await response.json();
            console.log(pracownik.MagazynId);
            try {
                const response = await fetch(`${apiUrl}/magazyns/${pracownik.magazynId}`, {
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
            alert(`Imie pracownika: ${pracownik.imie} \nNazwisko pracownika: ${pracownik.nazwisko} 
            \nMiejsce pracy: ${magazyn.nazwa}`);
        } catch (error) {
            console.error('Error loading Pracownik:', error);
        }
    })
    
    PracownikFormEdit.addEventListener('submit', async (event) => {
        event.preventDefault();
        const Imie = document.getElementById("FormImieEdit").value;
        const Nazwisko = document.getElementById("FormNazwiskoEdit").value;
        const Stanowisko = document.getElementById("FormStanowiskoEdit").value;
        const Numer_Telefonu = document.getElementById("FormNumerTelefonuEdit").value;
        const Id_Magazynu = Id_magazyn;

        const EditPracownik = {
            Imie,
            Nazwisko,
            Stanowisko,
            Numer_Telefonu,
            Id_Magazynu
        };
        
        try {
            const response = await fetch(`${apiUrl}/pracowniks/${Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(EditPracownik)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadPracowniks();
        } catch (error) {
            console.error('Error Editing Pracownik:', error);
        }
        PracownikFormEdit.reset();
    });

    PracownikFormDelete.addEventListener('submit' , async (event) => {
        try {
            const response = await fetch(`${apiUrl}/pracowniks/${Id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadPracowniks();
        } catch (error) {
            console.error('Error deleting pracownik:', error);
        }
    });


    async function loadPracowniks() {
        PracownikList.innerHTML = '';
        try {
            const response = await fetch(`${apiUrl}/pracowniks`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const pracowniks = await response.json();
            if (!Array.isArray(pracowniks)) {
                throw new Error('Expected an array in response');
            }
            pracowniks.forEach(pracownik => {
                const PracownikItem = document.createElement('div');
                PracownikItem.className = 'ListaItem';
                PracownikItem.setAttribute("onclick", `Selected(${pracownik.id})`);
                PracownikItem.id = pracownik.id;
                PracownikItem.innerHTML = `
                    <span>${pracownik.imie || 'N/A'}</span>
                    <br>
                    <span>${pracownik.nazwisko || 'N/A'}</span>
                `;
                PracownikList.appendChild(PracownikItem);
            });
        } catch (error) {
            console.error('Error loading pracowniks:', error);
        }
    }

    async function loadMagazyns() {
        PracownikList.innerHTML = '';
        try {
            const response = await fetch(`${apiUrl}/magazyns`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const magazyns = await response.json();
            if (!Array.isArray(magazyns)) {
                throw new Error('Expected an array in response');
            }
            magazyns.forEach(magazyn => {
                const MagazynItem = document.createElement('div');
                MagazynItem.className = 'ListaItem';
                MagazynItem.setAttribute("onclick", `SelectedMagazyn(${magazyn.id})`);
                MagazynItem.id = magazyn.id;
                MagazynItem.innerHTML = `
                    <span>${magazyn.nazwa || 'N/A'}</span>
                `;
                PracownikList.appendChild(MagazynItem);
            });
        } catch (error) {
            console.error('Error loading magazyns:', error);
        }
    }

    loadPracowniks();
});