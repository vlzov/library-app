package com.library.service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <h2>REST API контроллер</h2>
 * <p>Базовый путь: <code>/api</code></p>
 *
 * <h3>Список реализуемых эндпоинтов:</h3>
 *
 * <h4>Авторы (Authors)</h4>
 * <table border="1">
 *   <tr>
 *     <th>HTTP-метод</th>
 *     <th>URL</th>
 *     <th>Описание</th>
 *   </tr>
 *   <tr>
 *     <td>POST</td>
 *     <td><code>/api/authors</code></td>
 *     <td>Создать нового автора</td>
 *   </tr>
 *   <tr>
 *     <td>GET</td>
 *     <td><code>/api/authors</code></td>
 *     <td>Получить список всех авторов</td>
 *   </tr>
 *   <tr>
 *     <td>GET</td>
 *     <td><code>/api/authors/{id}</code></td>
 *     <td>Получить автора по идентификатору</td>
 *   </tr>
 *   <tr>
 *     <td>PUT</td>
 *     <td><code>/api/authors/{id}</code></td>
 *     <td>Обновить данные автора по идентификатору</td>
 *   </tr>
 *   <tr>
 *     <td>DELETE</td>
 *     <td><code>/api/authors/{id}</code></td>
 *     <td>Удалить автора по идентификатору</td>
 *   </tr>
 * </table>
 *
 * <h4>Книги (Books)</h4>
 * <table border="1">
 *   <tr>
 *     <th>HTTP-метод</th>
 *     <th>URL</th>
 *     <th>Описание</th>
 *   </tr>
 *   <tr>
 *     <td>POST</td>
 *     <td><code>/api/books</code></td>
 *     <td>Создать новую книгу</td>
 *   </tr>
 *   <tr>
 *     <td>GET</td>
 *     <td><code>/api/books</code></td>
 *     <td>Получить список всех книг</td>
 *   </tr>
 *   <tr>
 *     <td>GET</td>
 *     <td><code>/api/books/{id}</code></td>
 *     <td>Получить книгу по идентификатору</td>
 *   </tr>
 *   <tr>
 *     <td>PUT</td>
 *     <td><code>/api/books/{id}</code></td>
 *     <td>Обновить данные книги по идентификатору</td>
 *   </tr>
 *   <tr>
 *     <td>DELETE</td>
 *     <td><code>/api/books/{id}</code></td>
 *     <td>Удалить книгу по идентификатору</td>
 *   </tr>
 * </table>
 *
 * @author  vlzov
 * @version 0.0.1-SNAPSHOT
 * @since   26-09-2026
 */
@RestController
@RequestMapping("/api")
public class LibraryController {
}