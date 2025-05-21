// Personal Loan page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize accordion functionality
  initAccordion();

  // Initialize form submission handlers
  initForms();
});

// Initialize accordion functionality
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header?.addEventListener('click', () => {
      // Close all other accordion items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// Initialize form submission handlers
function initForms() {
  const quickLoanForm = document.getElementById('quick-loan-form') as HTMLFormElement;
  const personalLoanForm = document.getElementById('personal-loan-form') as HTMLFormElement;

  if (quickLoanForm) {
    quickLoanForm.addEventListener('submit', handleQuickFormSubmit);
  }

  if (personalLoanForm) {
    personalLoanForm.addEventListener('submit', handleFullFormSubmit);
  }
}

// Handle quick form submission
function handleQuickFormSubmit(e: Event) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formDataObj: Record<string, string> = {};

  formData.forEach((value, key) => {
    formDataObj[key] = value.toString();
  });

  // In a real application, this would send data to your backend
  console.log('Quick form data:', formDataObj);

  // Show success message
  alert('Thank you for your interest! We will contact you shortly with a personalized quote.');
  form.reset();
}

// Handle full application form submission
function handleFullFormSubmit(e: Event) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formDataObj: Record<string, string> = {};

  formData.forEach((value, key) => {
    formDataObj[key] = value.toString();
  });

  // In a real application, this would send data to your backend
  console.log('Full application form data:', formDataObj);

  // Show success message
  alert('Thank you for your application! Our team will review your details and contact you within 24 hours.');
  form.reset();
}
