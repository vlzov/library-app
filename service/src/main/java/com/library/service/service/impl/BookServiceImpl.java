package com.library.service.service.impl;

import com.library.service.dto.request.BookRequest;
import com.library.service.dto.response.BookResponse;
import com.library.service.service.BookService;

import java.util.List;

public class BookServiceImpl implements BookService {

    @Override
    public List<BookResponse> getAll() {
        return List.of();
    }

    @Override
    public BookResponse getById(Long id) {
        return null;
    }

    @Override
    public List<BookResponse> getByAuthor(Long authorId) {
        return List.of();
    }

    @Override
    public BookResponse create(BookRequest request) {
        return null;
    }

    @Override
    public BookResponse update(Long id, BookRequest request) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

}