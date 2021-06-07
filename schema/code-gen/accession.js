exports.entities = {
    FRFacture: {
        properties: {
            autoLocked: {
                type: 'boolean',
                isCalculated: true,
            }
        },
        links: {
            lock: {},
            unlock: {},
        }
    },
    
}
