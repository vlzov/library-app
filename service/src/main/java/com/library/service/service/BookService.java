package com.library.service.service;

import com.library.service.dto.request.BookRequest;
import com.library.service.dto.response.BookResponse;

import java.util.List;

public interface BookService {

    List<BookResponse> getAll();

    BookResponse getById(Long id);

    List<BookResponse> getByAuthor(Long authorId);

    BookResponse create(BookRequest request);

    BookResponse update(Long id, BookRequest request);

    void delete(Long id);

}