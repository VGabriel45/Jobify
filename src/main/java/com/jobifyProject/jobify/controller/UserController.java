package com.jobifyProject.jobify.controller;

import com.jobifyProject.jobify.model.JobOffer;
import com.jobifyProject.jobify.model.JobOfferStates;
import com.jobifyProject.jobify.model.User;
import com.jobifyProject.jobify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.*;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("User with id " + id + " not found"));
        return ResponseEntity.ok(user);
    }

    @GetMapping("/users/{id}/favoriteJobs")
    public Set<JobOffer> getFavoriteJobs(@PathVariable UUID id) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("User with id " + id + " not found"));
        return user.getFavoriteJobOffers();
    }

    @GetMapping("/users/{id}/appliedJobs")
    public Set<JobOffer> getAppliedJobs(@PathVariable UUID id) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("User with id " + id + " not found"));
        return user.getAppliedJobs();
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable UUID id, @RequestBody User updatedUserDetails) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("User with id " + id + " not found"));
        user.setUsername(updatedUserDetails.getUsername());
        user.setRole(updatedUserDetails.getRole());
        user.setEmail(updatedUserDetails.getEmail());
        user.setPassword(updatedUserDetails.getPassword());

        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable UUID id) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new ResourceAccessException("User with id " + id + " not found"));

        userRepository.delete(user);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

