
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initResistorDecoder();
    initLedCalculator();
});

function initNavigation() {
    const homeMenu = document.getElementById('home-menu');
    const menuCards = document.querySelectorAll('.menu-card');
    const toolCards = document.querySelectorAll('.tool-card');
    const backButtons = document.querySelectorAll('.back-button');

    if (!homeMenu || menuCards.length === 0 || toolCards.length === 0) return;

    const showSection = (targetId) => {
        toolCards.forEach(card => card.classList.add('hidden'));
        homeMenu.classList.add('hidden');
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.remove('hidden');
    };

    const showMenu = () => {
        toolCards.forEach(card => card.classList.add('hidden'));
        homeMenu.classList.remove('hidden');
    };

    const activateCard = (card) => {
        const target = card.getAttribute('data-target');
        if (target) showSection(target);
    };

    menuCards.forEach(card => {
        card.addEventListener('click', () => activateCard(card));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                activateCard(card);
            }
        });
    });

    backButtons.forEach(button => button.addEventListener('click', showMenu));
}

function initResistorDecoder() {
    const bandColors = {
        negro: { value: 0, multiplier: 1, tolerance: 20, hex: '#212121' },
        marron: { value: 1, multiplier: 10, tolerance: 1, hex: '#a52a2a' },
        rojo: { value: 2, multiplier: 100, tolerance: 2, hex: '#ff0000' },
        naranja: { value: 3, multiplier: 1000, tolerance: null, hex: '#ffa500' },
        amarillo: { value: 4, multiplier: 10000, tolerance: null, hex: '#ffff00' },
        verde: { value: 5, multiplier: 100000, tolerance: 0.5, hex: '#008000' },
        azul: { value: 6, multiplier: 1000000, tolerance: 0.25, hex: '#0000ff' },
        violeta: { value: 7, multiplier: 10000000, tolerance: 0.1, hex: '#ee82ee' },
        gris: { value: 8, multiplier: null, tolerance: 0.05, hex: '#808080' },
        blanco: { value: 9, multiplier: null, tolerance: null, hex: '#ffffff' },
        oro: { value: null, multiplier: 0.1, tolerance: 5, hex: '#ffd700' },
        plata: { value: null, multiplier: 0.01, tolerance: 10, hex: '#c0c0c0' },
    };

    const band1 = document.getElementById('band1');
    const band2 = document.getElementById('band2');
    const band3 = document.getElementById('band3');
    const band4 = document.getElementById('band4');
    const resistorResult = document.getElementById('resistor-result');

    if (!band1 || !band2 || !band3 || !band4 || !resistorResult) return;

    const digitBands = ['negro', 'marron', 'rojo', 'naranja', 'amarillo', 'verde', 'azul', 'violeta', 'gris', 'blanco'];
    const multiplierBands = ['negro', 'marron', 'rojo', 'naranja', 'amarillo', 'verde', 'azul', 'violeta', 'oro', 'plata'];
    const toleranceBands = ['marron', 'rojo', 'verde', 'azul', 'violeta', 'gris', 'oro', 'plata'];

    const getContrastColor = (hexcolor) => {
        const normalized = hexcolor.startsWith('#') ? hexcolor.slice(1) : hexcolor;
        const r = parseInt(normalized.substr(0, 2), 16);
        const g = parseInt(normalized.substr(2, 2), 16);
        const b = parseInt(normalized.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    };

    const populateSelect = (selectElement, colorNames) => {
        selectElement.innerHTML = '';
        colorNames.forEach(color => {
            const definition = bandColors[color];
            if (!definition) return;
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            option.style.backgroundColor = definition.hex;
            option.style.color = getContrastColor(definition.hex);
            selectElement.appendChild(option);
        });
    };

    populateSelect(band1, digitBands);
    populateSelect(band2, digitBands);
    populateSelect(band3, multiplierBands);
    populateSelect(band4, toleranceBands);

    const formatOhms = (value) => {
        if (value >= 1000000) return (value / 1000000).toPrecision(3) + 'M';
        if (value >= 1000) return (value / 1000).toPrecision(3) + 'k';
        return value.toPrecision(3);
    };

    const calculateResistorValue = () => {
        const val1 = bandColors[band1.value].value;
        const val2 = bandColors[band2.value].value;
        const multiplier = bandColors[band3.value].multiplier;
        const tolerance = bandColors[band4.value].tolerance;

        if (val1 === null || val2 === null || multiplier === null || tolerance === null) {
            resistorResult.innerHTML = '<p>Selecciona los colores.</p>';
            return;
        }
        const baseValue = (val1 * 10 + val2) * multiplier;
        const formattedValue = formatOhms(baseValue);
        resistorResult.innerHTML = `<p><span class="resistor-value">${formattedValue}&Omega;</span> &plusmn;${tolerance}%</p>`;
    };

    [band1, band2, band3, band4].forEach(select => {
        const setBandColor = () => {
            select.style.backgroundColor = bandColors[select.value].hex;
            select.style.color = getContrastColor(bandColors[select.value].hex);
        };
        select.addEventListener('change', () => {
            setBandColor();
            calculateResistorValue();
        });
        setBandColor();
    });

    calculateResistorValue();
}

function initLedCalculator() {
    const calculateLedBtn = document.getElementById('calculate-led-resistor');
    const sourceVoltageInput = document.getElementById('source-voltage');
    const ledColorSelect = document.getElementById('led-color');
    const ledCurrentInput = document.getElementById('led-current');
    const ledResult = document.getElementById('led-result');

    if (!calculateLedBtn || !sourceVoltageInput || !ledColorSelect || !ledCurrentInput || !ledResult) return;

    const e12Series = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];

    const findNearestE12 = (val) => {
        let magnitude = 1;
        while (val > magnitude * 100) { magnitude *= 10; }
        for (let i = 0; i < e12Series.length; i++) {
            if (e12Series[i] * magnitude >= val) return e12Series[i] * magnitude;
        }
        return 100 * magnitude;
    };

    calculateLedBtn.addEventListener('click', () => {
        const sourceV = parseFloat(sourceVoltageInput.value);
        const ledV = parseFloat(ledColorSelect.value);
        const ledI = parseFloat(ledCurrentInput.value);

        if (isNaN(sourceV) || isNaN(ledV) || isNaN(ledI)) {
            ledResult.innerHTML = '<p style="color: var(--secondary-accent);">Por favor, ingresa todos los valores.</p>';
            return;
        }
        if (sourceV <= ledV) {
            ledResult.innerHTML = '<p style="color: var(--secondary-accent);">El voltaje de fuente debe ser mayor que el del LED.</p>';
            return;
        }
        if (ledI <= 0) {
            ledResult.innerHTML = '<p style="color: var(--secondary-accent);">La corriente debe ser mayor a 0.</p>';
            return;
        }

        const exactR = (sourceV - ledV) / (ledI / 1000);
        const commercialR = findNearestE12(exactR);
        const power = (sourceV - ledV) * (ledI / 1000);
        const powerInfo = power <= 0.125 ? '(puedes usar 1/8W o 1/4W)' : '(usa una de 1/4W o superior)';

        ledResult.innerHTML =
            `<p><strong>Resistencia Exacta:</strong> ${exactR.toFixed(1)} &Omega;</p>` +
            `<p><strong>Valor Comercial Recomendado:</strong> ${commercialR} &Omega;</p>` +
            `<p><strong>Potencia Disipada:</strong> ${power.toFixed(3)} W ${powerInfo}</p>`;
    });
}
