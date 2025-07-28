package com.cassetete.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//make a table that stroes all the combis as an id, followed by nine ints
@Entity
@Table(name = "combinations")
public class Combination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int x1;
    private int x2;
    private int x3;
    private int x4;
    private int x5;
    private int x6;
    private int x7;
    private int x8;
    private int x9;

    public Combination() {}

    public Combination(int x1, int x2, int x3, int x4, int x5, int x6, int x7, int x8, int x9) {
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;
        this.x5 = x5;
        this.x6 = x6;
        this.x7 = x7;
        this.x8 = x8;
        this.x9 = x9;
    }

    //stuff below is needed for unit tests *shrugs*
    // getter id
    public Long getId() {
        return id;
    }

    // setter id
    public void setId(Long id) {
        this.id = id;
    }

    // getters
    public int getX1() { return x1; }
    public int getX2() { return x2; }
    public int getX3() { return x3; }
    public int getX4() { return x4; }
    public int getX5() { return x5; }
    public int getX6() { return x6; }
    public int getX7() { return x7; }
    public int getX8() { return x8; }
    public int getX9() { return x9; }

    // Setters
    public void setX1(int x1) { this.x1 = x1; }
    public void setX2(int x2) { this.x2 = x2; }
    public void setX3(int x3) { this.x3 = x3; }
    public void setX4(int x4) { this.x4 = x4; }
    public void setX5(int x5) { this.x5 = x5; }
    public void setX6(int x6) { this.x6 = x6; }
    public void setX7(int x7) { this.x7 = x7; }
    public void setX8(int x8) { this.x8 = x8; }
    public void setX9(int x9) { this.x9 = x9; }
}