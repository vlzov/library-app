package com.library.service.exception;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handle(ApiException e) {
        ErrorCode code = e.getCode();

        if (code.status.is5xxServerError()) {
            log.error("ApiException {} [traceId={}]", code.name(), MDC.get("traceId"), e);
        } else {
            log.debug("ApiException {}", code.name());
        }

        Map<String, Object> body = new HashMap<>();
        body.put("code", code.name());
        body.put("message", code.message);
        body.putAll(e.getDetails());

        return ResponseEntity.status(code.status).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handle(MethodArgumentNotValidException e) {
        Map<String, Object> fields = new HashMap<>();
        e.getBindingResult().getFieldErrors()
                .forEach(fe -> fields.put(fe.getField(), fe.getDefaultMessage()));

        Map<String, Object> body = new HashMap<>();
        body.put("code", ErrorCode.VALIDATION_ERROR.name());
        body.put("message", ErrorCode.VALIDATION_ERROR.message);
        body.put("fields", fields);

        return ResponseEntity.status(ErrorCode.VALIDATION_ERROR.status).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handle(Exception e) {
        String traceId = MDC.get("traceId");
        log.error("Unhandled exception [traceId={}]", traceId, e);

        Map<String, Object> body = new HashMap<>();
        body.put("code", ErrorCode.INTERNAL_ERROR.name());
        body.put("message", ErrorCode.INTERNAL_ERROR.message);
        body.put("traceId", traceId == null ? "" : traceId);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

}