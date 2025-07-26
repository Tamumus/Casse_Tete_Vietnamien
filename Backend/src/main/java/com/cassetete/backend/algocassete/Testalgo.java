package com.cassetete.backend.algocassete;

import java.util.*;

public class Testalgo {

    /**
     * Génère une liste de 9 entiers (1 à 9) dans un ordre aléatoire (permutation).
     * @return List<Integer> combinaison mélangée
     */
    public static List<Integer> genererCombinaison() {
        List<Integer> nombres = new ArrayList<>();
        for (int i = 1; i <= 9; i++) {
            nombres.add(i);
        }
        Collections.shuffle(nombres);
        return nombres;
    }
}