import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';

const XLSXRenderer = ({ xlsxData }) => {
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    if (xlsxData) {
      const workbook = XLSX.read(xlsxData, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setParsedData(data);
    }
  }, [xlsxData]);

  const renderXLSXData = () => {
    if (!parsedData) {
      return <div>Loading XLSX data...</div>;
    }

    return (
      <table>
        <tbody>
          {parsedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return <div>{renderXLSXData()}</div>;
};

export default XLSXRenderer;
