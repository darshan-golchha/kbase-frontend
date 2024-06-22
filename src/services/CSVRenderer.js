import React from 'react';
import Papa from 'papaparse';

const CSVRenderer = ({ csvData }) => {
  const renderCsvData = () => {
    try {
      const parsedData = Papa.parse(csvData, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true, // Skip empty lines
      });

      if (parsedData.errors.length > 0) {
        // Handle CSV parsing errors
        return <div>Failed to parse CSV data: {parsedData.errors[0].message}</div>;
      }

      if (parsedData.data.length === 0) {
        return <div>No data found in the CSV</div>;
      }

      const headers = Object.keys(parsedData.data[0]).map((field, index) => (
        <th key={index}>{field}</th>
      ));

      const rows = parsedData.data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {Object.values(row).map((value, colIndex) => (
            // Add inline styles with borders to each cell
            <td key={colIndex} style={{ border: '1px solid #000', padding: '8px' }}>
              {value}
            </td>
          ))}
        </tr>
      ));

      return (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    } catch (error) {
      // Handle any unexpected errors during CSV parsing
      console.error('Error rendering CSV data:', error);
      return <div>Error rendering CSV data</div>;
    }
  };

  return (
    <div>
      {csvData ? renderCsvData() : <div>Loading CSV data...</div>}
    </div>
  );
};

export default CSVRenderer;
