import * as boc from '@phoenix/boc';
import * as path from 'path';
import { Utils } from '../tools/utils';
import * as xlsx from 'exceljs';
import { utils } from 'mocha';

export class ExportExcel {
    public async export(input: string, output: string, data: any, c: boc.Container): Promise<void> {
        const workbook = new xlsx.Workbook();
        await workbook.xlsx.readFile(input);
        const worksheet = workbook.getWorksheet(1);
        // Déterminer le début et les styles du tableau
        let debut;
        const styles: any[] = [];
        if (data.columns.style) {
            styles.push({ name: data.columns.style });
        }
        for (const row of data.rows) {
            if (row.style) {
                const style = styles.find((item: any) => item.name === row.style);
                if (!style) {
                    styles.push({ name: row.style });
                }
            }
            for (const cell of row.value) {
                if (cell.style) {
                    const style = styles.find((item: any) => item.name === cell.style);
                    if (!style) {
                        styles.push({ name: cell.style });
                    }
                }
            }
        }
        worksheet.eachRow((row, i) => {
            row.eachCell((cell, j) => {
                if (cell.name === data.debut) {
                    debut = cell;
                    cell.value = undefined;
                    cell.style = undefined;
                    row.height = undefined;
                } else {
                    const style: any = styles.find((item: any) => item.name === cell.name);
                    if (style) {
                        style.value = cell.style;
                        style.height = row.height;
                        cell.style = {};
                        cell.value = undefined;
                        cell.name = undefined;
                        row.height = undefined;
                    }
                }
            });
        });
        if (!debut) {
            debut = worksheet.getCell(0, 0);
        }
        // Construcation du tableau avec ses colonnes et ses lignes
        const table = worksheet.addTable({
            name: 'gp_liste',
            ref: debut.address,
            headerRow: true,
            totalsRow: false,
            columns: data.columns.value.map((item: any) => {
                return {
                    name: item.value || item.name,
                    key: item.name,
                    filterButton: false
                };
            }),
            rows: data.rows.map((item: any) => {
                const cells = [];
                for (const cell of item.value) {
                    cells.push(cell.value);
                }
                return cells;
            })
        });
        // Appliquer le style de colonnes
        const lstyle = styles.find((item: any) => item.name === data.columns.style);
        for (let i = 0; i < data.columns.value.length; i++) {
            const col = data.columns.value[i];
            const otherCell = worksheet.getCell(debut.row, debut.col + i);
            if (lstyle && lstyle.value) {
                otherCell.style = otherCell.style || {};
                otherCell.font = lstyle.value.font;
                otherCell.fill = lstyle.value.fill;
                otherCell.border = lstyle.value.border;
                otherCell.alignment = lstyle.value.alignment;
            }
            if (col.width) {
                const otherCol = worksheet.getColumn(otherCell.col);
                otherCol.width = col.width;
                otherCol.numFmt = col.format;
            }
        }
        // Appliquer le style de lignes
        let oldCell = debut;
        for (const row of data.rows) {
            const firstCell = worksheet.getCell(oldCell.row + 1, oldCell.col);
            const otherRow = worksheet.getRow(firstCell.row as any);
            const styleRow = styles.find((item: any) => item.name === row.style);
            if (styleRow.height) {
                otherRow.height = styleRow.height;
            }
            const currentRow = firstCell.row;
            let currentCol = oldCell.col as any;
            for (let i = 0; i < row.value.length; i++) {
                const cell = row.value[i];
                const col = data.columns.value.find((item: any) => item.name === cell.name);
                const otherCell = worksheet.getCell(currentRow, currentCol);
                let styleCell;
                if (cell.style) {
                    styleCell = styles.find((item: any) => item.name === cell.style);
                }
                styleCell = styleCell || styleRow;
                if (styleCell && styleCell.value) {
                    otherCell.font = styleCell.value.font;
                    otherCell.fill = styleCell.value.fill;
                    otherCell.border = styleCell.value.border;
                    otherCell.numFmt = styleCell.value.numFmt;
                    if (styleCell.value.alignment) {
                        const alignment: any = {
                            vertical: styleCell.value.alignment.vertical,
                            wrapText: styleCell.value.alignment.wrapText,
                            readingOrder: styleCell.value.alignment.readingOrder,
                            textRotation: styleCell.value.alignment.textRotation
                        };
                        if (i === 0) {
                            alignment.indent = styleCell.value.alignment.indent;
                            alignment.horizontal = styleCell.value.alignment.horizontal;
                        }
                        otherCell.alignment = alignment;
                    }
                    if (row.indent && i === 0) {
                        otherCell.alignment = otherCell.alignment || {};
                        otherCell.alignment.indent = row.indent;
                    }
                }
                if (col.align) {
                    otherCell.alignment = otherCell.alignment || {};
                    otherCell.alignment.horizontal = col.align;
                }
                // if (cell.fusion) {
                //     const index = data.columns.findIndex((item: any) => item.name === cell.name);
                //     const mergeCols: string[] = data.columns
                //         .slice(index + 1, index + cell.fusion)
                //         .map((item: any) => item.name);
                //     for (const col of mergeCols) {
                //         const fusionCell = newRow.getCell(col);
                //         fusionCell.merge(newCell);
                //     }
                // }
                currentCol++;
            }
            oldCell = firstCell;
        }
        await workbook.xlsx.writeFile(output);
    }
    public outputFilePath(filename: string) {
        return path.join(Utils.tmpFolder, filename + '.xlsx');
    }
    public downloadUrl(filename: string): string {
        return `/api/download/${filename}`;
    }
    public outputFileName(filename: string) {
        return filename + '.xlsx';
    }

}