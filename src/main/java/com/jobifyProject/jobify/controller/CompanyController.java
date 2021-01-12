package com.jobifyProject.jobify.controller;

import com.jobifyProject.jobify.model.Company;
import com.jobifyProject.jobify.model.JobOffer;
import com.jobifyProject.jobify.repository.CompanyRepository;
import com.jobifyProject.jobify.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRepository jobRepository;

    @GetMapping("/companies")
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @GetMapping("/companies/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable UUID id) {
        Company company = companyRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("Company with id " + id + " not found"));
        return ResponseEntity.ok(company);
    }

    @GetMapping("/companies/{id}/jobs")
    public List<JobOffer> getJobsByCompanyId(@PathVariable UUID id) {
        List<JobOffer> jobOffers = jobRepository.findAllByCompanyId(id);
        return jobOffers;
    }

    @GetMapping("/companies/{companyId}/jobs/{jobId}")
    public Optional<JobOffer> getJobById(@PathVariable UUID companyId, @PathVariable UUID jobId) {
        Company company = companyRepository.findById(companyId).orElseThrow(EntityNotFoundException::new);
        Optional<JobOffer> job = jobRepository.findByIdAndCompany(company,jobId);
        return job;
    }

    @PostMapping("/companies")
    public Company addCompany(@RequestBody Company company) {
        return companyRepository.save(company);
    }

    @PutMapping("/companies/{id}")
    public ResponseEntity<Company> updateCompanyById(@PathVariable UUID id, @RequestBody Company updatedCompanyDetails) {
        Company company = companyRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("User with id " + id + " not found"));
        company.setName(updatedCompanyDetails.getName());
        company.setWebsiteLink(updatedCompanyDetails.getWebsiteLink());
        company.setCompanyLogo(updatedCompanyDetails.getCompanyLogo());

        Company updatedCompany = companyRepository.save(company);

        return ResponseEntity.ok(updatedCompany);
    }

    @DeleteMapping("/companies/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCompany(@PathVariable UUID id) {
        Company company = companyRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("User with id " + id + " not found"));

        companyRepository.delete(company);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
