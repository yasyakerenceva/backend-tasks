# NODE

- изолировано от браузера (консоль) можем обращаться к JS и работать с ним, 
но цикл программы очень ограниченный, 
без текстового редактора результаты никуда не сохраняются

- модульная система, через require импортируем файл, 
import/export тоже можно использовать, но есть свои ограничения

- нет window/document - т.к это браузерные объекты

- в node есть встроенные модули (которые устанавливаются вместе с node), 
внешние (дополнительно необходимо установить)

---

- __filename - полный путь до файла с названием файла
- __dirname - путь до файла не включен сам файл

## Дополнительные пакеты

- yargs - регистрирует команды / создает документацию
- fs - файловая система: чтение из файла / запись  файл
- path - работа с путями к файлам / каталогам 
