const data = {
    "id": 523,
    "type": "VISIT",
    "yes": {
        "id": 522,
        "type": "CONNECT",
        "yes": {
            "id": 517,
            "type": "MESSAGE",
            "yes": {
                "id": 516,
                "type": "ENDORSE"
            }
        },
        "no": {
            "id": 521,
            "type": "INMAIL",
            "yes": {
                "id": 518,
                "type": "END"
            },
            "no": {
                "id": 520,
                "type": "LIKE",
                "yes": {
                    "id": 519,
                    "type": "EMAIL"
                }
            }
        }
    }
}

// Need to find the node with id 522
const find = (id, node) => {
    console.log("NODE ", id, node.id)
    let result = null;

    if(node.id === id) {
        console.log("RETURN ", node)
        return node;
    }

    if(node.yes) {
        result = find(id, node.yes);
    }

    if(node.no) {
        result = find(id, node.no);
    }

    return result;
}

console.log(find(519, data));