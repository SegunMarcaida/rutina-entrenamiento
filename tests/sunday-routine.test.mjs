import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const sunday = html.match(/<!-- ===== DOMINGO ===== -->([\s\S]*?)<\/div>\s*<\/div>\s*<script>/)?.[1] ?? "";

test("Sunday presents mobility, four-exercise core, then easy cardio", () => {
  const order = [
    "Movilidad Articular Full Body",
    "Movilidad Cargada — Rango Activo",
    "Core — 4 Ejercicios",
    "Cardio Suave — Al Final",
  ];
  let previous = -1;
  for (const label of order) {
    const position = sunday.indexOf(label);
    assert.ok(position > previous, `${label} must appear in execution order`);
    previous = position;
  }
});

test("Sunday includes approved loaded full-body mobility without max effort", () => {
  for (const exercise of [
    "Shoulder CARs", "90/90", "Ankle Rocks", "ATG Split Squat",
    "Cossack Squat", "Pancake Good Morning", "Soleus Raise",
    "Pullover con Mancuerna", "Rotacion Toracica",
  ]) {
    assert.ok(sunday.includes(exercise), `${exercise} must be visible`);
  }
  assert.match(sunday, /2 vueltas/);
  assert.match(sunday, /RPE 5–6/);
});

test("Sunday core has exactly the approved four exercises over three rounds", () => {
  assert.match(sunday, /3 vueltas/);
  for (const exercise of [
    "Plancha Alta Unilateral con Pie en Banco",
    "Copenhagen Corto",
    "Reverse Pendulum con Pelota Medicinal",
    "Dragon Flag",
  ]) {
    assert.ok(sunday.includes(exercise), `${exercise} must be visible`);
  }
  assert.doesNotMatch(sunday, /Pallof|Dead Bug|Crunch/);
});

test("Sunday ends with easy cardio and removes obsolete recovery claims", () => {
  assert.match(sunday, /15–20 min/);
  assert.match(sunday, /Ritmo conversacional/);
  assert.doesNotMatch(sunday, /elimina el lactato residual|tejido esta mas receptivo|sin esta sesion dominical/);
});
