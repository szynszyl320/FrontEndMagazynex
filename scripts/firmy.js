const apiUrl = 'https://localhost:32770';

var Id = 0;    
function chooseFirma(value) {
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

document.addEventListener('DOMContentLoaded', () => {
    const firmaFormAdd = document.getElementById('AddFirma');
    const firmasList = document.getElementById('List');
    const FirmaFormEdit = document.getElementById('ModifyFirma');
    const FirmaFormRestore = document.getElementById('RestoreFirma');
    const FirmaFormSpecific = document.getElementById("SpecificFirma");
    const FirmaFormDelete = document.getElementById("DeleteFirma");


    firmaFormAdd.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nazwa = document.getElementById('FormNazwa').value;
        const numer_Telefonu = document.getElementById('FormNumerTelefonu').value;

        const newFirma = {
            nazwa,
            numer_Telefonu
        };

        try {
            const response = await fetch(`${apiUrl}/firmas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFirma)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadFirmas();
        } catch (error) {
            console.error('Error adding firma:', error);
        }

        firmaFormAdd.reset();
    });

    FirmaFormSpecific.addEventListener('click', async () => {
        // console.log("test");
        try {
            const response = await fetch(`${apiUrl}/firmas/${Id}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const firma = await response.json();

            console.log(firma.name);
            alert(`Nazwa Firmy: ${firma.name}`);
            const Towary = []
            firma.towaries.forEach(towar => {
                const Towar = towar.name
                Towary.push(Towar);
            })
            alert(Towary)
        } catch (error) {
            console.error('Error loading firma:', error);
        }
        FirmaFormEdit.reset();
    })
    
    FirmaFormEdit.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nazwa = document.getElementById('FormNazwaEdit').value;
        const numer_Telefonu = document.getElementById('FormNumerTelefonuEdit').value;

        const EditFimra = {
            nazwa,
            numer_Telefonu
        };
        
        try {
            const response = await fetch(`${apiUrl}/firmas/${Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(EditFimra)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadFirmas();
        } catch (error) {
            console.error('Error Editing firma:', error);
        }
        FirmaFormEdit.reset();
    });

    FirmaFormRestore.addEventListener('submit', async (event) => {
        event.preventDefault()
        const id = document.getElementById("FormNumberRestore");

        try {
            const response = await fetch(`${apiUrl}/firmas/${id}/restore`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadFirmas();
        } catch (error) {
            console.error('Error Restoring firma:', error);
        }
        FirmaFormRestore.reset();
    });
    
    FirmaFormDelete.addEventListener('submit', async (event) => {
        try {
            const response = await fetch(`${apiUrl}/firmas/${Id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert(`Numer Usuwanej Firmy: ${Id}. Zapisz go w razie potrzeby przywrócenia firmy.`);
            loadFirmas();
        } catch (error) {
            console.error('Error deleting firma:', error);
        }
        loadFirmas();
    });


    async function loadFirmas() {
        firmasList.innerHTML = '';
        try {
            const response = await fetch(`${apiUrl}/firmas`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const firmas = await response.json();
            if (!Array.isArray(firmas)) {
                throw new Error('Expected an array in response');
            }
            firmas.forEach(firma => {
                const firmaItem = document.createElement('div');
                firmaItem.className = 'ListaItem';
                firmaItem.setAttribute("onclick", `chooseFirma(${firma.id})`)
                firmaItem.innerHTML = `
                    <span>${firma.name || 'N/A'}</span>
                `;
                firmasList.appendChild(firmaItem);
            });
        } catch (error) {
            console.error('Error loading firmas:', error);
        }
    }


    loadFirmas();
});