package com.library.service.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    AUTHOR_NOT_FOUND       (HttpStatus.NOT_FOUND,    "Автор не найден"),
    AUTHOR_NAME_TAKEN      (HttpStatus.CONFLICT,     "Автор с таким именем уже существует"),
    AUTHOR_HAS_BOOKS       (HttpStatus.BAD_REQUEST,  "Нельзя удалить автора с существующими книгами"),
    BOOK_NOT_FOUND         (HttpStatus.NOT_FOUND,    "Книга не найдена"),
    BOOK_ISBN_TAKEN        (HttpStatus.CONFLICT,     "Книга с таким ISBN уже существует"),
    VALIDATION_ERROR       (HttpStatus.BAD_REQUEST,  "Ошибка валидации"),
    INTERNAL_ERROR         (HttpStatus.INTERNAL_SERVER_ERROR, "Внутренняя ошибка");

    public final HttpStatus status;
    public final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}