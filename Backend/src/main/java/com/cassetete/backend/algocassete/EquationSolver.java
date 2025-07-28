package com.cassetete.backend.algocassete;

import com.cassetete.backend.entity.Combination;

import java.util.ArrayList;
import java.util.List;

//Where the magic happens, around 0.05 on an I5-8600k
//NOTE: This assumes the divs can give us decimal results, hence the use of floats and the like in it.
//Else, we reduce the calculation time and number of solutions HEAVILY
public class EquationSolver {


      // This is only used for unit tests. We mock some combis and check if..it checks out mathematically
    public static double solveEquation(int x1, int x2, int x3, int x4, int x5,
                                       int x6, int x7, int x8, int x9) {
        if (x3 == 0 || x9 == 0) throw new IllegalArgumentException("Division par zéro impossible");
        return x1 + 13.0 * x2 / x3 + x4 + 12 * x5 - x6 - 11 + x7 * x8 / (double)x9 - 10;
    }

    public List<Combination> generateAllValidCombinations() {
        List<Combination> results = new ArrayList<>();
        int[] digits = {1,2,3,4,5,6,7,8,9};

        permute(digits, 0, results);

        return results;
    }

    //Use recursion to slowly (relatively speaking) test all combis
    private void permute(int[] arr, int index, List<Combination> results) {
        if (index == arr.length) { //wich means we tested all possible perms of those ints
            int x1 = arr[0], x2 = arr[1], x3 = arr[2], x4 = arr[3], x5 = arr[4];
            int x6 = arr[5], x7 = arr[6], x8 = arr[7], x9 = arr[8];

            if (x3 == 0 || x9 == 0) return; //Why is it here? In case I decide to use zero for other stuff later (probably control value for stuff unfilled by the user)

            //The caclulation itself, as given by the problem
            double total = x1 + 13.0 * x2 / x3 + x4 + 12 * x5 - x6 - 11 + x7 * x8 / (double)x9 - 10;

            //add the combination to the repo
            if (Math.abs(total - 66.0) < 1e-6) { //one millionth of aprox
                results.add(new Combination(x1, x2, x3, x4, x5, x6, x7, x8, x9));
            }
            //go check the next
            return;
        }

        //increments the X being swapped and tested via the swaps
        for (int i = index; i < arr.length; i++) {
            swap(arr, i, index);
            permute(arr, index + 1, results);
            swap(arr, i, index);
        }
    }

    //swap two ints around/Backtracking
    private void swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    } 
}
