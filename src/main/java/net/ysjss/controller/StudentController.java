package net.ysjss.controller;

import net.ysjss.model.Student;
import net.ysjss.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

//学生的操作界面

@Controller
//@RequestMapping("/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/student/index")
    public String index(){  //列表
        return "curd/student.html";
    }

    @ResponseBody
    @GetMapping("/students")
    public List<Student> all(){  //列表
        return studentService.all();
    }

    @ResponseBody
    @PostMapping("/student")
    public Student add(Student student){
//        System.out.println(student);
        //return "curd/student.html";
        return studentService.add(student);
    }
}
