package com.cassetete.backend.algocassetete;

import com.cassetete.backend.algocassete.EquationSolver;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EquationSolverTest {

    @Test
    //Pull the first valid combi then check it
    public void testSolveEquation_ValidCombination() {
    EquationSolver solver = new EquationSolver();
    var validCombs = solver.generateAllValidCombinations();
    assertFalse(validCombs.isEmpty(), "Il doit y avoir au moins une solution");

    var comb = validCombs.get(0);

    double result = EquationSolver.solveEquation(
        comb.getX1(), comb.getX2(), comb.getX3(),
        comb.getX4(), comb.getX5(), comb.getX6(),
        comb.getX7(), comb.getX8(), comb.getX9()
    );

    assertEquals(66.0, result, 1e-6);
}

    @Test
    //I guess checking we don't divide by zero isn't a bad idea
    public void testSolveEquation_DivisionByZero() {
        assertThrows(IllegalArgumentException.class, () -> {
            EquationSolver.solveEquation(1, 2, 0, 4, 5, 6, 7, 8, 9);
        });
    }
}