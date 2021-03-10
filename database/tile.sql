-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2021 at 09:14 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tile`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `serial_id` bigint(20) UNSIGNED NOT NULL,
  `task` varchar(200) NOT NULL,
  `description` varchar(900) DEFAULT NULL,
  `hasdeadline` tinyint(1) NOT NULL DEFAULT 0,
  `deadline` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `creationtime` bigint(20) UNSIGNED NOT NULL,
  `hascompleted` tinyint(1) NOT NULL DEFAULT 0,
  `completiontime` bigint(20) UNSIGNED NOT NULL,
  `assignedto` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `roomid` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `projectid` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `moduleid` bigint(20) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `serial_id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(120) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `emailid` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `creationtime` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`serial_id`, `firstname`, `lastname`, `emailid`, `password`, `creationtime`) VALUES
(10, 'aasem', 'siddiqui', 'siddiquiaasem909@gmail.com', 'Siddiqui', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`serial_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`serial_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `serial_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `serial_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
