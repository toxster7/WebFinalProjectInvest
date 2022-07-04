-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Хост: json.mysql.ukraine.com.ua
-- Время создания: Июл 04 2022 г., 12:24
-- Версия сервера: 5.7.33-36-log
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `json_investcenter`
--

-- --------------------------------------------------------

--
-- Структура таблицы `logs`
--

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_name` varchar(127) NOT NULL DEFAULT '',
  `share_title` varchar(127) NOT NULL DEFAULT '',
  `count` float NOT NULL DEFAULT '0',
  `rate` float NOT NULL DEFAULT '0',
  `total_sum` float NOT NULL DEFAULT '0',
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `share_type` set('currencies','cryptocurrencies','metals','stocks') NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `logs`
--

INSERT INTO `logs` (`id`, `user_name`, `share_title`, `count`, `rate`, `total_sum`, `time_created`, `share_type`) VALUES
(1, 'Linda Hamolton', 'Bitcoin USD', 1, 19070.7, 19070.7, '2022-07-04 07:06:07', 'cryptocurrencies'),
(2, 'AlQobati Shabib', 'NIO inc.', 100, 21.36, 2136, '2022-07-04 07:32:16', 'stocks'),
(3, 'AlQobati Shabib', 'Bitcoin USD', 1, 19070.7, 19070.7, '2022-07-04 08:35:38', 'cryptocurrencies'),
(4, 'Adam', 'Bitcoin USD', 5, 19070.7, 95353.5, '2022-07-04 08:46:22', 'cryptocurrencies');

-- --------------------------------------------------------

--
-- Структура таблицы `shares`
--

DROP TABLE IF EXISTS `shares`;
CREATE TABLE `shares` (
  `id` int(10) UNSIGNED NOT NULL,
  `symbol` varchar(16) NOT NULL DEFAULT '',
  `title` varchar(127) NOT NULL DEFAULT '',
  `type` set('currencies','cryptocurrencies','metals','stocks') DEFAULT NULL,
  `rate` float NOT NULL DEFAULT '0',
  `time_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `shares`
--

INSERT INTO `shares` (`id`, `symbol`, `title`, `type`, `rate`, `time_updated`) VALUES
(1, 'BTC-USD', 'Bitcoin USD', 'cryptocurrencies', 19070.7, '2022-07-04 03:06:01'),
(2, 'ETH-USD', 'Ethereum USD', 'cryptocurrencies', 1054.21, '2022-07-04 05:48:42'),
(3, 'BNB-USD', 'Binance Coin USD', 'cryptocurrencies', 215.41, '2022-07-04 03:07:31'),
(4, 'AMD', 'Advanced Micro Devices, Inc.', 'stocks', 73.67, '2022-07-04 03:08:22'),
(5, 'AMZN', 'Amazon.com, Inc.', 'stocks', 109.57, '2022-07-04 03:11:11'),
(8, 'AAPL', 'Apple Inc', 'stocks', 138.93, '2022-07-04 05:46:21'),
(9, 'NVDA', 'NVIDIA Corporation 	', 'stocks', 145.23, '2022-07-04 05:46:48'),
(10, 'NIO', 'NIO inc.', 'stocks', 21.36, '2022-07-04 05:49:50'),
(11, 'Gold', 'Gold', 'metals', 1813.5, '2022-07-04 05:51:55'),
(12, 'Silver', 'Silver', 'metals', 19.78, '2022-07-04 05:52:20');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL DEFAULT '',
  `email` varchar(127) DEFAULT NULL,
  `login` varchar(32) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `role` set('user','admin') NOT NULL DEFAULT 'user',
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `phone_number` varchar(32) DEFAULT NULL,
  `address` varchar(127) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `login`, `password`, `role`, `time_created`, `enabled`, `phone_number`, `address`) VALUES
(1, 'John', '15@gmail.com', 'admin', '12345', 'admin', '2022-05-04 21:11:07', 0, '23577676455', NULL),
(2, 'Adam', '12@gmail.com', 'user', '12345', 'user', '2022-05-04 21:12:24', 1, '456986678', ''),
(5, 'AlQobati Shabib', '1@mail.com', '754328302', '754328302', 'user', '2022-05-07 15:16:36', 1, '754328302', ''),
(6, 'Victor Ramedi', '2@mail.com', '0986784491', '0986784491', 'user', '2022-05-12 01:48:44', 1, '0986784491', '0768222267'),
(7, 'Paul Fitcherberg', 'log@json.trade', '06789024430', '06789024430', 'user', '2022-05-16 10:21:36', 1, '06789024430', '0796247497'),
(8, 'Linda Hamolton', 'linda@gmail.com', 'linda', '12345', 'user', '2022-07-04 02:42:51', 1, '56788787878', 'USA');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `shares`
--
ALTER TABLE `shares`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login ( unique )` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `shares`
--
ALTER TABLE `shares`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
