// MoneyBridge Worker Handler

interface Env {
  // Define your environment variables here if needed
  // Example:
  // DB: D1Database
}

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

        // Simulate form processing
        console.log('Form submitted with data:', formDataObj);

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

    // Serve static HTML for all other requests
    return new Response(getHTML(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};

// Serve static HTML
function getHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MoneyBridge</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .form-group { margin-bottom: 10px; }
    label { display: block; margin-bottom: 4px; }
    input, textarea { width: 100%; padding: 8px; box-sizing: border-box; }
    button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
    button:hover { background: #0056b3; }
    .main-nav.active { display: block; }
    header.sticky { position: fixed; top: 0; width: 100%; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <header id="header">
    <h1>MoneyBridge Loan Application</h1>
  </header>

  <nav class="main-nav">
    <!-- Navigation content -->
  </nav>

  <form id="loan-application-form" action="/submit-loan-application" method="POST">
    <div class="form-group">
      <label for="fullname">Full Name</label>
      <input type="text" name="fullname" id="fullname" required>
    </div>
    <div class="form-group">
      <label for="email">Email Address</label>
      <input type="email" name="email" id="email" required>
    </div>
    <div class="form-group">
      <label for="phone">Phone Number</label>
      <input type="tel" name="phone" id="phone" required>
    </div>
    <div class="form-group">
      <label for="amount">Loan Amount</label>
      <input type="number" name="amount" id="amount" required>
    </div>
    <div class="form-group">
      <label for="message">Additional Info</label>
      <textarea name="message" id="message" rows="4"></textarea>
    </div>
    <button type="submit">Submit Application</button>
  </form>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Mobile Menu Toggle (if used)
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

      // Form Submission using fetch
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
</html>`;
}
