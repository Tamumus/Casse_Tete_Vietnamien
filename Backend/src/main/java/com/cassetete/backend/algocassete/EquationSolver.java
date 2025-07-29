package com.cassetete.backend.algocassete;

import com.cassetete.backend.entity.Combination;

import java.util.ArrayList;
import java.util.List;

public class EquationSolver {

    private static final double EPSILON = 1e-6; // one millionth degree of approx

    // Self explenatory, needed to optimize a bit
    private boolean isAlmostInteger(double val) {
        return Math.abs(val - Math.round(val)) < EPSILON;
    }

    // Check if a combi solves the problem. Used in unit testing and some calls from the front
    public static double solveEquation(int x1, int x2, int x3, int x4, int x5,
                                       int x6, int x7, int x8, int x9) {
        if (x3 == 0 || x9 == 0) throw new IllegalArgumentException("Division par zéro impossible");
        return x1 + 13.0 * x2 / x3 + x4 + 12 * x5 - x6 - 11 + x7 * x8 / (double) x9 - 10;
    }

    // Fill our .json with all combis (Table: "COMBINATIONS")
    public List<Combination> generateAllValidCombinations() {
        List<Combination> results = new ArrayList<>();
        int[] digits = {1,2,3,4,5,6,7,8,9};
        permute(digits, 0, results);
        return results;
    }

    private void permute(int[] arr, int index, List<Combination> results) {
        if (index == arr.length) {
            int x1 = arr[0], x2 = arr[1], x3 = arr[2], x4 = arr[3], x5 = arr[4];
            int x6 = arr[5], x7 = arr[6], x8 = arr[7], x9 = arr[8];

            if (x3 == 0 || x9 == 0) return; //just in case zeros got in there. Somehow.

            // We prune what's wont give us an int early so we can treat them as such when we check the result
            double combinedFraction = (13.0 * x2) / x3 + (x7 * x8) / (double) x9;
            if (!isAlmostInteger(combinedFraction)) return;

            // Take what wasn't pruned and do math to check if it solves it
            double total = x1 + combinedFraction + x4 + 12 * x5 - x6 - 11 - 10;

            // We take "close enough(-0.5 or + 0.5)" float to the int 66 as solving the problem. 
            //this doesn't change the number of solutions and saves about 20MS
            //this works because of the early pruning
            if ((int) Math.round(total) == 66) {
                results.add(new Combination(x1, x2, x3, x4, x5, x6, x7, x8, x9));
            }
            return;
        }

        //recursively check new combis via swapping two ints incrementally until we done all of them (9!)
        for (int i = index; i < arr.length; i++) {
            swap(arr, i, index); //next permutation..
            permute(arr, index + 1, results);
            swap(arr, i, index);//and the next...
        }
    }

    private void swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}