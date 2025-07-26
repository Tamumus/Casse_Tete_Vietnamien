package com.cassetete.backend.service;

import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.repository.CombinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.*;

@Service
public class CombinationService {

    @Autowired
    private CombinationRepository combinationRepository;

    public Combination generateAndSave() {
        List<Integer> numbers = IntStream.rangeClosed(1, 9)
                                         .boxed()
                                         .collect(Collectors.toList());
        Collections.shuffle(numbers);
        Combination combination = new Combination(numbers);
        return combinationRepository.save(combination);
    }

    public List<Combination> getAll() {
        return combinationRepository.findAll();
    }
}