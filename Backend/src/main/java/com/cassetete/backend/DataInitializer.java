package com.cassetete.backend;

import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.repository.CombinationRepository;
import com.cassetete.backend.algocassete.Testalgo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CombinationRepository combinationRepository;

    public DataInitializer(CombinationRepository combinationRepository) {
        this.combinationRepository = combinationRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Combination combo = new Combination(Testalgo.genererCombinaison());
        combinationRepository.save(combo);
        System.out.println("Donnée test insérée : " + combo.getNumbers());
    }
}
