package com.cassetete.backend.CombinationRepositoryTest;

import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.repository.CombinationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class CombinationRepositoryTest {

    @Autowired
    private CombinationRepository repository;

    @Test
    public void testSaveAndFind() {
        Combination comb = new Combination(1, 2, 3, 4, 5, 6, 7, 8, 9);
        Combination saved = repository.save(comb);

        List<Combination> results = repository.findAll();

        assertThat(results).isNotEmpty();
        assertThat(results).contains(saved);

        Combination retrieved = results.get(0);
        assertThat(retrieved.getX1()).isEqualTo(1);
        assertThat(retrieved.getX9()).isEqualTo(9);
    }
}
