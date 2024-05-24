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
    const selects = document.querySelectorAll(".ListaItemAlt");
    selects.forEach(item => {
        item.className = "ListaItem"
    });
    const SelectionObject = document.getElementById(value);
    SelectionObject.className = "ListaItemAlt"
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
//     const PracownikFormAdd = document.getElementById('AddPracownik');
//     const PracownikFormEdit = document.getElementById('ModifyPracownik');
//     const PracownikFormRestore = document.getElementById('RestorePracownik');
//     const PracownikFormSpecific = document.getElementById("SpecificPracownik");
//     const PracownikFormDelete = document.getElementById("DeletePracownik");


//     MagazynFormAdd.addEventListener('submit', async (event) => {
//         event.preventDefault();
        
//         const nazwa = document.getElementById('FormNazwa').value;
//         const lokalizacja = document.getElementById('FormLokalizacja').value;
//         const przechowywane_Materialy_string = (document.getElementById('FormKlasa').value).split(",");
//         let przechowywane_Materialy = []
//         przechowywane_Materialy_string.forEach(parameter => {
//             przechowywane_Materialy.push(parseInt(parameter));
//         });

//         const newMagazyn = {
//             lokalizacja,
//             przechowywane_Materialy,
//             nazwa
//         };
        
//         try {
//             const response = await fetch(`${apiUrl}/magazyns`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(newMagazyn)
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             loadMagazyns();
//         } catch (error) {
//             console.error('Error adding magazyn:', error);
//         }

//         MagazynFormAdd.reset();
//     });

//     MagazynFormSpecific.addEventListener('click', async () => {
//         try {
//             const response = await fetch(`${apiUrl}/magazyns/${Id}`, {
//                 method: 'GET'
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const magazyn = await response.json();

//             alert(`Nazwa magazynu: ${magazyn.nazwa}`);
//             const Towary = []
//             magazyn.towaries.forEach(towar => {
//                 Towary.push(towar.name);
//             })
//             alert(Towary)
//             const Pracownicy = []
//             magazyn.pracowniks.forEach(pracownik => {
//                 Pracownicy.push(pracownik.imie)
//             })
//             alert(Pracownicy)
//         } catch (error) {
//             console.error('Error loading Magazyn:', error);
//         }
//         MagazynFormSpecific.reset();
//     })
    
//     MagazynFormEdit.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const nazwa = document.getElementById('FormNazwaEdit').value;
//         const lokalizacja = document.getElementById('FormLokalizacjaEdit').value;
//         const przechowywane_Materialy_string = (document.getElementById('FormKlasaEdit').value).split(",");
//         let przechowywane_Materialy = []
//         przechowywane_Materialy_string.forEach(parameter => {
//             przechowywane_Materialy.push(parseInt(parameter));
//         });

//         const EditMagazyn = {
//             lokalizacja,
//             przechowywane_Materialy,
//             nazwa
//         };
        
//         try {
//             const response = await fetch(`${apiUrl}/magazyns/${Id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(EditMagazyn)
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             loadMagazyns();
//         } catch (error) {
//             console.error('Error Editing Magazyn:', error);
//         }
//         MagazynFormEdit.reset();
//     });

//     MagazynFormRestore.addEventListener('submit', async (event) => {
//         event.preventDefault()
//         const id = document.getElementById("FormNumberRestore").value;

//         try {
//             const response = await fetch(`${apiUrl}/magazyns/${id}/restore`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             loadFirmas();
//         } catch (error) {
//             console.error('Error Restoring magazyn:', error);
//         }
//         MagazynFormRestore.reset();
//     });

//     MagazynFormDelete.addEventListener('submit' , async (event) => {
//         try {
//             const response = await fetch(`${apiUrl}/magazyns/${Id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             alert(`Numer Usuwanego Magazynu: ${Id}. Zapisz go w razie potrzeby przywrócenia magazynu.`);
//             loadMagazyns();
//         } catch (error) {
//             console.error('Error deleting magazyn:', error);
//         }
//     });


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