package com.cassetete.backend.controller;

import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.service.CombinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/combinations")
@CrossOrigin(origins = "*")
public class CombinationController {

    @Autowired
    private CombinationService combinationService;

    @PostMapping("/generate")
    public Combination generateCombination() {
        return combinationService.generateAndSave();
    }

    @GetMapping
    public List<Combination> getAllCombinations() {
        return combinationService.getAll();
    }
}
