// MoneyBridge Worker Handler
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle form submissions
    if (url.pathname === '/submit-loan-application' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const formDataObj: Record<string, string> = {};

        formData.forEach((value, key) => {
          formDataObj[key] = value.toString();
        });

        // In a real app, you would process the form data here
        console.log('Form submitted with data:', formDataObj);

        // Return a success response
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Thank you for your application! We will contact you soon.' 
          }),
          { 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      } catch (error) {
        console.error('Error processing form:', error);
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'There was an error submitting your application.' 
          }),
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Serve your static HTML file for all other requests
    // Note: You'll need to handle static file serving differently in Workers
    return new Response(getHTML(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};

// This would be your HTML content (simplified example)
function getHTML(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>MoneyBridge</title>
  <style>
    /* Your CSS here */
  </style>
</head>
<body>
  <header id="header">
    <!-- Your header content -->
  </header>

  <nav class="main-nav">
    <!-- Your navigation -->
  </nav>

  <form id="loan-application-form" action="/submit-loan-application" method="POST">
    <!-- Your form fields -->
  </form>

  <script>
    // Client-side JavaScript that handles the UI interactions
    document.addEventListener('DOMContentLoaded', () => {
      // Mobile Menu Toggle
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const mainNav = document.querySelector('.main-nav');
      
      if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
          mainNav.classList.toggle('active');
          mobileMenuToggle.classList.toggle('active');
        });
      }

      // Mobile Submenu Toggle
      document.querySelectorAll('.menu-item.has-submenu').forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
          }
        });
      });

      // Sticky Header
      const header = document.getElementById('header');
      window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.pageYOffset > 100);
      });

      // Form Submission (now using fetch API)
      const loanForm = document.getElementById('loan-application-form');
      if (loanForm) {
        loanForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(loanForm);
          
          try {
            const response = await fetch('/submit-loan-application', {
              method: 'POST',
              body: formData
            });
            
            const result = await response.json();
            alert(result.message);
            if (result.success) {
              loanForm.reset();
            }
          } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your application.');
          }
        });
      }
    });
  </script>
</body>
</html>
  `;
}