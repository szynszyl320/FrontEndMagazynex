const apiUrl = 'https://localhost:32770';

document.addEventListener('DOMContentLoaded', () => {
  const firmaForm = document.getElementById('firmaForm');
  const firmasList = document.getElementById('firmasList');

  firmaForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nazwa = document.getElementById('nazwa').value;
      const numer_Telefonu = document.getElementById('numer_Telefonu').value;

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

      firmaForm.reset();
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
              firmaItem.className = 'firma-item';
              firmaItem.innerHTML = `
                  <span>${firma.name || 'N/A'}</span>
                  <button onclick="deleteFirma(${firma.id})">Delete</button>
              `;
                console.log(firma.name);
              firmasList.appendChild(firmaItem);
          });
      } catch (error) {
          console.error('Error loading firmas:', error);
      }
  }

  window.deleteFirma = async (id) => {
      try {
          const response = await fetch(`${apiUrl}/firmas/${id}`, {
              method: 'DELETE'
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          loadFirmas();
      } catch (error) {
          console.error('Error deleting firma:', error);
      }
  };

  loadFirmas();
});