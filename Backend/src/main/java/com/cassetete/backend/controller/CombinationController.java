package com.cassetete.backend.controller;

import com.cassetete.backend.dto.CombinationDTO;
import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.service.CombinationService;
import com.cassetete.backend.service.CombinationSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/combinations")
@CrossOrigin(origins = "*")
public class CombinationController {

    private final CombinationService combinationService;
    private final CombinationSearchService combinationSearchService;

    public CombinationController(CombinationService combinationService,
                                 CombinationSearchService combinationSearchService) {
        this.combinationService = combinationService;
        this.combinationSearchService = combinationSearchService;
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
        String message = "✔ Solutions générées en " + (end - start) + " ms";
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
    // DELETE : delete ALL combis
    @DeleteMapping
    public ResponseEntity<Void> deleteAllCombinations() {
        combinationService.deleteAllCombinations();
        return ResponseEntity.noContent().build();
    }

    // =========================================
    // POST : Check if full combination is valid
    //        OR search partial matches if some values are unknown (== 0)
    @PostMapping("/check")
    public ResponseEntity<?> checkOrSearchCombination(@RequestBody CombinationDTO dto) {
        if (isFullyFilled(dto)) {
            boolean isValid = combinationService.isValidSolution(dto.toEntity());
            return ResponseEntity.ok(isValid ? "✅ Solution valide" : "❌ Mauvaise solution");
        } else {
            List<Combination> matching = combinationSearchService.searchMatchingCombinations(dto);
            return ResponseEntity.ok(matching);
        }
    }

    // DTO pour la réponse combinée
    public static class CheckResult {
        public boolean isValid;
        public List<Combination> matches;

        public CheckResult(boolean isValid, List<Combination> matches) {
            this.isValid = isValid;
            this.matches = matches;
        }
    }

    // =========================================
    // Private helper: check if all fields are filled and ≠ 0
    private boolean isFullyFilled(CombinationDTO dto) {
        return dto.getX1() != null && dto.getX1() != 0 &&
               dto.getX2() != null && dto.getX2() != 0 &&
               dto.getX3() != null && dto.getX3() != 0 &&
               dto.getX4() != null && dto.getX4() != 0 &&
               dto.getX5() != null && dto.getX5() != 0 &&
               dto.getX6() != null && dto.getX6() != 0 &&
               dto.getX7() != null && dto.getX7() != 0 &&
               dto.getX8() != null && dto.getX8() != 0 &&
               dto.getX9() != null && dto.getX9() != 0;
    }
}