-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-05-2023 a las 18:25:15
-- Versión del servidor: 5.7.42-0ubuntu0.18.04.1
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `arosjim_huertodo_1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_adm`
--

CREATE TABLE `comercial_adm` (
                                 `id` int(11) NOT NULL,
                                 `asunto` varchar(30) NOT NULL,
                                 `mensaje` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_tecnico`
--

CREATE TABLE `comercial_tecnico` (
                                     `id` int(11) NOT NULL,
                                     `asunto` varchar(30) NOT NULL,
                                     `mensaje` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
                                  `id` int(11) NOT NULL,
                                  `fecha` date NOT NULL,
                                  `contenido` varchar(100) NOT NULL,
                                  `huerto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
                         `id` int(11) NOT NULL,
                         `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnico_comercial`
--

CREATE TABLE `tecnico_comercial` (
                                     `id` int(11) NOT NULL,
                                     `asunto` varchar(30) NOT NULL,
                                     `mensaje` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
                           `id` int(11) NOT NULL,
                           `nombreApellidos` varchar(70) NOT NULL,
                           `contrasenya` varchar(30) NOT NULL,
                           `direccion` varchar(100) NOT NULL,
                           `email` varchar(60) NOT NULL,
                           `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Usuario` (`id`,`email`,`nombreApellidos`, `contrasenya`,`rol`, `direccion`) VALUES
                                                                                             (1,'joselgarciamant1@gmail.com','Jose Luis Garcia Mantero', 'mementoMori45',0, 'Calle Espanya 19, Piso 2, 47630, Gandia, Valencia'),
                                                                                             (2,'lanternmartin@gmail.com','Martin Gutierrez Lant', 'upvMejorUniLoremIpsum',1, NULL),
                                                                                             (3,'saavedrarogg@gmail.com','Eduardo Saavedra Rodriguez', 'hartoDeLosArduinos400',2, NULL),
                                                                                             (4,'mauforonxl@gmail.com','Mauricio Foronda Taliente', 'vivaWordpress2012',3, NULL);
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
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
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
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medicion`
--
ALTER TABLE `medicion`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tecnico_comercial`
--
ALTER TABLE `tecnico_comercial`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `huertos`
--
ALTER TABLE `huertos`
    ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario`) REFERENCES `Usuario` (`id`);

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
-- Filtros para la tabla `Usuario`
--
ALTER TABLE `Usuario`
    ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;