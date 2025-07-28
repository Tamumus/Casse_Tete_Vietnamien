package com.cassetete.backend.service;

import com.cassetete.backend.dto.CombinationDTO;
import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.repository.CombinationRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CombinationSearchServiceTest {

    private CombinationRepository repository;
    private CombinationSearchService service;

    @BeforeEach
    void setUp() {
        repository = mock(CombinationRepository.class);
        service = new CombinationSearchService(repository);
    }

    @Test
    void testSearchMatchingCombinations_partialMatch() {
        // Fill a fake base with those datas
        Combination c1 = new Combination(1, 2, 3, 4, 5, 6, 7, 8, 9); //shoudl match
        Combination c2 = new Combination(1, 2, 3, 0, 0, 6, 7, 8, 9); //should match this one
        Combination c3 = new Combination(9, 8, 7, 6, 5, 4, 3, 2, 1);
        List<Combination> allCombinations = Arrays.asList(c1, c2, c3);

        when(repository.findAll()).thenReturn(allCombinations);

        // DTO with two unknown
        CombinationDTO dto = new CombinationDTO();
        dto.setX1(1);
        dto.setX2(2);
        dto.setX3(3);
        dto.setX4(0); // inconnu
        dto.setX5(0); // inconnu
        dto.setX6(6);
        dto.setX7(7);
        dto.setX8(8);
        dto.setX9(9);

        List<Combination> results = service.searchMatchingCombinations(dto);

        // Check we matched the good ones
        assertTrue(results.contains(c1));
        assertTrue(results.contains(c2));
        assertFalse(results.contains(c3));
        assertEquals(2, results.size());
    }
}