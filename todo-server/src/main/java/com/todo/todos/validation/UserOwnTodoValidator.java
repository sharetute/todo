package com.todo.todos.validation;

import com.todo.securitylib.dto.UserInfo;
import com.todo.securitylib.facade.UserService;
import com.todo.todos.dto.TodoDto;
import com.todo.todos.model.Todo;
import com.todo.todos.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

public class UserOwnTodoValidator implements ConstraintValidator<UserOwnTodo, Object> {

    @Autowired
    protected TodoRepository todoRepository;

    @Autowired
    protected UserService userService;

    @Override
    public boolean isValid(Object param, ConstraintValidatorContext constraintValidatorContext) {

        if (param == null) {
            return false;
        }

        Optional<Todo> oTodo;

        if (param instanceof TodoDto) {
            oTodo = this.todoRepository.findById(((TodoDto) param).getId());
        } else if (param instanceof Long) {
            oTodo = this.todoRepository.findById((Long) param);
        } else {
            return false;
        }

        UserInfo userInfo = this.userService.getUserInfo();

        return oTodo.isPresent() && oTodo.get().getSub().equals(userInfo.getSub());
    }

}
