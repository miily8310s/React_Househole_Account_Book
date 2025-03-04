import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useMonthlyPayments } from '../../hooks/useMonthlyPayments';
import { SelectMonth } from '../molecules/SelectMonth';
import { PaymentList } from '../organisms/PaymentList';

export const Calendar = () => {
  const { getPaymentsJson, getPaymentsByDate, payments, paymentsByDate } =
    useMonthlyPayments();

  const reversedPaymentsByDate = [...paymentsByDate].reverse();
  const currentDate = new Date();
  // TODO: selectmonthコンポーネントで呼べるようにshowingDateをhooks化した方がいいかも？
  const [showingDate, setShowingDate] = useState<Date>(currentDate);

  useEffect(() => getPaymentsJson(showingDate), [getPaymentsJson, showingDate]);
  useEffect(() => getPaymentsByDate(payments), [getPaymentsByDate, payments]);

  const onClickPrevious = () => {
    const nextDate = new Date(
      showingDate.getFullYear(),
      showingDate.getMonth() - 1
    );
    setShowingDate(nextDate);
  };

  const onClickNext = () => {
    const nextDate = new Date(
      showingDate.getFullYear(),
      showingDate.getMonth() + 1
    );
    setShowingDate(nextDate);
  };

  return (
    <>
      <Heading fontSize="lg" textAlign="center">
        カレンダー
      </Heading>
      <SelectMonth
        showingDate={showingDate}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />
      <PaymentList reversedPaymentsByDate={reversedPaymentsByDate} />
    </>
  );
};
