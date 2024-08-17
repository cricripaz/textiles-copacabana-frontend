describe.skip('Este grupo de pruebas será ignorado', () => {
  test('Esta prueba será ignorada', () => {
    expect(true).toBe(false);
  });
});

// O para ignorar pruebas individuales
test.skip('Esta prueba específica será ignorada', () => {
  expect(true).toBe(false);
});
