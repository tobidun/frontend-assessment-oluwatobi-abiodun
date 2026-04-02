/**
 * High-Fidelity CSV Export Engine
 * Generates and downloads protocol reports as CSV for local verification.
 */
export const exportToCSV = (filename: string, headers: string[], data: (string | number)[]) => {
  // Format the data row to handle commas correctly by wrapping strings in quotes
  const formattedData = data.map(value => {
    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }).join(",");

  const csvContent = [
    headers.join(","),
    formattedData
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
