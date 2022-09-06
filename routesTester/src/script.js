const reportResult = document.getElementById('report-result');
const searchResult = document.getElementById('search-result');
const registerResult = document.getElementById('register-result');
const deregisterResult = document.getElementById('deregister-result');
const resolveResult = document.getElementById('resolve-result');
const countResult = document.getElementById('count-result');
const resolve_result = document.getElementById('a-resolve-result');
const admin_deregister_result = document.getElementById('a-deregister-result');
const admin_register_result = document.getElementById('a-register-result')
const admin_deregister_all_result = document.getElementById('deregister-all-result');
const statusResult = document.getElementById('status-result');
const reportlistResult = document.getElementById('reportlist-result');


async function put(uri = '', data = {}) {
    const response = await fetch(uri, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)  
    });
    return response.json();
}

async function get(uri = '') {
    const response = await fetch(uri);
    return response.json();
}

async function report(building, number) {
    const data = {"building": building, "number": number};
    put(`http://localhost:5000/report/`, data)
    .then(result => {
        reportResult.innerHTML = (result.msg) ? result.msg : result.err;
    });
}

async function resolve(building, number) {
    const data = {"building": building, "number": number};
    put(`http://localhost:5000/resolve/`, data)
    .then(result => {
        resolveResult.innerHTML = (result.msg) ? result.msg : result.err;
    });
}

async function search(building, number) {
    get(`http://localhost:5000/search/building/${building}/number/${number}`)
    .then(locker => {
        console.log(locker);
        searchResult.innerHTML = `Building: ${locker.building}, number: ${locker.number}`;
    }).catch(err => {
        console.log(err);
    })
}

async function register(building, number, user, userEmail) {
    const data = {'building': building, 'number': number, 'user': user, 'userEmail': userEmail};
    put(`http://localhost:5000/register/`, data)
    .then(result => {
        registerResult.innerHTML = (result.msg) ? result.msg : result.err;
    });
}

async function deregister(building, number, user, userEmail) {
    const data = {'building': building, 'number': number, 'user': user, 'userEmail': userEmail};
    put(`http://localhost:5000/deregister/`, data)
    .then(result => {
        deregisterResult.innerHTML = (result.msg) ? result.msg : result.err;
    });
}

async function count() {
    get(`http://localhost:5000/count/`)
    .then(result => {
        countResult.innerHTML = `total: ${result.totalCount}, available: ${result.availableCount}, registered: ${result.registeredCount}`;
    });
}

async function admin_deregister(building, number, user, userEmail){
    const data = {"building": building,"number": number, 'user': user, 'userEmail': userEmail };
    put(`http://localhost:5000/admin_deregister/`, data)
    .then(result => {
        admin_deregister_result.innerHTML = (result.msg) ? result.msg : result.err;
    })
}

async function admin_register(building, number, user, userEmail){
    const data = {"building": building,"number": number, 'user': user, 'userEmail': userEmail};
    put(`http://localhost:5000/admin_register/`, data)
    .then(result => {
        admin_register_result.innerHTML = (result.msg) ? result.msg : result.err;
    })
} 

async function deregister_all(building, number){
    const data = {};
    put(`http://localhost:5000/admin_deregister_all/`)
    .then(result => {
        admin_deregister_all_result.innerHTML = (result.msg) ? result.msg : result.err;
    })
}

async function status(building, number) {
    get(`http://localhost:5000/status/building/${building}/number/${number}`)
    .then(locker => {
        console.log(locker);
        statusResult.innerHTML = `${locker.building} ${locker.number} is ${locker.status}`;
    }).catch(error =>{
        console.log(error)
    })
}

async function report_list() {
    get(`http://localhost:5000/report_list/`)
    .then(lockers => {
        console.log(lockers);

        lockers.forEach(locker => {
            reportlistResult.innerHTML += `${locker.building} ${locker.number} has been reported <br>`;
        });
        
    }).catch(error =>{
        console.log(error)
    })
}