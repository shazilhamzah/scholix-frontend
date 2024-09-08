const XLSX = require('xlsx');

function getGradeForAverage(excelFilePath, MCA, averageScore) {
    // Read the Excel file
    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Find the row with the given MCA value
    const headers = data[0];
    let mcaRowIndex = -1;
    for (let i = 2; i < data.length; i++) {
        if (data[i][0] === MCA) {
            mcaRowIndex = i;
            break;
        }
    }
    
    if (mcaRowIndex === -1) {
        throw new Error('MCA not found');
    }
    
    // Extract the grades from the first row
    const grades = data[1].slice(1);
    console.log(grades);
    
    // Find the closest lower value to averageScore
    let closestIndex = -1;
    let minDiff = Infinity;
    for (let i = 1; i < data[mcaRowIndex].length; i++) {
        const value = data[mcaRowIndex][i];
        const diff = Math.abs(value - averageScore);
        if (value <= averageScore && diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        }
    }
    
    if (closestIndex === -1) {
        throw new Error('No valid average found for the given score');
    }
    
    // Return the grade for the closest value
    return grades[closestIndex - 1]; // Adjust for the grades offset
}

// Example usage
const excelFilePath = './MCA.xlsx';
const MCA = 87; // Replace with actual MCA value
const averageScore = 73; // Replace with actual average score

try {
    const grade = getGradeForAverage(excelFilePath, MCA, averageScore);
    console.log('Grade:', grade);
} catch (error) {
    console.error(error.message);
}
