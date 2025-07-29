package com.cassetete.backend.service;

import com.cassetete.backend.repository.CombinationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//delete one combi by ID or all combis, one public function each
@Service
public class CombinationDeletionService {

    private final CombinationRepository combinationRepository;

    public CombinationDeletionService(CombinationRepository combinationRepository) {
        this.combinationRepository = combinationRepository;
    }

    @Transactional
    public void deleteAllCombinationsAndResetIds() {
        combinationRepository.truncateAndResetIds();
    }
}