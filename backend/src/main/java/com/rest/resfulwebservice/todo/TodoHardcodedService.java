package com.rest.resfulwebservice.todo;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Service //make it a spring service
public class TodoHardcodedService {

    private static List<Todo> todos = new ArrayList();
    private static long idCounter=0;
    static{
        todos.add(new Todo(++idCounter, "zemser", "learn spanish hermnao", new Date(), false ));
        todos.add(new Todo(++idCounter, "zemser", "do dishes", new Date(), false));
        todos.add(new Todo(++idCounter, "zemser", "read book", new Date(), false));
    }

    public List<Todo> findAll(){
        return todos;
    }

    public Todo save(Todo todo){
        if(todo.getId() == -1 || todo.getId() == 0){
            todo.setId(++idCounter);
            todos.add(todo);
        }else{
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }
    public Todo deleteById(long id){
        Todo todo = findById(id);
        if(todo == null) return null;
        todos.remove(todo);
        return todo;
    }

    public Todo findById(long id) {
        for(Todo todo: todos){
            if(todo.getId() == id){
                return todo;
            }
        }
        return null;
    }

}
