package com.cassetete.backend.service;

import com.cassetete.backend.dto.CombinationDTO;
import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.repository.CombinationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CombinationSearchService {

    private final CombinationRepository combinationRepository;

    public CombinationSearchService(CombinationRepository combinationRepository) {
        this.combinationRepository = combinationRepository;
    }

    public List<Combination> searchMatchingCombinations(CombinationDTO dto) {
        List<Combination> all = combinationRepository.findAll();

        return all.stream() //filter based on x == 0, wich should only happen from the input of the user on the front
            .filter(c -> dto.getX1() == null || dto.getX1() == 0 || c.getX1() == dto.getX1())
            .filter(c -> dto.getX2() == null || dto.getX2() == 0 || c.getX2() == dto.getX2())
            .filter(c -> dto.getX3() == null || dto.getX3() == 0 || c.getX3() == dto.getX3())
            .filter(c -> dto.getX4() == null || dto.getX4() == 0 || c.getX4() == dto.getX4())
            .filter(c -> dto.getX5() == null || dto.getX5() == 0 || c.getX5() == dto.getX5())
            .filter(c -> dto.getX6() == null || dto.getX6() == 0 || c.getX6() == dto.getX6())
            .filter(c -> dto.getX7() == null || dto.getX7() == 0 || c.getX7() == dto.getX7())
            .filter(c -> dto.getX8() == null || dto.getX8() == 0 || c.getX8() == dto.getX8())
            .filter(c -> dto.getX9() == null || dto.getX9() == 0 || c.getX9() == dto.getX9())
            .collect(Collectors.toList());
    }
}