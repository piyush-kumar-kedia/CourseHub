function getDifference(clientArr, serverArr) {
    console.log("test");
    const serverSet = new Set();
    const clientSet = new Set();
    for (let i = 0; i < serverArr.length; i++) {
        serverSet.add(serverArr[i]);
    }
    for (let i = 0; i < clientArr.length; i++) {
        clientSet.add(clientArr[i]);
    }
    console.log(serverSet.difference(clientSet));
}

getDifference(["ce101", "ma101"], ["ce101", "cs101"]);
