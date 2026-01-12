// Minimal reproduction: Unicode escape sequence in template literal
// This demonstrates a bug in rspack where ANY Unicode escape sequence
// inside a template literal causes "quasic should be not empty" error

console.log('Testing minimal case...');

// This FAILS with rspack - just a Unicode escape in a template literal
try {
  const regex = new RegExp(`\uD83C[\uDFFB-\uDFFF]`, 'g');
  console.log('✓ Template literal approach SUCCESS');
} catch (error) {
  console.error('✗ Template literal approach FAILED:', error.message);
}

// This WORKS with rspack - using string concatenation instead
try {
  const regex = new RegExp('\\uD83C[\\uDFFB-\\uDFFF]', 'g');
  console.log('✓ String concatenation approach SUCCESS');
} catch (error) {
  console.error('✗ String concatenation approach FAILED:', error.message);
}

console.log('Test completed');
