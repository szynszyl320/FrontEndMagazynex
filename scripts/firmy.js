function choose(value) {
    const KeyObject = document.getElementById("ContainerFirma");
    switch (value) {
        case 1:
            KeyObject.innerHTML = 
            `
            <form id="Form">
                <input type="text" id="FormNazwa" placeholder="Nazwa" required>
                <input type="text" id="FormNumerTelefonu" placeholder="Numer Telefonu" required>
                <button type="submit">Dodaj Firme</button>
            </form>
            `;
            break;
        case 2:
            KeyObject.innerHTML = 
            `
            <div id="List"></div>
            `;
            break;
        case 3:
            KeyObject.innerHTML =
            `
                <div id="Combine">
                    <div id="List"></div>
                    <div id="SpecificFimra"></div>
                </div>
            `;
            break;
        case 4:
            KeyObject.innerHTML =
            `
                <div id="Combine">
                    <div id="List"></div>
                    <form id="Form">
                        <input type="text" id="FormNazwa" placeholder="Nazwa" required>
                        <input type="text" id="FormNumerTelefonu" placeholder="Numer Telefonu" required>
                        <button type="submit">Dodaj Firme</button>
                    </form>
                </div>
            `;
            break;
        case 5:
            KeyObject.innerHTML = 
            `
            <form id="Form">
                <input type="text" id="FormId" placeholder="Numer Firmy" required>
                <button type="submit">Dodaj Firme</button>
            </form>
            `;
            break;
        case 6:
            KeyObject.innerHTML =
            `
            <div id="Combine">
                    <div id="List"></div>
                    <div id="SpecificFimra"></div>
                </div>
            `
            break;
        }
}

