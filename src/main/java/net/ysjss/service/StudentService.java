package net.ysjss.service;


import net.ysjss.model.Student;

import java.util.List;

public interface StudentService {
    Student add(Student student);

    List<Student> all();
}
