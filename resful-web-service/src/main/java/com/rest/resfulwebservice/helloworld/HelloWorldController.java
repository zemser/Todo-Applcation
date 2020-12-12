package com.rest.resfulwebservice.helloworld;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

    @RequestMapping(method= RequestMethod.GET, path="/hello-world")
    public String HellowWorld(){
        return "Hello World";
    }

    @GetMapping(path = "/hello-world-bean")
    public HelloWorldBean hellowWorldBean(){
        return new HelloWorldBean("Hello World");
    }

    @GetMapping(path = "/hello-world/{name}")
    public HelloWorldBean hellowPath(@PathVariable String name){
        return new HelloWorldBean(String.format( "Hello, %s",name));
    }
}
