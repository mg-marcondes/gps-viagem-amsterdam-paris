#!/usr/bin/env node
/**
 * Trava dos dados auditados.
 *
 * Compara o ROUTES (mais HOST_NOTE e NC) do index.html ORIGINAL — lido do git,
 * não do disco — com o que está hoje em js/data.js, campo por campo.
 *
 * Diferença de um único caractere em qualquer horário, parada, direção, tarifa
 * ou aviso faz este script sair com código 1.
 *
 *   node scripts/verify-data.mjs [commit-base]
 *
 * O commit-base padrão é o primeiro commit do repositório, que contém o
 * index.html monolítico original.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const BASE = process.argv[2] || firstCommit();

function firstCommit() {
  return execFileSync("git", ["rev-list", "--max-parents=0", "HEAD"], {
    encoding: "utf8",
  }).trim().split("\n")[0];
}

function gitShow(path) {
  return execFileSync("git", ["show", `${BASE}:${path}`], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
}

/** Avalia o trecho `const NC … const ROUTES = [...]` e devolve os valores. */
function evalDataBlock(source, label) {
  const start = source.indexOf('const NC = "NÃO CONFIRMADO";');
  if (start === -1) throw new Error(`${label}: bloco de dados não encontrado (const NC)`);

  const marker = "const ACCENT_VAR";
  const endMarker = source.indexOf(marker, start);
  const stopAt = endMarker === -1 ? source.indexOf("const STAYS", start) : endMarker;
  if (stopAt === -1) throw new Error(`${label}: fim do bloco ROUTES não encontrado`);

  const block = source.slice(start, stopAt);
  const fn = new Function(`${block}; return { NC, HOST_NOTE, ROUTES };`);
  return fn();
}

/** Diferenças profundas entre dois valores, com caminho legível. */
function diff(a, b, path = "", out = []) {
  if (Object.is(a, b)) return out;

  const ta = Array.isArray(a) ? "array" : a === null ? "null" : typeof a;
  const tb = Array.isArray(b) ? "array" : b === null ? "null" : typeof b;

  if (ta !== tb) {
    out.push({ path, antes: a, agora: b, nota: `tipo mudou: ${ta} → ${tb}` });
    return out;
  }

  if (ta === "array") {
    if (a.length !== b.length) {
      out.push({ path, antes: `${a.length} itens`, agora: `${b.length} itens`, nota: "tamanho mudou" });
    }
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) diff(a[i], b[i], `${path}[${i}]`, out);
    return out;
  }

  if (ta === "object") {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      if (!(k in a)) { out.push({ path: `${path}.${k}`, antes: "(ausente)", agora: b[k], nota: "campo novo" }); continue; }
      if (!(k in b)) { out.push({ path: `${path}.${k}`, antes: a[k], agora: "(ausente)", nota: "campo removido" }); continue; }
      diff(a[k], b[k], `${path}.${k}`, out);
    }
    return out;
  }

  out.push({ path, antes: a, agora: b });
  return out;
}

function short(v) {
  const s = typeof v === "string" ? v : JSON.stringify(v);
  return s.length > 110 ? s.slice(0, 107) + "…" : s;
}

// ---------------------------------------------------------------- execução

let original, atual;

try {
  original = evalDataBlock(gitShow("index.html"), `index.html @ ${BASE.slice(0, 8)}`);
} catch (err) {
  console.error(`\n✗ Não foi possível ler o original do git (${BASE}).`);
  console.error(`  ${err.message}\n`);
  process.exit(2);
}

try {
  atual = evalDataBlock(readFileSync("js/data.js", "utf8"), "js/data.js");
} catch (err) {
  console.error(`\n✗ Não foi possível ler js/data.js.`);
  console.error(`  ${err.message}\n`);
  process.exit(2);
}

const problemas = [
  ...diff(original.NC, atual.NC, "NC"),
  ...diff(original.HOST_NOTE, atual.HOST_NOTE, "HOST_NOTE"),
  ...diff(original.ROUTES, atual.ROUTES, "ROUTES"),
];

const nRotas = atual.ROUTES.length;
const nTrechos = atual.ROUTES.reduce((s, r) => s + r.legs.length, 0);

if (problemas.length === 0) {
  console.log(`\n✓ Dados auditados intactos.`);
  console.log(`  base git ....... ${BASE.slice(0, 8)}`);
  console.log(`  rotas .......... ${nRotas}`);
  console.log(`  trechos ........ ${nTrechos}`);
  console.log(`  NC / HOST_NOTE . idênticos\n`);
  process.exit(0);
}

console.error(`\n✗ DADO AUDITADO ALTERADO — ${problemas.length} diferença(s).\n`);
for (const p of problemas) {
  console.error(`  ${p.path}${p.nota ? `  (${p.nota})` : ""}`);
  console.error(`    antes: ${short(p.antes)}`);
  console.error(`    agora: ${short(p.agora)}`);
  console.error("");
}
console.error(`Nada deve ser commitado até isto voltar a zero.\n`);
process.exit(1);
