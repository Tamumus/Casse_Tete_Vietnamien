package com.cassetete.backend.controller;

import com.cassetete.backend.entity.Combination;
import com.cassetete.backend.service.CombinationService;
import com.cassetete.backend.service.CombinationSearchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CombinationController.class)
public class CombinationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CombinationService combinationService;

     @MockBean
    private CombinationSearchService combinationSearchService;

    private List<Combination> mockCombinations;

    @BeforeEach
    void setUp() {
        //add to edit the combination table for this to work 
        Combination c1 = new Combination();
        c1.setId(1L); 
        c1.setX1(1);
        c1.setX2(2);
        c1.setX3(3);
        c1.setX4(4);
        c1.setX5(5);
        c1.setX6(6);
        c1.setX7(7);
        c1.setX8(8);
        c1.setX9(9);

        Combination c2 = new Combination();
        c2.setId(2L);
        c2.setX1(9);
        c2.setX2(8);
        c2.setX3(7);
        c2.setX4(6);
        c2.setX5(5);
        c2.setX6(4);
        c2.setX7(3);
        c2.setX8(2);
        c2.setX9(1);

        mockCombinations = Arrays.asList(c1, c2);
    }

    //Test the GET
    @Test
    void shouldReturnAllCombinations() throws Exception {
        when(combinationService.getAllCombinations()).thenReturn(mockCombinations);

        mockMvc.perform(get("/api/combinations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].x1", is(1)))
                .andExpect(jsonPath("$[1].x9", is(1)));
    }

    //Test the generate/create
    @Test
    void shouldCallGenerateAndReturnConfirmationMessage() throws Exception {
        doNothing().when(combinationService).generateAndSaveAllSolutions();

        mockMvc.perform(post("/api/combinations/generate"))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("✔ Solutions générées en")));
    }

    //test deleting by id
    @Test
    void shouldDeleteCombinationById() throws Exception {
        long idToDelete = 1L;

        doNothing().when(combinationService).deleteCombination(idToDelete);

        mockMvc.perform(delete("/api/combinations/{id}", idToDelete))
                .andExpect(status().isNoContent());
    }

    //test deleting all of it
    @Test
    void shouldDeleteAllCombinations() throws Exception {
        doNothing().when(combinationService).deleteAllCombinations();

        mockMvc.perform(delete("/api/combinations"))
                .andExpect(status().isNoContent());
    }
}