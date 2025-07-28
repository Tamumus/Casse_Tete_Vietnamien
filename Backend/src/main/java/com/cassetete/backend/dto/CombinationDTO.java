package com.cassetete.backend.dto;

import com.cassetete.backend.entity.Combination;

//Basically an empty template that springboot will convert for us to the Json/combinations as needed
public class CombinationDTO {
    private Integer x1;
    private Integer x2;
    private Integer x3;
    private Integer x4;
    private Integer x5;
    private Integer x6;
    private Integer x7;
    private Integer x8;
    private Integer x9;

    public CombinationDTO() {}

    //fill it with values front the front as needed
    public Integer getX1() { return x1; }
    public void setX1(Integer x1) { this.x1 = x1; }

    public Integer getX2() { return x2; }
    public void setX2(Integer x2) { this.x2 = x2; }

    public Integer getX3() { return x3; }
    public void setX3(Integer x3) { this.x3 = x3; }

    public Integer getX4() { return x4; }
    public void setX4(Integer x4) { this.x4 = x4; }

    public Integer getX5() { return x5; }
    public void setX5(Integer x5) { this.x5 = x5; }

    public Integer getX6() { return x6; }
    public void setX6(Integer x6) { this.x6 = x6; }

    public Integer getX7() { return x7; }
    public void setX7(Integer x7) { this.x7 = x7; }

    public Integer getX8() { return x8; }
    public void setX8(Integer x8) { this.x8 = x8; }

    public Integer getX9() { return x9; }
    public void setX9(Integer x9) { this.x9 = x9; }

 //Convert the DTO to an entity/combination
    public Combination toEntity() {
        Combination comb = new Combination();
        comb.setX1(this.x1 != null ? this.x1 : 0);
        comb.setX2(this.x2 != null ? this.x2 : 0);
        comb.setX3(this.x3 != null ? this.x3 : 0);
        comb.setX4(this.x4 != null ? this.x4 : 0);
        comb.setX5(this.x5 != null ? this.x5 : 0);
        comb.setX6(this.x6 != null ? this.x6 : 0);
        comb.setX7(this.x7 != null ? this.x7 : 0);
        comb.setX8(this.x8 != null ? this.x8 : 0);
        comb.setX9(this.x9 != null ? this.x9 : 0);
        return comb;
    }
}