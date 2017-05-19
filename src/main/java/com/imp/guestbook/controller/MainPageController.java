package com.imp.guestbook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller for main page
 */

@Controller
public class MainPageController {

    @GetMapping(value = "/main")
    public String getMainPage (){
        return "forward:/index.html";
    }
}
