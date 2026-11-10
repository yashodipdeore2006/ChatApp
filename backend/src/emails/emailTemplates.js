export function generateWelcomeEmail(name, clientUrl) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Our Platform</title>
          <style>
              body {
                  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  background-color: #f4f6f9;
                  color: #333333;
                  margin: 0;
                  padding: 0;
                  -webkit-font-smoothing: antialiased;
              }
              .email-container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
              }
              .header {
                  background-color: #4F46E5;
                  padding: 40px 20px;
                  text-align: center;
              }
              .header h1 {
                  color: #ffffff;
                  margin: 0;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: -0.5px;
              }
              .content {
                  padding: 40px 30px;
                  line-height: 1.6;
              }
              .content p {
                  font-size: 16px;
                  color: #4B5563;
                  margin-top: 0;
                  margin-bottom: 24px;
              }
              .content p strong {
                  color: #1F2937;
              }
              .cta-container {
                  text-align: center;
                  margin: 35px 0;
              }
              .btn-primary {
                  background-color: #4F46E5;
                  color: #ffffff !important;
                  text-decoration: none;
                  padding: 14px 30px;
                  font-size: 16px;
                  font-weight: 600;
                  border-radius: 6px;
                  display: inline-block;
                  transition: background-color 0.2s;
              }
              .footer {
                  background-color: #F9FAFB;
                  padding: 24px 30px;
                  text-align: center;
                  border-top: 1px solid #E5E7EB;
              }
              .footer p {
                  font-size: 13px;
                  color: #9CA3AF;
                  margin: 0;
              }
              .footer a {
                  color: #4F46E5;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>

          <div class="email-container">
              <!-- Header -->
              <div class="header">
                  <h1>Welcome Aboard!</h1>
              </div>

              <!-- Content -->
              <div class="content">
                  <p>Hi <strong>${name}</strong>,</p>
                  <p>Thanks for creating an account! We're thrilled to have you join our community. Your account is officially set up and ready to go.</p>
                  <p>To get started and explore your new dashboard, simply click the button below:</p>
                  
                  <div class="cta-container">
                      <a href="${clientUrl}" class="btn-primary" target="_blank">Access Your Dashboard</a>
                  </div>

                  <p>If the button doesn't work, copy and paste this link into your browser:</p>
                  <p style="font-size: 14px; word-break: break-all; color: #4F46E5;">${clientUrl}</p>
                  
                  <p>If you have any questions or need a hand getting started, feel free to reply directly to this email. Our team is always here to help.</p>
                  <p>Cheers,<br>The Team</p>
              </div>

              <!-- Footer -->
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} Our Platform. All rights reserved.</p>
                  <p>You received this email because you registered on our website.</p>
              </div>
          </div>

      </body>
    </html>
    `;
}