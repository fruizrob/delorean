const fs = require('fs')

global.heap = {}
heap.snapshots = []

module.exports = {

    addDependecies: (dependencies) => {
        heap.dependencies = dependencies;
    },

    heapSnapshot: () => {
        const snapshot = {}
        heap.dependencies.map(dependecy => {
            snapshot[`${dependecy}`] = global[dependecy.toString()]
        })
        
        heap.snapshots.push(snapshot)
    },
} 