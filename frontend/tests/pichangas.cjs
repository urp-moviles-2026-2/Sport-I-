// Pruebas de integración del store y almacenamiento sin emulador ni nuevas dependencias.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
const { configureStore } = require('@reduxjs/toolkit');
let stored = null;
let writes = [];
let failRead = false;
let failWrite = false;
const storage = {
  async getItem() { if (failRead) throw Error('read'); return stored; },
  async setItem(key, value) {
    await new Promise(resolve => setTimeout(resolve, 5));
    if (failWrite) throw Error('write');
    stored = value; writes.push(value);
  },
};
const originalLoad = Module._load;
Module._load = function(name, ...rest) {
  if (name === '@react-native-async-storage/async-storage') return { __esModule: true, default: storage };
  return originalLoad.call(this, name, ...rest);
};
require.extensions['.ts'] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  module._compile(code, filename);
};
const slice = require('../src/store/pichangasSlice.ts');
const { iniciarPersistencia } = require('../src/store/persistencia.ts');
const make = () => configureStore({ reducer: { pichangas: slice.default } });
const pause = () => new Promise(resolve => setTimeout(resolve, 60));
(async () => {
  const store = make();
  let warning = '';
  const stop = await iniciarPersistencia(store, message => { warning = message; });
  assert.equal(slice.selectPichangas(store.getState()).length, 0, 'Sin datos fijos');
  const action = slice.agregarPichanga({ titulo: 'Prueba', cancha: 'Cancha', zona: 'Lurín', hora: '20:30', cupos: 10, precio: 18 });
  store.dispatch(action);
  const id = action.payload.id;
  assert.equal(slice.selectAbiertas(store.getState()), 1);
  store.dispatch(slice.cambiarEstado({ id, estado: 'completa' }));
  assert.equal(slice.selectAbiertas(store.getState()), 0);
  store.dispatch(slice.cambiarEstado({ id, estado: 'cancelada' }));
  await pause();
  assert.equal(JSON.parse(stored)[0].estado, 'cancelada', 'Persisten escrituras consecutivas en orden');
  stop();
  const restored = make();
  const stopRestored = await iniciarPersistencia(restored, () => {});
  assert.equal(slice.selectPichangaPorId(id)(restored.getState()).titulo, 'Prueba');
  assert.equal(slice.selectPichangaPorId(id)(restored.getState()).estado, 'cancelada');
  restored.dispatch(slice.eliminarPichanga(id));
  await pause();
  assert.deepEqual(JSON.parse(stored), []);
  stopRestored();
  const bad = '{invalid'; stored = bad;
  await assert.rejects(iniciarPersistencia(make(), () => {}));
  assert.equal(stored, bad, 'No sobrescribe datos ilegibles');
  stored = '[{"id":"corrupto"}]';
  await assert.rejects(iniciarPersistencia(make(), () => {}));
  failRead = true;
  await assert.rejects(iniciarPersistencia(make(), () => {}));
  failRead = false; stored = '[]';
  const failing = make();
  const stopFailing = await iniciarPersistencia(failing, message => { warning = message; });
  failWrite = true; failing.dispatch(slice.agregarPichanga(action.payload));
  await pause(); assert.ok(warning.includes('No se pudo guardar'));
  failWrite = false; failing.dispatch(slice.eliminarPichanga(failing.getState().pichangas.items[0].id));
  await pause(); assert.equal(warning, ''); assert.deepEqual(JSON.parse(stored), []);
  stopFailing();
  console.log('OK: lista vacía, crear, estados, selectores, eliminación, recuperación, orden de escrituras y errores de lectura/escritura.');
})().catch(error => { console.error(error); process.exitCode = 1; });
