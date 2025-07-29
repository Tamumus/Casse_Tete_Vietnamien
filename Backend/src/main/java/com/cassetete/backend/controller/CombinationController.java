package com.cassetete.backend.controller;

import com.cassetete.backend.dto.CombinationDTO;
import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.service.CombinationService;
import com.cassetete.backend.service.CombinationDeletionService;
import com.cassetete.backend.service.CombinationSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/combinations")
@CrossOrigin(origins = "*")
public class CombinationController {

    private final CombinationService combinationService;
    private final CombinationSearchService combinationSearchService;
    private final CombinationDeletionService combinationDeletionService;

    public CombinationController(CombinationService combinationService,
                                 CombinationSearchService combinationSearchService,
                                 CombinationDeletionService combinationDeletionService) {
        this.combinationService = combinationService;
        this.combinationSearchService = combinationSearchService;
        this.combinationDeletionService = combinationDeletionService;
    }

    // =========================================
    // READ : export all combis
    @GetMapping
    public List<Combination> getAllCombinations() {
        return combinationService.getAllCombinations();
    }

    // =========================================
    // CREATE : generate and save all solutions
    @PostMapping("/generate")
    public ResponseEntity<String> generate() {
        long start = System.currentTimeMillis();
        combinationService.generateAndSaveAllSolutions();
        long end = System.currentTimeMillis();
        String message = "✔" + (end - start) + " ms";
        return ResponseEntity.ok(message);
    }

    // =========================================
    // DELETE : delete ONE combi by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCombination(@PathVariable Long id) {
        combinationService.deleteCombination(id);
        return ResponseEntity.noContent().build();
    }

    // =========================================
    // DELETE : delete ALL combis and reset the ID counter in the DB
    @DeleteMapping("/full-reset")
    public ResponseEntity<Void> deleteAllAndResetIds() {
        combinationDeletionService.deleteAllCombinationsAndResetIds();
        return ResponseEntity.noContent().build();  //send back 204 : OK
    }

    // =========================================
    // POST : Check if full combination is valid
    @PostMapping("/check")
    public ResponseEntity<Map<String, String>> checkCombination(@RequestBody CombinationDTO dto) {
        Combination combination = dto.toEntity();
        System.out.println("Réception DTO : " + combination);

        boolean isValid = combinationService.isValidSolution(combination);
        System.out.println("Résultat de la validation : " + isValid);

        String message = isValid ? "✅ Solution valide" : "❌ Mauvaise solution";
        return ResponseEntity.ok(Map.of("message", message));
    }
}