package net.ysjss.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name="T_Student")
public class Student {
    @Id
    private int id;
    private String name;
    private String code;    //学号
    private int gender;     //1:男;2:女
    private int status;     //1:正常
    private Date birthday;
    private Date enroll;    //入学时间
}
