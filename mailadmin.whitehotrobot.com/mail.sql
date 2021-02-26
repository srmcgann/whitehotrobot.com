-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 26, 2021 at 01:30 PM
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
-- Database: `mail`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `superadmin` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email_other` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `token_validity` datetime NOT NULL DEFAULT '2000-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Admins';

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `superadmin`, `created`, `modified`, `active`, `phone`, `email_other`, `token`, `token_validity`) VALUES
('admin@whitehotrobot.com', '$1$3fd1014c$FXG5OH3N/8NZqoqWH2M9o/', 1, '2021-02-23 11:52:03', '2021-02-23 11:52:03', 1, '', '', '', '2021-02-23 11:52:03'),
('whitehotrobot@gmail.com', '$1$285b8071$V.YOiiQwSJ.YdJ.dNv7Om0', 1, '2021-02-23 11:04:39', '2021-02-23 11:04:39', 1, '', '', '', '2021-02-23 11:04:39');

-- --------------------------------------------------------

--
-- Table structure for table `alias`
--

CREATE TABLE `alias` (
  `address` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `goto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Aliases';

--
-- Dumping data for table `alias`
--

INSERT INTO `alias` (`address`, `goto`, `domain`, `created`, `modified`, `active`) VALUES
('abuse@whitehotrobot.com', 'admin@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 11:06:55', '2021-02-23 11:06:55', 1),
('admin@whitehotrobot.com', 'admin@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 11:08:03', '2021-02-23 11:08:03', 1),
('administrator@whitehotrobot.com', 'administrator@whitehotrobot.com', 'whitehotrobot.com', '2021-02-26 11:34:29', '2021-02-26 11:34:29', 1),
('cantelope@whitehotrobot.com', 'cantelope@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 18:17:45', '2021-02-23 18:17:45', 1),
('default@whitehotrobot.com', 'default@whitehotrobot.com', 'whitehotrobot.com', '2021-02-25 21:20:37', '2021-02-25 21:20:37', 1),
('hostmaster@whitehotrobot.com', 'admin@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 11:06:55', '2021-02-23 11:06:55', 1),
('netban@whitehotrobot.com', 'netban@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 11:08:42', '2021-02-23 11:08:42', 1),
('postmaster@whitehotrobot.com', 'admin@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 11:06:55', '2021-02-23 11:06:55', 1),
('root@whitehotrobot.com', 'root@whitehotrobot.com', 'whitehotrobot.com', '2021-02-24 07:13:16', '2021-02-24 07:13:16', 1),
('scott@whitehotrobot.com', 'scott@whitehotrobot.com', 'whitehotrobot.com', '2021-02-26 09:08:00', '2021-02-26 09:08:00', 1),
('scottmcgann@whitehotrobot.com', 'scottmcgann@whitehotrobot.com', 'whitehotrobot.com', '2021-02-26 12:46:52', '2021-02-26 12:46:52', 1),
('scottrmcgann@whitehotrobot.com', 'scottrmcgann@whitehotrobot.com', 'whitehotrobot.com', '2021-02-26 12:50:08', '2021-02-26 12:50:08', 1),
('srmcgann@whitehotrobot.com', 'srmcgann@whitehotrobot.com', 'whitehotrobot.com', '2021-02-26 11:23:38', '2021-02-26 11:23:38', 1),
('testuser@whitehotrobot.com', 'testuser@whitehotrobot.com', 'whitehotrobot.com', '2021-02-26 12:25:41', '2021-02-26 12:25:41', 1),
('webmaster@whitehotrobot.com', 'admin@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 11:06:55', '2021-02-23 11:06:55', 1),
('whitehotrobot@whitehotrobot.com', 'whitehotrobot@whitehotrobot.com', 'whitehotrobot.com', '2021-02-24 10:37:54', '2021-02-24 10:37:54', 1);

-- --------------------------------------------------------

--
-- Table structure for table `alias_domain`
--

