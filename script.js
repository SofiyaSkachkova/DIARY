const form = document.getElementById('Form');
const table = document.getElementById('Table');

let records = JSON.parse(localStorage.getItem('records')) || [];

function renderTable() {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    
    records.forEach((rec, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${rec.date}</td>
            <td>${rec.task}</td>
            <td>${rec.hours}</td>
            <td>
                <button class="btn" onclick="deleteRecord(${index})">Удалить</button>
            </td>
        `;
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let newRecord = {
        date: document.getElementById('date').value,
        task: document.getElementById('task').value,
        hours: document.getElementById('hours').value
    };
    records.push(newRecord);
    localStorage.setItem('records', JSON.stringify(records));
    renderTable();
    form.reset();
});

function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    renderTable();
}

renderTable();