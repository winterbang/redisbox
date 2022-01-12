function keyspace(string) {
    let arr = string.split(/[\n]/)
    arr = arr.slice(1, arr.length - 1)
    
    let result = {}
    arr.forEach(item => {
        item = item.replace(/[\r]/, '')
        const [db, values] = item.split(':')
        result[db] = {}
        values.split(',').forEach(val => {
            const [k, v] = val.split('=')
            result[db][k] = v 
        })
    });
    return result
}

export { 
    keyspace
}