const hexToHsl = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
};
console.log('Paper base:', hexToHsl('#F1EDE4'));
console.log('Secondary paper:', hexToHsl('#E8E2D6'));
console.log('Ink:', hexToHsl('#1B1C1A'));
console.log('Secondary text:', hexToHsl('#5D5B55'));
console.log('Graphite rules:', hexToHsl('#8D8A82'));
console.log('Metal surface:', hexToHsl('#C7C4BA'));
console.log('Deep graphite:', hexToHsl('#2B2D2A'));
console.log('Rust-red:', hexToHsl('#B8422D'));
console.log('Muted blue:', hexToHsl('#315E73'));
console.log('Amber:', hexToHsl('#B87D2A'));
