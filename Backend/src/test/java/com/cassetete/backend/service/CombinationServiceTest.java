package com.cassetete.backend.service;

import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.repository.CombinationRepository;
import com.cassetete.backend.service.CombinationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import com.cassetete.backend.service.CombinationDeletionService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CombinationServiceTest {

    private CombinationRepository repository;
    private CombinationDeletionService deletionService; // Ajout
    private CombinationService service;

    @BeforeEach
    void setUp() {
        repository = mock(CombinationRepository.class);
        deletionService = mock(CombinationDeletionService.class); // mock aussi
        service = new CombinationService(repository, deletionService); // passe les 2 mocks
    }

    @Test
    void testGenerateAndSaveAllSolutions() {
        // When
        service.generateAndSaveAllSolutions();

        // Then : on capture la liste passée à saveAll
        ArgumentCaptor<List<Combination>> captor = ArgumentCaptor.forClass(List.class); //if you see your editor giving you errors, ignore. 2hours on it and I'm pretty sure it's just VS code being a silly bean
        verify(repository, times(1)).saveAll(captor.capture());

        List<Combination> saved = captor.getValue();

        // Should have more than a hundred combis with the cureent algo
        assertNotNull(saved);
        assertTrue(saved.size() >= 100, "Il devrait y avoir au moins 100 combinaisons valides.");

        // Check they're all ints between 1 and 9
        for (Combination comb : saved) {
            assertTrue(comb.getX1() >= 1 && comb.getX1() <= 9);
            assertTrue(comb.getX9() >= 1 && comb.getX9() <= 9);
        }
    }

    @Test
    void testIsValidSolution_shouldReturnTrue() {
        // Known valid combo from EquationSolver
        Combination comb = new Combination(1, 2, 6, 4, 7, 8, 5, 3, 9);
        boolean isValid = service.isValidSolution(comb);
        assertTrue(isValid, "La combinaison devrait être considérée comme valide.");
    }

    @Test
    void testIsValidSolution_shouldReturnFalse() {
        Combination comb = new Combination(9, 9, 9, 9, 9, 9, 9, 9, 9);
        boolean isValid = service.isValidSolution(comb);
        assertFalse(isValid, "La combinaison ne devrait pas satisfaire l'équation.");
    }
}