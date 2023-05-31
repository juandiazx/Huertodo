-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2023 a las 15:32:28
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
-- Estructura de tabla para la tabla `comercial_adm`
--

CREATE TABLE `comercial_adm` (
  `id` int(11) NOT NULL,
  `asunto` varchar(30) NOT NULL,
  `mensaje` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_tecnico`
--

CREATE TABLE `comercial_tecnico` (
  `id` int(11) NOT NULL,
  `asunto` varchar(30) NOT NULL,
  `mensaje` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `huerto` int(11) NOT NULL
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
  `mensaje` varchar(700) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnico_comercial`
--

CREATE TABLE `tecnico_comercial` (
  `id` int(11) NOT NULL,
  `asunto` varchar(30) NOT NULL,
  `mensaje` varchar(300) NOT NULL
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
-- Indices de la tabla `comercial_adm`
--
ALTER TABLE `comercial_adm`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercial_tecnico`
--
ALTER TABLE `comercial_tecnico`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `tecnico_comercial`
--
ALTER TABLE `tecnico_comercial`
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
-- AUTO_INCREMENT de la tabla `comercial_adm`
--
ALTER TABLE `comercial_adm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercial_tecnico`
--
ALTER TABLE `comercial_tecnico`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tecnico_comercial`
--
ALTER TABLE `tecnico_comercial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

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


--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'usuario'),
(2, 'comercial'),
(3, 'tecnico'),
(4, 'administrador');

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id`, `nombreApellidos`, `email`, `direccion`, `asunto`, `mensaje`) VALUES
(1, 'Pedrito Pica Piedra', 'pedrito@gmail.com', 'Carretera Pedro 18 Gandia Valencia', 'Solicitar Presupuesto Producto', 'Tengo mucho dinero pporfavor denme huerto'),
(3, 'nuevo', 'joselgarciamant1@gmail.com', 'adasf', 'asfsadf', 'dfasdfasdf');

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `nombreApellidos`, `contrasenya`, `rol`, `direccion`) VALUES
(1, 'joselgarciamant1@gmail.com', 'Jose Luis Garcia Mantero', 'mementoMori45', 1, 'Calle Espanya 19, Piso 2, 47630, Gandia, Valencia'),
(2, 'lanternmartin@gmail.com', 'Martin Gutierrez Lant', 'upvMejorUniLoremIpsum', 2, ''),
(3, 'saavedrarogg@gmail.com', 'Eduardo Saavedra Rodriguez', 'hartoDeLosArduinos400', 3, ''),
(4, 'mauforonxl@gmail.com', 'Mauricio Foronda Taliente', 'vivaWordpress2012', 4, '');

--
-- Volcado de datos para la tabla `huertos`
--

INSERT INTO `huertos` (`id`, `nombre`, `latitud`, `longitud`, `usuario`) VALUES
(1, 'Peras', 30.946249, 118.756589, 1),
(2, 'Manzanilla', 45.9113179, 16.1242534, 1);

--
-- Volcado de datos para la tabla `medicion`
--

INSERT INTO `medicion` (`id`, `huerto`, `tiempo`, `temperatura`, `humedad`, `ph`, `salinidad`, `iluminacion`) VALUES
(1, 1, '2023-04-08 14:56:17', 12, 13, 6, 56, 91),
(2, 2, '2022-09-23 15:46:10', 23, 67, 9, 70, 10),
(3, 1, '2023-02-22 09:57:59', 20, 21, 7, 23, 71),
(4, 2, '2022-12-01 02:09:14', 15, 48, 5, 58, 90),
(5, 1, '2023-03-30 20:46:40', 14, 85, 8, 43, 84),
(6, 2, '2022-06-14 09:54:38', 23, 71, 6, 60, 26),
(7, 2, '2023-02-08 00:29:48', 17, 55, 2, 41, 10),
(8, 1, '2022-08-20 20:28:47', 23, 78, 8, 15, 70),
(9, 2, '2022-12-18 16:23:18', 12, 54, 3, 34, 86),
(10, 1, '2023-05-20 01:16:50', 13, 72, 11, 46, 64),
(11, 1, '2022-11-24 04:32:36', 13, 11, 5, 42, 84),
(12, 2, '2022-12-25 10:06:15', 23, 23, 3, 47, 18),
(13, 1, '2022-07-16 11:51:40', 22, 79, 12, 83, 16),
(14, 2, '2023-05-05 05:04:17', 23, 67, 12, 24, 75),
(15, 1, '2022-11-14 23:11:32', 17, 76, 2, 58, 32);



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