CREATE TABLE `alias_domain` (
  `alias_domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `target_domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Domain Aliases';

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `id` int NOT NULL,
  `name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `value` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='PostfixAdmin settings';

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`id`, `name`, `value`) VALUES
(1, 'version', '1840');

-- --------------------------------------------------------

--
-- Table structure for table `domain`
--

CREATE TABLE `domain` (
  `domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `aliases` int NOT NULL DEFAULT '0',
  `mailboxes` int NOT NULL DEFAULT '0',
  `maxquota` bigint NOT NULL DEFAULT '0',
  `quota` bigint NOT NULL DEFAULT '0',
  `transport` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `backupmx` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Domains';

--
-- Dumping data for table `domain`
--

INSERT INTO `domain` (`domain`, `description`, `aliases`, `mailboxes`, `maxquota`, `quota`, `transport`, `backupmx`, `created`, `modified`, `active`) VALUES
('ALL', '', 0, 0, 0, 0, '', 0, '2021-02-23 11:04:16', '2021-02-23 11:04:16', 1),
('whitehotrobot.com', 'whitehotrobot.com', 0, 0, 10, 2048, 'virtual', 0, '2021-02-23 11:06:55', '2021-02-26 10:54:22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `domain_admins`
--

CREATE TABLE `domain_admins` (
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Domain Admins';

--
-- Dumping data for table `domain_admins`
--

INSERT INTO `domain_admins` (`username`, `domain`, `created`, `active`) VALUES
('whitehotrobot@gmail.com', 'ALL', '2021-02-23 11:04:39', 1),
('admin@whitehotrobot.com', 'whitehotrobot.com', '2021-02-23 11:52:03', 1),
('admin@whitehotrobot.com', 'ALL', '2021-02-23 11:52:03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fetchmail`
--

CREATE TABLE `fetchmail` (
  `id` int UNSIGNED NOT NULL,
  `domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT '',
  `mailbox` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `src_server` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `src_auth` enum('password','kerberos_v5','kerberos','kerberos_v4','gssapi','cram-md5','otp','ntlm','msn','ssh','any') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `src_user` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `src_password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `src_folder` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `poll_time` int UNSIGNED NOT NULL DEFAULT '10',
  `fetchall` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `keep` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `protocol` enum('POP3','IMAP','POP2','ETRN','AUTO') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usessl` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `sslcertck` tinyint(1) NOT NULL DEFAULT '0',
  `sslcertpath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `sslfingerprint` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT '',
  `extra_options` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `returned_text` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `mda` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT '2000-01-01 08:00:00',
  `created` timestamp NOT NULL DEFAULT '2000-01-01 08:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `timestamp` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `action` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Log';

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`timestamp`, `username`, `domain`, `action`, `data`, `id`) VALUES
('2021-02-23 11:04:39', 'SETUP.PHP (173.27.116.255)', '', 'create_admin', 'whitehotrobot@gmail.com', 1),
('2021-02-23 11:06:55', 'whitehotrobot@gmail.com (173.27.116.255)', 'whitehotrobot.com', 'create_domain', 'whitehotrobot.com', 2),
('2021-02-23 11:08:03', 'whitehotrobot@gmail.com (173.27.116.255)', 'whitehotrobot.com', 'create_alias', 'admin@whitehotrobot.com', 3),
('2021-02-23 11:08:13', 'whitehotrobot@gmail.com (173.27.116.255)', 'whitehotrobot.com', 'create_mailbox', 'admin@whitehotrobot.com', 4),
('2021-02-23 11:08:42', 'whitehotrobot@gmail.com (173.27.116.255)', 'whitehotrobot.com', 'create_alias', 'netban@whitehotrobot.com', 5),
('2021-02-23 11:08:42', 'whitehotrobot@gmail.com (173.27.116.255)', 'whitehotrobot.com', 'create_mailbox', 'netban@whitehotrobot.com', 6),
('2021-02-23 11:52:03', 'whitehotrobot@gmail.com (173.27.116.255)', '', 'create_admin', 'admin@whitehotrobot.com', 7),
('2021-02-23 18:17:45', 'whitehotrobot@gmail.com (173.27.116.255)', 'whitehotrobot.com', 'create_alias', 'cantelope@whitehotrobot.com', 8),
('2021-02-23 18:17:55', 'whitehotrobot@gmail.com (173.27.116.255)', 'whitehotrobot.com', 'create_mailbox', 'cantelope@whitehotrobot.com', 9),
('2021-02-24 07:13:16', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_alias', 'root@whitehotrobot.com', 10),
('2021-02-24 07:13:26', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_mailbox', 'root@whitehotrobot.com', 11),
('2021-02-24 10:37:54', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_alias', 'whitehotrobot@whitehotrobot.com', 12),
('2021-02-24 10:38:04', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_mailbox', 'whitehotrobot@whitehotrobot.com', 13),
('2021-02-25 21:20:37', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_alias', 'default@whitehotrobot.com', 14),
('2021-02-25 21:20:48', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_mailbox', 'default@whitehotrobot.com', 15),
('2021-02-26 06:28:15', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_alias', 'test@whitehotrobot.com', 16),
('2021-02-26 06:28:25', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'create_mailbox', 'test@whitehotrobot.com', 17),
('2021-02-26 07:31:17', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'test2@whitehotrobot.com', 18),
('2021-02-26 07:31:27', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'test2@whitehotrobot.com', 19),
('2021-02-26 07:32:28', 'CLI (localhost)', 'whitehotrobot.com', 'delete_mailbox', 'test2@whitehotrobot.com', 20),
('2021-02-26 07:51:53', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'test3@whitehotrobot.com', 21),
('2021-02-26 07:52:04', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'test3@whitehotrobot.com', 22),
('2021-02-26 09:08:00', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'scott@whitehotrobot.com', 23),
('2021-02-26 09:08:11', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'scott@whitehotrobot.com', 24),
('2021-02-26 09:21:33', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'test5@whitehotrobot.com', 25),
('2021-02-26 09:21:43', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'test5@whitehotrobot.com', 26),
('2021-02-26 10:54:22', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'edit_domain', 'whitehotrobot.com', 27),
('2021-02-26 10:54:38', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'test7@whitehotrobot.com', 28),
('2021-02-26 10:54:49', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'test7@whitehotrobot.com', 29),
('2021-02-26 10:57:48', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'test8@whitehotrobot.com', 30),
('2021-02-26 10:57:59', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'test8@whitehotrobot.com', 31),
('2021-02-26 11:01:13', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'test6@whitehotrobot.com', 32),
('2021-02-26 11:01:24', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'test6@whitehotrobot.com', 33),
('2021-02-26 11:23:38', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'srmcgann@whitehotrobot.com', 34),
('2021-02-26 11:23:49', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'srmcgann@whitehotrobot.com', 35),
('2021-02-26 11:29:15', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 36),
('2021-02-26 11:29:26', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 37),
('2021-02-26 11:34:29', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'administrator@whitehotrobot.com', 38),
('2021-02-26 11:34:40', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'administrator@whitehotrobot.com', 39),
('2021-02-26 11:48:11', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 40),
('2021-02-26 11:49:40', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 41),
('2021-02-26 11:49:51', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 42),
('2021-02-26 12:02:25', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 43),
('2021-02-26 12:03:00', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 44),
('2021-02-26 12:03:10', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 45),
('2021-02-26 12:05:21', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 46),
('2021-02-26 12:05:40', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 47),
('2021-02-26 12:05:40', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 48),
('2021-02-26 12:06:16', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 49),
('2021-02-26 12:07:25', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 50),
('2021-02-26 12:07:25', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 51),
('2021-02-26 12:07:49', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 52),
('2021-02-26 12:10:24', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 53),
('2021-02-26 12:10:34', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 54),
('2021-02-26 12:11:29', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 55),
('2021-02-26 12:11:41', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 56),
('2021-02-26 12:11:41', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 57),
('2021-02-26 12:12:29', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 58),
('2021-02-26 12:12:41', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 59),
('2021-02-26 12:12:41', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 60),
('2021-02-26 12:15:57', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 61),
('2021-02-26 12:16:09', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 62),
('2021-02-26 12:16:20', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 63),
('2021-02-26 12:17:20', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 64),
('2021-02-26 12:17:31', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 65),
('2021-02-26 12:17:31', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 66),
('2021-02-26 12:18:22', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 67),
('2021-02-26 12:18:32', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 68),
('2021-02-26 12:18:32', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 69),
('2021-02-26 12:19:24', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 70),
('2021-02-26 12:19:35', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 71),
('2021-02-26 12:19:35', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 72),
('2021-02-26 12:20:04', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 73),
('2021-02-26 12:20:12', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 74),
('2021-02-26 12:20:13', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 75),
('2021-02-26 12:24:07', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'testuser@whitehotrobot.com', 76),
('2021-02-26 12:24:09', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'test@whitehotrobot.com', 77),
('2021-02-26 12:24:12', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'test8@whitehotrobot.com', 78),
('2021-02-26 12:24:15', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'test7@whitehotrobot.com', 79),
('2021-02-26 12:24:17', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'test6@whitehotrobot.com', 80),
('2021-02-26 12:24:19', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'test5@whitehotrobot.com', 81),
('2021-02-26 12:24:22', 'admin@whitehotrobot.com (173.27.116.255)', 'whitehotrobot.com', 'delete_mailbox', 'test3@whitehotrobot.com', 82),
('2021-02-26 12:25:41', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'testuser@whitehotrobot.com', 83),
('2021-02-26 12:25:51', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'testuser@whitehotrobot.com', 84),
('2021-02-26 12:46:52', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'scottmcgann@whitehotrobot.com', 85),
('2021-02-26 12:47:03', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'scottmcgann@whitehotrobot.com', 86),
('2021-02-26 12:50:08', 'CLI (localhost)', 'whitehotrobot.com', 'create_alias', 'scottrmcgann@whitehotrobot.com', 87),
('2021-02-26 12:50:18', 'CLI (localhost)', 'whitehotrobot.com', 'create_mailbox', 'scottrmcgann@whitehotrobot.com', 88);

-- --------------------------------------------------------

--
-- Table structure for table `mailbox`
--

CREATE TABLE `mailbox` (
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `maildir` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `quota` bigint NOT NULL DEFAULT '0',
  `local_part` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `domain` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email_other` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `token_validity` datetime NOT NULL DEFAULT '2000-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Mailboxes';

--
-- Dumping data for table `mailbox`
--

INSERT INTO `mailbox` (`username`, `password`, `name`, `maildir`, `quota`, `local_part`, `domain`, `created`, `modified`, `active`, `phone`, `email_other`, `token`, `token_validity`) VALUES
('admin@whitehotrobot.com', '$1$J.MyuK./$4BH6Mvx0LtV9Pvvao7TO2.', 'admin', 'admin@whitehotrobot.com/', 0, 'admin', 'whitehotrobot.com', '2021-02-23 11:08:03', '2021-02-23 11:08:03', 1, '', '', '', '2021-02-23 11:08:03'),
('administrator@whitehotrobot.com', '$1$dc4b6f6a$BFtaz9BK.MXkQWmPSs.NV/', 'cantelope', 'administrator@whitehotrobot.com/', 102400000, 'administrator', 'whitehotrobot.com', '2021-02-26 11:34:29', '2021-02-26 11:34:29', 1, '', 'admin@whitehotrobot.com', '', '2021-02-26 11:34:29'),
('cantelope@whitehotrobot.com', '$1$69ab7877$weStc/R2Hk1vedlWPLIgK.', 'cantelope', 'cantelope@whitehotrobot.com/', 0, 'cantelope', 'whitehotrobot.com', '2021-02-23 18:17:45', '2021-02-23 18:17:45', 1, '', '', '', '2021-02-23 18:17:45'),
('default@whitehotrobot.com', '$1$cb35a0bb$1h70RGMqvR5EKeZj8sgBV1', 'default', 'default@whitehotrobot.com/', 0, 'default', 'whitehotrobot.com', '2021-02-25 21:20:37', '2021-02-25 21:20:37', 1, '', '', '', '2021-02-25 21:20:37'),
('netban@whitehotrobot.com', '$1$801654e6$89tHKUhyi./HTmzwvmDqQ/', '', 'netban@whitehotrobot.com/', 0, 'netban', 'whitehotrobot.com', '2021-02-23 11:08:42', '2021-02-23 11:08:42', 1, '', '', '', '2021-02-23 11:08:42'),
('root@whitehotrobot.com', '$1$1b919b13$.sdiICVfPjuVqxXuKV/5H1', '', 'root@whitehotrobot.com/', 0, 'root', 'whitehotrobot.com', '2021-02-24 07:13:16', '2021-02-24 07:13:16', 1, '', '', '', '2021-02-24 07:13:15'),
('scott@whitehotrobot.com', '$1$ed0e46c1$rxRdXoLWNae8bB5oVieeM0', 'scott', 'scott@whitehotrobot.com/', 102400000, 'scott', 'whitehotrobot.com', '2021-02-26 09:08:00', '2021-02-26 09:08:00', 1, '', 's.r.mcgann@hotmail.com', '', '2021-02-26 09:08:00'),
('scottmcgann@whitehotrobot.com', '$1$d2cfbbc1$XDe/aBJ4ucfiAXEwBkmXs1', 'scottmcgann', 'scottmcgann@whitehotrobot.com/', 102400000, 'scottmcgann', 'whitehotrobot.com', '2021-02-26 12:46:52', '2021-02-26 12:46:52', 1, '', 's.r.mcgann@hotmail.com', '', '2021-02-26 12:46:52'),
('scottrmcgann@whitehotrobot.com', '$1$944e006d$hct2mSVfMOmzEDELcQ5UX.', 'scott', 'scottrmcgann@whitehotrobot.com/', 102400000, 'scottrmcgann', 'whitehotrobot.com', '2021-02-26 12:50:08', '2021-02-26 12:50:08', 1, '', 's.r.mcgann@hotmail.com', '', '2021-02-26 12:50:08'),
('srmcgann@whitehotrobot.com', '$1$e76bbfdf$4XLdoNKsZ.Mz/gJW4Y3Lj0', 'srmcgann', 'srmcgann@whitehotrobot.com/', 102400000, 'srmcgann', 'whitehotrobot.com', '2021-02-26 11:23:38', '2021-02-26 11:23:38', 1, '', 's.r.mcgann@hotmail.com', '', '2021-02-26 11:23:38'),
('testuser@whitehotrobot.com', '$1$6fda132e$/gMYxVu.PbLjTYJPvOJoX0', 'testuser', 'testuser@whitehotrobot.com/', 102400000, 'testuser', 'whitehotrobot.com', '2021-02-26 12:25:41', '2021-02-26 12:25:41', 1, '', 's.r.mcgann@hotmail.com', '', '2021-02-26 12:25:41'),
('whitehotrobot@whitehotrobot.com', '$1$6fc9e5f2$G321DMXyUFVOo3TPKHyNt/', 'Whitehot Robot', 'whitehotrobot@whitehotrobot.com/', 0, 'whitehotrobot', 'whitehotrobot.com', '2021-02-24 10:37:54', '2021-02-24 10:37:54', 1, '', '', '', '2021-02-24 10:37:54');

-- --------------------------------------------------------

--
-- Table structure for table `quota`
--

CREATE TABLE `quota` (
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `path` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `current` bigint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quota2`
--

CREATE TABLE `quota2` (
  `username` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bytes` bigint NOT NULL DEFAULT '0',
  `messages` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `activefrom` timestamp NOT NULL DEFAULT '2000-01-01 08:00:00',
  `activeuntil` timestamp NOT NULL DEFAULT '2038-01-18 08:00:00',
  `cache` text NOT NULL,
  `domain` varchar(255) NOT NULL,
  `interval_time` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Vacation';

-- --------------------------------------------------------

--
-- Table structure for table `vacation_notification`
--

CREATE TABLE `vacation_notification` (
  `on_vacation` varchar(255) CHARACTER SET latin1 NOT NULL,
  `notified` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `notified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Postfix Admin - Virtual Vacation Notifications';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `alias`
--
ALTER TABLE `alias`
  ADD PRIMARY KEY (`address`),
  ADD KEY `domain` (`domain`);

--
-- Indexes for table `alias_domain`
--
ALTER TABLE `alias_domain`
  ADD PRIMARY KEY (`alias_domain`),
  ADD KEY `active` (`active`),
  ADD KEY `target_domain` (`target_domain`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `domain`
--
ALTER TABLE `domain`
  ADD PRIMARY KEY (`domain`);

--
-- Indexes for table `domain_admins`
--
ALTER TABLE `domain_admins`
  ADD KEY `username` (`username`);

--
-- Indexes for table `fetchmail`
--
ALTER TABLE `fetchmail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `timestamp` (`timestamp`),
  ADD KEY `domain_timestamp` (`domain`,`timestamp`);

--
-- Indexes for table `mailbox`
--
ALTER TABLE `mailbox`
  ADD PRIMARY KEY (`username`),
  ADD KEY `domain` (`domain`);

--
-- Indexes for table `quota`
--
ALTER TABLE `quota`
  ADD PRIMARY KEY (`username`,`path`);

--
-- Indexes for table `quota2`
--
ALTER TABLE `quota2`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`email`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `vacation_notification`
--
ALTER TABLE `vacation_notification`
  ADD PRIMARY KEY (`on_vacation`,`notified`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fetchmail`
--
ALTER TABLE `fetchmail`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vacation_notification`
--
ALTER TABLE `vacation_notification`
  ADD CONSTRAINT `vacation_notification_pkey` FOREIGN KEY (`on_vacation`) REFERENCES `vacation` (`email`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
