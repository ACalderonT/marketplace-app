export const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', { style: 'decimal', maximumFractionDigits: 0}).format(value);
}