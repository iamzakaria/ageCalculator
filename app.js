// Select elements
const ageForm = document.getElementById('ageForm');
const clearButton = document.getElementById('clearButton');
const resultSection = document.getElementById('result');
const birthdateInput = document.getElementById('birthdate');
const ageOutput = document.getElementById('ageOutput');
const errorElement = document.getElementById('birthdate-error');
const toastContainer = document.getElementById('toastContainer');

// Handle form submission
ageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous errors
  errorElement.classList.add('hidden');
  birthdateInput.classList.remove('border-red-500');

  // Get the birthdate input value
  const birthdateInputValue = birthdateInput.value;
  if (!birthdateInputValue) {
    showToast('Please select a valid birthdate.', 'error');
    return;
  }

  // Parse the birthdate
  const birthdate = new Date(birthdateInputValue);
  const today = new Date();

  // Validate that the birthdate is not in the future
  if (birthdate > today) {
    showToast('Birthdate cannot be in the future.', 'error');
    return;
  }

  // Calculate age
  let years = today.getFullYear() - birthdate.getFullYear();
  let months = today.getMonth() - birthdate.getMonth();
  let days = today.getDate() - birthdate.getDate();

  // Adjust for negative months or days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Display the result
  ageOutput.textContent = `${years} years, ${months} months, and ${days} days`;
  resultSection.classList.remove('hidden');

  // Show success toast
  showToast('Age calculated successfully!', 'success');
});

// Handle clear button click
clearButton.addEventListener('click', function () {
  // Reset the form
  ageForm.reset();

  // Hide the result section
  resultSection.classList.add('hidden');

  // Clear any errors
  errorElement.classList.add('hidden');
  birthdateInput.classList.remove('border-red-500');
});

// Helper function to show toast messages
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `flex items-center justify-between p-4 rounded-md shadow-md text-white ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;

  toast.innerHTML = `
    <span>${message}</span>
    <button class="text-white opacity-70 hover:opacity-100" onclick="this.parentElement.remove()">×</button>
  `;

  toastContainer.appendChild(toast);

  // Automatically remove the toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}