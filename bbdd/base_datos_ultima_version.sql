-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2023 a las 10:49:08
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test_local`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunicacion_trabajadores`
--

CREATE TABLE `comunicacion_trabajadores` (
  `id` int(11) NOT NULL,
  `de` int(11) NOT NULL,
  `para` int(11) NOT NULL,
  `asunto` text NOT NULL,
  `texto` text NOT NULL,
  `fecha` date NOT NULL,
  `usuario_solicitud` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `huertos`
--

CREATE TABLE `huertos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicion`
--

CREATE TABLE `medicion` (
  `id` int(11) NOT NULL,
  `huerto` int(11) NOT NULL,
  `tiempo` datetime NOT NULL,
  `temperatura` int(11) NOT NULL,
  `humedad` int(11) NOT NULL,
  `ph` int(11) NOT NULL,
  `salinidad` int(11) NOT NULL,
  `iluminacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contenido` varchar(100) NOT NULL,
  `huerto` int(11) NOT NULL,
  `prioridad` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id` int(11) NOT NULL,
  `nombreApellidos` varchar(70) NOT NULL,
  `email` varchar(60) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `asunto` varchar(40) NOT NULL,
  `mensaje` varchar(700) NOT NULL,
  `estado` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `nombreApellidos` varchar(70) NOT NULL,
  `contrasenya` varchar(30) NOT NULL,
  `rol` int(11) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comunicacion_trabajadores`
--
ALTER TABLE `comunicacion_trabajadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_de` (`de`),
  ADD KEY `fk_usuario_para` (`para`),
  ADD KEY `fk_usuario_proceso` (`usuario_solicitud`);

--
-- Indices de la tabla `huertos`
--
ALTER TABLE `huertos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`usuario`);

--
-- Indices de la tabla `medicion`
--
ALTER TABLE `medicion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_huerto` (`huerto`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
   ADD UNIQUE KEY `uk_contenido` (`contenido`),
  ADD KEY `fk_notificacion` (`huerto`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comunicacion_trabajadores`
--
ALTER TABLE `comunicacion_trabajadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `huertos`
--
ALTER TABLE `huertos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `medicion`
--
ALTER TABLE `medicion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=853;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comunicacion_trabajadores`
--
ALTER TABLE `comunicacion_trabajadores`
  ADD CONSTRAINT `fk_usuario_de` FOREIGN KEY (`de`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_usuario_para` FOREIGN KEY (`para`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_usuario_proceso` FOREIGN KEY (`usuario_solicitud`) REFERENCES `solicitud` (`id`);

--
-- Filtros para la tabla `huertos`
--
ALTER TABLE `huertos`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `medicion`
--
ALTER TABLE `medicion`
  ADD CONSTRAINT `fk_huerto` FOREIGN KEY (`huerto`) REFERENCES `huertos` (`id`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_notificacion` FOREIGN KEY (`huerto`) REFERENCES `huertos` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'usuario'),
(2, 'comercial'),
(3, 'tecnico'),
(4, 'administrador');

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `nombreApellidos`, `contrasenya`, `rol`, `direccion`) VALUES
(1, 'joselgarciamant1@gmail.com', 'Jose Luis Garcia Mantero', 'mementoMori46', 1, 'Calle Espanya 19, Piso 2, 47630, Gandia, Valencia'),
(2, 'lanternmartin@gmail.com', 'Martin Gutierrez Lant', 'upvMejorUniLoremIpsum', 2, ''),
(3, 'saavedrarogg@gmail.com', 'Eduardo Saavedra Rodriguez', 'hartoDeLosArduinos400', 3, ''),
(4, 'mauforonxl@gmail.com', 'Mauricio Foronda Taliente', 'vivaWordpress2012', 4, '');
--

-- Volcado de datos para la tabla `huertos`
--

INSERT INTO `huertos` (`id`, `nombre`, `usuario`) VALUES
(1, 'Manzanas', 1),
(2, 'Tomates', 1);

--
-- Volcado de datos para la tabla `medicion`
--

INSERT INTO `medicion` (`id`, `huerto`, `tiempo`, `temperatura`, `humedad`, `ph`, `salinidad`, `iluminacion`) VALUES
(62, 1, '2023-05-05 01:00:00', 30, 70, 6, 35, 80),
(63, 1, '2023-05-06 01:00:00', 25, 78, 9, 50, 70),
(64, 1, '2023-05-07 01:00:00', 37, 65, 3, 29, 65),
(65, 1, '2023-05-08 01:00:00', 48, 50, 2, 18, 82),
(66, 1, '2023-05-09 01:00:00', 29, 76, 8, 39, 75),
(67, 1, '2023-05-10 01:00:00', 42, 62, 4, 30, 80),
(68, 1, '2023-05-11 01:00:00', 24, 84, 11, 48, 68),
(69, 1, '2023-05-12 01:00:00', 35, 70, 5, 34, 78),
(70, 1, '2023-05-13 01:00:00', 52, 58, 9, 44, 72),
(71, 1, '2023-05-14 01:00:00', 32, 76, 7, 26, 86),
(72, 1, '2023-05-15 01:00:00', 46, 64, 6, 38, 70),
(73, 1, '2023-05-16 01:00:00', 28, 82, 3, 28, 80),
(74, 1, '2023-05-17 01:00:00', 39, 69, 10, 40, 74),
(75, 1, '2023-05-18 01:00:00', 23, 87, 4, 22, 82),
(76, 1, '2023-05-19 01:00:00', 34, 73, 8, 36, 68),
(77, 1, '2023-05-20 01:00:00', 55, 55, 2, 21, 88),
(78, 1, '2023-05-21 01:00:00', 36, 82, 6, 43, 71),
(79, 1, '2023-05-22 01:00:00', 49, 68, 5, 31, 83),
(80, 1, '2023-05-23 01:00:00', 31, 85, 9, 46, 66),
(81, 1, '2023-05-24 01:00:00', 44, 71, 7, 29, 80),
(82, 1, '2023-05-25 01:00:00', 26, 89, 11, 54, 72),
(83, 1, '2023-05-26 01:00:00', 37, 66, 3, 32, 68),
(84, 1, '2023-05-27 01:00:00', 21, 84, 10, 41, 82),
(85, 1, '2023-05-28 01:00:00', 33, 70, 4, 25, 75),
(86, 1, '2023-05-29 01:00:00', 56, 56, 8, 47, 87),
(87, 1, '2023-05-30 01:00:00', 36, 82, 6, 36, 71),
(88, 1, '2023-05-31 01:00:00', 49, 68, 5, 33, 80),
(89, 1, '2023-06-01 01:00:00', 31, 85, 9, 48, 72),
(90, 1, '2023-06-02 01:00:00', 44, 71, 7, 28, 77),
(91, 1, '2023-06-03 01:00:00', 26, 89, 11, 41, 65),
(92, 1, '2023-06-04 01:00:00', 37, 66, 3, 27, 68),
(93, 1, '2023-06-05 01:00:00', 21, 84, 10, 39, 82),
(94, 1, '2023-06-06 01:00:00', 33, 70, 4, 22, 75),
(95, 1, '2023-06-07 01:00:00', 55, 55, 8, 50, 87),
(96, 1, '2023-06-08 01:00:00', 35, 82, 6, 36, 71),
(97, 1, '2023-06-09 01:00:00', 48, 69, 10, 51, 78),
(98, 1, '2023-06-10 01:00:00', 30, 86, 4, 27, 66),
(99, 1, '2023-06-11 01:00:00', 43, 73, 9, 43, 82),
(100, 1, '2023-06-12 01:00:00', 26, 90, 6, 24, 68),
(101, 1, '2023-06-13 01:00:00', 39, 67, 5, 39, 85),
(102, 1, '2023-06-14 01:00:00', 55, 55, 8, 32, 75),
(103, 1, '2023-06-15 01:00:00', 36, 82, 11, 46, 79),
(104, 1, '2023-06-16 01:00:00', 49, 69, 3, 30, 73),
(105, 1, '2023-06-17 01:00:00', 31, 86, 10, 42, 87),
(106, 1, '2023-06-18 01:00:00', 47, 73, 9, 47, 78),
(107, 1, '2023-06-19 01:00:00', 25, 90, 6, 23, 68),
(108, 1, '2023-06-20 01:00:00', 38, 67, 5, 37, 85),
(109, 1, '2023-06-21 01:00:00', 51, 55, 8, 30, 75),
(110, 1, '2023-06-22 01:00:00', 35, 82, 11, 46, 79),
(111, 1, '2023-06-23 01:00:00', 48, 69, 3, 33, 73),
(112, 1, '2023-06-24 01:00:00', 30, 86, 10, 45, 87),
(113, 1, '2023-06-25 01:00:00', 43, 73, 9, 29, 78),
(114, 2, '2023-05-05 01:00:00', 28, 62, 6, 40, 75),
(115, 2, '2023-05-06 01:00:00', 45, 83, 9, 54, 81),
(116, 2, '2023-05-07 01:00:00', 32, 71, 3, 38, 69),
(117, 2, '2023-05-08 01:00:00', 17, 95, 2, 12, 58),
(118, 2, '2023-05-09 01:00:00', 52, 42, 8, 39, 90),
(119, 2, '2023-05-10 01:00:00', 39, 68, 4, 22, 76),
(120, 2, '2023-05-11 01:00:00', 61, 57, 11, 50, 83),
(121, 2, '2023-05-12 01:00:00', 26, 79, 5, 36, 65),
(122, 2, '2023-05-13 01:00:00', 37, 74, 9, 45, 72),
(123, 2, '2023-05-14 01:00:00', 48, 52, 7, 33, 89),
(124, 2, '2023-05-15 01:00:00', 31, 88, 6, 28, 80),
(125, 2, '2023-05-16 01:00:00', 19, 63, 3, 17, 57),
(126, 2, '2023-05-17 01:00:00', 43, 49, 10, 42, 73),
(127, 2, '2023-05-18 01:00:00', 34, 76, 4, 25, 88),
(128, 2, '2023-05-19 01:00:00', 56, 60, 8, 47, 62),
(129, 2, '2023-05-20 01:00:00', 23, 92, 2, 10, 79),
(130, 2, '2023-05-21 01:00:00', 41, 45, 6, 35, 71),
(131, 2, '2023-05-22 01:00:00', 29, 71, 5, 20, 84),
(132, 2, '2023-05-23 01:00:00', 50, 56, 9, 44, 68),
(133, 2, '2023-05-24 01:00:00', 36, 81, 7, 30, 87),
(134, 2, '2023-05-25 01:00:00', 53, 47, 11, 52, 77),
(135, 2, '2023-05-26 01:00:00', 25, 77, 3, 15, 60),
(136, 2, '2023-05-27 01:00:00', 38, 68, 10, 41, 72),
(137, 2, '2023-05-28 01:00:00', 20, 89, 5, 18, 81),
(138, 2, '2023-05-29 01:00:00', 47, 50, 9, 38, 65),
(139, 2, '2023-05-30 01:00:00', 33, 74, 6, 24, 87),
(140, 2, '2023-05-31 01:00:00', 54, 53, 4, 50, 75),
(141, 2, '2023-06-01 01:00:00', 22, 83, 7, 14, 58),
(142, 2, '2023-06-02 01:00:00', 40, 65, 8, 37, 84),
(143, 2, '2023-06-03 01:00:00', 27, 95, 2, 23, 70),
(144, 2, '2023-06-04 01:00:00', 46, 62, 9, 43, 82),
(145, 2, '2023-06-05 01:00:00', 35, 81, 6, 29, 66),
(146, 2, '2023-06-06 01:00:00', 58, 55, 12, 53, 77),
(147, 2, '2023-06-07 01:00:00', 24, 77, 4, 16, 59),
(148, 2, '2023-06-08 01:00:00', 42, 68, 10, 40, 70),
(149, 2, '2023-06-09 01:00:00', 18, 90, 5, 17, 84),
(150, 2, '2023-06-10 01:00:00', 51, 48, 8, 45, 62),
(151, 2, '2023-06-11 01:00:00', 32, 73, 3, 27, 87),
(152, 2, '2023-06-12 01:00:00', 44, 58, 11, 42, 75),
(153, 2, '2023-06-13 01:00:00', 30, 85, 7, 26, 68),
(154, 2, '2023-06-14 01:00:00', 49, 51, 9, 36, 81),
(155, 2, '2023-06-15 01:00:00', 37, 77, 6, 21, 64),
(156, 2, '2023-06-16 01:00:00', 60, 47, 12, 51, 73),
(157, 2, '2023-06-17 01:00:00', 26, 80, 4, 15, 56),
(158, 2, '2023-06-18 01:00:00', 43, 67, 10, 39, 76),
(159, 2, '2023-06-19 01:00:00', 22, 92, 5, 19, 85),
(160, 2, '2023-06-20 01:00:00', 52, 52, 8, 44, 69),
(161, 2, '2023-06-21 01:00:00', 34, 76, 3, 28, 83),
(162, 2, '2023-06-22 01:00:00', 56, 60, 11, 49, 61),
(163, 2, '2023-06-23 01:00:00', 29, 88, 7, 23, 79),
(164, 2, '2023-06-24 01:00:00', 48, 55, 9, 41, 72),
(165, 2, '2023-06-25 01:00:00', 38, 78, 6, 30, 87);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `fecha`, `contenido`, `huerto`, `prioridad`) VALUES
(836, '2023-06-09', 'El valor de temperatura en Tomates ha bajado más de 20%', 2, 'media'),
(840, '2023-06-09', 'El valor de iluminacion en Manzanas ha bajado más de 10%', 1, 'alta'),
(841, '2023-06-09', 'El valor de ph en Manzanas ha subido más de 12', 1, 'alta'),
(843, '2023-06-09', 'El valor de iluminacion en Manzanas ha bajado más de 20%', 1, 'media'),
(851, '2023-06-09', 'El valor de humedad en Manzanas ha bajado más de 20%', 1, 'media'),
(852, '2023-06-09', 'El valor de salinidad en Manzanas ha bajado más de 20%', 1, 'media');