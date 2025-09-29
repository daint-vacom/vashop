import { HandCoins, Save } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DetailInfo,
  DetailInfoContent,
  DetailInfoLabel,
} from '@/components/ui/detail-info';

export function OrderDetailSummary() {
  return (
    <Card className="basis-1/2">
      <CardContent>
        <div className="grid grid-cols-2 form-spacing">
          <DetailInfo>
            <DetailInfoLabel size="full">Tổng số lượng:</DetailInfoLabel>
            <DetailInfoContent>1 sản phẩm</DetailInfoContent>
          </DetailInfo>

          <DetailInfo>
            <DetailInfoLabel size="full">Tổng tiền:</DetailInfoLabel>
            <DetailInfoContent>100.000 đ</DetailInfoContent>
          </DetailInfo>

          <DetailInfo>
            <DetailInfoLabel size="full">% Chiết khấu:</DetailInfoLabel>
            <DetailInfoContent>0.0%</DetailInfoContent>
          </DetailInfo>

          <DetailInfo>
            <DetailInfoLabel size="full">Tổng tiền chiết khấu:</DetailInfoLabel>
            <DetailInfoContent>0 đ</DetailInfoContent>
          </DetailInfo>

          <DetailInfo>
            <DetailInfoLabel size="full">Tổng tiền thuế:</DetailInfoLabel>
            <DetailInfoContent>5.000 đ</DetailInfoContent>
          </DetailInfo>

          <DetailInfo>
            <DetailInfoLabel size="full">Tổng tiền giảm trừ:</DetailInfoLabel>
            <DetailInfoContent>100 đ</DetailInfoContent>
          </DetailInfo>
        </div>
      </CardContent>
      <CardContent className="border-t border-t-border">
        <Alert
          variant="blue"
          appearance="light"
          className="justify-between text-lg "
        >
          <span className="font-medium">Tổng tiền thanh toán:</span>
          <span className="text-blue-500 font-bold">100.000 đ</span>
        </Alert>
      </CardContent>
      <CardFooter className="grid grid-cols-2 form-spacing">
        <Button variant="secondary">
          <Save /> Lưu tạm
        </Button>
        <Button variant="primary" type="submit">
          <HandCoins /> Thanh toán
        </Button>
      </CardFooter>
    </Card>
  );
}
