import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const thursday = html.match(/<!-- ===== JUEVES ===== -->([\s\S]*?)<!-- ===== VIERNES ===== -->/)?.[1] ?? "";
const friday = html.match(/<!-- ===== VIERNES ===== -->([\s\S]*?)<!-- ===== SABADO ===== -->/)?.[1] ?? "";

test("Thursday exposes the approved upper-body and core session in execution order", () => {
  const expectedOrder = [
    "Lubricacion Articular",
    "Movilidad Cargada + Prehab",
    "Landmine Rotational Clean + Press + Muscle-Up Asistido",
    "Core de Potencia — Rotacion + Aceleracion",
    "Dominadas + Fondos Lastrados",
    "Core de Fuerza + Transferencia",
  ];

  let cursor = -1;
  for (const label of expectedOrder) {
    const position = thursday.indexOf(label);
    assert.ok(position > cursor, `${label} must appear in the approved order`);
    cursor = position;
  }
});

test("Thursday documents the approved sets and exercise choices", () => {
  assert.match(thursday, /50–60 min/);
  assert.match(thursday, /Skin the Cat/);
  assert.match(thursday, /Ring Push-Up Plus/);
  assert.match(thursday, /Landmine Rotational Clean \+ Press/);
  assert.match(thursday, /Muscle-Up Asistido con Banda/);
  assert.match(thursday, /Dominadas Lastradas.*3 x 3/s);
  assert.match(thursday, /Fondos Lastrados.*3 x 3/s);
  assert.match(thursday, /Landmine 180/);
  assert.match(thursday, /Cable Sprinter March/);
  assert.match(thursday, /Pallof Step-Out con Elastico/);
  assert.match(thursday, /Elevacion de Rodillas Colgado con Peso/);
});

test("Thursday removes the extra vertical block and old core finish", () => {
  assert.doesNotMatch(thursday, /Wall HSPU/);
  assert.doesNotMatch(thursday, /Tuck Front Lever Row/);
  assert.doesNotMatch(thursday, /Cable Chop Pesado/);
  assert.doesNotMatch(thursday, /Rueda Abdominal Cargada/);
  assert.doesNotMatch(thursday, /Suitcase March Pesado/);
});

test("Thursday removes the old standalone skill and accessory blocks", () => {
  assert.doesNotMatch(thursday, /Skill — Vertical \+ Muscle-Up/);
  assert.doesNotMatch(thursday, /Barra \+ Accesorios Calistenia/);
  assert.doesNotMatch(thursday, /Ring Rows \+ Pike Push-Up/);
});

test("Friday's short Thursday catch-up follows the current session", () => {
  assert.match(friday, /Jueves corto: dominadas\/fondos 3x3/);
  assert.match(friday, /Pallof step-out/);
  assert.doesNotMatch(friday, /Jueves corto: dominadas\/fondos 5x5 \+ push press/);
});
