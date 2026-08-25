export interface ColumnDef<T> {
  header: string;
  accessor: keyof T | ((row: T) => string | number);
  width?: string;
}

export class DataGridComponent<T> {
  public static renderTable<T>(columns: ColumnDef<T>[], data: T[]): string {
    const headers = columns.map(c => `<th>${c.header}</th>`).join("");
    const rows = data.map(row => {
      const cells = columns.map(col => {
        const val = typeof col.accessor === "function" ? col.accessor(row) : row[col.accessor];
        return `<td>${val}</td>`;
      }).join("");
      return `<tr>${cells}</tr>`;
    }).join("");

    return `<table class="enterprise-datagrid">
      <thead><tr>${headers}</tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  }
}
