package com.library.service.service;

import com.library.service.dto.request.AuthorRequest;
import com.library.service.dto.response.AuthorResponse;

import java.util.List;

public interface AuthorService {

    List<AuthorResponse> getAll();

    AuthorResponse getById(Long id);

    AuthorResponse create(AuthorRequest request);

    AuthorResponse update(Long id, AuthorRequest request);

    void delete(Long id);

}