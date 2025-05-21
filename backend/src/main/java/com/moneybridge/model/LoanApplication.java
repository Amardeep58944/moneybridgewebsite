package com.moneybridge.model;

import java.io.Serializable;

/**
 * Model class representing a loan application
 */
public class LoanApplication implements Serializable {
    private String name;
    private String mobile;
    private String location;
    private String income;
    private String loanType;
    private boolean termsAccepted;

    // Default constructor
    public LoanApplication() {
    }

    // Parameterized constructor
    public LoanApplication(String name, String mobile, String location, String income, String loanType, boolean termsAccepted) {
        this.name = name;
        this.mobile = mobile;
        this.location = location;
        this.income = income;
        this.loanType = loanType;
        this.termsAccepted = termsAccepted;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getIncome() {
        return income;
    }

    public void setIncome(String income) {
        this.income = income;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public boolean isTermsAccepted() {
        return termsAccepted;
    }

    public void setTermsAccepted(boolean termsAccepted) {
        this.termsAccepted = termsAccepted;
    }

    @Override
    public String toString() {
        return "LoanApplication{" +
                "name='" + name + '\'' +
                ", mobile='" + mobile + '\'' +
                ", location='" + location + '\'' +
                ", income='" + income + '\'' +
                ", loanType='" + loanType + '\'' +
                ", termsAccepted=" + termsAccepted +
                '}';
    }
}
