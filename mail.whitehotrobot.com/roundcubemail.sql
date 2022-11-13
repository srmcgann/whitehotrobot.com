-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 26, 2021 at 01:28 PM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.3.27-9+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `roundcubemail`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `user_id` int UNSIGNED NOT NULL,
  `cache_key` varchar(128) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `expires` datetime DEFAULT NULL,
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cache_index`
--

CREATE TABLE `cache_index` (
  `user_id` int UNSIGNED NOT NULL,
  `mailbox` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expires` datetime DEFAULT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '0',
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cache_messages`
--

CREATE TABLE `cache_messages` (
  `user_id` int UNSIGNED NOT NULL,
  `mailbox` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int UNSIGNED NOT NULL DEFAULT '0',
  `expires` datetime DEFAULT NULL,
  `data` longtext NOT NULL,
  `flags` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cache_shared`
--

CREATE TABLE `cache_shared` (
  `cache_key` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `expires` datetime DEFAULT NULL,
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cache_thread`
--

CREATE TABLE `cache_thread` (
  `user_id` int UNSIGNED NOT NULL,
  `mailbox` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contactgroupmembers`
--

CREATE TABLE `contactgroupmembers` (
  `contactgroup_id` int UNSIGNED NOT NULL,
  `contact_id` int UNSIGNED NOT NULL,
  `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contactgroups`
--

CREATE TABLE `contactgroups` (
  `contactgroup_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `del` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int UNSIGNED NOT NULL,
  `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `del` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` text NOT NULL,
  `firstname` varchar(128) NOT NULL DEFAULT '',
  `surname` varchar(128) NOT NULL DEFAULT '',
  `vcard` longtext,
  `words` text,
  `user_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`contact_id`, `changed`, `del`, `name`, `email`, `firstname`, `surname`, `vcard`, `words`, `user_id`) VALUES
(1, '2021-02-24 13:17:47', 0, 'admin', 'admin@whitehotrobot.com', 'admin', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nN:;admin;;;\r\nFN:admin\r\nEMAIL;TYPE=INTERNET;TYPE=HOME:admin@whitehotrobot.com\r\nEND:VCARD', ' admin admin@whitehotrobot.com', 1),
(2, '2021-02-24 13:19:38', 0, 'Cantelope', 'cantelope@whitehotrobot.com', '', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Cantelope\r\nEMAIL;TYPE=INTERNET:cantelope@whitehotrobot.com\r\nEND:VCARD', ' cantelope@whitehotrobot.com cantelope', 2),
(3, '2021-02-25 14:11:51', 0, 'PawBoost', 'marketing@pawboost.com', '', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:PawBoost\r\nEMAIL;TYPE=INTERNET:marketing@pawboost.com\r\nEND:VCARD', ' marketing@pawboost.com pawboost', 2),
(4, '2021-02-25 15:49:06', 0, 'PawBoost', 'informational@pawboost.com', '', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:PawBoost\r\nEMAIL;TYPE=INTERNET:informational@pawboost.com\r\nEND:VCARD', ' informational@pawboost.com pawboost', 2),
(5, '2021-02-26 08:43:55', 0, 'Jenifer McGann', 'cobbmtnflwrs@gmail.com', '', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Jenifer McGann\r\nEMAIL;TYPE=INTERNET:cobbmtnflwrs@gmail.com\r\nEND:VCARD', ' cobbmtnflwrs@gmail.com jenifer mcgann', 2),
(6, '2021-02-26 08:44:47', 0, 'PawBoost', 'messaging@pawboost.com', '', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:PawBoost\r\nEMAIL;TYPE=INTERNET:messaging@pawboost.com\r\nEND:VCARD', ' messaging@pawboost.com pawboost', 2),
(7, '2021-02-26 11:41:12', 0, 'Admin', 'admin@whitehotrobot.com', '', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Admin\r\nEMAIL;TYPE=INTERNET:admin@whitehotrobot.com\r\nEND:VCARD', ' admin@whitehotrobot.com admin', 6),
(8, '2021-02-26 13:09:43', 0, 'Scott -', 's.r.mcgann@hotmail.com', '', '', 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Scott -\r\nEMAIL;TYPE=INTERNET:s.r.mcgann@hotmail.com\r\nEND:VCARD', ' s.r.mcgann@hotmail.com scott', 2);

-- --------------------------------------------------------

--
-- Table structure for table `dictionary`
--

CREATE TABLE `dictionary` (
  `user_id` int UNSIGNED DEFAULT NULL,
  `language` varchar(5) NOT NULL,
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `identities`
--

CREATE TABLE `identities` (
  `identity_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `del` tinyint(1) NOT NULL DEFAULT '0',
  `standard` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL,
  `organization` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL,
  `reply-to` varchar(128) NOT NULL DEFAULT '',
  `bcc` varchar(128) NOT NULL DEFAULT '',
  `signature` longtext,
  `html_signature` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `identities`
--

INSERT INTO `identities` (`identity_id`, `user_id`, `changed`, `del`, `standard`, `name`, `organization`, `email`, `reply-to`, `bcc`, `signature`, `html_signature`) VALUES
(1, 1, '2021-02-24 12:57:13', 0, 1, '', '', 'cantelope@whitehotrobot.com', '', '', NULL, 0),
(2, 2, '2021-02-25 14:55:03', 0, 1, '', '', 'admin@whitehotrobot.com', '', '', '<div style=\"padding: 20px; background: #011; margin: 0; color: #ff8\">\r\n<p><strong><span style=\"font-size: 18pt; font-family: \'courier new\', courier, monospace\">Scott</span></strong></p>\r\n<p><strong><span style=\"font-family: \'courier new\', courier, monospace\">admin - whitehotrbot.com</span></strong></p>\r\n<p><strong><span style=\"font-family: \'courier new\', courier, monospace\">about <span style=\"color: #00ccff\"><a style=\"color: #00ccff\" title=\"about\" href=\"https://whitehotrobot.com/about\">https://whitehotrobot.com/about</a></span></span></strong></p>\r\n<p><strong><span style=\"font-family: \'courier new\', courier, monospace\">email </span></strong><span style=\"color: #339966\"><strong><span style=\"font-family: \'courier new\', courier, monospace\"><a style=\"color: #339966\" title=\"email\" href=\"mailto:admin@whitehotrobot.com\">admin@whitehotrobot.com</a></span></strong></span></p>\r\n<p><strong><span style=\"color: #800080; font-family: \'courier new\', courier, monospace\"><img src=\"https://jsbot.cantelope.org/uploads/2kmTq6.jpg\" width=\"436\" height=\"145\" /></span></strong></p>\r\n</div>', 1),
(3, 3, '2021-02-26 08:09:56', 0, 1, '', '', 'test3@whitehotrobot.com', '', '', NULL, 0),
(4, 4, '2021-02-26 11:24:03', 0, 1, '', '', 'srmcgann@whitehotrobot.com', '', '', NULL, 0),
(5, 5, '2021-02-26 11:34:43', 0, 1, '', '', 'administrator@whitehotrobot.com', '', '', NULL, 0),
(6, 6, '2021-02-26 11:41:02', 0, 1, '', '', 'testuser@whitehotrobot.com', '', '', NULL, 0),
(7, 7, '2021-02-26 12:47:17', 0, 1, '', '', 'scottmcgann@whitehotrobot.com', '', '', NULL, 0),
(8, 8, '2021-02-26 12:50:32', 0, 1, '', '', 'scottrmcgann@whitehotrobot.com', '', '', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `searches`
--

CREATE TABLE `searches` (
  `search_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `type` int NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL,
  `data` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sess_id` varchar(128) NOT NULL,
  `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `ip` varchar(40) NOT NULL,
  `vars` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`sess_id`, `created`, `changed`, `ip`, `vars`) VALUES
('008vh0kn4g6513rb665r5vlsh2', '2021-02-26 11:39:27', '2021-02-26 11:39:27', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ6cVN0TWtWaWtBRlRad1JPdC83RGFIR1hwOXkreFRRYyI7bG9naW5fdGltZXxpOjE2MTQzNjgzNjc7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('0hv4i11q7bve08fv548bl83qf2', '2021-02-25 13:47:08', '2021-02-25 13:47:42', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJhcjgyclZndERmMzlUbDdLcFZrM1Rmbm1oWEF0NDI5YyI7bG9naW5fdGltZXxpOjE2MTQyODk2Mjg7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoiMHFjS0JGYmI3dFRZYVdBelBKb2hURjNTTFMiO3JlcXVlc3RfdG9rZW58czozMjoibWRqcUs2SEJ1T3p0bDlYM2VMeDRrMVdBMlpsRzA1TEYiO3Rhc2t8czo0OiJtYWlsIjtpbWFwX2hvc3R8czo5OiJsb2NhbGhvc3QiO21ib3h8czo1OiJJTkJPWCI7c29ydF9jb2x8czo0OiJkYXRlIjtzb3J0X29yZGVyfHM6NDoiREVTQyI7U1RPUkFHRV9USFJFQUR8YTozOntpOjA7czoxMDoiUkVGRVJFTkNFUyI7aToxO3M6NDoiUkVGUyI7aToyO3M6MTQ6Ik9SREVSRURTVUJKRUNUIjt9U1RPUkFHRV9RVU9UQXxiOjA7U1RPUkFHRV9MSVNULUVYVEVOREVEfGI6MTtsaXN0X2F0dHJpYnxhOjY6e3M6NDoibmFtZSI7czo4OiJtZXNzYWdlcyI7czoyOiJpZCI7czoxMToibWVzc2FnZWxpc3QiO3M6NToiY2xhc3MiO3M6NDg6InJlY29yZHMtdGFibGUgbWVzc2FnZWxpc3Qgc29ydGhlYWRlciBmaXhlZGhlYWRlciI7czoxNToib3B0aW9uc21lbnVpY29uIjtzOjQ6InRydWUiO3M6MTU6ImFyaWEtbGFiZWxsZWRieSI7czoyMjoiYXJpYS1sYWJlbC1tZXNzYWdlbGlzdCI7czo3OiJjb2x1bW5zIjthOjg6e2k6MDtzOjc6InRocmVhZHMiO2k6MTtzOjc6InN1YmplY3QiO2k6MjtzOjY6ImZyb210byI7aTozO3M6Njoic3RhdHVzIjtpOjQ7czo0OiJkYXRlIjtpOjU7czo0OiJzaXplIjtpOjY7czo0OiJmbGFnIjtpOjc7czoxMDoiYXR0YWNobWVudCI7fX1wYWdlfGk6MTtmb2xkZXJzfGE6MTp7czo1OiJJTkJPWCI7YToyOntzOjM6ImNudCI7aTozMDtzOjY6Im1heHVpZCI7aTozMTt9fVNUT1JBR0VfU09SVHxiOjE7dW5zZWVuX2NvdW50fGE6NTp7czo1OiJJTkJPWCI7aTowO3M6NjoiRHJhZnRzIjtpOjA7czo0OiJTZW50IjtpOjA7czo1OiJUcmFzaCI7aTowO3M6NDoianVuayI7aTowO31saXN0X21vZF9zZXF8czoyOiI5MyI7'),
('25v3vbd05kahk5luo9bngoqg9h', '2021-02-26 11:50:04', '2021-02-26 11:50:04', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJVTzlxTDlpbWpOMklGck9La0poVkVicjZab0hvemZnTiI7bG9naW5fdGltZXxpOjE2MTQzNjkwMDQ7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('2g0lmkl6dak4ucs9dcqlakajen', '2021-02-26 12:05:06', '2021-02-26 12:05:06', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ4TkpPRE5jMDgvMXhNcGZ4bitpVEFGekh4cWIzQmRTUCI7bG9naW5fdGltZXxpOjE2MTQzNjk5MDY7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('2ob0qvs1qvqk27gremsgkds7qe', '2021-02-25 05:36:55', '2021-02-25 08:25:56', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiIyK3pFRFpvem1GVkx2UU16M2tXMHVCVS9iTWNOWGFqUSI7bG9naW5fdGltZXxpOjE2MTQyNjAyMTU7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoid2dsYzZlOGcyVVJNTkw3NHd2d0hDeFhrWngiO3JlcXVlc3RfdG9rZW58czozMjoiSk5YZDRQcEZFeVIybDJnb3VtYmpYVnRoVWM4Z0NiZnIiO3Rhc2t8czo4OiJzZXR0aW5ncyI7aW1hcF9ob3N0fHM6OToibG9jYWxob3N0IjttYm94fHM6NToiSU5CT1giO3NvcnRfY29sfHM6NDoiZGF0ZSI7c29ydF9vcmRlcnxzOjQ6IkRFU0MiO1NUT1JBR0VfVEhSRUFEfGE6Mzp7aTowO3M6MTA6IlJFRkVSRU5DRVMiO2k6MTtzOjQ6IlJFRlMiO2k6MjtzOjE0OiJPUkRFUkVEU1VCSkVDVCI7fVNUT1JBR0VfUVVPVEF8YjowO1NUT1JBR0VfTElTVC1FWFRFTkRFRHxiOjE7bGlzdF9hdHRyaWJ8YTo2OntzOjQ6Im5hbWUiO3M6ODoibWVzc2FnZXMiO3M6MjoiaWQiO3M6MTE6Im1lc3NhZ2VsaXN0IjtzOjU6ImNsYXNzIjtzOjQ4OiJyZWNvcmRzLXRhYmxlIG1lc3NhZ2VsaXN0IHNvcnRoZWFkZXIgZml4ZWRoZWFkZXIiO3M6MTU6Im9wdGlvbnNtZW51aWNvbiI7czo0OiJ0cnVlIjtzOjE1OiJhcmlhLWxhYmVsbGVkYnkiO3M6MjI6ImFyaWEtbGFiZWwtbWVzc2FnZWxpc3QiO3M6NzoiY29sdW1ucyI7YTo4OntpOjA7czo3OiJ0aHJlYWRzIjtpOjE7czo3OiJzdWJqZWN0IjtpOjI7czo2OiJmcm9tdG8iO2k6MztzOjY6InN0YXR1cyI7aTo0O3M6NDoiZGF0ZSI7aTo1O3M6NDoic2l6ZSI7aTo2O3M6NDoiZmxhZyI7aTo3O3M6MTA6ImF0dGFjaG1lbnQiO319Zm9sZGVyc3xhOjQ6e3M6NToiSU5CT1giO2E6Mjp7czozOiJjbnQiO2k6Mjg7czo2OiJtYXh1aWQiO2k6Mjg7fXM6NjoiRHJhZnRzIjthOjI6e3M6MzoiY250IjtpOjE7czo2OiJtYXh1aWQiO2k6MTt9czo0OiJTZW50IjthOjI6e3M6MzoiY250IjtpOjEwO3M6NjoibWF4dWlkIjtpOjEwO31zOjU6IlRyYXNoIjthOjI6e3M6MzoiY250IjtpOjA7czo2OiJtYXh1aWQiO2k6MDt9fVNUT1JBR0VfU09SVHxiOjE7dW5zZWVuX2NvdW50fGE6NDp7czo1OiJJTkJPWCI7aTo0O3M6NjoiRHJhZnRzIjtpOjA7czo0OiJTZW50IjtpOjA7czo1OiJUcmFzaCI7aTowO31saXN0X21vZF9zZXF8czoyOiI3MSI7YnJvd3Nlcl9jYXBzfGE6Mzp7czozOiJwZGYiO3M6MToiMSI7czo1OiJmbGFzaCI7czoxOiIwIjtzOjM6InRpZiI7czoxOiIwIjt9c2FmZV9tZXNzYWdlc3xhOjEwOntzOjg6IklOQk9YOjI4IjtiOjE7czo4OiJJTkJPWDoyNyI7YjowO3M6ODoiSU5CT1g6MjUiO2I6MDtzOjg6IklOQk9YOjIwIjtiOjA7czo4OiJJTkJPWDoxNyI7YjowO3M6ODoiSU5CT1g6MjMiO2I6MDtzOjg6IklOQk9YOjE4IjtiOjA7czo4OiJJTkJPWDoxOSI7YjowO3M6ODoiSU5CT1g6MjEiO2I6MTtzOjg6IklOQk9YOjI2IjtiOjA7fXdyaXRlYWJsZV9hYm9va3xiOjE7U1RPUkFHRV9VSURQTFVTfGI6MTs='),
('36036rrjp3o9r959d378rdbhho', '2021-02-25 08:31:07', '2021-02-25 08:31:07', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJZSkFCSXFzSmZmNVlVTlFmS2trUVdPTmpwb1kxb3UrTyI7bG9naW5fdGltZXxpOjE2MTQyNzA2Njc7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('4l9rsaum3v9hur2h0vnh2geb87', '2021-02-25 05:25:19', '2021-02-25 05:25:19', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJZaHpZYWZjWDh0Qk9VWlRNb25NMno1Sm9CTTh2YmlyNyI7bG9naW5fdGltZXxpOjE2MTQyNTk1MTk7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('4mhjuqp6itpch4pm6nmhj4thvo', '2021-02-26 11:27:36', '2021-02-26 11:27:36', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI0Ijt1c2VybmFtZXxzOjI2OiJzcm1jZ2FubkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJhbkJXMWVucGIyTWU5a0VlNDdBTktmK2g5Z0g4ZHVnUyI7bG9naW5fdGltZXxpOjE2MTQzNjc2NTY7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('4obkoe96sd4pt8ti07rr8rj32e', '2021-02-24 13:19:22', '2021-02-24 13:19:22', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6ImxhcnJ5IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJkWHYwa0dRdzdoUFB6dnpUdkQ0NlJNSW9lQ2IwU3hNaCI7bG9naW5fdGltZXxpOjE2MTQyMDE1NjI7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('56puiu99stfindua8jo4l69c2m', '2021-02-26 05:50:23', '2021-02-26 05:50:23', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ3QWxldmwybkx1elZ1bDJ2NzlGYTdQWDg2djlKTjU5MCI7bG9naW5fdGltZXxpOjE2MTQzNDc0MjM7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('60vnpuvp27aijq2sjaft37ah3f', '2021-02-26 13:08:09', '2021-02-26 13:08:09', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJBeEkzRVh5R0I4aE5Jc3BBQTBRRC84K01CNE5QWis2bSI7bG9naW5fdGltZXxpOjE2MTQzNzM2ODk7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('6ji9e973k3u07v52qksijhatns', '2021-02-26 12:51:07', '2021-02-26 12:51:07', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGVtcHxiOjE7c2tpbnxzOjU6InJvYm90IjtyZXF1ZXN0X3Rva2VufHM6MzI6IllEclRlN1lMWmpvRzRiWm5jRUFwZmFWcUtCUHVaTGFyIjs='),
('72kral9jj3fqmo4v4fjvvqk6bi', '2021-02-24 13:34:19', '2021-02-24 13:34:19', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6ImxhcnJ5IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ2UnQ0ZXhLalJkNGl1cjdBa3Btb0kydUxyUEU1dGtEVyI7bG9naW5fdGltZXxpOjE2MTQyMDI0NTk7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('785mom14sgepk625n0teqk99ak', '2021-02-25 11:50:38', '2021-02-25 11:50:38', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJCNjdQSURrQlFBS1RkcE5CcUhkVSsyUFpsNGt4YUFJRSI7bG9naW5fdGltZXxpOjE2MTQyODI2Mzg7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('7dkr57cubon5j9v31tu70ile2l', '2021-02-24 14:00:23', '2021-02-24 14:00:23', '65.154.226.165', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6Ilh5a2ptUlJadllUNEE0VWY3NnducmhFU1hOUWc1OW1kIjs='),
('7u436cfdusjq00rbaol2ptbk3i', '2021-02-26 05:47:18', '2021-02-26 05:47:18', '173.27.116.255', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6InJQcVFCTU1YZ3g1OWNXaDJUNUlacFpwVHBJR3dTbHpvIjs='),
('7u88u4smm25i1hbikevc3ptcli', '2021-02-26 11:39:27', '2021-02-26 12:41:52', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ6cVN0TWtWaWtBRlRad1JPdC83RGFIR1hwOXkreFRRYyI7bG9naW5fdGltZXxpOjE2MTQzNjgzNjc7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoieXFPUkdBcjloWW9QNlNGcURyTXUyOGZOWXEiO3JlcXVlc3RfdG9rZW58czozMjoiRGxBMFFwNkpVRVlteGtobEZLRmI4ZVZNb0lsUnFSbDAiO3Rhc2t8czo0OiJtYWlsIjtpbWFwX2hvc3R8czo5OiJsb2NhbGhvc3QiO21ib3h8czo1OiJJTkJPWCI7c29ydF9jb2x8czo0OiJkYXRlIjtzb3J0X29yZGVyfHM6NDoiREVTQyI7U1RPUkFHRV9USFJFQUR8YTozOntpOjA7czoxMDoiUkVGRVJFTkNFUyI7aToxO3M6NDoiUkVGUyI7aToyO3M6MTQ6Ik9SREVSRURTVUJKRUNUIjt9U1RPUkFHRV9RVU9UQXxiOjA7U1RPUkFHRV9MSVNULUVYVEVOREVEfGI6MTtsaXN0X2F0dHJpYnxhOjY6e3M6NDoibmFtZSI7czo4OiJtZXNzYWdlcyI7czoyOiJpZCI7czoxMToibWVzc2FnZWxpc3QiO3M6NToiY2xhc3MiO3M6NDg6InJlY29yZHMtdGFibGUgbWVzc2FnZWxpc3Qgc29ydGhlYWRlciBmaXhlZGhlYWRlciI7czoxNToib3B0aW9uc21lbnVpY29uIjtzOjQ6InRydWUiO3M6MTU6ImFyaWEtbGFiZWxsZWRieSI7czoyMjoiYXJpYS1sYWJlbC1tZXNzYWdlbGlzdCI7czo3OiJjb2x1bW5zIjthOjg6e2k6MDtzOjc6InRocmVhZHMiO2k6MTtzOjc6InN1YmplY3QiO2k6MjtzOjY6ImZyb210byI7aTozO3M6Njoic3RhdHVzIjtpOjQ7czo0OiJkYXRlIjtpOjU7czo0OiJzaXplIjtpOjY7czo0OiJmbGFnIjtpOjc7czoxMDoiYXR0YWNobWVudCI7fX1wYWdlfGk6MTt1bnNlZW5fY291bnR8YTo1OntzOjU6IklOQk9YIjtpOjA7czo2OiJEcmFmdHMiO2k6MDtzOjQ6IlNlbnQiO2k6MDtzOjU6IlRyYXNoIjtpOjA7czo0OiJqdW5rIjtpOjA7fWZvbGRlcnN8YTo1OntzOjU6IklOQk9YIjthOjI6e3M6MzoiY250IjtpOjM0O3M6NjoibWF4dWlkIjtpOjM1O31zOjY6IkRyYWZ0cyI7YToyOntzOjM6ImNudCI7aTozO3M6NjoibWF4dWlkIjtpOjM7fXM6NDoiU2VudCI7YToyOntzOjM6ImNudCI7aToxMztzOjY6Im1heHVpZCI7aToxMzt9czo1OiJUcmFzaCI7YToyOntzOjM6ImNudCI7aTowO3M6NjoibWF4dWlkIjtpOjA7fXM6NDoianVuayI7YToyOntzOjM6ImNudCI7aToxO3M6NjoibWF4dWlkIjtpOjE7fX1TVE9SQUdFX1NPUlR8YjoxO2xpc3RfbW9kX3NlcXxzOjM6IjEwOSI7U1RPUkFHRV9BQ0x8YjowO2xhc3RfY29tcG9zZV9zZXNzaW9ufHM6MjI6Ijk1OTk4MDU1NzYwMzk0ZTcyNzkwMWMiOw=='),
('9b2frv0bf96hjai62l2lf3h8gp', '2021-02-25 13:51:53', '2021-02-25 13:51:53', '173.27.116.255', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6IkhaVVJLOG5KTzA4aGxNcmpUelhKZ2I2SlY5U1hDMnFkIjs='),
('9pabrjiuiaij6s1q296miv299c', '2021-02-25 13:22:20', '2021-02-25 13:24:55', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJhcmxkNWowYkIzbUpHOU5vWXhyWk1DQlUwZHpiTy9tSCI7bG9naW5fdGltZXxpOjE2MTQyODgxNDA7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoiemo0cVdWcGZXaVpzTk5WMGpKQ3hZWVVuSE4iO3JlcXVlc3RfdG9rZW58czozMjoiTG9WazJ6bkJKaFBWT0pnY2k5TmNzSjJPUXVkMGR3S0EiO3Rhc2t8czo4OiJzZXR0aW5ncyI7aW1hcF9ob3N0fHM6OToibG9jYWxob3N0IjttYm94fHM6NToiSU5CT1giO3NvcnRfY29sfHM6NDoiZGF0ZSI7c29ydF9vcmRlcnxzOjQ6IkRFU0MiO1NUT1JBR0VfVEhSRUFEfGE6Mzp7aTowO3M6MTA6IlJFRkVSRU5DRVMiO2k6MTtzOjQ6IlJFRlMiO2k6MjtzOjE0OiJPUkRFUkVEU1VCSkVDVCI7fVNUT1JBR0VfUVVPVEF8YjowO1NUT1JBR0VfTElTVC1FWFRFTkRFRHxiOjE7bGlzdF9hdHRyaWJ8YTo3OntzOjQ6Im5hbWUiO3M6ODoibWVzc2FnZXMiO3M6MjoiaWQiO3M6MTE6Im1lc3NhZ2VsaXN0IjtzOjU6ImNsYXNzIjtzOjIzOiJtZXNzYWdlbGlzdCBmaXhlZGhlYWRlciI7czoxMToiY2VsbHNwYWNpbmciO3M6MToiMCI7czo3OiJjb2x1bW5zIjtzOjA6IiI7czo3OiJzdW1tYXJ5IjtzOjEyOiJNZXNzYWdlIGxpc3QiO3M6MTU6Im9wdGlvbnNtZW51aWNvbiI7czo0OiJ0cnVlIjt9dW5zZWVuX2NvdW50fGE6NTp7czo1OiJJTkJPWCI7aTowO3M6NjoiRHJhZnRzIjtpOjA7czo0OiJTZW50IjtpOjA7czo1OiJUcmFzaCI7aTowO3M6NDoianVuayI7aTowO31mb2xkZXJzfGE6NTp7czo1OiJJTkJPWCI7YToyOntzOjM6ImNudCI7aTozMDtzOjY6Im1heHVpZCI7aTozMTt9czo2OiJEcmFmdHMiO2E6Mjp7czozOiJjbnQiO2k6MjtzOjY6Im1heHVpZCI7aToyO31zOjQ6IlNlbnQiO2E6Mjp7czozOiJjbnQiO2k6MTE7czo2OiJtYXh1aWQiO2k6MTE7fXM6NToiVHJhc2giO2E6Mjp7czozOiJjbnQiO2k6MDtzOjY6Im1heHVpZCI7aTowO31zOjQ6Imp1bmsiO2E6Mjp7czozOiJjbnQiO2k6MTtzOjY6Im1heHVpZCI7aToxO319bGlzdF9tb2Rfc2VxfHM6MjoiOTMiOw=='),
('a79gcnqu8vp9m61gledvf7s2rq', '2021-02-25 13:51:53', '2021-02-25 13:51:53', '173.27.116.255', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7cmVxdWVzdF90b2tlbnxzOjMyOiJaNEJsM2wwUXVCcXh6SU1aTnZCTVJXUHp4U3U0TFN3ZiI7'),
('aaq69cmurkfq6tujtmv6244g9c', '2021-02-25 12:54:38', '2021-02-25 12:54:38', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJVQ2JWVmRrbnNrOCthNVJFVFdCaE5nK1p6eDA5NCtrcyI7bG9naW5fdGltZXxpOjE2MTQyODY0Nzg7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('aqn3pij4i5gb9f7nii25vrj2u2', '2021-02-25 14:05:10', '2021-02-25 14:05:10', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ1a04vNm5uQWdZaXZaSDRLQXB3aGtmTmZTSFJHWjRkdCI7bG9naW5fdGltZXxpOjE2MTQyOTA3MTA7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('b0u76p5oibedvrm88kqpp6ju2n', '2021-02-25 14:49:11', '2021-02-25 14:49:11', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiI0by9JeVg0d3RoWHZIWFQwM2JYcklFdU1rb1NXUXorYyI7bG9naW5fdGltZXxpOjE2MTQyOTMzNTE7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('b1es03ffqutn8svkehr8p9lceq', '2021-02-25 13:51:07', '2021-02-25 13:51:37', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJrcUtLZU5makIvVDRLVHZEVnFDNno4NEVlby9pQWx3WSI7bG9naW5fdGltZXxpOjE2MTQyODk4Njc7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoiZDVIWEl6ZjB3TFFuVThzVmNkQVJXdzdSeUIiO3JlcXVlc3RfdG9rZW58czozMjoiUVVBbkxUT1ZXeEdoaUNjWFFTOGlSWXdXeUNLRk91bzciO3Rhc2t8czo0OiJtYWlsIjtpbWFwX2hvc3R8czo5OiJsb2NhbGhvc3QiO21ib3h8czo1OiJJTkJPWCI7c29ydF9jb2x8czo0OiJkYXRlIjtzb3J0X29yZGVyfHM6NDoiREVTQyI7U1RPUkFHRV9USFJFQUR8YTozOntpOjA7czoxMDoiUkVGRVJFTkNFUyI7aToxO3M6NDoiUkVGUyI7aToyO3M6MTQ6Ik9SREVSRURTVUJKRUNUIjt9U1RPUkFHRV9RVU9UQXxiOjA7U1RPUkFHRV9MSVNULUVYVEVOREVEfGI6MTtsaXN0X2F0dHJpYnxhOjY6e3M6NDoibmFtZSI7czo4OiJtZXNzYWdlcyI7czoyOiJpZCI7czoxMToibWVzc2FnZWxpc3QiO3M6NToiY2xhc3MiO3M6NDg6InJlY29yZHMtdGFibGUgbWVzc2FnZWxpc3Qgc29ydGhlYWRlciBmaXhlZGhlYWRlciI7czoxNToib3B0aW9uc21lbnVpY29uIjtzOjQ6InRydWUiO3M6MTU6ImFyaWEtbGFiZWxsZWRieSI7czoyMjoiYXJpYS1sYWJlbC1tZXNzYWdlbGlzdCI7czo3OiJjb2x1bW5zIjthOjg6e2k6MDtzOjc6InRocmVhZHMiO2k6MTtzOjc6InN1YmplY3QiO2k6MjtzOjY6ImZyb210byI7aTozO3M6Njoic3RhdHVzIjtpOjQ7czo0OiJkYXRlIjtpOjU7czo0OiJzaXplIjtpOjY7czo0OiJmbGFnIjtpOjc7czoxMDoiYXR0YWNobWVudCI7fX1mb2xkZXJzfGE6NTp7czo1OiJJTkJPWCI7YToyOntzOjM6ImNudCI7aTozMDtzOjY6Im1heHVpZCI7aTozMTt9czo2OiJEcmFmdHMiO2E6Mjp7czozOiJjbnQiO2k6MjtzOjY6Im1heHVpZCI7aToyO31zOjQ6IlNlbnQiO2E6Mjp7czozOiJjbnQiO2k6MTE7czo2OiJtYXh1aWQiO2k6MTE7fXM6NToiVHJhc2giO2E6Mjp7czozOiJjbnQiO2k6MDtzOjY6Im1heHVpZCI7aTowO31zOjQ6Imp1bmsiO2E6Mjp7czozOiJjbnQiO2k6MTtzOjY6Im1heHVpZCI7aToxO319U1RPUkFHRV9TT1JUfGI6MTt1bnNlZW5fY291bnR8YTo1OntzOjU6IklOQk9YIjtpOjA7czo2OiJEcmFmdHMiO2k6MDtzOjQ6IlNlbnQiO2k6MDtzOjU6IlRyYXNoIjtpOjA7czo0OiJqdW5rIjtpOjA7fWxpc3RfbW9kX3NlcXxzOjI6IjkzIjthZGRyZXNzYm9va3NfY291bnR8aToxO2FkZHJlc3Nib29rc19jb3VudF93cml0ZWFibGV8aToxO2NvbnRhY3Rjb3VudGRpc3BsYXl8czoxMToiZnJvbXRvc2hvcnQiO3BhZ2V8aToxO2Jyb3dzZXJfY2Fwc3xhOjM6e3M6MzoicGRmIjtzOjE6IjEiO3M6NToiZmxhc2giO3M6MToiMCI7czozOiJ0aWYiO3M6MToiMCI7fXNhZmVfbWVzc2FnZXN8YToyOntzOjg6IklOQk9YOjI1IjtiOjA7czo4OiJJTkJPWDoyNyI7YjoxO313cml0ZWFibGVfYWJvb2t8YjoxOw=='),
('bdk90og2k959ioa9bgd66f1lkk', '2021-02-24 14:30:15', '2021-02-24 14:30:48', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ5YkJMSnlkNFpZaDduNFQvUHZqazVlMTY3akRMcHJscSI7bG9naW5fdGltZXxpOjE2MTQyMDU4MTU7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoickhFOTlaNGJoTnRSVXFUbnNxSGYyalFNMXUiO3JlcXVlc3RfdG9rZW58czozMjoiQ2hleWU0aUFGRXhiMndTMEIyakk3VkVnTWVnYWhTcnQiO3Rhc2t8czo4OiJzZXR0aW5ncyI7aW1hcF9ob3N0fHM6OToibG9jYWxob3N0IjttYm94fHM6NToiSU5CT1giO3NvcnRfY29sfHM6MDoiIjtzb3J0X29yZGVyfHM6NDoiREVTQyI7U1RPUkFHRV9USFJFQUR8YTozOntpOjA7czoxMDoiUkVGRVJFTkNFUyI7aToxO3M6NDoiUkVGUyI7aToyO3M6MTQ6Ik9SREVSRURTVUJKRUNUIjt9U1RPUkFHRV9RVU9UQXxiOjA7U1RPUkFHRV9MSVNULUVYVEVOREVEfGI6MTtsaXN0X2F0dHJpYnxhOjY6e3M6NDoibmFtZSI7czo4OiJtZXNzYWdlcyI7czoyOiJpZCI7czoxMToibWVzc2FnZWxpc3QiO3M6NToiY2xhc3MiO3M6NDg6InJlY29yZHMtdGFibGUgbWVzc2FnZWxpc3Qgc29ydGhlYWRlciBmaXhlZGhlYWRlciI7czoxNToib3B0aW9uc21lbnVpY29uIjtzOjQ6InRydWUiO3M6MTU6ImFyaWEtbGFiZWxsZWRieSI7czoyMjoiYXJpYS1sYWJlbC1tZXNzYWdlbGlzdCI7czo3OiJjb2x1bW5zIjthOjg6e2k6MDtzOjc6InRocmVhZHMiO2k6MTtzOjc6InN1YmplY3QiO2k6MjtzOjY6InN0YXR1cyI7aTozO3M6NjoiZnJvbXRvIjtpOjQ7czo0OiJkYXRlIjtpOjU7czo0OiJzaXplIjtpOjY7czo0OiJmbGFnIjtpOjc7czoxMDoiYXR0YWNobWVudCI7fX1mb2xkZXJzfGE6MTp7czo1OiJJTkJPWCI7YToyOntzOjM6ImNudCI7aToxNDtzOjY6Im1heHVpZCI7aToxNDt9fXVuc2Vlbl9jb3VudHxhOjE6e3M6NToiSU5CT1giO2k6Mjt9bGlzdF9tb2Rfc2VxfHM6MjoiMjgiO1NUT1JBR0VfQUNMfGI6MDs='),
('bpq7slpudka2jc1o8oe222adr8', '2021-02-26 12:07:38', '2021-02-26 12:07:38', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ6d0RBUVc0YkJidDNqOWlIL3lDTUtqb1pZY0pHeVcwUCI7bG9naW5fdGltZXxpOjE2MTQzNzAwNTg7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('bq1sbd7sqh8i9ba3sk5v9d3lj6', '2021-02-26 12:11:21', '2021-02-26 12:11:21', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiI0RFh6Um9ZTG9OMyt3MUsrRlFKb1lzWkxidE94UHEvcyI7bG9naW5fdGltZXxpOjE2MTQzNzAyODE7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('c4ebdm9jnv0ljrdpsao3isj4lj', '2021-02-26 12:20:23', '2021-02-26 12:20:23', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJpVmIwMDVpeXhqb0xoUVdFdGpXc0hxQ2s1Yk1IVTc4TSI7bG9naW5fdGltZXxpOjE2MTQzNzA4MjM7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('clj7p53pkdka3uit993inr12h8', '2021-02-26 11:24:46', '2021-02-26 11:24:46', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiI3eGh3SS9CclJiVDZpNVdDWDRQcC9GMkpjZXNTL2MvQyI7bG9naW5fdGltZXxpOjE2MTQzNjc0ODY7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('d7upite28tq6vqnsbs4ll504ko', '2021-02-26 11:24:28', '2021-02-26 11:24:28', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI0Ijt1c2VybmFtZXxzOjI2OiJzcm1jZ2FubkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiIvTDhlbFFVOGlwV0duRzdhRHQvOXhtN1JYdmdXY3VZeSI7bG9naW5fdGltZXxpOjE2MTQzNjc0Njg7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('e3ni10b1dgfhh7ol9qbsps4pvk', '2021-02-25 13:51:54', '2021-02-25 13:51:54', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJRRldrTXVIS1lnbDVySm91QXdFL092dm5sK1BaRDYyWiI7bG9naW5fdGltZXxpOjE2MTQyODk5MTQ7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('eckah2d8ff1i0ng207tm2cbqjp', '2021-02-25 21:31:41', '2021-02-25 21:31:41', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJMT1hYbHJabUxJSDQ0eDZTbWJnV2EwNWFEZitEZ3ZRTSI7bG9naW5fdGltZXxpOjE2MTQzMTc1MDE7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('f4ondpaskmovbl4uf3u3hmhou0', '2021-02-24 14:30:15', '2021-02-24 14:30:15', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ5YkJMSnlkNFpZaDduNFQvUHZqazVlMTY3akRMcHJscSI7bG9naW5fdGltZXxpOjE2MTQyMDU4MTU7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('f78ncck27nkjf54elbcidpaocg', '2021-02-24 14:06:42', '2021-02-24 14:06:42', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJuZEEyRHErMC9JMW15YTBObm1FNjF3amg0dzlVWTBIbSI7bG9naW5fdGltZXxpOjE2MTQyMDQ0MDI7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('fi7v7h3v4kclkd7j1fc9lq8llb', '2021-02-25 13:21:11', '2021-02-25 13:21:11', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJnR3B2cGpCR25kay80YXRvUm9XaDdYSDNGMzhWSGUzeSI7bG9naW5fdGltZXxpOjE2MTQyODgwNzE7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('g19k69ctmfe75io4icc65l3bv8', '2021-02-25 05:36:55', '2021-02-25 05:36:55', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiIyK3pFRFpvem1GVkx2UU16M2tXMHVCVS9iTWNOWGFqUSI7bG9naW5fdGltZXxpOjE2MTQyNjAyMTU7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('g43vr0hiio12akmntcq0j04ieb', '2021-02-25 13:39:09', '2021-02-25 13:39:09', '173.27.116.255', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6IlBJZlJpYjRySm5kakNFT1BOSURsVldvR1dEN0VSb20xIjs='),
('gip5r8m95hg3hh6lle0vnpkcqo', '2021-02-26 11:24:03', '2021-02-26 11:24:03', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI0Ijt1c2VybmFtZXxzOjI2OiJzcm1jZ2FubkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJsTGtUdHJlTDBkcWFVb0JJRC9UbEcvTGdGTVBiSU9MciI7bG9naW5fdGltZXxpOjE2MTQzNjc0NDM7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('h15967eas798cttjejmc7d4rti', '2021-02-25 17:00:12', '2021-02-25 17:00:12', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ5blNJTWEvWmlLRkRQZVpwWVI0OUdoN2xVRjlzemhsOSI7bG9naW5fdGltZXxpOjE2MTQzMDEyMTI7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('hb591ej9bacdf5t4eq716a5p04', '2021-02-24 13:23:21', '2021-02-24 13:23:21', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6ImxhcnJ5IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJCRTJDS2RydlZVck4zRFNTeDRITXNqb1JWdVhVZ1RDciI7bG9naW5fdGltZXxpOjE2MTQyMDE4MDE7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('hovmk8iptahlogp2d64vmqkhs6', '2021-02-25 05:36:33', '2021-02-25 05:36:33', '173.27.116.255', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6Imw0SExTbzZubnprcGh0MmtSdjVPaDU2Rzl2NVJBSTJYIjs='),
('ihsdksqei3nu9b6km5pihditn1', '2021-02-26 13:15:49', '2021-02-26 13:15:49', '65.154.226.165', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6InlLTkVqTGdkRUZrTmw5Q2hveHM1c1JSVVRDOXl4dHVsIjs='),
('it36huttbu2tr6849t8a9lsmhf', '2021-02-25 13:51:07', '2021-02-25 13:51:07', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJrcUtLZU5makIvVDRLVHZEVnFDNno4NEVlby9pQWx3WSI7bG9naW5fdGltZXxpOjE2MTQyODk4Njc7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('jf8h6ud151o4i6a6okk589keug', '2021-02-26 11:34:43', '2021-02-26 11:34:43', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI1Ijt1c2VybmFtZXxzOjMxOiJhZG1pbmlzdHJhdG9yQHdoaXRlaG90cm9ib3QuY29tIjtzdG9yYWdlX2hvc3R8czo5OiJsb2NhbGhvc3QiO3N0b3JhZ2VfcG9ydHxpOjE0MztzdG9yYWdlX3NzbHxOO3Bhc3N3b3JkfHM6MzI6IjM0VUVSWlFvSnEyNEhlRy9ZNzVmL2RnSzRMU0xHUTNGIjtsb2dpbl90aW1lfGk6MTYxNDM2ODA4Mzt0aW1lem9uZXxzOjE5OiJBbWVyaWNhL0xvc19BbmdlbGVzIjtTVE9SQUdFX1NQRUNJQUwtVVNFfGI6MTs='),
('jk5n3u2k43vjlvcck3ib7hrbts', '2021-02-26 12:47:17', '2021-02-26 12:47:17', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI3Ijt1c2VybmFtZXxzOjI5OiJzY290dG1jZ2FubkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJxVUxZdmxRWFR1bW9yMnJ3QkNFL3FXQ2hnRXhqUUFVSSI7bG9naW5fdGltZXxpOjE2MTQzNzI0Mzc7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('klehep4j43hdrljq8evuqn1jn4', '2021-02-24 21:27:21', '2021-02-24 21:27:21', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJNbXQvMWRsUWovRXdDSG11TklERHVvRklpdXhKaHF3VCI7bG9naW5fdGltZXxpOjE2MTQyMzA4NDE7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('l0pk3rk0sl0gi5r40628t2t2f2', '2021-02-24 14:06:42', '2021-02-24 14:06:55', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJuZEEyRHErMC9JMW15YTBObm1FNjF3amg0dzlVWTBIbSI7bG9naW5fdGltZXxpOjE2MTQyMDQ0MDI7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoiQVVRM3Z4N05vUGNocm44MEtYRjBvaDVrazAiO3JlcXVlc3RfdG9rZW58czozMjoiOElFd0tpdkJISFVFd3lRQkhTSXdEVjNhdEZ4M3dJbloiO3Rhc2t8czo0OiJtYWlsIjtpbWFwX2hvc3R8czo5OiJsb2NhbGhvc3QiO21ib3h8czo1OiJJTkJPWCI7c29ydF9jb2x8czowOiIiO3NvcnRfb3JkZXJ8czo0OiJERVNDIjtTVE9SQUdFX1RIUkVBRHxhOjM6e2k6MDtzOjEwOiJSRUZFUkVOQ0VTIjtpOjE7czo0OiJSRUZTIjtpOjI7czoxNDoiT1JERVJFRFNVQkpFQ1QiO31TVE9SQUdFX1FVT1RBfGI6MDtTVE9SQUdFX0xJU1QtRVhURU5ERUR8YjoxO2xpc3RfYXR0cmlifGE6Njp7czo0OiJuYW1lIjtzOjg6Im1lc3NhZ2VzIjtzOjI6ImlkIjtzOjExOiJtZXNzYWdlbGlzdCI7czo1OiJjbGFzcyI7czo0ODoicmVjb3Jkcy10YWJsZSBtZXNzYWdlbGlzdCBzb3J0aGVhZGVyIGZpeGVkaGVhZGVyIjtzOjE1OiJvcHRpb25zbWVudWljb24iO3M6NDoidHJ1ZSI7czoxNToiYXJpYS1sYWJlbGxlZGJ5IjtzOjIyOiJhcmlhLWxhYmVsLW1lc3NhZ2VsaXN0IjtzOjc6ImNvbHVtbnMiO2E6ODp7aTowO3M6NzoidGhyZWFkcyI7aToxO3M6Nzoic3ViamVjdCI7aToyO3M6Njoic3RhdHVzIjtpOjM7czo2OiJmcm9tdG8iO2k6NDtzOjQ6ImRhdGUiO2k6NTtzOjQ6InNpemUiO2k6NjtzOjQ6ImZsYWciO2k6NztzOjEwOiJhdHRhY2htZW50Ijt9fXBhZ2V8aToxO2ZvbGRlcnN8YToxOntzOjU6IklOQk9YIjthOjI6e3M6MzoiY250IjtpOjE0O3M6NjoibWF4dWlkIjtpOjE0O319dW5zZWVuX2NvdW50fGE6NDp7czo1OiJJTkJPWCI7aToyO3M6NjoiRHJhZnRzIjtpOjA7czo0OiJTZW50IjtpOjA7czo1OiJUcmFzaCI7aTowO31saXN0X21vZF9zZXF8czoyOiIyOCI7Y29tcG9zZV9kYXRhXzE3ODA5ODU0NjA2MDM2Y2RmZmE0NGE5fGE6Mzp7czoyOiJpZCI7czoyMzoiMTc4MDk4NTQ2MDYwMzZjZGZmYTQ0YTkiO3M6NToicGFyYW0iO2E6Mjp7czo0OiJtYm94IjtzOjU6IklOQk9YIjtzOjk6InNlbnRfbWJveCI7czo0OiJTZW50Ijt9czo3OiJtYWlsYm94IjtzOjU6IklOQk9YIjt9U1RPUkFHRV9BQ0x8YjowOw=='),
('l2cg1hu39gkn4clcb00vu5v0bd', '2021-02-25 13:22:20', '2021-02-25 13:22:20', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJhcmxkNWowYkIzbUpHOU5vWXhyWk1DQlUwZHpiTy9tSCI7bG9naW5fdGltZXxpOjE2MTQyODgxNDA7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('l4tcae4o28855omjfg1kfcnhre', '2021-02-26 08:09:56', '2021-02-26 08:09:57', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIzIjt1c2VybmFtZXxzOjIzOiJ0ZXN0M0B3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJIUWRDOTNYdE5XMlVhV2hHMFh2NW1aNEZvSllIZ0hsMiI7bG9naW5fdGltZXxpOjE2MTQzNTU3OTY7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7YXV0aF9zZWNyZXR8czoyNjoiaWMyWFBhclYwU3JNRWdTN0lXN0xmSGJzRkoiO3JlcXVlc3RfdG9rZW58czozMjoidnBYV1M0V09EQ2FYSkt6amZyNm12UGJDQmVLWFpNdmYiO3Rhc2t8czo0OiJtYWlsIjtpbWFwX2hvc3R8czo5OiJsb2NhbGhvc3QiO21ib3h8czo1OiJJTkJPWCI7c29ydF9jb2x8czo0OiJkYXRlIjtzb3J0X29yZGVyfHM6NDoiREVTQyI7U1RPUkFHRV9USFJFQUR8YTozOntpOjA7czoxMDoiUkVGRVJFTkNFUyI7aToxO3M6NDoiUkVGUyI7aToyO3M6MTQ6Ik9SREVSRURTVUJKRUNUIjt9U1RPUkFHRV9RVU9UQXxiOjA7U1RPUkFHRV9MSVNULUVYVEVOREVEfGI6MTtsaXN0X2F0dHJpYnxhOjY6e3M6NDoibmFtZSI7czo4OiJtZXNzYWdlcyI7czoyOiJpZCI7czoxMToibWVzc2FnZWxpc3QiO3M6NToiY2xhc3MiO3M6NDg6InJlY29yZHMtdGFibGUgbWVzc2FnZWxpc3Qgc29ydGhlYWRlciBmaXhlZGhlYWRlciI7czoxNToib3B0aW9uc21lbnVpY29uIjtzOjQ6InRydWUiO3M6MTU6ImFyaWEtbGFiZWxsZWRieSI7czoyMjoiYXJpYS1sYWJlbC1tZXNzYWdlbGlzdCI7czo3OiJjb2x1bW5zIjthOjg6e2k6MDtzOjc6InRocmVhZHMiO2k6MTtzOjc6InN1YmplY3QiO2k6MjtzOjY6ImZyb210byI7aTozO3M6Njoic3RhdHVzIjtpOjQ7czo0OiJkYXRlIjtpOjU7czo0OiJzaXplIjtpOjY7czo0OiJmbGFnIjtpOjc7czoxMDoiYXR0YWNobWVudCI7fX1wYWdlfGk6MTtmb2xkZXJzfGE6MTp7czo1OiJJTkJPWCI7YToyOntzOjM6ImNudCI7aToxO3M6NjoibWF4dWlkIjtpOjE7fX1TVE9SQUdFX1NPUlR8YjoxO3Vuc2Vlbl9jb3VudHxhOjE6e3M6NToiSU5CT1giO2k6MTt9'),
('m2p50kiqvk7c59qr2u05rqgl3p', '2021-02-26 12:50:32', '2021-02-26 12:50:32', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI4Ijt1c2VybmFtZXxzOjMwOiJzY290dHJtY2dhbm5Ad2hpdGVob3Ryb2JvdC5jb20iO3N0b3JhZ2VfaG9zdHxzOjk6ImxvY2FsaG9zdCI7c3RvcmFnZV9wb3J0fGk6MTQzO3N0b3JhZ2Vfc3NsfE47cGFzc3dvcmR8czozMjoiNGw4eHRBdzR3ZU5xQzJwS1MxVjd4ZzQ1Vkk2bmtnSWsiO2xvZ2luX3RpbWV8aToxNjE0MzcyNjMyO3RpbWV6b25lfHM6MTk6IkFtZXJpY2EvTG9zX0FuZ2VsZXMiO1NUT1JBR0VfU1BFQ0lBTC1VU0V8YjoxOw=='),
('mbnnqmf9a6t3eo1q7ee77kj9b2', '2021-02-26 08:07:03', '2021-02-26 08:07:03', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJJcmJSRjc4UCthVkhwNUFTUzRDNlBobC9wNUhKMEJKWiI7bG9naW5fdGltZXxpOjE2MTQzNTU2MjM7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('mu7k1vat9j0bbgps2eg44fjj67', '2021-02-25 00:48:00', '2021-02-25 00:48:00', '62.4.14.198', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6IlN5c2ZzN21FUWFDRWFNUTA2QkdGRkNDdUxsRk1TRkN6Ijs='),
('nkhc528d3savdrpgfvi1cpr86p', '2021-02-25 01:21:41', '2021-02-25 01:21:41', '195.154.61.206', 'dGVtcHxiOjE7bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGFza3xzOjU6ImxvZ2luIjtyZXF1ZXN0X3Rva2VufHM6MzI6Ikd4aEpjWlJPS1VzTWkyR0taT0pEVmJPa0c5aXl0ZWtxIjs='),
('nltr0jbg8ks6dt7ko17t1lelcd', '2021-02-26 08:09:56', '2021-02-26 08:09:56', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIzIjt1c2VybmFtZXxzOjIzOiJ0ZXN0M0B3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJIUWRDOTNYdE5XMlVhV2hHMFh2NW1aNEZvSllIZ0hsMiI7bG9naW5fdGltZXxpOjE2MTQzNTU3OTY7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('ofs7g2j7u8qih8sk8trjsjngur', '2021-02-26 13:14:44', '2021-02-26 13:15:53', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGVtcHxiOjE7c2tpbnxzOjU6InJvYm90IjtyZXF1ZXN0X3Rva2VufHM6MzI6Im93cGdGVTBCc2J5Wkdsa1VlbEZMMUVDVnpvd3JBNHBBIjt0YXNrfHM6NToibG9naW4iOw=='),
('ou870rrg9p1ljhrq0s4qhktips', '2021-02-24 12:57:13', '2021-02-24 12:57:13', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjEyOiJFbGFzdGljIERhcmsiO2ltYXBfbmFtZXNwYWNlfGE6NDp7czo4OiJwZXJzb25hbCI7YToxOntpOjA7YToyOntpOjA7czowOiIiO2k6MTtzOjE6Ii4iO319czo1OiJvdGhlciI7TjtzOjY6InNoYXJlZCI7TjtzOjEwOiJwcmVmaXhfb3V0IjtzOjA6IiI7fWltYXBfZGVsaW1pdGVyfHM6MToiLiI7dXNlcl9pZHxzOjE6IjEiO3VzZXJuYW1lfHM6Mjc6ImNhbnRlbG9wZUB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJGcGN6SmhuSVF0aGR0MllJek9QNGE0aURJZlEzZVVqVSI7bG9naW5fdGltZXxpOjE2MTQyMDAyMzM7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('pch375bneu3bsmhqcs2npnnc6c', '2021-02-26 12:03:29', '2021-02-26 12:03:29', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJEanBkd3Zod3AwMlN3RFNPdFdSQ0FFTzV1cVV4N1ZocyI7bG9naW5fdGltZXxpOjE2MTQzNjk4MDk7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('phr7da0dbi8n2scmhabs1f7761', '2021-02-26 12:12:21', '2021-02-26 12:12:21', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJBNXFHWlhxSGFqNVJiSkFuTFVtNlhQR0RjVjZFTCtXWiI7bG9naW5fdGltZXxpOjE2MTQzNzAzNDE7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('ptgnm47ivgfmi7m9nn314cbkpl', '2021-02-25 13:47:08', '2021-02-25 13:47:08', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJhcjgyclZndERmMzlUbDdLcFZrM1Rmbm1oWEF0NDI5YyI7bG9naW5fdGltZXxpOjE2MTQyODk2Mjg7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('qibaptblt7m51ik6i1rfgu5kbh', '2021-02-25 20:18:56', '2021-02-25 20:18:56', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJzTHpNblluTDZuTjR6bzdlL20zY2tNU21KVW1EU1kxRCI7bG9naW5fdGltZXxpOjE2MTQzMTMxMzY7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('rqitogce8o91lr9tjijgr7942q', '2021-02-26 11:41:02', '2021-02-26 11:41:02', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiI2Ijt1c2VybmFtZXxzOjI2OiJ0ZXN0dXNlckB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJCMUVuMEZwNXoyQjlGTjNuaExrbXJDQnBuU0FEcTJPZCI7bG9naW5fdGltZXxpOjE2MTQzNjg0NjI7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('sgobs27f3n9c2604a9u89v5jve', '2021-02-25 14:24:48', '2021-02-25 14:24:48', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6InJvYm90IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJ4Ni85c015dU1pM0NOcHA1MEJodEMzM0FGbStyMm9yUCI7bG9naW5fdGltZXxpOjE2MTQyOTE4ODg7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('t5qfi14v45t4qn2dkeblqovmie', '2021-02-24 13:41:46', '2021-02-24 13:41:46', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6ImxhcnJ5IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJuT3lleFJUOGN4TmR2aVRSdFFSZ3VBVDVXZ3pBcUxYRyI7bG9naW5fdGltZXxpOjE2MTQyMDI5MDY7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7');
INSERT INTO `session` (`sess_id`, `created`, `changed`, `ip`, `vars`) VALUES
('tsgl53sm3mj39akb9g7embbsgg', '2021-02-24 13:25:19', '2021-02-24 13:25:19', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7c2tpbnxzOjU6ImxhcnJ5IjtpbWFwX25hbWVzcGFjZXxhOjQ6e3M6ODoicGVyc29uYWwiO2E6MTp7aTowO2E6Mjp7aTowO3M6MDoiIjtpOjE7czoxOiIuIjt9fXM6NToib3RoZXIiO047czo2OiJzaGFyZWQiO047czoxMDoicHJlZml4X291dCI7czowOiIiO31pbWFwX2RlbGltaXRlcnxzOjE6Ii4iO3VzZXJfaWR8czoxOiIyIjt1c2VybmFtZXxzOjIzOiJhZG1pbkB3aGl0ZWhvdHJvYm90LmNvbSI7c3RvcmFnZV9ob3N0fHM6OToibG9jYWxob3N0IjtzdG9yYWdlX3BvcnR8aToxNDM7c3RvcmFnZV9zc2x8TjtwYXNzd29yZHxzOjMyOiJKU28remI3YWgyalUxdDhNRVQ5cFRSZjFzMVdvNlNJMyI7bG9naW5fdGltZXxpOjE2MTQyMDE5MTk7dGltZXpvbmV8czoxOToiQW1lcmljYS9Mb3NfQW5nZWxlcyI7U1RPUkFHRV9TUEVDSUFMLVVTRXxiOjE7'),
('v7d9kafj9r0sv2f6f13ce8i7eg', '2021-02-24 14:26:48', '2021-02-24 14:26:48', '173.27.116.255', 'bGFuZ3VhZ2V8czo1OiJlbl9VUyI7dGVtcHxiOjE7c2tpbnxzOjU6InJvYm90Ijs=');

-- --------------------------------------------------------

--
-- Table structure for table `system`
--

CREATE TABLE `system` (
  `name` varchar(64) NOT NULL,
  `value` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `system`
--

INSERT INTO `system` (`name`, `value`) VALUES
('roundcube-version', '2015111100');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int UNSIGNED NOT NULL,
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `mail_host` varchar(128) NOT NULL,
  `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `last_login` datetime DEFAULT NULL,
  `failed_login` datetime DEFAULT NULL,
  `failed_login_counter` int UNSIGNED DEFAULT NULL,
  `language` varchar(5) DEFAULT NULL,
  `preferences` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `mail_host`, `created`, `last_login`, `failed_login`, `failed_login_counter`, `language`, `preferences`) VALUES
(1, 'cantelope@whitehotrobot.com', 'localhost', '2021-02-24 12:57:13', '2021-02-24 12:57:13', NULL, NULL, 'en_US', 'a:1:{s:11:\"client_hash\";s:32:\"345817cbdfbb88d0ed04135d4501c8b5\";}'),
(2, 'admin@whitehotrobot.com', 'localhost', '2021-02-24 13:19:22', '2021-02-26 13:08:09', '2021-02-25 17:00:00', 1, 'en_US', 'a:14:{s:12:\"preview_pane\";b:1;s:14:\"compose_extwin\";i:0;s:11:\"mdn_default\";b:0;s:11:\"dsn_default\";b:0;s:25:\"compose_save_localstorage\";i:1;s:19:\"attachment_reminder\";b:0;s:16:\"message_sort_col\";s:4:\"date\";s:18:\"message_sort_order\";s:4:\"DESC\";s:9:\"list_cols\";a:8:{i:0;s:7:\"threads\";i:1;s:7:\"subject\";i:2;s:6:\"fromto\";i:3;s:6:\"status\";i:4;s:4:\"date\";i:5;s:4:\"size\";i:6;s:4:\"flag\";i:7;s:10:\"attachment\";}s:4:\"skin\";s:5:\"robot\";s:19:\"default_addressbook\";s:1:\"0\";s:17:\"message_threading\";a:2:{s:4:\"junk\";b:0;s:5:\"INBOX\";b:0;}s:17:\"check_all_folders\";b:1;s:11:\"client_hash\";s:32:\"6b7e28628796b3c5e7f00acbe514c668\";}'),
(3, 'test3@whitehotrobot.com', 'localhost', '2021-02-26 08:09:56', '2021-02-26 08:09:56', NULL, NULL, 'en_US', 'a:1:{s:11:\"client_hash\";s:32:\"ccc4bae1ac28139ebdbd6154eed97703\";}'),
(4, 'srmcgann@whitehotrobot.com', 'localhost', '2021-02-26 11:24:03', '2021-02-26 11:27:36', NULL, NULL, 'en_US', 'a:1:{s:11:\"client_hash\";s:32:\"5ec1d4ea777c3033a028b93a83ec611c\";}'),
(5, 'administrator@whitehotrobot.com', 'localhost', '2021-02-26 11:34:43', '2021-02-26 11:34:43', NULL, NULL, 'en_US', 'a:1:{s:11:\"client_hash\";s:32:\"b13159dca103d9809313673f4afde4a3\";}'),
(6, 'testuser@whitehotrobot.com', 'localhost', '2021-02-26 11:41:02', '2021-02-26 12:20:23', '2021-02-26 12:08:10', 1, 'en_US', 'a:2:{s:12:\"preview_pane\";b:1;s:11:\"client_hash\";s:32:\"adf63d0b876f883d1d0c79b683e340c8\";}'),
(7, 'scottmcgann@whitehotrobot.com', 'localhost', '2021-02-26 12:47:17', '2021-02-26 12:47:17', NULL, NULL, 'en_US', 'a:1:{s:11:\"client_hash\";s:32:\"c4a19ce1b1984da1ef9077415d438231\";}'),
(8, 'scottrmcgann@whitehotrobot.com', 'localhost', '2021-02-26 12:50:32', '2021-02-26 12:50:32', NULL, NULL, 'en_US', 'a:1:{s:11:\"client_hash\";s:32:\"b48400262d363e4ceba638223b8b204d\";}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD KEY `expires_index` (`expires`),
  ADD KEY `user_cache_index` (`user_id`,`cache_key`);

--
-- Indexes for table `cache_index`
--
ALTER TABLE `cache_index`
  ADD PRIMARY KEY (`user_id`,`mailbox`),
  ADD KEY `expires_index` (`expires`);

--
-- Indexes for table `cache_messages`
--
ALTER TABLE `cache_messages`
  ADD PRIMARY KEY (`user_id`,`mailbox`,`uid`),
  ADD KEY `expires_index` (`expires`);

--
-- Indexes for table `cache_shared`
--
ALTER TABLE `cache_shared`
  ADD KEY `expires_index` (`expires`),
  ADD KEY `cache_key_index` (`cache_key`);

--
-- Indexes for table `cache_thread`
--
ALTER TABLE `cache_thread`
  ADD PRIMARY KEY (`user_id`,`mailbox`),
  ADD KEY `expires_index` (`expires`);

--
-- Indexes for table `contactgroupmembers`
--
ALTER TABLE `contactgroupmembers`
  ADD PRIMARY KEY (`contactgroup_id`,`contact_id`),
  ADD KEY `contactgroupmembers_contact_index` (`contact_id`);

--
-- Indexes for table `contactgroups`
--
ALTER TABLE `contactgroups`
  ADD PRIMARY KEY (`contactgroup_id`),
  ADD KEY `contactgroups_user_index` (`user_id`,`del`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `user_contacts_index` (`user_id`,`del`);

--
-- Indexes for table `dictionary`
--
ALTER TABLE `dictionary`
  ADD UNIQUE KEY `uniqueness` (`user_id`,`language`);

--
-- Indexes for table `identities`
--
ALTER TABLE `identities`
  ADD PRIMARY KEY (`identity_id`),
  ADD KEY `user_identities_index` (`user_id`,`del`),
  ADD KEY `email_identities_index` (`email`,`del`);

--
-- Indexes for table `searches`
--
ALTER TABLE `searches`
  ADD PRIMARY KEY (`search_id`),
  ADD UNIQUE KEY `uniqueness` (`user_id`,`type`,`name`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sess_id`),
  ADD KEY `changed_index` (`changed`);

--
-- Indexes for table `system`
--
ALTER TABLE `system`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`,`mail_host`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactgroups`
--
ALTER TABLE `contactgroups`
  MODIFY `contactgroup_id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `identities`
--
ALTER TABLE `identities`
  MODIFY `identity_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `searches`
--
ALTER TABLE `searches`
  MODIFY `search_id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cache`
--
ALTER TABLE `cache`
  ADD CONSTRAINT `user_id_fk_cache` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cache_index`
--
ALTER TABLE `cache_index`
  ADD CONSTRAINT `user_id_fk_cache_index` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cache_messages`
--
ALTER TABLE `cache_messages`
  ADD CONSTRAINT `user_id_fk_cache_messages` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cache_thread`
--
ALTER TABLE `cache_thread`
  ADD CONSTRAINT `user_id_fk_cache_thread` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contactgroupmembers`
--
ALTER TABLE `contactgroupmembers`
  ADD CONSTRAINT `contact_id_fk_contacts` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`contact_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contactgroup_id_fk_contactgroups` FOREIGN KEY (`contactgroup_id`) REFERENCES `contactgroups` (`contactgroup_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contactgroups`
--
ALTER TABLE `contactgroups`
  ADD CONSTRAINT `user_id_fk_contactgroups` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `user_id_fk_contacts` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dictionary`
--
ALTER TABLE `dictionary`
  ADD CONSTRAINT `user_id_fk_dictionary` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `identities`
--
ALTER TABLE `identities`
  ADD CONSTRAINT `user_id_fk_identities` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `searches`
--
ALTER TABLE `searches`
  ADD CONSTRAINT `user_id_fk_searches` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
