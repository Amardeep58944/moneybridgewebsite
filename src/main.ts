// MoneyBridge Main TypeScript File

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle') as HTMLButtonElement;
const mainNav = document.querySelector('.main-nav') as HTMLElement;
const menuItems = document.querySelectorAll('.menu-item.has-submenu') as NodeListOf<HTMLLIElement>;
const loanForm = document.getElementById('loan-application-form') as HTMLFormElement;

// Mobile Menu Toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Mobile Submenu Toggle
menuItems.forEach(item => {
  const link = item.querySelector('a') as HTMLAnchorElement;

  // For mobile view, create toggle functionality
  link.addEventListener('click', (e) => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
      e.preventDefault();
      item.classList.toggle('active');
    }
  });
});

// Form Submission
if (loanForm) {
  loanForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(loanForm);
    const formDataObj: Record<string, string> = {};

    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });

    try {
      // In a real app, this would send data to your Java backend
      // This is a mock implementation for demo purposes
      console.log('Form submitted with data:', formDataObj);

      // Simulate server response
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      alert('Thank you for your application! We will contact you soon.');
      loanForm.reset();

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again later.');
    }
  });
}

// Sticky Header
const header = document.getElementById('header') as HTMLElement;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// Initialize any components or modules needed on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('MoneyBridge website initialized successfully!');
});
