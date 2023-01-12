import React from 'react';
import {DatePicker, TimePicker} from "antd";
import dayjs from "dayjs";
import {ConfigProvider} from "antd";

import 'moment/locale/ru';
import locale from 'antd/es/locale/ru_RU'
import 'dayjs/locale/ru';

import styles from './DateAndTimeForm.module.css'

type DateAndTimeData = {
  date: string,
  time: string
}

type DateAndTimeFormProps = DateAndTimeData & {
  updateFields: (fields: Partial<DateAndTimeData>) => void
}
export const DateAndTimeForm: React.FC<DateAndTimeFormProps> = ({time, updateFields}, date) => {
  const format = 'HH:mm';

  return (
      <ConfigProvider locale={locale}>
          <div className={styles.container}>
            <div className={styles.time_picker}>
              <TimePicker defaultValue={dayjs()} format={format} onChange={(value, timeString)=>updateFields({time: timeString })} />
            </div>
            <DatePicker disabledDate={(current) => {
              let customDate = dayjs().format("DD.MM.YY");
              return current && current < dayjs(customDate, "DD.MM.YY");
            }}   format={'DD.MM.YY'} onChange={(current, dateString)=>updateFields({date: dateString})}  />
          </div>
      </ConfigProvider>
  );
};
