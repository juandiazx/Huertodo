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
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
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
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id`, `nombreApellidos`, `email`, `direccion`, `asunto`, `mensaje`, `estado`) VALUES
(1, 'Pedrito Pica Piedra', 'pedrito@gmail.com', 'Carretera Pedro 18 Gandia Valencia', 'Solicitar Presupuesto Producto', 'Tengo mucho dinero pporfavor denme huerto', 0),
(3, 'nuevo', 'joselgarciamant1@gmail.com', 'adasf', 'asfsadf', 'dfasdfasdf', 0),
(4, 'Hola', 'jan@gmail.com', 'afddasf', 'sadfasdadaff', 'qwert', 0),
(5, 'Pedrito Pica Piedra', 'adsf@gmail.com', 'qqqqq', 'aasdf', 'gfdgdfgdfg', 0);

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

INSERT INTO `huertos` (`id`, `nombre`, `latitud`, `longitud`, `usuario`) VALUES
(1, 'Manzanas', 30.946249, 118.756589, 1),
(2, 'Tomates', 45.9113179, 16.1242534, 1);

--
-- Volcado de datos para la tabla `medicion`
--

INSERT INTO `medicion` (`id`, `huerto`, `tiempo`, `temperatura`, `humedad`, `ph`, `salinidad`, `iluminacion`) VALUES
(1, 1, '2023-05-05 01:00:00', 28, 62, 6, 40, 75),
(2, 1, '2023-05-06 01:00:00', 45, 83, 9, 54, 81),
(3, 1, '2023-05-07 01:00:00', 32, 71, 3, 38, 69),
(4, 1, '2023-05-08 01:00:00', 17, 95, 2, 12, 58),
(5, 1, '2023-05-09 01:00:00', 52, 42, 8, 39, 90),
(6, 1, '2023-05-10 01:00:00', 39, 68, 4, 22, 76),
(7, 1, '2023-05-11 01:00:00', 61, 57, 11, 50, 83),
(8, 1, '2023-05-12 01:00:00', 26, 79, 5, 36, 65),
(9, 1, '2023-05-13 01:00:00', 37, 74, 9, 45, 72),
(10, 1, '2023-05-14 01:00:00', 48, 52, 7, 33, 89),
(11, 1, '2023-05-15 01:00:00', 31, 88, 6, 28, 80),
(12, 1, '2023-05-16 01:00:00', 19, 63, 3, 17, 57),
(13, 1, '2023-05-17 01:00:00', 43, 49, 10, 42, 73),
(14, 1, '2023-05-18 01:00:00', 34, 76, 4, 25, 88),
(15, 1, '2023-05-19 01:00:00', 56, 60, 8, 47, 62),
(16, 1, '2023-05-20 01:00:00', 23, 92, 2, 10, 79),
(17, 1, '2023-05-21 01:00:00', 41, 45, 6, 35, 71),
(18, 1, '2023-05-22 01:00:00', 29, 71, 5, 20, 84),
(19, 1, '2023-05-23 01:00:00', 50, 56, 9, 44, 68),
(20, 1, '2023-05-24 01:00:00', 36, 81, 7, 30, 87),
(21, 1, '2023-05-25 01:00:00', 53, 47, 11, 52, 77),
(22, 1, '2023-05-26 01:00:00', 25, 77, 3, 15, 60),
(23, 1, '2023-05-27 01:00:00', 38, 68, 10, 41, 72),
(24, 1, '2023-05-28 01:00:00', 20, 89, 5, 18, 81),
(25, 1, '2023-05-29 01:00:00', 47, 50, 9, 38, 65),
(26, 1, '2023-05-30 01:00:00', 33, 74, 6, 24, 87),
(27, 1, '2023-05-31 01:00:00', 54, 53, 4, 50, 75),
(28, 1, '2023-06-01 01:00:00', 22, 83, 7, 14, 58),
(29, 1, '2023-06-02 01:00:00', 40, 65, 8, 37, 84),
(30, 1, '2023-06-03 01:00:00', 27, 95, 2, 23, 70),
(31, 2, '2023-06-04 01:00:00', 65, 55, 8, 41, 69),
(32, 2, '2023-06-05 01:00:00', 47, 47, 6, 36, 73),
(33, 2, '2023-06-06 01:00:00', 53, 60, 9, 52, 68),
(34, 2, '2023-06-07 01:00:00', 42, 52, 7, 38, 71),
(35, 2, '2023-06-08 01:00:00', 59, 48, 10, 49, 77),
(36, 2, '2023-06-09 01:00:00', 38, 63, 5, 30, 66),
(37, 2, '2023-06-10 01:00:00', 48, 57, 8, 39, 72),
(38, 2, '2023-06-11 01:00:00', 35, 49, 6, 27, 67),
(39, 2, '2023-06-12 01:00:00', 57, 45, 9, 45, 70),
(40, 2, '2023-06-13 01:00:00', 43, 55, 7, 33, 75),
(41, 2, '2023-06-14 01:00:00', 62, 51, 10, 50, 79),
(42, 2, '2023-06-15 01:00:00', 39, 46, 8, 35, 63),
(43, 2, '2023-06-16 01:00:00', 51, 58, 11, 48, 68),
(44, 2, '2023-06-17 01:00:00', 34, 49, 6, 29, 71),
(45, 2, '2023-06-18 01:00:00', 55, 47, 9, 43, 77),
(46, 2, '2023-06-19 01:00:00', 42, 61, 7, 32, 66),
(47, 2, '2023-06-20 01:00:00', 58, 56, 10, 50, 72),
(48, 2, '2023-06-21 01:00:00', 36, 50, 8, 31, 67),
(49, 2, '2023-06-22 01:00:00', 49, 45, 11, 47, 70),
(50, 2, '2023-06-23 01:00:00', 41, 53, 6, 34, 75),
(51, 2, '2023-06-24 01:00:00', 60, 48, 9, 52, 79),
(52, 2, '2023-06-25 01:00:00', 37, 59, 7, 38, 63),
(53, 2, '2023-06-26 01:00:00', 52, 50, 10, 49, 68),
(54, 2, '2023-06-27 01:00:00', 35, 48, 8, 29, 71),
(55, 2, '2023-06-28 01:00:00', 56, 45, 11, 44, 77),
(56, 2, '2023-06-29 01:00:00', 43, 62, 6, 33, 66),
(57, 2, '2023-06-30 01:00:00', 50, 55, 9, 51, 72),
(58, 2, '2023-07-01 01:00:00', 38, 47, 7, 36, 67),
(59, 2, '2023-07-02 01:00:00', 54, 51, 10, 48, 70),
(60, 2, '2023-07-03 01:00:00', 40, 57, 8, 31, 75),
(61, 1, '2023-06-09 09:53:57', 22, 13, 5, 15, 43);

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