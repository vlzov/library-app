package com.library.service.service.impl;

import com.library.service.dto.request.AuthorRequest;
import com.library.service.dto.response.AuthorResponse;
import com.library.service.service.AuthorService;

import java.util.List;

public class AuthorServiceImpl implements AuthorService {

    @Override
    public List<AuthorResponse> getAll() {
        return List.of();
    }

    @Override
    public AuthorResponse getById(Long id) {
        return null;
    }

    @Override
    public AuthorResponse create(AuthorRequest request) {
        return null;
    }

    @Override
    public AuthorResponse update(Long id, AuthorRequest request) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

}