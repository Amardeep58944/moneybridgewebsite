package com.moneybridge.service;

import com.moneybridge.model.LoanApplication;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Service class to handle loan application processing
 */
public class LoanService {
    // Simple in-memory storage for demo purposes
    // In a real application, this would use a database
    private static final ConcurrentHashMap<Long, LoanApplication> APPLICATIONS = new ConcurrentHashMap<>();
    private static final AtomicLong ID_GENERATOR = new AtomicLong(1);

    /**
     * Submit a new loan application
     * @param application the loan application to submit
     * @return the ID of the created application
     */
    public long submitApplication(LoanApplication application) {
        // Validate the application
        validateApplication(application);

        // Generate ID and store the application
        long id = ID_GENERATOR.getAndIncrement();
        APPLICATIONS.put(id, application);

        // In a real application, you would:
        // 1. Save to database
        // 2. Send notifications (email, SMS)
        // 3. Process the application through a workflow

        System.out.println("New application received: " + application);

        return id;
    }

    /**
     * Get all submitted applications
     * @return list of all loan applications
     */
    public List<LoanApplication> getAllApplications() {
        return new ArrayList<>(APPLICATIONS.values());
    }

    /**
     * Get a specific application by ID
     * @param id the application ID
     * @return the loan application, or null if not found
     */
    public LoanApplication getApplicationById(long id) {
        return APPLICATIONS.get(id);
    }

    /**
     * Validate a loan application
     * @param application the application to validate
     * @throws IllegalArgumentException if the application is invalid
     */
    private void validateApplication(LoanApplication application) {
        if (application == null) {
            throw new IllegalArgumentException("Application cannot be null");
        }

        if (application.getName() == null || application.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }

        if (application.getMobile() == null || application.getMobile().trim().isEmpty()) {
            throw new IllegalArgumentException("Mobile number is required");
        }

        if (application.getLocation() == null || application.getLocation().trim().isEmpty()) {
            throw new IllegalArgumentException("Location is required");
        }

        if (!application.isTermsAccepted()) {
            throw new IllegalArgumentException("Terms must be accepted");
        }
    }
}
