const form = document.getElementById('Form');
const table = document.getElementById('Table');
const searchInput = document.getElementById('search');

let records = JSON.parse(localStorage.getItem('records')) || [];

function renderTable(data = records) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    data.forEach((rec, index) => {
        const row = table.insertRow();
        row.innerHTML = `
  <td>${rec.date}</td>
  <td>${rec.task}</td>
  <td>${rec.hours}</td>
  <td class="actions-cell">
    <button class="btn edit-btn" onclick="editRecord(${index})">Редактировать</button>
    <button class="btn" onclick="deleteRecord(${index})">Удалить</button>
  </td>
`;
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let editedIndex = form.getAttribute('data-edit');
    let newRecord = {
        date: document.getElementById('date').value,
        task: document.getElementById('task').value,
        hours: document.getElementById('hours').value
    };

    if (editedIndex !== null && editedIndex !== "") {
        records[editedIndex] = newRecord;
        form.removeAttribute('data-edit');
    } else {
        records.push(newRecord);
    }

    localStorage.setItem('records', JSON.stringify(records));
    renderTable();
    form.reset();
});

function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    renderTable();
}

function editRecord(index) {
    let rec = records[index];
    document.getElementById('date').value = rec.date;
    document.getElementById('task').value = rec.task;
    document.getElementById('hours').value = rec.hours;
    form.setAttribute('data-edit', index);
}

function searchByDate() {
    const input = document.getElementById('searchDate').value;

    if (!input) {
        renderTable();
        return;
    }

    const filteredRecords = records.filter(rec => rec.date === input);
    renderTable(filteredRecords);
}

function downloadXLS() {
    let tableHTML = `
        <table border="1">
            <tr>
                <th>Дата</th>
                <th>Выполненная работа</th>
                <th>Часы</th>
            </tr>
    `;

    records.forEach(rec => {
        tableHTML += `
            <tr>
                <td>${rec.date}</td>
                <td>${rec.task}</td>
                <td>${rec.hours}</td>
            </tr>
        `;
    });

    tableHTML += `</table>`;

    const blob = new Blob(["\uFEFF" + tableHTML], {
        type: "application/vnd.ms-excel;charset=utf-8"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "отчет.xls";
    link.click();
}

renderTable();
