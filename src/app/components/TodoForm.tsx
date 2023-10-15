"use client"

import React from "react";
import { useState } from "react";
import { TodoProps } from "../types";


let createUniqueId = (lastId = 0) => {
    let last = lastId;
    return () => {
        last += 1;
        return last
    }
}

interface FormElements extends HTMLFormElement {
    todoTitle: HTMLInputElement
    description: HTMLInputElement
}

interface TodoFormProps { addTodo: (newTodo: TodoProps) => void, todoList: TodoProps[] }

export function TodoForm({ addTodo, todoList }: TodoFormProps) {

    function handleFormSubmit(e: React.ChangeEvent<FormElements>) {
        e.preventDefault();

        const title = e.target.todoTitle.value;
        const description = e.target.description.value;
        
        const uniqueId = createUniqueId(todoList[todoList.length - 1]?.id);

        const newTodo = {
            title: title,
            description: description,
            isDone: false,  
            id: uniqueId(),
        }

        addTodo(newTodo);
    }

    return (
        <>
            <div className="form-wrapper">
                <form className="todo-form" onSubmit={handleFormSubmit}>
                    <h2 className="todo-form__title">ADD TODO</h2>
                    <input type="text" name="todoTitle" className="todo-form__input-title" id="input-title" placeholder="Title" autoFocus />
                    <input type="text" name="description" className="todo-form__input-description" id="input-description" placeholder="Description" />
                    <button className="todo-form-btn__input-submit button" id="submit-btn" type="submit">ADD</button>
                </form>
            </div>
        </>
    )
}