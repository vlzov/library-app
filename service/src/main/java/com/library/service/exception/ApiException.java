package com.library.service.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class ApiException extends RuntimeException {

    private final ErrorCode code;
    private final Map<String, Object> details;

    public ApiException(ErrorCode code) {
        this(code, Map.of());
    }

    public ApiException(ErrorCode code, Map<String, Object> details) {
        super(code.message);
        this.code = code;
        this.details = details;
    }

    public ApiException(ErrorCode code, String detailsKey, Object detailsValue) {
        this(code, Map.of(detailsKey, detailsValue));
    }

}