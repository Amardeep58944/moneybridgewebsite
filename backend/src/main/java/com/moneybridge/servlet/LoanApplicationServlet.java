package com.moneybridge.servlet;

import com.moneybridge.model.LoanApplication;
import com.moneybridge.service.LoanService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Servlet to handle loan application form submissions
 */
@WebServlet("/api/loan-application")
public class LoanApplicationServlet extends HttpServlet {
    private final LoanService loanService = new LoanService();

    /**
     * Handle POST requests for new loan applications
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set response content type
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            // Extract form data
            String name = request.getParameter("name");
            String mobile = request.getParameter("mobile");
            String location = request.getParameter("location");
            String income = request.getParameter("income");
            String loanType = request.getParameter("loan-type");
            String terms = request.getParameter("terms");

            // Create loan application object
            LoanApplication application = new LoanApplication();
            application.setName(name);
            application.setMobile(mobile);
            application.setLocation(location);
            application.setIncome(income);
            application.setLoanType(loanType);
            application.setTermsAccepted(terms != null && (terms.equals("on") || terms.equals("true")));

            // Submit the application
            long applicationId = loanService.submitApplication(application);

            // Return success response
            PrintWriter out = response.getWriter();
            out.println("{\"success\": true, \"applicationId\": " + applicationId + "}");

        } catch (IllegalArgumentException e) {
            // Return error for validation failures
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            PrintWriter out = response.getWriter();
            out.println("{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");

        } catch (Exception e) {
            // Return error for server failures
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            PrintWriter out = response.getWriter();
            out.println("{\"success\": false, \"error\": \"An internal server error occurred\"}");

            // Log the error
            e.printStackTrace();
        }
    }

    /**
     * Handle GET requests to retrieve application data
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set response content type
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // This would typically require admin authentication
        // For demo purposes, we'll just return a simple response

        PrintWriter out = response.getWriter();
        out.println("{\"success\": true, \"message\": \"This endpoint would list applications with proper authentication\"}");
    }
}
