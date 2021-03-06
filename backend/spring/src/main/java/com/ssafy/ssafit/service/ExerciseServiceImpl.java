package com.ssafy.ssafit.service;

import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("exerciseService")
public class ExerciseServiceImpl implements ExerciseService{

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public List<Exercise> exerciseList() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise getExerciseByExerciseId(int id) {
        return exerciseRepository.findExerciseById(id).orElse(null);
    }

}
