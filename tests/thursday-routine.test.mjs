import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const thursday = html.match(/<!-- ===== JUEVES ===== -->([\s\S]*?)<!-- ===== VIERNES ===== -->/)?.[1] ?? "";

test("Thursday exposes the approved upper-body and core session in execution order", () => {
  const expectedOrder = [
    "Lubricacion Articular",
    "Movilidad Cargada + Prehab",
    "Landmine Rotational Clean + Press + Muscle-Up Asistido",
    "Core de Potencia — Rotacion + Aceleracion",
    "Dominadas + Fondos Lastrados",
    "Wall HSPU + Tuck Front Lever Row",
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
  assert.match(thursday, /65–75 min/);
  assert.match(thursday, /Skin the Cat/);
  assert.match(thursday, /Ring Push-Up Plus/);
  assert.match(thursday, /Landmine Rotational Clean \+ Press/);
  assert.match(thursday, /Muscle-Up Asistido con Banda/);
  assert.match(thursday, /Dominadas Lastradas.*3 x 3/s);
  assert.match(thursday, /Fondos Lastrados.*3 x 3/s);
  assert.match(thursday, /Landmine 180/);
  assert.match(thursday, /Cable Sprinter March/);
  assert.match(thursday, /Cable Chop Pesado/);
  assert.match(thursday, /Rueda Abdominal Cargada/);
  assert.match(thursday, /Suitcase March Pesado/);
});

test("Thursday integrates vertical work with an antagonist and HSPU variants", () => {
  assert.match(thursday, /Wall HSPU/);
  assert.match(thursday, /Tuck Front Lever Row/);
  assert.match(thursday, /Pike push-up con pies elevados/);
  assert.match(thursday, /Z-press con mancuernas/);
});

test("Thursday removes the old standalone skill and accessory blocks", () => {
  assert.doesNotMatch(thursday, /Skill — Vertical \+ Muscle-Up/);
  assert.doesNotMatch(thursday, /Barra \+ Accesorios Calistenia/);
  assert.doesNotMatch(thursday, /Ring Rows \+ Pike Push-Up/);
});
