import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const tuesday = html.match(/<!-- ===== MARTES ===== -->([\s\S]*?)<!-- ===== MIERCOLES ===== -->/)?.[1] ?? "";

test("Tuesday exposes the approved lower-body session in execution order", () => {
  const expectedOrder = [
    "Lubricacion Articular",
    "Movilidad Cargada + Prehab",
    "Hang Power Clean + Split Squat Jump",
    "Back Squat Profundo",
    "Nordic + Reverse Nordic",
    "Back Extension + QL Extension Lateral",
  ];

  let cursor = -1;
  for (const label of expectedOrder) {
    const position = tuesday.indexOf(label);
    assert.ok(position > cursor, `${label} must appear in the approved order`);
    cursor = position;
  }
});

test("Tuesday documents the agreed load and fatigue limits", () => {
  assert.match(tuesday, /65–75 min/);
  assert.match(tuesday, /RPE 8–9/);
  assert.match(tuesday, /una repeticion limpia en reserva/i);
  assert.match(tuesday, /sin buscar fatiga/i);
});
