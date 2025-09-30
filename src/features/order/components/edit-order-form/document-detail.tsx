import { useMemo, useState } from 'react';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { Copy, PlusCircle, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardStatistic,
  CardTable,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IconInput } from '@/components/ui/inputs/icon-input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useNumberColumn } from '@/components/ui/tables/columns/hooks/use-number-column';
import { useStringColumn } from '@/components/ui/tables/columns/hooks/use-string-column';
import { TableActionSize } from '@/components/ui/tables/config/table.config';
import { DataGrid } from '@/components/ui/tables/data-grid';
import { DataGridTable } from '@/components/ui/tables/data-grid-table';
import { useDefaultTable } from '@/components/ui/tables/use-table';
import { IDocumentDetailItem } from '../../models/document-detail.model';
import { useOrderDetail } from '../../providers/order-detail.provider';

export function OrderDetailDocumentDetail() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { form } = useOrderDetail();

  const data: IDocumentDetailItem[] = [
    {
      no: 1,
      id: 'MH-001',
      tenHang: 'Sản phẩm A',
      dvt: 'Cái',
      soLuong: 2,
      donGia: 100000,
      tien: 200000,
      phanTramCk: 5,
      tienCk: 10000,
      phanTramThue: 10,
      tienThue: 19000,
      phanTramGiamTru: 0,
      tienGiamTru: 0,
      tienSauGiamTru: 190000,
    },
    {
      no: 2,
      id: 'MH-002',
      tenHang: 'Sản phẩm B',
      dvt: 'Hộp',
      soLuong: 1,
      donGia: 250000,
      tien: 250000,
      phanTramCk: 0,
      tienCk: 0,
      phanTramThue: 10,
      tienThue: 25000,
      phanTramGiamTru: 0,
      tienGiamTru: 0,
      tienSauGiamTru: 225000,
    },
  ];

  const numberOfColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.no,
    id: 'no',
    headerTitle: 'STT',
    size: 0,
  });
  const idColumn = useStringColumn<IDocumentDetailItem>({
    getString: (row) => row.id,
    id: 'id',
    headerTitle: 'Mã hàng hóa',
  });
  const nameColumn = useStringColumn<IDocumentDetailItem>({
    getString: (row) => row.tenHang,
    id: 'ten-hang',
    headerTitle: 'Tên hàng',
  });
  const unitColumn = useStringColumn<IDocumentDetailItem>({
    getString: (row) => row.dvt,
    id: 'dvt',
    headerTitle: 'ĐVT',
  });
  const quantityColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.soLuong,
    id: 'so-luong',
    headerTitle: 'Số lượng',
    size: 100,
  });
  const priceColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.donGia,
    id: 'don-gia',
    headerTitle: 'Đơn giá',
  });
  const amountColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.tien,
    id: 'tien',
    headerTitle: 'Tiền',
  });
  const discountPercentColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.phanTramCk,
    id: 'phan-tram-ck',
    headerTitle: '%CK',
    size: 100,
  });
  const discountAmountColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.tienCk,
    id: 'tien-ck',
    headerTitle: 'Tiền CK',
  });
  const taxPercentColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.phanTramThue,
    id: 'phan-tram-thue',
    headerTitle: '% Thuế',
    size: 100,
  });
  const taxAmountColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.tienThue,
    id: 'tien-thue',
    headerTitle: 'Tiền thuế',
  });
  const deductionPercentColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.phanTramGiamTru,
    id: 'phan-tram-giam-tru',
    headerTitle: '% Giảm trừ',
    size: 100,
  });
  const deductionAmountColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.tienGiamTru,
    id: 'tien-giam-tru',
    headerTitle: 'Tiền giảm trừ',
  });
  const afterDeductionColumn = useNumberColumn<IDocumentDetailItem>({
    getNumber: (row) => row.tienSauGiamTru,
    id: 'tien-sau-giam-tru',
    headerTitle: 'Tiền sau giảm trừ',
  });

  const columns = useMemo<ColumnDef<IDocumentDetailItem>[]>(
    () => [
      numberOfColumn,
      idColumn,
      nameColumn,
      unitColumn,
      quantityColumn,
      priceColumn,
      amountColumn,
      discountPercentColumn,
      discountAmountColumn,
      taxPercentColumn,
      taxAmountColumn,
      deductionPercentColumn,
      deductionAmountColumn,
      afterDeductionColumn,
      {
        id: 'actions',
        header: '',
        cell: () => (
          <div className="flex gap-0.5 justify-center">
            <Button
              mode="icon"
              variant="ghost"
              size="table-action"
              title="Sao chép"
            >
              <Copy className="text-green-500" />
            </Button>
            <Button mode="icon" variant="ghost" size="table-action" title="Xóa">
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        ),
        enableResizing: false,
        size: TableActionSize.buttons(2),
      },
    ],
    [
      numberOfColumn,
      idColumn,
      nameColumn,
      unitColumn,
      quantityColumn,
      priceColumn,
      amountColumn,
      discountPercentColumn,
      discountAmountColumn,
      taxPercentColumn,
      taxAmountColumn,
      deductionPercentColumn,
      deductionAmountColumn,
      afterDeductionColumn,
    ],
  );

  const table = useDefaultTable({
    columns,
    data: data || [],
    getRowId: (row: IDocumentDetailItem) => row.id,
    state: {
      rowSelection,
      columnPinning: {
        right: ['actions'],
      },
    },
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <DataGrid
      table={table}
      recordCount={0}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsVisibility: true,
        cellBorder: true,
        dense: true,
      }}
    >
      <Card>
        <CardHeader id="order-detail-document-detail">
          <CardTitle>Chi tiết chứng từ</CardTitle>
          <CardToolbar>
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem orient="horizontal">
                  <FormLabel size="sm">CK chung:</FormLabel>
                  <FormControl>
                    <IconInput
                      {...field}
                      trailing={'%'}
                      width={'sm'}
                      mask="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem orient="horizontal">
                  <FormLabel size="sm">Giảm trừ:</FormLabel>
                  <FormControl>
                    <IconInput
                      {...field}
                      trailing={'%'}
                      width={'sm'}
                      mask="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="vertical-separator" />
            <Button variant="primary">
              <PlusCircle />
              Thêm sản phẩm
            </Button>
            <Button variant="outline">Nhập từ phiếu</Button>
          </CardToolbar>
        </CardHeader>
        <CardContent className="p-0">
          <CardTable>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
        </CardContent>
        <CardFooter className="justify-end">
          <CardStatistic>
            Số lượng: <span className="font-medium">{data.length}</span>
          </CardStatistic>
          <CardStatistic>
            Tổng sau giảm trừ:{' '}
            <span className="font-medium text-primary">
              {formatCurrency(0)}
            </span>
          </CardStatistic>
        </CardFooter>
      </Card>
    </DataGrid>
  );
}
