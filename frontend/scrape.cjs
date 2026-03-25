const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync(process.env.TEMP + '\\nmc.html', 'utf8');
const $ = cheerio.load(html);

const tableRows = [];
let targetTable = null;

// Try to find the main proforma table. Usually has "Pro-Forma" or row counts.
$('table').each((i, table) => {
    // We want the most significant table with lots of rows
    if ($(table).find('tr').length > 10) {
        targetTable = table;
        return false; // break
    }
});

if (targetTable) {
    $(targetTable).find('tr').each((i, row) => {
        const cols = [];
        $(row).find('td, th').each((j, col) => {
            // grab links if they exist, otherwise text
            const text = $(col).text().trim().replace(/\s+/g, ' ');
            const link = $(col).find('a').attr('href');
            if (link) {
                cols.push({text, link});
            } else {
                cols.push({text, link: null});
            }
        });
        if (cols.length > 0) {
            tableRows.push(cols);
        }
    });
}

fs.writeFileSync('tableData.json', JSON.stringify(tableRows, null, 2));
console.log(`Extracted ${tableRows.length} rows.`);
