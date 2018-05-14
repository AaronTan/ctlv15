package net.ysjss.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @RequestMapping("/")
    public String index(){
        return "index";
    }

    @RequestMapping("/tologin")
    public String toLogin(){
        return "login";
    }

    @RequestMapping("/login")
    public String login(String username, String password, HttpSession session){
        if(username.equals("admin") && password.equals("123456")){
            session.setAttribute("user",username);
            return "redirect:/";
        }else{
            return "redirect:/tologin";
        }


    }
}
