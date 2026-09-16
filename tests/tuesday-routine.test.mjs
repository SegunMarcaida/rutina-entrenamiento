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
  assert.match(tuesday, /Hang Power Clean \+ Split Squat Jump<\/div><div class="ex-sets sets-pow">2 rondas/);
  assert.match(tuesday, /Back Squat Profundo<\/div><div class="ex-sets sets-str">3 x 2–3/);
  assert.match(tuesday, /RPE 8–9/);
  assert.match(tuesday, /una repeticion limpia en reserva/i);
  assert.match(tuesday, /sin buscar fatiga/i);
});

test("Tuesday offers two approved alternatives for every exercise", () => {
  const alternatives = [
    ["Caminata o bici suave", "Remo suave", "Eliptico"],
    ["Ankle CARs", "Ankle rocks", "Movilizacion de tobillo con banda"],
    ["Knee circles", "Caminata hacia atras", "Extension y flexion dinamica de rodilla"],
    ["Hip CARs", "Hip openers de pie", "90/90 switches"],
    ["Shin-box dinamico", "World’s greatest stretch", "Lunge con rotacion"],
    ["Cat-cow", "Pelvic tilts", "Segmental spinal wave"],
    ["Sentadilla profunda sin peso", "Squat-to-stand", "Deep squat pry asistido"],
    ["Tibialis raise", "Tibialis contra pared", "Dorsiflexion en polea o banda"],
    ["Soleus raise full ROM", "Soleus sentado en maquina", "Calf raise con rodilla flexionada"],
    ["Puente de gluteo unilateral", "Hip thrust unilateral", "Hip thrust B-stance"],
    ["ATG split squat", "Split squat con pie delantero elevado", "Estocada reversa larga"],
    ["Cossack squat", "Lateral lunge con mancuerna", "Lateral squat con slider"],
    ["Jefferson curl", "Roll-down segmentado en polea", "Roll-down sentado con disco"],
    ["Pancake good morning", "Wide-stance Romanian deadlift", "Straddle lift-off"],
  ];

  for (const [exercise, first, second] of alternatives) {
    assert.ok(tuesday.includes(exercise), `${exercise} must remain visible`);
    assert.ok(tuesday.includes(first), `${exercise} must show variant 1`);
    assert.ok(tuesday.includes(second), `${exercise} must show variant 2`);
  }
});

test("Tuesday offers two complete alternatives for every work block", () => {
  const completeAlternatives = [
    ["Potencia Variante A", "Clean pull desde bloques", "Step-up explosivo con mancuernas"],
    ["Potencia Variante B", "Trap-bar jump", "Landmine reverse lunge con knee drive explosivo"],
    ["Fuerza Variante A", "Front squat profundo", "3 x 2–3"],
    ["Fuerza Variante B", "Trap-bar deadlift con manijas bajas", "3 x 2–3"],
    ["Rodilla Variante A", "Leg curl sentado", "Sissy squat asistido"],
    ["Rodilla Variante B", "Sliding leg curl unilateral", "Cyclist squat con talones elevados"],
    ["Posterior Variante A", "Romanian deadlift", "Suitcase carry pesado"],
    ["Posterior Variante B — Solo polea", "Cable pull-through", "Side bend unilateral en polea"],
  ];

  for (const group of completeAlternatives) {
    for (const item of group) {
      assert.ok(tuesday.includes(item), `${item} must be visible in its complete alternative`);
    }
  }
});
