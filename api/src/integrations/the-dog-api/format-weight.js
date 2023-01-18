const formatWeight = (weight) => {
    return weight ? (weight.metric.includes('NaN') ? '' : weight.metric) : '';
}

module.exports = { formatWeight };