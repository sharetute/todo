package com.app.todo.validation;

import com.app.todo.model.Todo;
import com.app.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class TodoExistValidator implements ConstraintValidator<TodoExist, Todo> {

    @Autowired
    protected TodoRepository todoRepository;

    @Override
    public boolean isValid(Todo todo, ConstraintValidatorContext constraintValidatorContext) {

        return todo != null && this.todoRepository.findById(todo.getId()).isPresent();
    }

}
