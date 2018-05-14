package net.ysjss.service.impl;

import net.ysjss.model.Student;
import net.ysjss.repository.StudentRepository;
import net.ysjss.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Override
    public Student add(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> all() {
        return studentRepository.findAll();
    }
}
