// ====================================================================
// ARCHIVO DE ENTRADA PRINCIPAL PARA HOSTINGER (PHUSION PASSENGER)
// ====================================================================
//
// Hostinger y su cargador Node.js (Phusion Passenger) requieren que el archivo 
// de arranque esté en la raíz del proyecto y prefieren la extensión estándar ".js".
//
// Este script sirve como puente de inicio (bootstrap) cargando dinámicamente 
// el servidor compilado de Astro SSR en formato ES Module (.mjs).

import './dist/server/entry.mjs';
