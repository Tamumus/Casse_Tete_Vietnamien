package com.cassetete.backend.service;

import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.repository.CombinationRepository;
import com.cassetete.backend.algocassete.EquationSolver;
import com.cassetete.backend.dto.CombinationDTO;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CombinationService {

    //what the API will call is described/implemented below
    private final CombinationRepository repository;

    public CombinationService(CombinationRepository repository) {
        this.repository = repository;
    }

    //Create via api call
    public void generateAndSaveAllSolutions() {
        EquationSolver solver = new EquationSolver();
        List<Combination> results = solver.generateAllValidCombinations();

        long start = System.currentTimeMillis();
        repository.saveAll(results);
        long end = System.currentTimeMillis();

        System.out.println("✔ " + results.size() + " solutions enregistrées en " + (end - start) + " ms");
    }

    //When we do get, that's what we get
    public List<Combination> getAllCombinations() {
        return repository.findAll();
    }

    //delete a combi
    public void deleteCombination(Long id) {
        repository.deleteById(id);
    }

    //delete all combis
    public void deleteAllCombinations() {
        repository.deleteAll();
    }

    // Make the DTO into a combination/entity. So we compare apples to apples later
    public Combination dtoToEntity(CombinationDTO dto) {
        Combination comb = new Combination();

        comb.setX1(dto.getX1() != null ? dto.getX1() : 0); //if not null (user given value...) we use it as is. Or we set it to zero (the ints from the back/algo can't be zero so it's aokay)
        comb.setX2(dto.getX2() != null ? dto.getX2() : 0);
        comb.setX3(dto.getX3() != null ? dto.getX3() : 0);
        comb.setX4(dto.getX4() != null ? dto.getX4() : 0);
        comb.setX5(dto.getX5() != null ? dto.getX5() : 0);
        comb.setX6(dto.getX6() != null ? dto.getX6() : 0);
        comb.setX7(dto.getX7() != null ? dto.getX7() : 0);
        comb.setX8(dto.getX8() != null ? dto.getX8() : 0);
        comb.setX9(dto.getX9() != null ? dto.getX9() : 0);

        return comb;
    }
    //Check if the solution submitted by the user is valid
    private static final double TARGET_VALUE = 66.0;

    public boolean isValidSolution(Combination comb) {
        try {
            double result = EquationSolver.solveEquation(
                comb.getX1(), comb.getX2(), comb.getX3(),
                comb.getX4(), comb.getX5(), comb.getX6(),
                comb.getX7(), comb.getX8(), comb.getX9()
            );
            return Math.abs(result - TARGET_VALUE) < 1e-6; // valide si proche de 66
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
