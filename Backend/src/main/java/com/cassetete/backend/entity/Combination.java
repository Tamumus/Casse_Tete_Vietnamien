package com.cassetete.backend.entity;

import jakarta.persistence.*;
import java.util.*;
import java.util.stream.*;

@Entity
public class Combination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numbers;

    public Combination() {}

    public Combination(List<Integer> numbersList) {
        this.numbers = numbersList.stream()
                                  .map(String::valueOf)
                                  .collect(Collectors.joining(","));
    }

    public Long getId() {
        return id;
    }

    public String getNumbers() {
        return numbers;
    }

    public void setNumbers(String numbers) {
        this.numbers = numbers;
    }

    public List<Integer> getNumberList() {
        return Arrays.stream(numbers.split(","))
                     .map(Integer::parseInt)
                     .toList();
    }
}